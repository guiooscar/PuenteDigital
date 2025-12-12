// src/web/app.ts

import express, { type Request, type Response } from "express";
import cors from "cors";

// Middleware
import { authenticateToken } from "./auth.middleware.js";

// Rutas
import authRoutes from "../routes/AuthRoutes.js";
import userRoutes from "../routes/UserRoutes.js";
import moduleRoutes from "../routes/ModuleRoutes.js";
import activityRoutes from "../routes/ActivityRoutes.js";
import progressRoutes from "../routes/ProgressRoutes.js";
import certificateRoutes from "../routes/CertificateRoutes.js";
import registerRoute from "../routes/RegisterRoute.js";

class App {
  private app: express.Application;

  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  private middlewares(): void {
    this.app.use(cors());
    this.app.use(express.json());
  }

  private routes(): void {
  // Middlewares globales
  this.app.use(cors());
  this.app.use(express.json());

  // Rutas públicas
  this.app.use("/api/auth", authRoutes);

  // Ruta pública de registro (NO protegida)
  this.app.use("/api/users/register", registerRoute); // ← Solo esta ruta es pública

  // Rutas protegidas
  this.app.use("/api/users", authenticateToken, userRoutes);
  this.app.use("/api/modules", authenticateToken, moduleRoutes);
  this.app.use("/api/activities", authenticateToken, activityRoutes);
  this.app.use("/api/progress", authenticateToken, progressRoutes);
  this.app.use("/api/certificates", authenticateToken, certificateRoutes);

  // Ruta raíz
  this.app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
      message: "API REST de Puente Digital - Backend funcionando ✅",
      project: "Plataforma de alfabetización digital para adultos en Chía, Cundinamarca",
      version: "1.0.0",
      endpoints: {
        public: {
          register: "POST /api/users/register",
          login: "POST /api/auth/login"
        },
        protected: {
          diagnose: "POST /api/users/diagnose/:id",
          modules: "GET /api/modules/level/:level",
          activities: "GET /api/activities/module/:moduleId",
          progress: "POST /api/progress, GET /api/progress/module/:userId/:moduleId",
          certificates: "GET /api/certificates/user/:userId"
        }
      }
    });
  });

  // Manejo de 404
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