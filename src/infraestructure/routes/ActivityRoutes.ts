// src/infrastructure/routes/ActivityRoutes.ts

import { Router } from "express";
import { ActivityController } from "../controller/ActivityController.js";
import { ActivityApplication } from "../../application/ActivityApplication.js";
import { ActivityAdapter } from "../adapter/ActivityAdapter.js";

// Inyección de dependencias manual (acorde con la arquitectura hexagonal)
const activityAdapter = new ActivityAdapter();
const activityApplication = new ActivityApplication(activityAdapter);
const activityController = new ActivityController(activityApplication);

const router = Router();

// === Rutas para TUTORES/ADMIN (HU07: Gestión de contenidos) ===
// Crear nueva actividad
router.post("/", (req, res) => activityController.createActivity(req, res));

// Actualizar actividad existente
router.put("/:id", (req, res) => activityController.updateActivity(req, res));

// Eliminar actividad (borrado lógico o físico)
router.delete("/:id", (req, res) => activityController.deleteActivity(req, res));

// Listar todas las actividades (solo para gestión interna)
router.get("/", (req, res) => activityController.getAllActivities(req, res));

// === Rutas para ESTUDIANTES (HU04, HU05: Acceso y aprendizaje) ===
// Obtener todas las actividades de un módulo específico
router.get("/module/:moduleId", (req, res) => activityController.getActivitiesByModuleId(req, res));

// Obtener una actividad por ID (para renderizar contenido)
router.get("/:id", (req, res) => activityController.getActivityById(req, res));

export default router;