import joi from "joi";

// Tipo que representa datos parciales de actualización de una actividad
// Todos los campos son opcionales porque en un UPDATE puedes enviar solo lo que queremos cambiar
export type ReturnUpdateActivityData = Partial<{
  moduleId: number;
  title: string;
  type: "video" | "quiz" | "exercise";
  content?: string;
  order: number;
}>;

// Tipo que encapsula el resultado de la validación de Joi
type ValidationUpdateActivityData = {
  error?: joi.ValidationError;
  value: ReturnUpdateActivityData;
};

/**
 * Función interna que valida datos de actualización de actividad
 * A diferencia del CREATE, aquí NINGÚN campo es required, todos son opcionales
 * Pero debe enviarse al menos UN campo para actualizar
 *
 * @param data - Objeto con los datos a validar (normalmente req.body de un PATCH/PUT)
 * @returns Objeto con error (si existe) y value (datos normalizados)
 */
function validateUpdateActivityData(data: any): ValidationUpdateActivityData {
  const schema = joi
    .object({
      moduleId: joi.number().integer().positive().messages({
        "number.base": "El ID del módulo debe ser un número",
        "number.positive": "El ID del módulo debe ser positivo",
      }),

      title: joi.string().trim().min(3).messages({
        "string.min": "El título debe tener al menos 3 caracteres",
      }),

      type: joi.string().valid("video", "quiz", "exercise").messages({
        "any.only": "El tipo debe ser 'video', 'quiz' o 'exercise'",
      }),

      content: joi.string().trim().optional().allow("", null),

      order: joi.number().integer().min(0).messages({
        "number.min": "El orden no puede ser negativo",
      }),
    })
    // No permite campos adicionales
    .unknown(false)
    // Requiere que al menos UNO de estos campos esté presente, esto previene updates vacíos: PATCH /activities/1 con body {}
    .or("moduleId", "title", "type", "content", "order");

  // Ejecuta la validación
  // stripUnknown: true elimina campos desconocidos en lugar de fallar (redundante con unknown(false))
  const { error, value } = schema.validate(data, {
    abortEarly: false,
    stripUnknown: true,
  });
  return { error, value };
}

//Función pública que valida y carga datos de actualización de actividad
 
export const loadUpdateActivityData = (data: any): ReturnUpdateActivityData => {
  const result = validateUpdateActivityData(data);

  // Si Joi encontró errores
  if (result.error) {
    // Concatena todos los mensajes de error
    const message = result.error.details.map((d) => d.message).join("; ");
    // Lanza excepción para que el controller la maneje
    throw new Error(message);
  }

  // Retorna solo los campos enviados, ya validados
  return result.value;
};
