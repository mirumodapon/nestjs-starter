import { ValidationPipe, ValidationPipeOptions } from '@nestjs/common';

function _ValidationPipe(options: ValidationPipeOptions = {}) {
  return new ValidationPipe({
    whitelist: true,
    transform: true,
    ...options
  });
}

export { _ValidationPipe as ValidationPipe };
