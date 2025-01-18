import { Module } from '@nestjs/common';
import { Valkey } from './valkey';

@Module({
  providers: [Valkey],
  exports: [Valkey]
})
export class ValkeyModule {}
