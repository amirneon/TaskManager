import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { QueryFailedError } from "typeorm";

@Catch(QueryFailedError)
export class DuplicateEntryFilter implements ExceptionFilter {
  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    const statusCode = HttpStatus.BAD_REQUEST;
    const message = exception.message.includes("Duplicate entry")
      ? "Nickname or Email or PhoneNumber already exists."
      : "Database operation failed.";

    response.status(statusCode).json({
      statusCode,
      message,
    });
  }
}
