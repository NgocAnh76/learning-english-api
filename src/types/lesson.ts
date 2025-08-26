import { IBaseEntity } from './general';

export interface ILesson extends IBaseEntity {
  title: string;
  content: string;
  courseId: string;
}
