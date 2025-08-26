import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CurrentUser } from 'src/common/decorators/currentUser.decorator';
import { IUser } from 'src/types/user';
import { CreateEnrollDto } from './dto/create-enroll.dto';
import { UpdateEnrollDto } from './dto/update-enroll.dto';
import { EnrollsService } from './enrolls.service';

@Controller('enrolls')
@ApiBearerAuth()
export class EnrollsController {
  constructor(private readonly enrollsService: EnrollsService) {}

  @Post()
  create(
    @Body() createEnrollDto: CreateEnrollDto,
    @CurrentUser() currentUser: IUser,
  ) {
    return this.enrollsService.create(createEnrollDto, currentUser);
  }

  @Get()
  findAll() {
    return this.enrollsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.enrollsService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateEnrollDto: UpdateEnrollDto) {
    return this.enrollsService.update(id, updateEnrollDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.enrollsService.remove(id);
  }
}
