import { BaseEntityDto } from 'src/common/dto/utils.dto';
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTagDto extends BaseEntityDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    example: 'Tag 1',
    required: true,
  })
  name: string;
}
