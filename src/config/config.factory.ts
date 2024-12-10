import { registerAs } from '@nestjs/config';

export default [
  registerAs('app', () => {
    return {
      port: process.env.PORT || 3000,
      version: process.env.npm_package_version
    };
  })
];
