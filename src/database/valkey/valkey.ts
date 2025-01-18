import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import IoValkey from 'iovalkey';

export const Valkey: Provider = {
  provide: 'ValkeyProvider',
  useFactory: (configService: ConfigService) => {
    const { socket, ...options } = configService.get('database.valkey');
    return new IoValkey(socket ?? options);
  },
  inject: [ConfigService]
};
