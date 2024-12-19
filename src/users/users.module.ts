import { Module } from '@nestjs/common';
import { UserService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'prisma/prisma.service';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
@Module({
  imports: [AuthModule],
  controllers: [UsersController],
  providers: [UserService, PrismaService, AuthService],
})
export class UsersModule {}
