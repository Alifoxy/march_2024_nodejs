import * as process from 'node:process';

export default (): {
  app: { port: number; host: string };
  database: {
    password: string;
    port: number;
    host: string;
    name: string;
    user: string;
  };
  jwt: {
    accessExpiresIn: number;
    refreshSecret: string;
    accessSecret: string;
    refreshExpiresIn: number;
  };
  aws: {
    bucketName: string;
    endpoint: string;
    secretKey: string;
    accessKey: string;
    ACL: string;
    region: string;
  };
  redis: { password: string; port: number; host: string };
  sentry: { debug: boolean; env: string; dsn: string };
} => ({
  app: {
    port: parseInt(process.env.APP_PORT, 10) || 3000,
    host: process.env.APP_HOST,
  },
  database: {
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    name: process.env.POSTGRES_DB,
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT, 10) || 6379,
    password: process.env.REDIS_PASSWORD,
  },
  aws: {
    accessKey: process.env.AWS_ACCESS_KEY,
    secretKey: process.env.AWS_SECRET_KEY,
    bucketName: process.env.AWS_S3_BUCKET_NAME,
    region: process.env.AWS_S3_REGION,
    ACL: process.env.AWS_S3_ACL,
    endpoint: process.env.AWS_S3_ENDPOINT,
  },
  sentry: {
    dsn: process.env.SENTRY_DSN,
    env: process.env.SENTRY_ENV,
    debug: process.env.SENTRY_DEBUG === 'true',
  },
  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET,
    accessExpiresIn: parseInt(process.env.JWT_ACCESS_EXPIRES_IN, 10) || 3600,
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    refreshExpiresIn: parseInt(process.env.JWT_REFRESH_EXPIRES_IN, 10) || 86400,
  },
});
