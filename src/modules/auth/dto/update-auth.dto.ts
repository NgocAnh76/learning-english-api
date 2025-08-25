import { PartialType } from '@nestjs/mapped-types';
import { AuthRegisterDto } from './auth.dto';

export class UpdateAuthDto extends PartialType(AuthRegisterDto) {}
