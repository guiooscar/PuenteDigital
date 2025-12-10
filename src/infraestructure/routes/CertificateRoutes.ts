import { Router } from "express";
import { CertificateController } from "../controller/CertificateController.js";
import { CertificateApplication } from "../../application/CertificateApplication.js";
import { CertificateAdapter } from "../adapter/CertificateAdapter.js";
import { ProgressAdapter } from "../adapter/ProgressAdapter.js"; 

// Inyección de dependencias
const certificateAdapter = new CertificateAdapter();
const progressAdapter = new ProgressAdapter(); //  Creamos la instancia del adaptador de Progress

// Ahora pasas AMBOS adaptadores al constructor de CertificateApplication
const certificateApplication = new CertificateApplication(certificateAdapter, progressAdapter);
const certificateController = new CertificateController(certificateApplication);

const router = Router();

// Consulta de certificados (HU06)
router.get("/user/:userId", (req, res) => certificateController.getCertificatesByUserId(req, res));
router.get("/module/:moduleId", (req, res) => certificateController.getCertificatesByModuleId(req, res));
router.get("/check/:userId/:moduleId", (req, res) => certificateController.getCertificateByUserAndModule(req, res));
router.get("/", (req, res) => certificateController.getAllCertificates(req, res));

// Emisión manual (opcional, para pruebas o admin)
router.post("/issue", (req, res) => certificateController.issueCertificate(req, res));

export default router;