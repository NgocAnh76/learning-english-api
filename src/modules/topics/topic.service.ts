import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class TopicService {
  constructor(private readonly prisma: PrismaService) {}

  async create({ name }: CreateTopicDto) {
    const topicExist = await this.prisma.topic.findFirst({
      where: {
        name,
      },
    });

    if (topicExist)
      throw new BadRequestException('Topic already exists, please try again');

    return await this.prisma.topic.create({
      data: {
        name,
      },
    });
  }

  async findAll() {
    return await this.prisma.topic.findMany();
  }

  async findOne(id: string) {
    if (!id) throw new NotFoundException('Id not found');

    const topic = await this.prisma.topic.findUnique({
      where: {
        id,
      },
    });

    if (!topic) throw new NotFoundException('Topic not found');

    return topic;
  }

  async update(id: string, updateTopicDto: UpdateTopicDto) {
    if (!id) throw new NotFoundException('Id not found');
    const data: Prisma.TopicUpdateInput = {};

    const topic = await this.prisma.topic.findUnique({
      where: {
        id,
      },
    });

    if (!topic) throw new NotFoundException('Topic not found');

    if (updateTopicDto.name) {
      data.name = updateTopicDto.name;
    }

    return await this.prisma.topic.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    if (!id) throw new NotFoundException('Id not found');

    const topic = await this.prisma.topic.findUnique({
      where: { id },
    });

    if (!topic) throw new NotFoundException('Topic not found');

    return await this.prisma.topic.delete({
      where: { id },
    });
  }
}
