import { Request, Response } from "express";
import { ProgressApplication } from "../../application/ProgressApplication.js";
import { loadProgressData } from "../util/progress-validation.js";

export class ProgressController {
  private app: ProgressApplication;

  constructor(application: ProgressApplication) {
    this.app = application;
  }

  // HU05: Registrar progreso tras una actividad
  async recordProgress(req: Request, res: Response): Promise<Response> {
    try {
      const { userId, activityId, completed, score, attempts, lastAttemptDate } = loadProgressData(req.body);
      const progressId = await this.app.recordProgress({
        userId,
        activityId,
        completed,
        score,
        attempts,
        lastAttemptDate: lastAttemptDate ? new Date(lastAttemptDate) : new Date(),
      });
      return res.status(201).json({ message: "Progreso registrado con éxito", progressId });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  // HU06: Obtener progreso por módulo (para dashboard)
  async getModuleCompletion(req: Request, res: Response): Promise<Response> {
    try {
      const { userId, moduleId } = req.params;
      const uid = Number(userId);
      const mid = Number(moduleId);

      if (isNaN(uid) || isNaN(mid)) {
        return res.status(400).json({ error: "IDs de usuario y módulo son requeridos y deben ser números" });
      }

      const percentage = await this.app.getModuleCompletionPercentage(uid, mid);
      const isCompleted = await this.app.isModuleCompleted(uid, mid);
      const averageScore = await this.app.getModuleAverageScore(uid, mid);

      return res.status(200).json({
        userId: uid,
        moduleId: mid,
        completionPercentage: percentage,
        isCompleted,
        averageScore,
      });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: "Error al obtener el progreso del módulo" });
    }
  }

  // HU06: Estadísticas globales del usuario
  async getUserStatistics(req: Request, res: Response): Promise<Response> {
    try {
      const { userId } = req.params;
      const uid = Number(userId);
      if (isNaN(uid)) {
        return res.status(400).json({ error: "ID de usuario inválido" });
      }

      const stats = await this.app.getUserStatistics(uid);
      return res.status(200).json({ userId: uid, ...stats });
    } catch (error) {
      return res.status(500).json({ error: "Error al obtener estadísticas del usuario" });
    }
  }

  // HU05: Verificar si puede reintentar una actividad
  async canRetryActivity(req: Request, res: Response): Promise<Response> {
    try {
      const { userId, activityId } = req.params;
      const uid = Number(userId);
      const aid = Number(activityId);
      const { maxAttempts = 3 } = req.query;

      if (isNaN(uid) || isNaN(aid)) {
        return res.status(400).json({ error: "IDs de usuario y actividad son requeridos" });
      }

      const canRetry = await this.app.canUserRetryActivity(uid, aid, Number(maxAttempts));
      return res.status(200).json({ canRetry });
    } catch (error) {
      return res.status(500).json({ error: "Error al verificar permiso de reintento" });
    }
  }

  // CRUD: Obtener progreso por usuario (para admin/tutor)
  async getProgressByUserId(req: Request, res: Response): Promise<Response> {
    try {
      const { userId } = req.params;
      const uid = Number(userId);
      if (isNaN(uid)) return res.status(400).json({ error: "ID de usuario inválido" });

      const progressList = await this.app.getProgressByUserId(uid);
      return res.status(200).json(progressList);
    } catch (error) {
      return res.status(500).json({ error: "Error al obtener el historial de progreso" });
    }
  }
}