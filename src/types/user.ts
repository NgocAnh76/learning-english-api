import { EGender, ERole, EStatus, EUserType } from '@prisma/client';
import { IBaseEntity } from './general';

export interface IUser extends IBaseEntity {
  name: string;
  email: string;
  password: string;
  role?: ERole;
  type?: EUserType;
  status: EStatus;
  courses?: string[];
  description?: string;
  country?: string;
  gender: EGender;
  certifications?: string[];
}
