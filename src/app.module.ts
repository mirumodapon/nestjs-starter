import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from './config/config.module';
import { KnexModule } from './database/knex/knex.module';

@Module({
  imports: [ConfigModule, KnexModule],
  controllers: [AppController]
})
export class AppModule {}
