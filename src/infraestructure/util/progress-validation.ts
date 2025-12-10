import joi from "joi";

// Tipo que representa los datos validados de progreso
// lastAttemptDate se valida como string ISO y luego se convierte a Date en la aplicación
export type ReturnProgressData = {
  userId: number;
  activityId: number;
  completed: boolean;
  score: number;
  attempts: number;
  lastAttemptDate?: string; // String ISO que luego se convierte a Date
};

// Tipo que encapsula el resultado de la validación de Joi
type ValidationProgressData = {
  error?: joi.ValidationError;
  value: ReturnProgressData;
};

/**
 * Función interna que valida los datos de progreso de un usuario en una actividad
 * 
 * Reglas de negocio:
 * - El usuario y la actividad deben ser IDs válidos (enteros positivos)
 * - El puntaje debe estar entre 0 y 100
 * - Los intentos deben ser al menos 1
 * - La fecha del último intento es opcional pero si se envía debe ser ISO 8601
 */
function validateProgressData(data: any): ValidationProgressData { 
  const schema = joi.object({
    
    userId: joi.number().integer().positive().required().messages({
      "number.base": "El ID de usuario debe ser un número",
      "number.positive": "El ID de usuario debe ser positivo",
    }),

    
    activityId: joi.number().integer().positive().required().messages({
      "number.base": "El ID de actividad debe ser un número",
      "number.positive": "El ID de actividad debe ser positivo",
    }),

    
    completed: joi.boolean().required().messages({
      "boolean.base": "El campo 'completed' debe ser true o false",
    }),

   
    score: joi.number().min(0).max(100).required().messages({
      "number.min": "El puntaje debe estar entre 0 y 100",
      "number.max": "El puntaje debe estar entre 0 y 100",
    }),

    
    attempts: joi.number().integer().min(1).required().messages({
      "number.min": "Los intentos deben ser al menos 1",
    }),

    
    lastAttemptDate: joi.string().isoDate().optional().messages({
      "string.isoDate": "La fecha debe estar en formato ISO (YYYY-MM-DDTHH:mm:ss.sssZ)",
    }),
  })
  // No permite campos adicionales fuera de los definidos
  .unknown(false);

  // Ejecuta la validación acumulando todos los errores
  const { error, value } = schema.validate(data, { abortEarly: false });
  return { error, value };
}

/**
 * Función pública que valida y carga los datos de progreso
 * 
 * Casos de uso:
 * - POST /progress - Registrar progreso por primera vez
 * - PUT /progress/:id - Actualizar progreso existente (nuevo intento)
 */
export const loadProgressData = (data: any): ReturnProgressData => { 
  const result = validateProgressData(data);
  
  
  if (result.error) {
    
    const message = result.error.details.map(d => d.message).join("; ");
    
    throw new Error(message);
  }
  
  return result.value;
};
