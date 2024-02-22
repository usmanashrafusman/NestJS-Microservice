import { Catch, RpcExceptionFilter, HttpStatus, Logger } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { RpcException } from '@nestjs/microservices';
import { ERROR_MESSAGES, ErrorType } from './index';

@Catch()
export class AllExceptionFilter implements RpcExceptionFilter<RpcException> {
  private readonly logger = new Logger('Exceptions', { timestamp: true });

  catch(exception: RpcException | Error): Observable<any> {
    this.logger.error(exception);

    let error: ErrorType = {
      code: HttpStatus.INTERNAL_SERVER_ERROR,
      message: ERROR_MESSAGES.UNKNOWN_ERROR,
    };

    if (exception instanceof RpcException) {
      error = exception.getError() as ErrorType;
    }
    return throwError(() => error);
  }
}
