import { registerAs } from '@nestjs/config';

export default [
  registerAs('app', () => {
    return {
      port: process.env.PORT || 3000,
      version: process.env.npm_package_version,

      session: {
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
          secure: false,
          maxAge: 24 * 60 * 60 * 1000
        }
      }
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
      },
      valkey: {
        socket: process.env.VALKEY_SOCKET,
        host: process.env.VALKEY_HOST,
        port: process.env.VALKEY_PORT,
        username: process.env.VALKEY_USER,
        password: process.env.VALKEY_PASSWORD,
        db: process.env.VALKEY_DATABASE
      }
    };
  }),
  registerAs('google-oauth', () => {
    return {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      scope: process.env.GOOGLE_OAUTH_SCOPE.split(',')
    };
  })
];
