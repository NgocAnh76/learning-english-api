import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsOptional, IsString } from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';

export class BaseEntityDto {
  @ApiProperty({
    type: 'string',
    example: '1',
    required: true,
  })
  @IsOptional()
  @IsString()
  id: string;

  @ApiProperty({
    type: 'string',
    example: new Date().toISOString(),
    required: true,
  })
  @IsOptional()
  @IsDate()
  @Transform(
    ({ value }: TransformFnParams) => new Date(value as string | number | Date),
  )
  createdAt: Date;

  @ApiProperty({
    type: 'string',
    example: new Date().toISOString(),
    required: true,
  })
  @IsOptional()
  @IsDate()
  @Transform(
    ({ value }: TransformFnParams) => new Date(value as string | number | Date),
  )
  updatedAt: Date;
}
