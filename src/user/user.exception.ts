import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class UserException implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      return response
        .status(status)
        .json({
          statusCode: status,
          message: exception.message
        });
    }

    switch (exception.code) {
      case '23505': // PostgreSQL
      case 'ER_DUP_ENTRY': // MySQL
      case 'SQLITE_CONSTRAINT': // SQLite
        return response.status(400).json({
          statusCode: 400,
          message: '[Duplicate entry] User exists'
        });
    }
  }
}
