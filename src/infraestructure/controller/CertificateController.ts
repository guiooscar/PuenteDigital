// src/infrastructure/controllers/CertificateController.ts

import { Request, Response } from "express";
import { CertificateApplication } from "../../application/CertificateApplication.js";

export class CertificateController {
  private app: CertificateApplication;

  constructor(application: CertificateApplication) {
    this.app = application;
  }

  // HU06: Obtener certificados de un usuario
  async getCertificatesByUserId(req: Request, res: Response): Promise<Response> {
    try {
      const { userId } = req.params;
      const uid = Number(userId);
      if (isNaN(uid)) {
        return res.status(400).json({ error: "ID de usuario inválido" });
      }

      const certificates = await this.app.getCertificatesByUserId(uid);
      return res.status(200).json(certificates);
    } catch (error) {
      return res.status(500).json({ error: "Error al obtener certificados del usuario" });
    }
  }

  // HU06: Verificar si un usuario tiene certificado en un módulo
  async getCertificateByUserAndModule(req: Request, res: Response): Promise<Response> {
    try {
      const { userId, moduleId } = req.params;
      const uid = Number(userId);
      const mid = Number(moduleId);

      if (isNaN(uid) || isNaN(mid)) {
        return res.status(400).json({ error: "IDs de usuario y módulo son requeridos" });
      }

      const certificate = await this.app.getCertificateByUserAndModule(uid, mid);
      if (!certificate) {
        return res.status(404).json({ message: "Certificado no encontrado" });
      }
      return res.status(200).json(certificate);
    } catch (error) {
      return res.status(500).json({ error: "Error al verificar certificado" });
    }
  }

  // HU06: Obtener certificados de un módulo (para admin/tutor)
  async getCertificatesByModuleId(req: Request, res: Response): Promise<Response> {
    try {
      const { moduleId } = req.params;
      const mid = Number(moduleId);
      if (isNaN(mid)) {
        return res.status(400).json({ error: "ID de módulo inválido" });
      }

      const certificates = await this.app.getCertificatesByModuleId(mid);
      return res.status(200).json(certificates);
    } catch (error) {
      return res.status(500).json({ error: "Error al obtener certificados del módulo" });
    }
  }

  // Para administración: listar todos los certificados
  async getAllCertificates(req: Request, res: Response): Promise<Response> {
    try {
      const certificates = await this.app.getAllCertificates();
      return res.status(200).json(certificates);
    } catch (error) {
      return res.status(500).json({ error: "Error al obtener todos los certificados" });
    }
  }

  // HU06: Endpoint para emitir certificado (opcional, normalmente se hace desde la lógica de progreso)
  async issueCertificate(req: Request, res: Response): Promise<Response> {
    try {
      const { userId, moduleId } = req.body;
      const uid = Number(userId);
      const mid = Number(moduleId);

      if (isNaN(uid) || isNaN(mid)) {
        return res.status(400).json({ error: "IDs de usuario y módulo son requeridos" });
      }

      // Llamada CORRECTA: parámetros por separado
      const certId = await this.app.issueCertificate(uid, mid);
      
      if (certId === null) {
        return res.status(400).json({ 
          message: "El usuario no cumple los requisitos para obtener el certificado",
          details: "Requiere 100% de completado y puntaje promedio >= 70"
        });
      }

      return res.status(201).json({ message: "Certificado emitido con éxito", certId });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: "Error al emitir certificado" });
    }
  }
}