// src/user/dto/update-user.dto.ts
import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsString, IsEmail, MinLength, IsOptional } from 'class-validator'

export class UpdateUserDto {
  @ApiPropertyOptional({
    description: 'The username of the user',
    example: 'john_doe',
  })
  @IsOptional()
  @IsString()
  username?: string

  @ApiPropertyOptional({
    description: 'The email of the user',
    example: 'john_doe@example.com',
  })
  @IsOptional()
  @IsEmail()
  email?: string

  @ApiPropertyOptional({
    description: 'The password of the user',
    example: 'Password#@!123',
  })
  @IsOptional()
  @MinLength(6)
  password?: string
}
