// src/infrastructure/routes/RegisterRoute.ts

import { Router, Request, Response } from "express";
import { UserApplication } from "../../application/UserApplication.js";
import { UserAdapter } from "../adapter/UserAdapter.js";
import { loadUserData } from "../util/user-validation.js";

// Inyección de dependencias
const userAdapter = new UserAdapter();
const userApplication = new UserApplication(userAdapter);

// Controlador  solo para registro
const registerController = {
  async registerUser(req: Request, res: Response) {
    try {
      const { name, email, password } = loadUserData(req.body);
      const userId = await userApplication.registerUser({ name, email, password });
      return res.status(201).json({ message: "Usuario registrado con éxito", userId });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  }
};

const router = Router();

router.post("/", registerController.registerUser);

export default router;