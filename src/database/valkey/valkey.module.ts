import { Module } from '@nestjs/common';
import { ValkeyProvider } from './valkey.provider';

@Module({
  providers: [ValkeyProvider],
  exports: [ValkeyProvider]
})
export class ValkeyModule {}
