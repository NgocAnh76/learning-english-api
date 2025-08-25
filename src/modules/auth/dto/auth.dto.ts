import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class AuthDto {
  @IsEmail()
  @ApiProperty({
    type: 'string',
    example: 'john.doe@example.com',
    required: true,
  })
  email: string;

  @IsString()
  @ApiProperty({
    type: 'string',
    example: 'xxx',
    required: true,
  })
  password: string;
}

export class AuthRegisterDto extends AuthDto {
  @IsString()
  @ApiProperty({
    type: 'string',
    example: 'John Doe',
    required: true,
  })
  name: string;
}
