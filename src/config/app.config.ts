import * as env from 'env-var';

import dotenv = require('dotenv');
dotenv.config();

export default Object.freeze({
  APP_PORT: env.get('APP_PORT').default(3000).asInt(),
  NATS_URL: env.get('NATS_URL').required().asString(),
  NATS_CA: env.get('NATS_CA').required().asString(),
  NATS_KEY: env.get('NATS_KEY').required().asString(),
  NATS_CERT: env.get('NATS_CERT').required().asString(),
  APP_NAME: env.get('APP_NAME').default('notification-service').asString(),
  LOKI_HOST: env.get('LOKI_HOST').required().asString(),
  LOKI_USERNAME: env.get('LOKI_USERNAME').default('').asString(),
  LOKI_PASSWORD: env.get('LOKI_PASSWORD').default('').asString(),
  OTLP_HTTP_URL: env.get('OTLP_HTTP_URL').asString(),
  EMAIL_ID: env.get('EMAIL_ID').required().asString(),
  EMAIL_PORT: env.get('EMAIL_PORT').required().asInt(),
  EMAIL_PASS: env.get('EMAIL_PASS').required().asString(),
  EMAIL_HOST: env.get('EMAIL_HOST').required().asString(),
  NATS_SERVICE: 'NATS_SERVICE',
});
