import { Router } from "express";
import { ProgressController } from "../controller/ProgressController.js";
import { ProgressApplication } from "../../application/ProgressApplication.js";
import { ProgressAdapter } from "../adapter/ProgressAdapter.js";

// Inyección de dependencias
const progressAdapter = new ProgressAdapter();
const progressApplication = new ProgressApplication(progressAdapter);
const progressController = new ProgressController(progressApplication);

const router = Router();

// HU05: Registrar progreso
router.post("/", (req, res) => progressController.recordProgress(req, res));

// HU06: Dashboard y estadísticas
router.get("/module/:userId/:moduleId", (req, res) => progressController.getModuleCompletion(req, res));
router.get("/stats/:userId", (req, res) => progressController.getUserStatistics(req, res));

// HU05: Reintento
router.get("/retry/:userId/:activityId", (req, res) => progressController.canRetryActivity(req, res));

// Para admin/tutor
router.get("/user/:userId", (req, res) => progressController.getProgressByUserId(req, res));

export default router;