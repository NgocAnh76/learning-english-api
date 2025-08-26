import {
  BadRequestException,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JsonWebTokenError, TokenExpiredError } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from 'src/common/decorators/is-public.decorator';

@Injectable()
export class TokenCheck extends AuthGuard('check-token') {
  constructor(private reflector: Reflector) {
    super();
  }
  canActivate(context: ExecutionContext) {
    console.log(`CHECKTOKEN-CAN_ACTIVE`);
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    return super.canActivate(context);
  }

  handleRequest<TUser>(err: unknown, user: TUser, info: unknown) {
    console.log(`TOKEN-HANDLE_REQUEST`);
    if (err || !user) {
      if (info instanceof TokenExpiredError) {
        throw new ForbiddenException(info.message);
      }
      if (info instanceof JsonWebTokenError) {
        throw new UnauthorizedException(info.message);
      }
      if (info instanceof Error) {
        throw new BadRequestException(info.message);
      }
      if (err instanceof Error) {
        throw err;
      }
      throw new BadRequestException('Unauthorized');
    }
    return user;
  }
}
