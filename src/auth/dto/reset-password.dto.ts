import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsNotEmpty, IsString, MinLength, Matches } from 'class-validator'

export class ResetPasswordDto {
  @ApiPropertyOptional({
    description: 'The new password of the user',
    example: 'password#@!123',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6, {
    message: 'Password must be at least 6 characters long',
  })
  new_password: string

  @ApiPropertyOptional({
    description: 'The confirmed password of the user',
    example: 'password#@!123',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6, {
    message: 'Password must be at least 6 characters long',
  })
  confirm_password: string
}
