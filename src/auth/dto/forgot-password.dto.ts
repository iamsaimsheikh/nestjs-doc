import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsEmail } from 'class-validator'

export class ForgotPasswordDto {
  @ApiPropertyOptional({
    description: 'The email of the user',
    example: 'john_doe@example.com',
  })
  @IsEmail()
  email: string
}
