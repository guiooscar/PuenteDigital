import joi from "joi"; // importa joi que es una librería para la validación de esquemas

import "dotenv/config"; // carga las variables de entorno desde un archivo .env

// creamos un tipo para las variables de entorno que esperamos
export type ReturnEnvironmentVars = {
  PORT: number;
  DB_HOST: string;
  DB_PORT: number;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_NAME: string; 
};

// creamos un tipo para el resultado de la validación
type ValidationEnvironmentVars = {
  error?: joi.ValidationError;

  value: ReturnEnvironmentVars;
};
// Función para validar las variables de entorno usando joi 
function validateEnvVars(vars: NodeJS.ProcessEnv): ValidationEnvironmentVars {
  const envSchema = joi.object({
      PORT: joi.number().required(),
      DB_HOST: joi.string().required(),
      DB_PORT: joi.number().default(3306),
      DB_USER: joi.string().required(),
      DB_PASSWORD: joi.string().allow("").optional(),
      DB_NAME: joi.string().required(),
    })
    .unknown(true);
    const { error, value } = envSchema.validate(vars);
    return { error, value };
}

const loadEnvVars = (): ReturnEnvironmentVars => {
    // Validar las variables de entorno usando la función validateEnvVars
  const result = validateEnvVars(process.env);

  if (result.error) {
    throw new Error(
      `La validación de las variables de entorno falló: ${result.error.message}`
    );
  }

  const value = result.value;

  return {
    PORT: Number(value.PORT),
    DB_HOST: value.DB_HOST,
    DB_PORT: value.DB_PORT,
    DB_USER: value.DB_USER,
    DB_PASSWORD: value.DB_PASSWORD,
    DB_NAME: value.DB_NAME,
  };
};

const envs = loadEnvVars();

export default envs;
