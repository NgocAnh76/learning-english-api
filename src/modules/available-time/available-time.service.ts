import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAvailableTimeDto } from './dto/create-available-time.dto';
import { UpdateAvailableTimeDto } from './dto/update-available-time.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { EStatus, Prisma } from '@prisma/client';

@Injectable()
export class AvailableTimeService {
  constructor(private readonly prisma: PrismaService) {}

  async create({ startTime, endTime, day, courseId }: CreateAvailableTimeDto) {
    const course = await this.prisma.course.findUnique({
      where: {
        id: courseId,
      },
    });

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    if (course.status !== EStatus.ACTIVE) {
      throw new BadRequestException(
        'Course is not active, please contact admin',
      );
    }

    const availableTime = await this.prisma.availableTime.findFirst({
      where: {
        courseId,
        day,
      },
    });

    if (availableTime) {
      throw new BadRequestException('Available time already exists');
    }

    return this.prisma.availableTime.create({
      data: {
        startTime,
        endTime,
        day,
        courseId,
      },
      include: {
        course: true,
      },
    });
  }

  async findAll() {
    return await this.prisma.availableTime.findMany();
  }

  async findOne(id: string) {
    if (!id) throw new NotFoundException('Id not found');

    const availableTime = await this.prisma.availableTime.findUnique({
      where: {
        id,
      },
    });

    if (!availableTime) throw new NotFoundException('Available time not found');

    return availableTime;
  }

  async update(id: string, updateAvailableTimeDto: UpdateAvailableTimeDto) {
    if (!id) throw new NotFoundException('Id not found');
    const data: Prisma.AvailableTimeUpdateInput = {};

    const availableTimeExist = await this.prisma.availableTime.findUnique({
      where: {
        id,
      },
    });
    if (!availableTimeExist)
      throw new NotFoundException('Available time not found');

    if (updateAvailableTimeDto.startTime) {
      data.startTime = updateAvailableTimeDto.startTime;
    }
    if (updateAvailableTimeDto.endTime) {
      data.endTime = updateAvailableTimeDto.endTime;
    }
    if (updateAvailableTimeDto.day) {
      data.day = updateAvailableTimeDto.day;
    }
    if (updateAvailableTimeDto.courseId) {
      data.course = {
        connect: {
          id: updateAvailableTimeDto.courseId,
        },
      };
    }

    const availableTime = await this.prisma.availableTime.update({
      where: {
        id,
      },
      data,
      include: {
        course: true,
      },
    });

    return availableTime;
  }

  async remove(id: string) {
    if (!id) throw new NotFoundException('Id not found');

    const availableTimeExist = await this.prisma.availableTime.findUnique({
      where: {
        id,
      },
    });

    if (!availableTimeExist)
      throw new NotFoundException('Available time not found');

    return await this.prisma.availableTime.delete({
      where: {
        id,
      },
    });
  }
}
