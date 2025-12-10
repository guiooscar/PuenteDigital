import joi from "joi";

// Tipo que representa la estructura esperada: solo un email válido
export type ReturnEmail = {
  email: string;
};

// Resultado de la validación (valor válido o error)
type ValidationEmail = {
  error: joi.ValidationError | undefined;
  value: ReturnEmail;
};

function validateEmail(data: any): ValidationEmail {
  // Esquema para validar únicamente el correo electrónico
  const emailSchema = joi.object({
    email: joi
      .string()
      .email({ tlds: { allow: false } }) // Verifica que tenga formato de correo válido
      .required()                        
      .messages({
        "string.email": "Correo electrónico no válido",
        "string.empty": "El correo es requerido",
      }),
  }).unknown(false);                     // No permite campos adicionales

  // Ejecuta la validación
  const { error, value } = emailSchema.validate(data, { abortEarly: false });
  return { error, value };
}

export const loadEmail = (data: any): ReturnEmail => {
  // Valida los datos recibidos
  const result = validateEmail(data);

  // Si hay errores, los une en un solo mensaje y lanza una excepción
  if (result.error) {
    const message = result.error.details.map((d) => d.message).join(", ");
    throw new Error(message);
  }

  // Devuelve únicamente el email ya validado
  return result.value;
};
