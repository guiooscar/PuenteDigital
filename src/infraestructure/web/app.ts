import express, { type Request, type Response } from "express";

// Importación de rutas
import userRoutes from "../routes/UserRoutes.js";
import moduleRoutes from "../routes/ModuleRoutes.js";
import activityRoutes from "../routes/ActivityRoutes.js";
import progressRoutes from "../routes/ProgressRoutes.js";

class App {
  private app: express.Application;

  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  private middlewares(): void {
    // Permite que Express pueda parsear el cuerpo de las peticiones en formato JSON
    this.app.use(express.json());

  }

  private routes(): void {
    // Agrupación de rutas bajo el prefijo /api para cada entidad
    this.app.use("/api/users", userRoutes);
    this.app.use("/api/modules", moduleRoutes);
    this.app.use("/api/activities", activityRoutes);
    this.app.use("/api/progress", progressRoutes);

    // Ruta raíz: verificación básica de que el servidor está activo
    this.app.get("/", (req: Request, res: Response) => {
      res.status(200).json({
        message: "API REST de Puente Digital - Backend funcionando ✅",
        project: "Plataforma de alfabetización digital para adultos en Chía, Cundinamarca",
        version: "1.0.0",
        documentation: "Los endpoints están organizados bajo /api/{entidad}",
      });
    });

    // Ruta para capturar rutas no encontradas (404)
    this.app.use("*", (req: Request, res: Response) => {
      res.status(404).json({
        error: "Ruta no encontrada",
        path: req.originalUrl,
      });
    });
  }

  getApp(): express.Application {
    return this.app;
  }
}

export default new App().getApp();