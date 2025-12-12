import joi from "joi";

export type ReturnAuthData = {
  email: string;
  password: string;
};

type ValidationAuthData = {
  error?: joi.ValidationError;
  value: ReturnAuthData;
};

function validateAuthData(data: any): ValidationAuthData {
  const schema = joi.object({
    email: joi
      .string()
      .email({ tlds: { allow: false } })
      .required()
      .messages({
        "string.email": "Correo electrónico no válido",
        "string.empty": "El correo es requerido",
      }),
    password: joi
      .string()
      .min(6)
      .required()
      .messages({
        "string.min": "La contraseña debe tener al menos 6 caracteres",
        "string.empty": "La contraseña es requerida",
      }),
  }).unknown(false);

  const { error, value } = schema.validate(data, { abortEarly: false });
  return { error, value };
}

export const loadAuthData = (data: any): ReturnAuthData => {
  const result = validateAuthData(data);
  if (result.error) {
    const message = result.error.details.map(d => d.message).join("; ");
    throw new Error(message);
  }
  return result.value;
};