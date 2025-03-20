import { Global, Module } from '@nestjs/common';
import { EnforcerProvider } from './enforcer.provider';
import { PermissionController } from './permission.controller';
import { PermissionService } from './permission.service';

@Global()
@Module({
  providers: [EnforcerProvider, PermissionService],
  exports: [EnforcerProvider],
  controllers: [PermissionController]

})
export class PermissionModule {}
