import * as Joi from 'joi';

export const ValidationSchema = Joi.object({
  PORT: Joi.number().default(4031),

  DB_PORT: Joi.number().default(1433),
  DB_HOST: Joi.required(),
  DB_PASS: Joi.required(),
  DB_USER: Joi.required(),
  DB: Joi.required(),

  DBC_PORT: Joi.number().default(1433),
  DBC_HOST: Joi.required(),
  DBC_PASS: Joi.required(),
  DBC_USER: Joi.required(),
  DBC: Joi.required(),
});

export default ValidationSchema;