import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class TagsService {
  constructor(private readonly prisma: PrismaService) {}

  async create({ name }: CreateTagDto) {
    const tagExist = await this.prisma.tag.findFirst({
      where: {
        name,
      },
    });

    if (tagExist)
      throw new BadRequestException('Tag already exists, please try again');

    return await this.prisma.tag.create({
      data: { name },
    });
  }

  async findAll() {
    return await this.prisma.tag.findMany();
  }

  async findOne(id: string) {
    if (!id) throw new NotFoundException('Id not found');

    const tag = await this.prisma.tag.findUnique({
      where: { id },
    });

    if (!tag) throw new NotFoundException('Tag not found');

    return tag;
  }

  async update(id: string, updateTagDto: UpdateTagDto) {
    if (!id) throw new NotFoundException('Id not found');

    const data: Prisma.TagUpdateInput = {};

    const tag = await this.prisma.tag.findUnique({
      where: { id },
    });

    if (!tag) throw new NotFoundException('Tag not found');

    if (updateTagDto.name) {
      data.name = updateTagDto.name;
    }

    return await this.prisma.tag.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    if (!id) throw new NotFoundException('Id not found');

    const tag = await this.prisma.tag.findUnique({
      where: { id },
    });

    if (!tag) throw new NotFoundException('Tag not found');

    return await this.prisma.tag.delete({
      where: { id },
    });
  }
}
