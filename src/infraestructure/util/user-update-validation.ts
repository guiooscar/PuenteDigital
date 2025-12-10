import joi from "joi";

// Tipo que representa los datos que se pueden actualizar (todos opcionales)
export type ReturnUpdateUserData = Partial<{
  name: string;
  email: string;
  password: string;
}>;

// Resultado del proceso de validación
type ValidationUpdateUserData = {
  error: joi.ValidationError | undefined;
  value: ReturnUpdateUserData;
};

function validateUpdateUserData(data: any): ValidationUpdateUserData {
  // Esquema que valida los campos permitidos para actualizar un usuario
  const schema = joi
    .object({
      name: joi
        .string()
        .trim()
        .min(3)                                
        .pattern(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/)   
        .messages({
          "string.min": "El nombre debe tener al menos 3 caracteres",
          "string.pattern.base": "El nombre solo puede contener letras y espacios",
        }),

      email: joi
        .string()
        .trim()
        .email({ tlds: { allow: false } })     // Valida formato de correo
        .messages({
          "string.email": "Correo electrónico no válido",
        }),

      password: joi
        .string()
        .min(6)                                
        .pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/) 
        .messages({
          "string.min": "La contraseña debe tener al menos 6 caracteres",
          "string.pattern.base": "La contraseña debe tener letras y números",
        }),
    })
    .unknown(false)                             // No permite campos extra
    .or("name", "email", "password");           // Exige al menos un campo a actualizar

  // Ejecuta la validación
  const { error, value } = schema.validate(data, {
    abortEarly: false,                          // Muestra todos los errores a la vez
    stripUnknown: true,                         // Quita campos no permitidos
  });

  return { error, value };
}

export const loadUpdateUserData = (data: any): ReturnUpdateUserData => {
  // Llama al validador
  const result = validateUpdateUserData(data);

  // Si hay errores, los une en un solo mensaje
  if (result.error) {
    const message = result.error.details.map((d) => d.message).join(", ");
    throw new Error(message);
  }

  // Devuelve solo los campos válidos
  return result.value;
};
