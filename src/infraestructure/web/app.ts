// src/web/app.ts

import express, { type Request, type Response } from "express";

// Importación de rutas
import userRoutes from "../routes/UserRoutes.js";
import moduleRoutes from "../routes/ModuleRoutes.js";
import activityRoutes from "../routes/ActivityRoutes.js";
import progressRoutes from "../routes/ProgressRoutes.js";
import certificateRoutes from "../routes/CertificateRoutes.js"; 

class App {
  private app: express.Application;

  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  private middlewares(): void {
    // Permite que Express pueda parsear JSON en las solicitudes entrantes
    this.app.use(express.json());
  }

  private routes(): void {
    // Agrupación de rutas bajo el prefijo /api para cada entidad
    this.app.use("/api/users", userRoutes);
    this.app.use("/api/modules", moduleRoutes);
    this.app.use("/api/activities", activityRoutes);
    this.app.use("/api/progress", progressRoutes);
    this.app.use("/api/certificates", certificateRoutes); 

    // Ruta raíz: verificación básica de que el servidor está activo
    this.app.get("/", (req: Request, res: Response) => {
      res.status(200).json({
        message: "API REST de Puente Digital - Backend funcionando ✅",
        project: "Plataforma de alfabetización digital para adultos en Chía, Cundinamarca",
        version: "1.0.0",
        endpoints: {
          users: "/api/users",
          modules: "/api/modules",
          activities: "/api/activities",
          progress: "/api/progress",
          certificates: "/api/certificates"
        }
      });
    });

    this.app.use((req: Request, res: Response) => {
      res.status(404).json({
        error: "Ruta no encontrada",
        path: req.originalUrl,
        method: req.method
      });
    });
  }

  getApp(): express.Application {
    return this.app;
  }
}

export default new App().getApp();
