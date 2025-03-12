import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import IoValkey from 'iovalkey';
import { VALKEY_PROVIDER } from './valkey.constants';

export const ValkeyProvider: Provider = {
  provide: VALKEY_PROVIDER,
  useFactory: (configService: ConfigService) => {
    const { socket, ...options } = configService.get('database.valkey');
    return new IoValkey(socket ?? options);
  },
  inject: [ConfigService]
};
