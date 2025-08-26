import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { BaseEntityDto } from 'src/common/dto/utils.dto';
import { ICertification } from 'src/types/certification';

export class CreateCertificationDto
  extends BaseEntityDto
  implements ICertification
{
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: 'Toeic',
    required: true,
  })
  name: string;
}
