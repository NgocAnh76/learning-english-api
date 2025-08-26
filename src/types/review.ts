import { BaseEntityDto } from 'src/common/dto/utils.dto';

export interface IReview extends BaseEntityDto {
  userId: string;
  courseId: string;
  rating: number;
  comment: string;
}
