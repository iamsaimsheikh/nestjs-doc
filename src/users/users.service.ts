// src/user/user.service.ts
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { AuthService } from 'src/auth/auth.service'

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly authService: AuthService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await this.authService.hashPassword(
      createUserDto.password,
    )

    return await this.prisma.user.create({
      data: {
        username: createUserDto.username,
        email: createUserDto.email,
        password: hashedPassword,
      },
    })
  }

  // Get all users
  async findAll() {
    return this.prisma.user.findMany()
  }

  // Get a single user by ID
  async findOne(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
    })
  }

  // Update a user
  async update(id: number, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    })
  }

  // Delete a user
  async remove(id: number) {
    return this.prisma.user.delete({
      where: { id },
    })
  }
}
