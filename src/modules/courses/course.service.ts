import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { IUser } from 'src/types/user';
import { Prisma } from '@prisma/client';

@Injectable()
export class CourseService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    {
      name,
      description,
      status,
      availableTimes,
      topics,
      lessons,
      tags,
    }: CreateCourseDto,
    currentUser: IUser,
  ) {
    const userId = currentUser.id;
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) throw new NotFoundException('User not found');

    return await this.prisma.course.create({
      data: {
        userId,
        name,
        description,
        status,
        availableTimes: availableTimes.length
          ? {
              create: availableTimes.map((availableTime) => ({
                startTime: availableTime.startTime,
                endTime: availableTime.endTime,
                day: availableTime.day,
              })),
            }
          : undefined,
        topics: topics.length
          ? {
              connectOrCreate: topics.map((topic) => ({
                where: { name: topic },
                create: { name: topic },
              })),
            }
          : undefined,
        lessons: lessons.length
          ? {
              create: lessons.map((lesson) => ({
                title: lesson.title,
                content: lesson.content,
              })),
            }
          : undefined,
        tags: tags.length
          ? {
              connectOrCreate: tags.map((tag) => ({
                where: { name: tag },
                create: { name: tag },
              })),
            }
          : undefined,
      },
      include: {
        availableTimes: true,
        topics: true,
        lessons: true,
        tags: true,
      },
    });
  }

  async findAll() {
    return await this.prisma.course.findMany({
      include: {
        availableTimes: true,
        topics: true,
        lessons: true,
        tags: true,
      },
    });
  }

  async findOne(id: string) {
    if (!id) throw new NotFoundException('Id not found');

    const course = await this.prisma.course.findUnique({
      where: {
        id,
      },
      include: {
        availableTimes: true,
        topics: true,
        lessons: true,
        tags: true,
      },
    });
    if (!course) throw new NotFoundException('Course not found');

    return course;
  }

  async update(id: string, updateCourseDto: UpdateCourseDto) {
    if (!id) throw new NotFoundException('Id not found');
    const data: Prisma.CourseUpdateInput = {};

    if (updateCourseDto.name) data.name = updateCourseDto.name;

    if (updateCourseDto.description)
      data.description = updateCourseDto.description;

    if (updateCourseDto.status) data.status = updateCourseDto.status;

    if (updateCourseDto.availableTimes)
      data.availableTimes = {
        connect: updateCourseDto.availableTimes.map((availableTime) => ({
          id: availableTime.id,
        })),
      };

    if (updateCourseDto.topics)
      data.topics = {
        connectOrCreate: updateCourseDto.topics.map((topic) => ({
          where: { name: topic },
          create: { name: topic },
        })),
      };

    if (updateCourseDto.lessons)
      data.lessons = {
        connect: updateCourseDto.lessons.map((lesson) => ({
          id: lesson.id,
        })),
      };

    if (updateCourseDto.tags)
      data.tags = {
        connectOrCreate: updateCourseDto.tags.map((tag) => ({
          where: { name: tag },
          create: { name: tag },
        })),
      };

    if (updateCourseDto.status) data.status = updateCourseDto.status;

    return await this.prisma.course.update({
      where: {
        id,
      },
      data,
      include: {
        availableTimes: true,
        topics: true,
        lessons: true,
        tags: true,
      },
    });
  }

  async remove(id: string) {
    if (!id) throw new NotFoundException('Id not found');

    return await this.prisma.course.delete({
      where: {
        id,
      },
    });
  }
}
