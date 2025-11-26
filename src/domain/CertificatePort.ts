import { Certificate } from "./Certificate.js";

export interface CertificatePort {
  createCertificate(certificate: Omit<Certificate, "id">): Promise<number>;

  deleteCertificate(id: number): Promise<boolean>;

  getCertificateById(id: number): Promise<Certificate | null>;

  getCertificatesByUserId(userId: number): Promise<Certificate[]>;

  getCertificatesByModuleId(moduleId: number): Promise<Certificate[]>;

  getCertificateByUserAndModule(
    userId: number,
    moduleId: number
  ): Promise<Certificate | null>;

  // Obtener todos los certificados (admin)
  getAllCertificates(): Promise<Certificate[]>;
}
