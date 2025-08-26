import { ApiProperty } from '@nestjs/swagger';
import { EGender, ERole, EStatus, EUserType } from '@prisma/client';
import { IsArray, IsEmail, IsOptional, IsString } from 'class-validator';
import { BaseEntityDto } from 'src/common/dto/utils.dto';
import { IUser } from 'src/types/user';

export class CreateUserDto extends BaseEntityDto implements IUser {
  @IsString()
  @ApiProperty({
    type: 'string',
    example: 'John Doe',
    required: true,
  })
  name: string;

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

  @IsString()
  @ApiProperty({
    enum: ERole,
    example: ERole.USER,
    required: true,
  })
  @IsOptional()
  role?: ERole;

  @IsString()
  @ApiProperty({
    enum: EUserType,
    example: EUserType.STUDENT,
    required: true,
  })
  @IsOptional()
  type?: EUserType;

  @IsString()
  @ApiProperty({
    enum: EStatus,
    example: EStatus.ACTIVE,
    required: true,
  })
  status: EStatus;

  @IsArray()
  @ApiProperty({
    type: 'array',
    example: ['123456', '123457'],
    required: false,
  })
  courses?: string[];

  @IsString()
  @ApiProperty({
    type: 'string',
    example: '123456',
    required: true,
  })
  @IsOptional()
  description?: string;

  @IsString()
  @ApiProperty({
    type: 'string',
    example: '123456',
    required: false,
  })
  country?: string;

  @IsString()
  @ApiProperty({
    enum: EGender,
    example: EGender.MALE,
    required: false,
  })
  gender: EGender;

  @IsArray()
  @ApiProperty({
    type: 'array',
    example: ['TOEIC', 'IELTS', 'TOEFL'],
    required: false,
  })
  certifications?: string[];
}
