import { Injectable, UnauthorizedException } from '@nestjs/common'
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
}
