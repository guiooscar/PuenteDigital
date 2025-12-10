import { Router } from "express";
import { UserController } from "../controller/UserController.js";
import { UserApplication } from "../../application/UserApplication.js";
import { UserAdapter } from "../adapter/UserAdapter.js";

// Inyección de dependencias manual
const userAdapter = new UserAdapter();
const userApplication = new UserApplication(userAdapter);
const userController = new UserController(userApplication);

const router = Router();

// Registro y diagnóstico
router.post("/register", (req, res) => userController.registerUser(req, res));
router.post("/diagnose/:id", (req, res) => userController.assignInitialLevel(req, res)); 

// CRUD
router.get("/:id", (req, res) => userController.getUserById(req, res));
router.get("/email/:email", (req, res) => userController.getUserByEmail(req, res));
router.get("/", (req, res) => userController.getAllUsers(req, res));
router.put("/:id", (req, res) => userController.updateUser(req, res));
router.delete("/:id", (req, res) => userController.deleteUser(req, res));

export default router;