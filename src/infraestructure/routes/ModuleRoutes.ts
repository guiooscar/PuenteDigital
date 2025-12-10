import { Router } from "express";
import { ModuleController } from "../controller/ModuleController.js";
import { ModuleApplication } from "../../application/ModuleApplication.js";
import { ModuleAdapter } from "../adapter/ModuleAdapter.js";

// Inyección de dependencias manual para el módulo
const moduleAdapter = new ModuleAdapter();
const moduleApplication = new ModuleApplication(moduleAdapter);
const moduleController = new ModuleController(moduleApplication);

const router = Router();

// Rutas CRUD para administradores/tutores (HU07)
router.post("/", (req, res) => moduleController.createModule(req, res));
router.put("/:id", (req, res) => moduleController.updateModule(req, res));
router.delete("/:id", (req, res) => moduleController.deleteModule(req, res));
router.get("/", (req, res) => moduleController.getAllModules(req, res)); // Solo para admin/tutor

// Rutas para estudiantes (HU04)
router.get("/level/:level", (req, res) => moduleController.getModulesByLevel(req, res));
router.get("/:id", (req, res) => moduleController.getModuleById(req, res));

export default router;