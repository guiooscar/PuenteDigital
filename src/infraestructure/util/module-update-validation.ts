// src/infrastructure/util/module-update-validation.ts

import joi from "joi";

export type ReturnUpdateModuleData = Partial<{
  title: string;
  description?: string;
  level: 'basico' | 'intermedio' | 'funcional';
  order: number;
}>;

type ValidationUpdateModuleData = {
  error?: joi.ValidationError;
  value: ReturnUpdateModuleData;
};

function validateUpdateModuleData(data: any): ValidationUpdateModuleData {
  const schema = joi.object({
    title: joi.string().trim().min(3).messages({
      "string.min": "El título debe tener al menos 3 caracteres",
    }),
    description: joi.string().trim().optional().allow("", null),
    level: joi.string().valid('basico', 'intermedio', 'funcional').messages({
      "any.only": "El nivel debe ser 'basico', 'intermedio' o 'funcional'",
    }),
    order: joi.number().integer().min(0).messages({
      "number.min": "El orden no puede ser negativo",
    }),
  })
  .unknown(false)
  .or("title", "description", "level", "order");

  const { error, value } = schema.validate(data, { abortEarly: false, stripUnknown: true });
  return { error, value };
}

export const loadUpdateModuleData = (data: any): ReturnUpdateModuleData => {
  const result = validateUpdateModuleData(data);
  if (result.error) {
    const message = result.error.details.map(d => d.message).join("; ");
    throw new Error(message);
  }
  return result.value;
};