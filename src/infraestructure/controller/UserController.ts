// src/infrastructure/controllers/UserController.ts

import { UserApplication } from "../../application/UserApplication.js";
import { Request, Response } from "express";
import { loadUserData } from "../util/user-validation.js";
import { loadUpdateUserData } from "../util/user-update-validation.js";
import { loadEmail } from "../util/email-validation.js";

export class UserController {
  private app: UserApplication;

  constructor(application: UserApplication) {
    this.app = application; // Inyección de la capa de aplicación
  }

  // HU01: Registro de usuario
  async registerUser(req: Request, res: Response): Promise<Response> {
    try {
      // Validación de datos usando el esquema joi
      const { name, email, password } = loadUserData(req.body);

      // Llamado al caso de uso en la capa de aplicación para registrar usuario 
      const userId = await this.app.registerUser({ name, email, password });

      return res.status(201).json({ message: "Usuario registrado con éxito", userId });
    } catch (error) {
      // Manejo de errores de validación o de la aplicación
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  // HU03: Asignar nivel inicial según un puntaje de diagnóstico
  async assignInitialLevel(req: Request, res: Response): Promise<Response> {
    try {
      const userId = Number(req.params.id);
      const { testScore } = req.body;

      // Validación de ID y del puntaje permitido
      if (isNaN(userId)) {
        return res.status(400).json({ error: "ID de usuario inválido" });
      }
      if (typeof testScore !== "number" || testScore < 0 || testScore > 100) {
        return res.status(400).json({ error: "Puntaje inválido (0-100)" });
      }

      // Delegamos en la capa de aplicación
      const level = await this.app.assignInitialLevel(userId, testScore);

      return res.status(200).json({ message: "Nivel asignado con éxito", level });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  // Actualización parcial de usuario
  async updateUser(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });

      // Validación de los campos que se desean modificar
      const data = loadUpdateUserData(req.body);

      // Llamado a la capa de aplicación
      const updated = await this.app.updateUser(id, data);

      if (!updated) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }

      return res.status(200).json({ message: "Usuario actualizado con éxito" });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  // Buscar usuario por ID
  async getUserById(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });

      const user = await this.app.getUserById(id);

      if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ error: "Error al obtener usuario" });
    }
  }

  // Buscar usuario por correo
  async getUserByEmail(req: Request, res: Response): Promise<Response> {
    try {
      // Validación del correo recibido por parámetros
      const { email } = loadEmail(req.params);

      const user = await this.app.getUserByEmail(email);

      if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

      return res.status(200).json(user);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: "Error interno" });
    }
  }

  // Listar todos los usuarios
  async getAllUsers(req: Request, res: Response): Promise<Response> {
    try {
      const users = await this.app.getAllUsers();
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ error: "Error al obtener usuarios" });
    }
  }

  // Eliminar usuario por ID
  async deleteUser(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });

      const deleted = await this.app.deleteUser(id);

      if (!deleted) return res.status(404).json({ error: "Usuario no encontrado" });

      return res.status(200).json({ message: "Usuario eliminado" });
    } catch (error) {
      return res.status(500).json({ error: "Error al eliminar usuario" });
    }
  }
}
