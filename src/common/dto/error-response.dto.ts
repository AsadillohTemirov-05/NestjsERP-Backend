import { ErrorCode } from '../constants/error-codes.enum';

export class ErrorResponseDto {
  error_code: ErrorCode;
  message: string;
  field?: string;
}
