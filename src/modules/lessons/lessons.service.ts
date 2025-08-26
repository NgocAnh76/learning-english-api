import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class LessonsService {
  constructor(private readonly prisma: PrismaService) {}

  async create({ title, content, courseId }: CreateLessonDto) {
    const courseExists = await this.prisma.course.findUnique({
      where: { id: courseId },
    });

    if (!courseExists) throw new NotFoundException('Course not found');

    const lessonExists = await this.prisma.lesson.findFirst({
      where: { title, courseId },
    });

    if (lessonExists)
      throw new BadRequestException(
        'This title already exists for this course',
      );

    return await this.prisma.lesson.create({
      data: {
        title,
        content,
        courseId,
      },
      include: {
        course: true,
      },
    });
  }

  async findAll() {
    return await this.prisma.lesson.findMany({
      include: {
        course: true,
      },
    });
  }

  async findOne(id: string) {
    if (!id) throw new BadRequestException('Lesson ID is required');

    const lesson = await this.prisma.lesson.findUnique({
      where: { id },
      include: {
        course: true,
      },
    });

    if (!lesson) throw new NotFoundException('Lesson not found');

    return lesson;
  }

  async update(id: string, { title, content }: UpdateLessonDto) {
    if (!id) throw new BadRequestException('Lesson ID is required');
    const data: Prisma.LessonUpdateInput = {};

    const lessonExists = await this.prisma.lesson.findUnique({
      where: { id },
    });

    if (!lessonExists) throw new NotFoundException('Lesson not found');

    if (title) data.title = title;
    if (content) data.content = content;

    if (Object.keys(data).length === 0)
      throw new BadRequestException('No data to update');

    return await this.prisma.lesson.update({
      where: { id },
      data,
      include: {
        course: true,
      },
    });
  }

  async remove(id: string) {
    if (!id) throw new BadRequestException('Lesson ID is required');

    const lessonExists = await this.prisma.lesson.findUnique({
      where: { id },
    });

    if (!lessonExists) throw new NotFoundException('Lesson not found');

    return await this.prisma.lesson.delete({
      where: { id },
    });
  }
}
