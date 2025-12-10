import joi from "joi";

// Tipo que define la estructura de datos permitidos para un usuario
// level no lo incluimos porque se asigna automaticamente
export type ReturnUserData = {
  name: string;
  email: string;
  password: string;
};

// Tipo para manejar el resultado de la validación
type ValidationUserData = {
  error: joi.ValidationError | undefined;
  value: ReturnUserData;
};

function validateUserData(data: any): ValidationUserData {
  // Esquema de validación para los datos del usuario
  const userSchema = joi.object({
    name: joi
      .string()          // Debe ser texto
      .trim()            // Quita espacios al inicio y final
      .min(3)            // Mínimo 3 caracteres
      .pattern(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/) // Solo letras y espacios
      .required()        // Obligatorio
      .messages({
        "string.base": "El nombre debe ser un texto",
        "string.empty": "El nombre es requerido",
        "string.min": "El nombre debe tener al menos 3 caracteres",
        "string.pattern.base": "El nombre solo puede contener letras y espacios",
      }),

    email: joi
      .string()
      .email({ tlds: { allow: false } }) // Valida formato de email
      .required()
      .messages({
        "string.email": "Correo electrónico no válido",
        "string.empty": "El correo es requerido",
      }),

    password: joi
      .string()
      .min(6)                           
      .pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/) 
      .required()
      .messages({
        "string.min": "La contraseña debe tener al menos 6 caracteres",
        "string.pattern.base": "La contraseña debe tener letras y números",
        "string.empty": "La contraseña es requerida",
      }),
  }).unknown(false); // No permite campos adicionales

  // Valida los datos y retorna error o valor según corresponda
  const { error, value } = userSchema.validate(data, { abortEarly: false });
  return { error, value };
}

export const loadUserData = (data: any): ReturnUserData => {
  // Ejecuta la validación
  const result = validateUserData(data);

  // Si hay errores, los concatena y lanza una excepción
  if (result.error) {
    const message = result.error.details.map((d) => d.message).join("; ");
    throw new Error(message);
  }

  // Si todo está bien, retorna los datos validados
  return result.value;
};
