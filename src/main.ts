import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { RedisStore } from 'connect-redis';
import * as session from 'express-session';
import { AppModule } from './app.module';
import { ValidationPipe } from './common/validation.pipe';
import { VALKEY_PROVIDER } from './database/valkey';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const valkeyProvider = app.get(VALKEY_PROVIDER);
  const port = configService.get('app.port');

  app.useGlobalPipes(ValidationPipe());
  app.use(session({
    ...configService.get('app.session'),
    store: new RedisStore({ client: valkeyProvider })
  }));

  await app.listen(port);
}
bootstrap();
