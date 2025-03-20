import { join } from 'node:path';
import { Provider } from '@nestjs/common';
import { newEnforcer } from 'casbin';
import { KnexAdapter } from 'casbin-knex-adapter';
import { KNEX_PROVIDER } from 'src/database/knex';
import { ENFORCER_PROVIDER } from './permission.constants';

export const EnforcerProvider: Provider = {
  provide: ENFORCER_PROVIDER,
  useFactory: async (knex) => {
    const modelPath = join(process.cwd(), 'enforcer-model.conf');
    const adapter = await KnexAdapter.newAdapter(knex);
    const enforcer = await newEnforcer(modelPath, adapter);

    return enforcer;
  },
  inject: [KNEX_PROVIDER]
};
