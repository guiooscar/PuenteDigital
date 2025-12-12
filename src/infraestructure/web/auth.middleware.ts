import { Request, Response, NextFunction } from "express";
import { AuthApplication } from "../../application/AuthApplication.js";

/**
 * Middleware de autenticación JWT para proteger rutas privadas.
 * Espera un header: Authorization: Bearer <token>
 */
export const authenticateToken = (req: Request,res: Response,next: NextFunction): void => {
  // 1. Obtener el header de autorización
  const authHeader = req.headers["authorization"];

  // 2. Validar que el header exista y tenga el formato correcto
  if (!authHeader || typeof authHeader !== "string" || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({
      error: "Token de autenticación requerido",
      message: "Se requiere un token válido en el header: Authorization: Bearer <token>"
    });
    return;
  }

  // 3. Extraer el token (sin la palabra "Bearer ")
  const token = authHeader.split(" ")[1];
  if (!token) {
  res.status(401).json({ error: "Token inválido" });
  return;
}
  // 4. Verificar el token usando AuthApplication
  try {
    const payload = AuthApplication.verifyToken(token);
    
    // 5. Adjuntar el payload al request para uso en controladores
    //    Nota: `payload` contiene { id, email }
    (req as any).user = payload;
    
    // 6. Continuar con la siguiente función (controlador)
    next();
  } catch (error) {
    // 7. Si el token es inválido o expiró
    res.status(401).json({
      error: "Token inválido o expirado",
      message: "Por favor, inicia sesión nuevamente"
    });
  }
};