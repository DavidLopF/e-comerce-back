import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Request, Response } from 'express';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HTTP');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const { method, url, body, query, params } = request;
    const userAgent = request.get('User-Agent') || '';
    const ip = request.ip;

    const now = Date.now();

    // Log de la petición entrante
    this.logger.log(
      `🚀 ${method} ${url} - ${userAgent} ${ip} - Body: ${JSON.stringify(body)} - Query: ${JSON.stringify(query)} - Params: ${JSON.stringify(params)}`
    );

    return next.handle().pipe(
      tap(() => {
        const { statusCode } = response;
        const contentLength = response.get('content-length');
        const responseTime = Date.now() - now;

        // Log de la respuesta
        this.logger.log(
          `✅ ${method} ${url} ${statusCode} ${contentLength} - ${responseTime}ms`
        );
      }),
    );
  }
}
