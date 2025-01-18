import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from './config/config.module';
import { KnexModule } from './database/knex/knex.module';
import { ValkeyModule } from './database/valkey/valkey.module';

@Module({
  imports: [ConfigModule, KnexModule, ValkeyModule],
  controllers: [AppController]
})
export class AppModule {}
