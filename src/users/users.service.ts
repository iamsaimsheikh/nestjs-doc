// src/user/user.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service'
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  // Create a new user
  async create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({
      data: {
        username: createUserDto.username,
        email: createUserDto.email,
        password: createUserDto.password,
      },
    });
  }

  // Get all users
  async findAll() {
    return this.prisma.user.findMany();
  }

  // Get a single user by ID
  async findOne(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  // Update a user
  async update(id: number, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  // Delete a user
  async remove(id: number) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
