import { RpcException } from '@nestjs/microservices';
import { EXCEPTIONS, ERROR_MESSAGES, ErrorType } from '.';
import { HttpStatus } from '@nestjs/common';

export class BadRequestException extends RpcException {
  constructor(message?: ERROR_MESSAGES) {
    const error: ErrorType = {
      code: HttpStatus.BAD_REQUEST,
      message: message || EXCEPTIONS.BAD_REQUEST,
    };
    super(error);
  }
}
