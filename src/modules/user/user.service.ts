import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ERole, EStatus, EUserType, Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { omit } from 'lodash';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  async create({
    name,
    email,
    password,
    role = ERole.USER,
    type = EUserType.STUDENT,
    status = EStatus.ACTIVE,
    courses,
    description,
    country,
    gender,
    certifications,
  }: CreateUserDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (user) throw new BadRequestException('Email already exists');

    const hashedPassword = await bcrypt.hash(password, 10);

    return this.prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
        type,
        status,
        description,
        country,
        courses: {
          connect: courses?.map((course) => ({
            id: course,
          })),
        },
        gender,
        certifications: {
          connectOrCreate: certifications?.map((certification) => ({
            where: { name: certification },
            create: { name: certification },
          })),
        },
      },
      include: {
        courses: true,
        certifications: true,
      },
    });
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(id: string) {
    if (!id) throw new BadRequestException('Id is required');

    return this.prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        courses: true,
        certifications: true,
      },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const data: Prisma.UserUpdateInput = {};

    if (!id) throw new BadRequestException('Id is required');

    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) throw new NotFoundException('User not found');

    if (updateUserDto.name) data.name = updateUserDto.name;

    if (updateUserDto.email) data.email = updateUserDto.email;

    if (updateUserDto.role) data.role = updateUserDto.role;

    if (updateUserDto.type) data.type = updateUserDto.type;

    if (updateUserDto.password) {
      const hashedPassword = await bcrypt.hash(updateUserDto.password, 10);
      data.password = hashedPassword;
    }

    if (updateUserDto.status) data.status = updateUserDto.status;

    if (updateUserDto.description) data.description = updateUserDto.description;

    if (updateUserDto.country) data.country = updateUserDto.country;

    if (updateUserDto.courses) {
      data.courses = {
        connect: updateUserDto.courses.map((course) => ({
          id: course,
        })),
      };
    }

    if (updateUserDto.gender) data.gender = updateUserDto.gender;

    if (updateUserDto.certifications) {
      data.certifications = {
        connectOrCreate: updateUserDto.certifications.map((certification) => ({
          where: { name: certification },
          create: { name: certification },
        })),
      };
    }

    const updatedUser = await this.prisma.user.update({
      where: {
        id,
      },
      data,
    });

    return omit(updatedUser, ['password']);
  }

  async remove(id: string) {
    if (!id) throw new BadRequestException('Id is required');

    const deletedUser = await this.prisma.user.delete({
      where: {
        id,
      },
    });

    return deletedUser;
  }
}
