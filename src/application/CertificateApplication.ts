import { Certificate } from "../domain/Certificate.js";
import { CertificatePort } from "../domain/CertificatePort.js";
import { ProgressPort } from "../domain/ProgressPort.js";
import { ProgressDomainService } from "../domain/services/ProgressDomainService.js";

// Capa de aplicación: maneja la lógica de emisión de certificados
export class CertificateApplication {
  private port: CertificatePort;
  private progressPort: ProgressPort; // Para verificar si completó el módulo
  private progressDomainService: ProgressDomainService; // Reutilizamos la lógica de Progress

  constructor(port: CertificatePort, progressPort: ProgressPort) {
    this.port = port;
    this.progressPort = progressPort;
    this.progressDomainService = new ProgressDomainService();
  }
// Emite un certificado si el usuario cumple los requisitos, como completar el módulo y obtener una puntuación mínima.
  async issueCertificate(
    userId: number,
    moduleId: number,
    requiredCompletion: number = 100,
    requiredScore: number = 70
  ): Promise<number | null> {
    // 1. Verificar si ya tiene certificado para este módulo
    const existingCert = await this.port.getCertificateByUserAndModule(
      userId,
      moduleId
    );
    if (existingCert) {
      throw new Error("El usuario ya tiene un certificado para este módulo");
    }

    // 2. Obtener el progreso del usuario en el módulo
    const userProgress = await this.progressPort.getProgressByUserIdAndModuleId(
      userId,
      moduleId
    );
    const totalActivities = await this.progressPort.countActivitiesByModuleId(
      moduleId
    );

    // 3. Verificar si completó el módulo (usando ProgressDomainService)
    const completionPercentage =
      this.progressDomainService.calculateModuleCompletionPercentage(
        userProgress,
        totalActivities
      );
    const averageScore =
      this.progressDomainService.calculateAverageScore(userProgress);

    // 4. Validar que cumple los requisitos
    if (
      completionPercentage < requiredCompletion ||
      averageScore < requiredScore
    ) {
      return null; // No cumple los requisitos
    }

    // 5. Crear el certificado
    const newCertificate: Omit<Certificate, "id"> = {
      userId,
      moduleId,
      createdAt: new Date(),
    };

    return this.port.createCertificate(newCertificate);
  }

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

  async deleteCertificate(id: number): Promise<boolean> {
    return this.port.deleteCertificate(id);
  }

  async hasCertificate(userId: number, moduleId: number): Promise<boolean> {
    const cert = await this.port.getCertificateByUserAndModule(
      userId,
      moduleId
    );
    return cert !== null;
  }

  async countUserCertificates(userId: number): Promise<number> {
    const certificates = await this.port.getCertificatesByUserId(userId);
    return certificates.length;
  }
}
