import { Global, Module } from '@nestjs/common';
import { Knex } from './knex';

@Global()
@Module({
  providers: [Knex],
  exports: [Knex]
})
export class KnexModule {}
