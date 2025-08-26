import { BaseEntityDto } from 'src/common/dto/utils.dto';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { EEnrollStatus } from '@prisma/client';

export class CreateEnrollDto extends BaseEntityDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: '4b755b09-9776-4484-838a-04463d3a1303',
    required: true,
  })
  courseId: string;

  @IsEnum(EEnrollStatus)
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    example: EEnrollStatus.TRIAL,
    required: true,
  })
  status: EEnrollStatus;
}
