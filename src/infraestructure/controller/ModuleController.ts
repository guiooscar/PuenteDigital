import { Request, Response } from "express";
import { ModuleApplication } from "../../application/ModuleApplication.js";
import { loadModuleData } from "../util/module-validation.js";
import { loadUpdateModuleData } from "../util/module-update-validation.js";

export class ModuleController {
  private app: ModuleApplication;

  constructor(application: ModuleApplication) {
    this.app = application;
  }

  // HU07: Crear un nuevo módulo (solo tutores/admin)
  async createModule(req: Request, res: Response): Promise<Response> {
    try {
      const { title, description, level, order } = loadModuleData(req.body);
      const moduleId = await this.app.createModule({
        title,
        description,
        level,
        order,
      });
      return res
        .status(201)
        .json({ message: "Módulo creado con éxito", moduleId });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  // HU04: Obtener módulos por nivel (para estudiantes)
  async getModulesByLevel(req: Request, res: Response): Promise<Response> {
    try {
      const { level } = req.params;

      // Validar que el nivel exista y sea válido
      if (!level) {
        return res.status(400).json({ error: "Parámetro 'level' requerido" });
      }

      const validLevels = ["basico", "intermedio", "funcional"] as const;
      type ValidLevel = (typeof validLevels)[number];

      // Verificar si el nivel es válido
      if (!validLevels.includes(level as ValidLevel)) {
        return res
          .status(400)
          .json({
            error: "Nivel inválido. Use: basico, intermedio o funcional",
          });
      }

      
      const modules = await this.app.getModulesByLevel(level as ValidLevel);
      return res.status(200).json(modules);
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Error al obtener módulos por nivel" });
    }
  }

  // CRUD: Obtener módulo por ID
  async getModuleById(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });
      const module = await this.app.getModuleById(id);
      if (!module)
        return res.status(404).json({ error: "Módulo no encontrado" });
      return res.status(200).json(module);
    } catch (error) {
      return res.status(500).json({ error: "Error al obtener el módulo" });
    }
  }

  // CRUD: Obtener todos los módulos (para admin/tutores)
  async getAllModules(req: Request, res: Response): Promise<Response> {
    try {
      const modules = await this.app.getAllModules();
      return res.status(200).json(modules);
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Error al obtener todos los módulos" });
    }
  }

  // HU07: Actualizar módulo (solo tutores/admin)
  async updateModule(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });
      const updateData = loadUpdateModuleData(req.body);
      const updated = await this.app.updateModule(id, updateData);
      if (!updated)
        return res.status(404).json({ error: "Módulo no encontrado" });
      return res.status(200).json({ message: "Módulo actualizado con éxito" });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  // HU07: Eliminar módulo (solo tutores/admin)
  async deleteModule(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });
      const deleted = await this.app.deleteModule(id);
      if (!deleted)
        return res.status(404).json({ error: "Módulo no encontrado" });
      return res.status(200).json({ message: "Módulo eliminado con éxito" });
    } catch (error) {
      return res.status(500).json({ error: "Error al eliminar el módulo" });
    }
  }
}
