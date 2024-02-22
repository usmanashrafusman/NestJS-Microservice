import { HttpStatus } from '@nestjs/common';
import { IResponseMessage, IResponse } from 'src/common/config';

class SuccessfulResponse {
  private constructor() {}
  static send<T>(data: T, msg?: IResponseMessage | string): IResponse<T> {
    const success = true;
    const status = HttpStatus.OK;
    let message = null;

    if (msg) {
      if (typeof msg === 'string') {
        message = {
          code: 200,
          message: msg,
        };
      } else {
        message = msg;
      }
    }

    return {
      data,
      success,
      status,
      message,
    };
  }
}

export default SuccessfulResponse;
