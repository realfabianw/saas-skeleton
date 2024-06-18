import Joi from 'joi';

export const envValidationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test', 'provision')
    .default('development'),
  PORT: Joi.number().port().default(3001),

  CLERK_SESSION_COOKIE_NAME: Joi.string().default('__session'),
  CLERK_PUBLIC_KEY: Joi.string().required(),
  CLERK_ISSUER_URL: Joi.string().uri().required(),
  CLERK_WEBHOOK_SECRET: Joi.string().required(),
});
