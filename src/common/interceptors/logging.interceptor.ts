import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HTTP');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const method = req.method;
    const url = req.url;
    const body = req.body;

    const now = Date.now();

    return next.handle().pipe(
      tap((response) => {
        const delay = Date.now() - now;
        this.logger.log(
          `${method} ${url} - ${delay}ms - body: ${JSON.stringify(
            body,
          )} - response: ${JSON.stringify(response)}`,
        );
      }),
    );
  }
}
