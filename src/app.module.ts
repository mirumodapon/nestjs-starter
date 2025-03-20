import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './config/config.module';
import { KnexModule } from './database/knex/knex.module';
import { ValkeyModule } from './database/valkey/valkey.module';
import { PermissionModule } from './permission/permission.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [ConfigModule, KnexModule, ValkeyModule, UserModule, AuthModule, PermissionModule],
  controllers: [AppController]
})
export class AppModule {}
