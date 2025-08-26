import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

interface IResponseSuccess<T> {
  data: T;
  statusCode: number;
  message: string;
}

const responseSuccess = <T>(
  data: T,
  statusCode = 200,
  message = 'Success',
): IResponseSuccess<T> => {
  return {
    statusCode,
    message,
    data,
  };
};

@Injectable()
export class ResponseSuccessInterceptor implements NestInterceptor {
  constructor(public reflector: Reflector) {}

  intercept<T>(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<IResponseSuccess<T>> {
    return next.handle().pipe(map((data) => responseSuccess(data)));
  }
}
