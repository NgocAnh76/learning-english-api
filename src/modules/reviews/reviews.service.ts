import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { IUser } from 'src/types/user';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ReviewsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    { courseId, rating, comment }: CreateReviewDto,
    currentUser: IUser,
  ) {
    const userId = currentUser.id;

    const userExists = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!userExists) throw new NotFoundException('User not found');

    const courseExists = await this.prisma.course.findUnique({
      where: { id: courseId },
    });

    if (!courseExists) throw new NotFoundException('Course not found');

    return await this.prisma.review.create({
      data: {
        userId,
        courseId,
        rating,
        comment,
      },
      include: {
        user: true,
        course: true,
      },
    });
  }

  async findAll() {
    return await this.prisma.review.findMany({
      include: {
        user: true,
        course: true,
      },
    });
  }

  async findOne(id: string) {
    if (!id) throw new BadRequestException('Review ID is required');

    const review = await this.prisma.review.findUnique({
      where: { id },
      include: {
        user: true,
        course: true,
      },
    });

    if (!review) throw new NotFoundException('Review not found');

    return review;
  }

  async update(id: string, updateReviewDto: UpdateReviewDto) {
    if (!id) throw new BadRequestException('Review ID is required');
    const data: Prisma.ReviewUpdateInput = {};

    const reviewExists = await this.prisma.review.findUnique({
      where: { id },
    });

    if (!reviewExists) throw new NotFoundException('Review not found');

    if (updateReviewDto.rating) data.rating = updateReviewDto.rating;
    if (updateReviewDto.comment) data.comment = updateReviewDto.comment;

    if (Object.keys(data).length === 0)
      throw new BadRequestException('No data to update');

    return await this.prisma.review.update({
      where: { id },
      data,
      include: {
        user: true,
        course: true,
      },
    });
  }

  async remove(id: string) {
    if (!id) throw new BadRequestException('Review ID is required');

    const reviewExists = await this.prisma.review.findUnique({
      where: { id },
    });

    if (!reviewExists) throw new NotFoundException('Review not found');

    return await this.prisma.review.delete({
      where: { id },
    });
  }
}
