import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCertificationDto } from './dto/create-certification.dto';
import { UpdateCertificationDto } from './dto/update-certification.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class CertificationsService {
  constructor(private readonly prisma: PrismaService) {}

  async create({ name }: CreateCertificationDto) {
    const certificationExists = await this.prisma.certification.findFirst({
      where: { name },
    });
    if (certificationExists)
      throw new BadRequestException('Certification already exists');

    return this.prisma.certification.create({
      include: {
        users: true,
      },
      data: { name },
    });
  }

  async findAll() {
    return this.prisma.certification.findMany({
      include: {
        users: true,
      },
    });
  }

  async findOne(id: string) {
    if (!id) throw new BadRequestException('Certification ID is required');

    const certification = await this.prisma.certification.findUnique({
      where: { id },
      include: {
        users: true,
      },
    });
    if (!certification) throw new NotFoundException('Certification not found');

    return certification;
  }

  async update(id: string, { name }: UpdateCertificationDto) {
    if (!id) throw new BadRequestException('Certification ID is required');
    const data: Prisma.CertificationUpdateInput = {};

    const certificationExists = await this.prisma.certification.findFirst({
      where: { name },
    });
    if (!certificationExists)
      throw new NotFoundException('Certification not found');
    if (name) data.name = name;

    const certification = await this.prisma.certification.update({
      where: { id },
      data,
      include: {
        users: true,
      },
    });
    return certification;
  }

  async remove(id: string) {
    if (!id) throw new BadRequestException('Certification ID is required');

    const certification = await this.prisma.certification.findUnique({
      where: { id },
    });
    if (!certification) throw new NotFoundException('Certification not found');

    return this.prisma.certification.delete({
      where: { id },
    });
  }
}
