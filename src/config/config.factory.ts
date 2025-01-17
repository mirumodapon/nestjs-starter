import { registerAs } from '@nestjs/config';

export default [
  registerAs('app', () => {
    return {
      port: process.env.PORT || 3000,
      version: process.env.npm_package_version
    };
  }),
  registerAs('database', () => {
    return {
      knex: {
        client: 'mysql2',
        debug: process.env.NODE_ENV === 'development',
        connection: {
          host: process.env.MYSQL_HOST,
          port: process.env.MYSQL_PORT,
          user: process.env.MYSQL_USER,
          password: process.env.MYSQL_PASSWORD,
          database: process.env.MYSQL_DATABASE
        },
        pool: { min: 0, max: 5 }
      }
    };
  })
];
