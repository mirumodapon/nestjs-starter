import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';

@Injectable()
export class GoogleProvider extends PassportStrategy(Strategy, 'google') {
  constructor(private configService: ConfigService) {
    const config = configService.get('google-oauth');
    super(config);
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
    done(null, profile);
  }
}
