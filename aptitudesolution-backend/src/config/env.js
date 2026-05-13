const Joi = require("joi");
require("dotenv").config();

const envSchema = Joi.object({
  NODE_ENV: Joi.string().valid("development", "production", "test").default("development"),
  PORT: Joi.number().default(3000),
  DATABASE_URL: Joi.string().required().description("Database connection string"),
  JWT_SECRET: Joi.string().required().description("JWT Secret Key"),
  JWT_EXPIRES_IN: Joi.string().default("7d"),
  ALLOWED_ORIGINS: Joi.string().default("*"),
})
  .unknown()
  .required();

const { value: envVars, error } = envSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  dbUrl: envVars.DATABASE_URL,
  jwt: {
    secret: envVars.JWT_SECRET,
    expiresIn: envVars.JWT_EXPIRES_IN,
  },
  cors: {
    origins: envVars.ALLOWED_ORIGINS.split(","),
  },
};
