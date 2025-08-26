import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AvailableTimeService } from './available-time.service';
import { CreateAvailableTimeDto } from './dto/create-available-time.dto';
import { UpdateAvailableTimeDto } from './dto/update-available-time.dto';

@Controller('available-time')
@ApiBearerAuth()
export class AvailableTimeController {
  constructor(private readonly availableTimeService: AvailableTimeService) {}

  @Post()
  @ApiOperation({ summary: 'Create available time' })
  create(@Body() createAvailableTimeDto: CreateAvailableTimeDto) {
    return this.availableTimeService.create(createAvailableTimeDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all available times' })
  findAll() {
    return this.availableTimeService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get available time by id' })
  findOne(@Param('id') id: string) {
    return this.availableTimeService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update available time' })
  update(
    @Param('id') id: string,
    @Body() updateAvailableTimeDto: UpdateAvailableTimeDto,
  ) {
    return this.availableTimeService.update(id, updateAvailableTimeDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete available time' })
  remove(@Param('id') id: string) {
    return this.availableTimeService.remove(id);
  }
}
