import { Router } from "express";
import { AuthController } from "../controller/AuthController.js";
import { UserApplication } from "../../application/UserApplication.js";
import { UserAdapter } from "../adapter/UserAdapter.js";

// Inyección de dependencias
const userAdapter = new UserAdapter();
const userApplication = new UserApplication(userAdapter);
const authController = new AuthController(userApplication);

const router = Router();

// Endpoint de login (HU02)
router.post("/login", (req, res) => authController.login(req, res));

export default router;