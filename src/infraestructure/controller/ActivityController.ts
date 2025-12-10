import { Request, Response } from "express";
import { ActivityApplication } from "../../application/ActivityApplication.js";
import { loadActivityData } from "../util/activity-validation.js";
import { loadUpdateActivityData } from "../util/activity-update-validation.js";

export class ActivityController {
  private app: ActivityApplication;

  constructor(application: ActivityApplication) {
    this.app = application;
  }

  // HU07: Crear actividad (solo tutores/admin)
  async createActivity(req: Request, res: Response): Promise<Response> {
    try {
      const { moduleId, title, type, content, order } = loadActivityData(req.body);
      const activityId = await this.app.createActivity({ moduleId, title, type, content, order });
      return res.status(201).json({ message: "Actividad creada con éxito", activityId });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  // HU04: Obtener actividades por módulo (para estudiantes)
  async getActivitiesByModuleId(req: Request, res: Response): Promise<Response> {
    try {
      const moduleId = Number(req.params.moduleId);
      if (isNaN(moduleId)) {
        return res.status(400).json({ error: "ID de módulo inválido" });
      }
      const activities = await this.app.getActivitiesByModuleId(moduleId);
      return res.status(200).json(activities);
    } catch (error) {
      return res.status(500).json({ error: "Error al obtener actividades del módulo" });
    }
  }

  // CRUD: Obtener actividad por ID
  async getActivityById(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });
      const activity = await this.app.getActivityById(id);
      if (!activity) return res.status(404).json({ error: "Actividad no encontrada" });
      return res.status(200).json(activity);
    } catch (error) {
      return res.status(500).json({ error: "Error al obtener la actividad" });
    }
  }

  // CRUD: Obtener todas las actividades (para admin/tutores)
  async getAllActivities(req: Request, res: Response): Promise<Response> {
    try {
      const activities = await this.app.getAllActivities();
      return res.status(200).json(activities);
    } catch (error) {
      return res.status(500).json({ error: "Error al obtener todas las actividades" });
    }
  }

  // HU07: Actualizar actividad (solo tutores/admin)
  async updateActivity(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });
      const updateData = loadUpdateActivityData(req.body);
      const updated = await this.app.updateActivity(id, updateData);
      if (!updated) return res.status(404).json({ error: "Actividad no encontrada" });
      return res.status(200).json({ message: "Actividad actualizada con éxito" });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  // HU07: Eliminar actividad (solo tutores/admin)
  async deleteActivity(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });
      const deleted = await this.app.deleteActivity(id);
      if (!deleted) return res.status(404).json({ error: "Actividad no encontrada" });
      return res.status(200).json({ message: "Actividad eliminada con éxito" });
    } catch (error) {
      return res.status(500).json({ error: "Error al eliminar la actividad" });
    }
  }
}