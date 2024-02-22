import { ERROR_MESSAGES } from "../exceptions";

interface IResponseMessage {
  code: number;
  message: string;
}
interface IResponseData<T> {
  entity?: T;
  entities?: T;
}

export interface IResponse<T> {
  data: IResponseData<T> | null;
  success: boolean;
  status: HttpStatus;
  message: IResponseMessage | null;
  error?: {
    code?: number;
    message: ERROR_MESSAGES;
  };
}
