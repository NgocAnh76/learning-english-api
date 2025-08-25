import {
  BadRequestException,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from '../common/decorators/is-public.decorator';
import { SKIP_PERMISSION } from '../common/decorators/skip-permission.decorator';

@Injectable()
export class PermissionCheck extends AuthGuard('check-permission') {
  constructor(private reflector: Reflector) {
    super();
  }
  canActivate(context: ExecutionContext) {
    console.log(`PERMISSION-CAN_ACTIVE`);
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const skipPermission = this.reflector.getAllAndOverride<boolean>(
      SKIP_PERMISSION,
      [context.getHandler(), context.getClass()],
    );
    if (skipPermission) {
      return true;
    }
    return super.canActivate(context);
  }

  handleRequest<TUser>(err: unknown, user: TUser): TUser {
    console.log(`PERMISSION-HANDLE_REQUEST`);
    if (err || !user) {
      if (err instanceof Error) {
        throw err;
      }
      throw new BadRequestException('Permission denied');
    }
    return user;
  }
}
