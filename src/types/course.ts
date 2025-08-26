import { EStatus } from '@prisma/client';
import { IAvailableTime } from './available-time';
import { IBaseEntity } from './general';
import { ILesson } from './lesson';

export interface ICourse extends IBaseEntity {
  name: string;
  description: string;
  tags?: string[];
  availableTimes?: IAvailableTime[];
  topics?: string[];
  status?: EStatus;
  enrolls?: string[];
  lessons?: ILesson[];
  reviews?: string[];
}
