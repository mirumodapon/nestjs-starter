import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { knex } from 'knex';

export const Knex: Provider = {
  provide: 'KnexProvider',
  useFactory: (configService: ConfigService) => {
    return knex(configService.get('database.knex'));
  },
  inject: [ConfigService]
};
