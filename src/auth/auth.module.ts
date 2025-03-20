import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { GoogleProvider } from './provider';

@Module({
  controllers: [AuthController],
  providers: [GoogleProvider],
  imports: [UserModule]
})
export class AuthModule {}
