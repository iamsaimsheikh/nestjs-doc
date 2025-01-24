import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { LoginUserDto } from './dto/login-user.dto'
import { PrismaService } from 'prisma/prisma.service'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  private readonly saltRounds = 10

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.saltRounds)
    return bcrypt.hash(password, salt)
  }

  async comparePasswords(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword)
  }

  async login(loginUserDto: LoginUserDto): Promise<{ accessToken: string }> {
    const { username, password } = loginUserDto

    const user = await this.prisma.user.findUnique({
      where: { username },
    })

    if (!user) {
      throw new UnauthorizedException('Invalid credentials')
    }

    const isPasswordValid = await this.comparePasswords(password, user.password)
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials')
    }

    const payload = { username: user.username, sub: user.id }

    const accessToken = this.jwtService.sign(payload)

    return { accessToken }
  }

  async forgotPassword(email: string): Promise<Object> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      throw new UnauthorizedException('Invalid email')
    }

    const requestAlreadyExists = await this.prisma.forgotPassword.findFirst({
      where: { userId: user.id },
    })

    if (requestAlreadyExists) {
      await this.prisma.forgotPassword.delete({
        where: { id: requestAlreadyExists.id },
      })
    }

    const token = this.jwtService.sign({ sub: user.id })
    const resetLink = `http://localhost:3000/reset-password?token=${token}`

    const createForgotPasswordRequest = await this.prisma.forgotPassword.create(
      {
        data: {
          userId: user.id,
          token,
        },
      },
    )

    return { resetLink }
  }

  async resetPassword(
    token: string,
    newPassword: string,
    confirmPassword: string,
  ): Promise<Object> {
    if (newPassword !== confirmPassword) {
      throw new BadRequestException('Passwords do not match')
    }

    let userId: number
    try {
      const payload = this.jwtService.verify(token)
      userId = payload.sub
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired reset link')
    }

    const forgotPasswordRecord = await this.prisma.forgotPassword.findFirst({
      where: { token: token, userId },
    })

    if (!forgotPasswordRecord) {
      throw new UnauthorizedException('Invalid or expired reset link')
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10)

    await this.prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    })

    await this.prisma.forgotPassword.delete({
      where: { id: forgotPasswordRecord.id },
    })

    return { message: 'Password reset successfully' }
  }
}
