// src/application/CertificateApplication.ts

import { Certificate } from "../domain/Certificate.js";
import { CertificatePort } from "../domain/CertificatePort.js";
import { ProgressPort } from "../domain/ProgressPort.js";
import { ProgressDomainService } from "../domain/services/ProgressDomainService.js";

/**
 * Capa de aplicación para la gestión de certificados.
 * Coordina la lógica de emisión automática de certificados
 * basada en el progreso del usuario (HU06).
 */
export class CertificateApplication {
  private port: CertificatePort;
  private progressPort: ProgressPort;
  private progressDomainService: ProgressDomainService;

  constructor(port: CertificatePort, progressPort: ProgressPort) {
    this.port = port;
    this.progressPort = progressPort;
    this.progressDomainService = new ProgressDomainService();
  }

  /**
   * Emite un certificado si el usuario cumple con los requisitos:
   - Ha completado el 100% del módulo.
   - Tiene un puntaje promedio ≥ 70.
   */
  async issueCertificate(
    userId: number,
    moduleId: number,
    requiredCompletion: number = 100,
    requiredScore: number = 70
  ): Promise<number | null> {
    // 1. Verificar si ya tiene certificado para este módulo
    const existingCert = await this.port.getCertificateByUserAndModule(userId, moduleId);
    if (existingCert) {
      throw new Error("El usuario ya tiene un certificado para este módulo");
    }

    // 2. Obtener progreso del usuario en el módulo
    const userProgress = await this.progressPort.getProgressByUserIdAndModuleId(userId, moduleId);
    const totalActivities = await this.progressPort.countActivitiesByModuleId(moduleId);

    // 3. Calcular métricas de progreso
    const completionPercentage = this.progressDomainService.calculateModuleCompletionPercentage(
      userProgress,
      totalActivities
    );
    const averageScore = this.progressDomainService.calculateAverageScore(userProgress);

    // 4. Validar requisitos
    if (
      completionPercentage < requiredCompletion ||
      averageScore < requiredScore
    ) {
      return null; // No cumple, no se emite el certificado
    }

    // 5. Emitir certificado
    const newCertificate: Omit<Certificate, "id"> = {
      userId,
      moduleId,
      createdAt: new Date(),
    };

    return this.port.createCertificate(newCertificate);
  }

  // --- Métodos de consulta  ---

  async getCertificatesByUserId(userId: number): Promise<Certificate[]> {
    return this.port.getCertificatesByUserId(userId);
  }

  async getCertificateById(id: number): Promise<Certificate | null> {
    return this.port.getCertificateById(id);
  }

  async getCertificatesByModuleId(moduleId: number): Promise<Certificate[]> {
    return this.port.getCertificatesByModuleId(moduleId);
  }

  async getAllCertificates(): Promise<Certificate[]> {
    return this.port.getAllCertificates();
  }

  // obtener certificado por usuario y módulo
  async getCertificateByUserAndModule(userId: number, moduleId: number): Promise<Certificate | null> {
    return this.port.getCertificateByUserAndModule(userId, moduleId);
  }

  // --- Métodos auxiliares ---

  async hasCertificate(userId: number, moduleId: number): Promise<boolean> {
    const cert = await this.getCertificateByUserAndModule(userId, moduleId);
    return cert !== null;
  }

  async countUserCertificates(userId: number): Promise<number> {
    const certificates = await this.getCertificatesByUserId(userId);
    return certificates.length;
  }
}