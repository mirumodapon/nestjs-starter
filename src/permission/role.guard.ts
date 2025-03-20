import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Enforcer } from 'casbin';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { ENFORCER_PROVIDER } from './permission.constants';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(@Inject(ENFORCER_PROVIDER) private readonly enforcer: Enforcer) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    const session = request.session as any;
    const user = session.user as any;

    if (!user)
      throw new UnauthorizedException();

    const role = user.role;
    const { path, method } = request;

    return this.enforcer.enforce(role, path, method);
  }
}
