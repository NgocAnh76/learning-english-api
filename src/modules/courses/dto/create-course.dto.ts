import { ApiProperty } from '@nestjs/swagger';
import { EAvailableDay, EStatus } from '@prisma/client';
import { IsArray, IsOptional, IsString } from 'class-validator';
import { BaseEntityDto } from 'src/common/dto/utils.dto';
import { IAvailableTime } from 'src/types/available-time';
import { ICourse } from 'src/types/course';
import { ILesson } from 'src/types/lesson';

export class CreateCourseDto extends BaseEntityDto implements ICourse {
  @IsString()
  @ApiProperty({
    type: 'string',
    example: 'John Doe',
    required: true,
  })
  name: string;

  @IsString()
  @ApiProperty({
    type: 'string',
    example: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
    required: true,
  })
  description: string;

  @IsArray()
  @ApiProperty({
    type: 'array',
    example: ['Male Voice', 'Female Voice'],
    required: false,
  })
  tags: string[];

  @IsArray()
  @ApiProperty({
    type: 'array',
    example: [
      {
        startTime: '10:00',
        endTime: '11:00',
        day: EAvailableDay.MONDAY,
      },
    ],
    required: false,
  })
  @IsOptional()
  availableTimes: IAvailableTime[];

  @IsArray()
  @ApiProperty({
    type: 'array',
    example: ['Toeic', 'IELTS', 'TOEFL'],
    required: false,
  })
  topics: string[];

  @IsString()
  @ApiProperty({
    type: 'string',
    example: EStatus.ACTIVE,
    required: true,
  })
  @IsOptional()
  status: EStatus;

  @IsArray()
  @ApiProperty({
    type: 'array',
    example: [
      {
        title: 'Lesson 1',
        content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
      },
    ],
    required: false,
  })
  @IsOptional()
  lessons: ILesson[];
}
