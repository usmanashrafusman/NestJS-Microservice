import {
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { IResponse } from 'src/common/config';
import { ERROR_MESSAGES } from '.';

@Catch()
export default class AllExceptionsFilter extends BaseExceptionFilter {
  private readonly logger = new Logger('Exception', { timestamp: true });
  catch(exception: any, host: ArgumentsHost) {
    try {
      this.logger.error(exception);

      const isHttpException = exception instanceof HttpException;
      const status = isHttpException
        ? exception?.getStatus()
        : exception?.code || HttpStatus.INTERNAL_SERVER_ERROR;

      const error = {
        code: exception?.code || status,
        message: exception?.message || ERROR_MESSAGES.AN_UNKNOWN_ERROR_OCCURRED,
      };

      if (isHttpException) {
        const resp = exception.getResponse() as { message: ERROR_MESSAGES };
        if (resp.message) {
          error.message = resp.message;
        }
      }

      if (Array.isArray(error.message)) {
        error.message = error.message[0];
      }

      const ctx = host.switchToHttp();
      const { httpAdapter } = this.httpAdapterHost;

      const response: IResponse<null> = {
        status,
        message: null,
        success: false,
        data: null,
        error,
      };
      httpAdapter.reply(ctx.getResponse(), response, status);
    } catch (error) {
      console.log(error, 'ERROR INSIDE CATCH');
    }
  }
}
