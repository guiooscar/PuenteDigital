import { Repository } from "typeorm";
import { Certificate as CertificateDomain } from "../../domain/Certificate.js";
import { Certificate as CertificateEntity } from "../entities/Certificate.js";
import { CertificatePort } from "../../domain/CertificatePort.js";
import { AppDataSource } from "../config/data-base.js";

// Adaptador que implementa el puerto de certificados usando TypeORM
export class CertificateAdapter implements CertificatePort {
  private certificateRepository: Repository<CertificateEntity>;

  constructor() {
    this.certificateRepository = AppDataSource.getRepository(CertificateEntity);
  }

  //Mapper: Convierte Entidad de BD → Modelo de Dominio
   
  private toDomain(certificate: CertificateEntity): CertificateDomain {
    return {
      id: certificate.id_certificate,
      userId: certificate.user.id_user,    
      moduleId: certificate.module.id_module,  
      createdAt: certificate.created_at,
    };
  }

  //Mapper: Convierte Modelo de Dominio → Entidad de BD
   
  private toEntity(certificate: Omit<CertificateDomain, "id" | "createdAt">): CertificateEntity {
    const certEntity = new CertificateEntity();
    certEntity.user = { id_user: certificate.userId } as any;
    certEntity.module = { id_module: certificate.moduleId } as any;
    
    return certEntity;
  }

  
  async createCertificate(certificate: Omit<CertificateDomain, "id">): Promise<number> {
    try {
      const newCert = this.toEntity(certificate);
      const savedCert = await this.certificateRepository.save(newCert);
      return savedCert.id_certificate;
    } catch (error) {
      console.error("Error creando certificado:", error);
      throw new Error("Error al emitir el certificado.");
    }
  }


  async deleteCertificate(id: number): Promise<boolean> {
    try {
      const result = await this.certificateRepository.delete(id);
      return (result.affected ?? 0) > 0;
    } catch (error) {
      console.error("Error eliminando certificado:", error);
      throw new Error("Error al eliminar el certificado.");
    }
  }


  async getCertificateById(id: number): Promise<CertificateDomain | null> {
    try {
      const certificate = await this.certificateRepository.findOne({ 
        where: { id_certificate: id },
        relations: ['user', 'module']
      });
      return certificate ? this.toDomain(certificate) : null;
    } catch (error) {
      console.error("Error obteniendo certificado por ID:", error);
      throw new Error("Error al obtener el certificado.");
    }
  }

 
  async getCertificatesByUserId(userId: number): Promise<CertificateDomain[]> {
    try {
      const certificates = await this.certificateRepository.find({
        where: { user: { id_user: userId } },
        relations: ['user', 'module']
      });
      return certificates.map(cert => this.toDomain(cert));
    } catch (error) {
      console.error("Error obteniendo certificados por usuario:", error);
      throw new Error("Error al obtener los certificados del usuario.");
    }
  }

  
  async getCertificatesByModuleId(moduleId: number): Promise<CertificateDomain[]> {
    try {
      const certificates = await this.certificateRepository.find({
        where: { module: { id_module: moduleId } },
        relations: ['user', 'module']
      });
      return certificates.map(cert => this.toDomain(cert));
    } catch (error) {
      console.error("Error obteniendo certificados por módulo:", error);
      throw new Error("Error al obtener los certificados del módulo.");
    }
  }

  
  async getCertificateByUserAndModule(userId: number, moduleId: number): Promise<CertificateDomain | null> {
    try {
      const certificate = await this.certificateRepository.findOne({
        where: {
          user: { id_user: userId },
          module: { id_module: moduleId }
        },
        relations: ['user', 'module']
      });
      return certificate ? this.toDomain(certificate) : null;
    } catch (error) {
      console.error("Error obteniendo certificado por usuario y módulo:", error);
      throw new Error("Error al verificar el certificado del usuario en el módulo.");
    }
  }

  
  async getAllCertificates(): Promise<CertificateDomain[]> {
    try {
      const certificates = await this.certificateRepository.find({
        relations: ['user', 'module']
      });
      return certificates.map(cert => this.toDomain(cert));
    } catch (error) {
      console.error("Error obteniendo todos los certificados:", error);
      throw new Error("Error al obtener la lista de certificados.");
    }
  }
}
