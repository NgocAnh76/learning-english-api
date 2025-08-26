import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateEnrollDto } from './dto/create-enroll.dto';
import { UpdateEnrollDto } from './dto/update-enroll.dto';
import { IUser } from 'src/types/user';
import { PrismaService } from 'src/prisma/prisma.service';
import { EUserType, Prisma } from '@prisma/client';

@Injectable()
export class EnrollsService {
  constructor(private readonly prisma: PrismaService) {}

  async create({ courseId, status }: CreateEnrollDto, currentUser: IUser) {
    const userId = currentUser.id;

    const courseExists = await this.prisma.course.findUnique({
      where: { id: courseId },
    });

    if (!courseExists) throw new NotFoundException('Course not found');

    const userExists = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!userExists) throw new NotFoundException('User not found');

    const userType = userExists.type;

    if (userType !== EUserType.STUDENT)
      throw new BadRequestException('Only students can enroll in courses');

    const enrollExists = await this.prisma.enroll.findFirst({
      where: { userId, courseId },
    });

    if (enrollExists)
      throw new BadRequestException('You already enrolled in this course');

    return await this.prisma.enroll.create({
      data: { userId, courseId, status },
      include: {
        course: true,
        user: true,
      },
    });
  }

  async findAll() {
    return await this.prisma.enroll.findMany({
      include: {
        course: true,
        user: true,
      },
    });
  }

  async findOne(id: string) {
    if (!id) throw new BadRequestException('Enroll ID is required');

    const enroll = await this.prisma.enroll.findUnique({
      where: { id },
      include: {
        course: true,
        user: true,
      },
    });

    if (!enroll) throw new NotFoundException('Enroll not found');

    return enroll;
  }

  async update(id: string, { status }: UpdateEnrollDto) {
    if (!id) throw new BadRequestException('Enroll ID is required');
    const data: Prisma.EnrollUpdateInput = {};

    const enrollExists = await this.prisma.enroll.findUnique({
      where: { id },
    });

    if (!enrollExists) throw new NotFoundException('Enroll not found');

    if (status) data.status = status;

    if (Object.keys(data).length === 0)
      throw new BadRequestException('No data to update');

    return await this.prisma.enroll.update({
      where: { id },
      data,
      include: {
        course: true,
        user: true,
      },
    });
  }

  async remove(id: string) {
    if (!id) throw new BadRequestException('Enroll ID is required');

    const enrollExists = await this.prisma.enroll.findUnique({
      where: { id },
    });

    if (!enrollExists) throw new NotFoundException('Enroll not found');

    return await this.prisma.enroll.delete({
      where: { id },
    });
  }
}
