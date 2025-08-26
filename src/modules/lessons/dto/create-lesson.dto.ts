import { BaseEntityDto } from 'src/common/dto/utils.dto';
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLessonDto extends BaseEntityDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, example: 'Speaking practice', required: true })
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: '1v1 speaking practice',
    required: true,
  })
  content: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: '4b755b09-9776-4484-838a-04463d3a1303',
    required: true,
  })
  courseId: string;
}
