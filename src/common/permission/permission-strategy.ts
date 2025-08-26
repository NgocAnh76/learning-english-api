import { BadRequestException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ERole } from '@prisma/client';
import { Request } from 'express';
import { Strategy } from 'passport-custom';
import { PrismaService } from 'src/prisma/prisma.service';
import { IUser } from 'src/types/user';

@Injectable()
export class CheckPermissionStrategy extends PassportStrategy(
  Strategy,
  'check-permission',
) {
  constructor(public prisma: PrismaService) {
    super();
  }

  validate(req: Request & { user: IUser }) {
    console.log(`PERMISSION- VALIDATE`);

    const user = req.user;

    if (user.role !== ERole.ADMIN) {
      throw new BadRequestException(
        `You do not have sufficient permission to use this resource (API).`,
      );
    }

    return user;
  }
}
