import { EAvailableDay } from '@prisma/client';
import { IBaseEntity } from './general';

export interface IAvailableTime extends IBaseEntity {
  startTime: string;
  endTime: string;
  day: EAvailableDay;
  courseId: string;
}
