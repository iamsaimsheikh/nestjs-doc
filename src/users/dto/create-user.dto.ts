import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsString, IsEmail, MinLength } from 'class-validator'

export class CreateUserDto {
  @ApiPropertyOptional({
    description: "The username of the user",
    example:"john_doe"
  })
  @IsString()
  username: string

  @ApiPropertyOptional({
    description: "The email of the user",
    example:"john_doe@example.com"
  })
  @IsEmail()
  email: string

  @ApiPropertyOptional({
    description: "The password of the user",
    example:"Password#@!123"
  })
  @MinLength(6)
  password: string
}
