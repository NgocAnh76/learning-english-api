import { EAvailableDay } from '@prisma/client';

import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { BaseEntityDto } from 'src/common/dto/utils.dto';

export class CreateAvailableTimeDto extends BaseEntityDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    example: '10:00',
    required: true,
  })
  startTime: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    example: '11:00',
    required: true,
  })
  endTime: string;

  @IsString()
  @IsEnum(EAvailableDay)
  @ApiProperty({
    type: 'string',
    example: EAvailableDay.MONDAY,
    required: true,
  })
  day: EAvailableDay;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    example: '685b193e-d707-46c3-ad92-7b58b392892e',
    required: true,
  })
  courseId: string;
}
