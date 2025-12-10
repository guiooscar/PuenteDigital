import joi from "joi";

export type ReturnModuleData = {
  title: string;
  description?: string;
  level: 'basico' | 'intermedio' | 'funcional';
  order: number;
};

type ValidationModuleData = {
  error?: joi.ValidationError;
  value: ReturnModuleData;
};

function validateModuleData(data: any): ValidationModuleData {
  const schema = joi.object({
    title: joi.string().trim().min(3).required().messages({
      "string.min": "El título debe tener al menos 3 caracteres",
      "string.empty": "El título es requerido",
    }),
    description: joi.string().trim().optional().allow("", null),
    level: joi.string().valid('basico', 'intermedio', 'funcional').required().messages({
      "any.only": "El nivel debe ser 'basico', 'intermedio' o 'funcional'",
    }),
    order: joi.number().integer().min(0).required().messages({
      "number.base": "El orden debe ser un número",
      "number.min": "El orden no puede ser negativo",
    }),
  }).unknown(false);

  const { error, value } = schema.validate(data, { abortEarly: false });
  return { error, value };
}

export const loadModuleData = (data: any): ReturnModuleData => {
  const result = validateModuleData(data);
  if (result.error) {
    const message = result.error.details.map(d => d.message).join("; ");
    throw new Error(message);
  }
  return result.value;
};