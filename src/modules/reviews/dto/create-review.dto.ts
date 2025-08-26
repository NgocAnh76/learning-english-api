import { BaseEntityDto } from 'src/common/dto/utils.dto';
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateReviewDto extends BaseEntityDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: '4b755b09-9776-4484-838a-04463d3a1303',
    required: true,
  })
  courseId: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ type: Number, example: 5, required: true })
  rating: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: 'Pretty good for my needs',
    required: true,
  })
  comment: string;
}
