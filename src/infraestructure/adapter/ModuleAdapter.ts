import { Repository } from "typeorm";
import { Module as ModuleDomain } from "../../domain/Module.js";
import { Module as ModuleEntity } from "../entities/Module.js";
import { ModulePort } from "../../domain/ModulePort.js";
import { AppDataSource } from "../config/data-base.js";

// creamos la clase ModuleAdapter que implementa el puerto ModulePort
export class ModuleAdapter implements ModulePort {
  private moduleRepository: Repository<ModuleEntity>;

  constructor() {
    this.moduleRepository = AppDataSource.getRepository(ModuleEntity);
  }

  // Conviertimos de Entidad de BD → Modelo de Dominio
  private toDomain(module: ModuleEntity): ModuleDomain {
    return {
      id: module.id_module,
      title: module.title_module,
      // Convierte null a undefined para el dominio
      description: module.description_module ?? undefined,
      level: module.level_module as 'basico' | 'intermedio' | 'funcional',
      order: module.order_module,
      createdAt: module.created_at,
      updatedAt: module.updated_at,
    };
  }

  //Convierte de Modelo de Dominio → Entidad de BD
  private toEntity(module: Omit<ModuleDomain, "id" | "createdAt" | "updatedAt">): ModuleEntity {
    const moduleEntity = new ModuleEntity();
    moduleEntity.title_module = module.title;
    // Convierte undefined a null para la BD
    moduleEntity.description_module = module.description ?? null;
    moduleEntity.level_module = module.level;
    moduleEntity.order_module = module.order;
    return moduleEntity;
  }

  async createModule(module: Omit<ModuleDomain, "id">): Promise<number> {
    try {
      const newModule = this.toEntity(module);
      const savedModule = await this.moduleRepository.save(newModule);
      return savedModule.id_module;
    } catch (error) {
      console.error("Error creando el módulo:", error);
      throw new Error("Error al crear el módulo.");
    }
  }

  async updateModule(id: number, module: Partial<ModuleDomain>): Promise<boolean> {
    try {
      const existingModule = await this.moduleRepository.findOne({ where: { id_module: id } });
      if (!existingModule) return false;

      Object.assign(existingModule, {
        title_module: module.title ?? existingModule.title_module,
        description_module: module.description ?? existingModule.description_module,
        level_module: module.level ?? existingModule.level_module,
        order_module: module.order ?? existingModule.order_module,
      });

      await this.moduleRepository.save(existingModule);
      return true;
    } catch (error) {
      console.error("Error actualizando módulo:", error);
      throw new Error("Error al actualizar el módulo.");
    }
  }

 
  async deleteModule(id: number): Promise<boolean> {
    try {
      const result = await this.moduleRepository.delete(id);
      
      // Usa ?? para convertir null/undefined en 0 y Retorna true solo si se eliminó al menos 1 fila
      return (result.affected ?? 0) > 0;
    } catch (error) {
      console.error("Error eliminando módulo:", error);
      throw new Error("Error al eliminar el módulo.");
    }
  }

  async getModuleById(id: number): Promise<ModuleDomain | null> {
    try {
      const module = await this.moduleRepository.findOne({ where: { id_module: id } });
      return module ? this.toDomain(module) : null;
    } catch (error) {
      console.error("Error obteniendo módulo por ID:", error);
      throw new Error("Error al obtener el módulo.");
    }
  }

  async getModulesByLevel(level: 'basico' | 'intermedio' | 'funcional'): Promise<ModuleDomain[]> {
    try {
      const modules = await this.moduleRepository.findBy({ level_module: level });
      return modules.map(module => this.toDomain(module));
    } catch (error) {
      console.error("Error obteniendo módulos por nivel:", error);
      throw new Error("Error al obtener módulos por nivel.");
    }
  }

  async getAllModules(): Promise<ModuleDomain[]> {
    try {
      const modules = await this.moduleRepository.find();
      return modules.map(module => this.toDomain(module));
    } catch (error) {
      console.error("Error obteniendo todos los módulos:", error);
      throw new Error("Error al obtener la lista de módulos.");
    }
  }
}
