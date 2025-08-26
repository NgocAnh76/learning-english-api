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
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { TopicService } from './topic.service';

@Controller('topic')
@ApiBearerAuth()
export class TopicController {
  constructor(private readonly topicService: TopicService) {}

  @Post()
  @ApiOperation({ summary: 'Create a topic' })
  create(@Body() createTopicDto: CreateTopicDto) {
    return this.topicService.create(createTopicDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all topics' })
  findAll() {
    return this.topicService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a topic by id' })
  findOne(@Param('id') id: string) {
    return this.topicService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a topic' })
  update(@Param('id') id: string, @Body() updateTopicDto: UpdateTopicDto) {
    return this.topicService.update(id, updateTopicDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a topic' })
  remove(@Param('id') id: string) {
    return this.topicService.remove(id);
  }
}
