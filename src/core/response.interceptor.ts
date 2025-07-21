import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  SetMetadata,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

import { Response as ExpressResponse } from 'express';
import { Reflector } from '@nestjs/core';

export const SKIP_INTERCEPTOR_KEY = 'skipInterceptor';
export const SkipInterceptor = () => SetMetadata(SKIP_INTERCEPTOR_KEY, true);

export interface Response<T> {
  statusCode: number;
  message: string;
  data: {
    headers: any;
  };
}

export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  constructor(private readonly reflector: Reflector) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const nextDone = next.handle().pipe(
      map((data) => {
        const skip = this.reflector.get<boolean>(
          SKIP_INTERCEPTOR_KEY,
          context.getHandler(),
        );

        if (skip) {
          return next.handle();
        }

        const response: ExpressResponse = context.switchToHttp().getResponse();

        const responseData = {
          statusCode: response.statusCode,
          message: data?.message || 'success',
          meta: data?.meta,
        };

        delete data?.message;
        delete data?.meta;
        delete data?.headers;

        responseData['data'] = data;

        return responseData;
      }),
    );

    return nextDone;
  }
}
