import * as env from 'env-var';

import dotenv = require('dotenv');
dotenv.config();

export default Object.freeze({
  APP_PORT: env.get('APP_PORT').default(3000).asInt(),
  EMAIL_ID: env.get('EMAIL_ID').required().asString(),
  EMAIL_PORT: env.get('EMAIL_PORT').required().asInt(),
  EMAIL_PASS: env.get('EMAIL_PASS').required().asString(),
  EMAIL_HOST: env.get('EMAIL_HOST').required().asString(),
  NATS_URL: env.get('NATS_URL').required().asString(),
  JWT_SECRET: env.get('JWT_SECRET').required().asString(),
  ECRYPTED_SECRET: env.get('ECRYPTED_SECRET').required().asString(),
  JWT_EXPIRES_IN: env.get('JWT_EXPIRES_IN').default('3d').asString(),
  NATS_SERVICE: 'NATS_SERVICE',
});
