import { Module } from '@nestjs/common'
import { UserService } from './users.service'
import { UsersController } from './users.controller'
import { PrismaService } from 'prisma/prisma.service'

@Module({
  controllers: [UsersController],
  providers: [UserService, PrismaService],
})
export class UsersModule {}
