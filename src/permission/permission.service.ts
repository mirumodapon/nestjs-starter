import { Inject, Injectable } from '@nestjs/common';
import { Enforcer } from 'casbin';
import { CreatePolicyDto, DeletePolicyDto } from './dto';
import { ENFORCER_PROVIDER } from './permission.constants';

@Injectable()
export class PermissionService {
  constructor(@Inject(ENFORCER_PROVIDER)private readonly enforcer: Enforcer) {}

  listPolicy() {
    return this.enforcer.getPolicy();
  }

  createPolicy({ policies }: CreatePolicyDto) {
    const payload = policies.map(({ role, resource, method }) => [role, resource, method]);
    return this.enforcer.addPolicies(payload);
  }

  deletePolicy({ policies }: DeletePolicyDto) {
    const payload = policies.map(({ role, resource, method }) => [role, resource, method]);
    return this.enforcer.removePolicies(payload);
  }
}
