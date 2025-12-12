import { Request, Response } from "express";
import { UserApplication } from "../../application/UserApplication.js";
import { loadAuthData } from "../util/auth-validation.js";

export class AuthController {
  private userApp: UserApplication;

  constructor(userApplication: UserApplication) {
    this.userApp = userApplication;
  }

  // HU02: Login seguro con JWT
  async login(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = loadAuthData(req.body);
      const token = await this.userApp.login(email, password);
      return res.status(200).json({ message: "Inicio de sesión exitoso", token });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(401).json({ error: error.message });
      }
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  }
}