import joi from "joi";

// Tipo que representa los datos validados de una actividad
export type ReturnActivityData = {
  moduleId: number;
  title: string;
  type: "video" | "quiz" | "exercise";
  content?: string;
  order: number;
};

// Tipo que encapsula el resultado de la validación de Joi
type ValidationActivityData = {
  error?: joi.ValidationError;
  value: ReturnActivityData;
};

//Función interna que valida los datos de una actividad contra el esquema Joi

function validateActivityData(data: any): ValidationActivityData {
  const schema = joi
    .object({
      moduleId: joi.number().integer().positive().required().messages({
        "number.base": "El ID del módulo debe ser un número",
        "number.positive": "El ID del módulo debe ser positivo",
      }),

      // Validación del título de la actividad

      title: joi.string().trim().min(3).required().messages({
        "string.min": "El título debe tener al menos 3 caracteres",
        "string.empty": "El título es requerido",
      }),

      // Validación del tipo de actividad - Solo acepta los valores: 'video', 'quiz' o 'exercise'

      type: joi
        .string()
        .valid("video", "quiz", "exercise")
        .required()
        .messages({
          "any.only": "El tipo debe ser 'video', 'quiz' o 'exercise'",
        }),

      // Validación del contenido (opcional), Puede ser string vacío, null o undefined
      content: joi.string().trim().optional().allow("", null),

      // Validación del orden de la actividad en el módulo - Debe ser número entero >= 0

      order: joi.number().integer().min(0).required().messages({
        "number.min": "El orden no puede ser negativo",
      }),
    })
    // No permite campos adicionales fuera de los definidos
    .unknown(false);

  // Ejecuta la validación acumulando todos los errores
  const { error, value } = schema.validate(data, { abortEarly: false });
  return { error, value };
}

//Función pública que valida y carga los datos de una actividad

export const loadActivityData = (data: any): ReturnActivityData => {
  const result = validateActivityData(data);

  // Si Joi encontró errores
  if (result.error) {
    const message = result.error.details.map((d) => d.message).join("; ");

    throw new Error(message);
  }

  // Retorna los datos ya validados y normalizados por Joi
  return result.value;
};
