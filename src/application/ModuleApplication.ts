import { Module } from "../domain/Module.js";
import { ModulePort } from "../domain/ModulePort.js";

// creamos la clase que maneja la lógica de negocio relacionada con los módulos
export class ModuleApplication {
  private port: ModulePort; // Puerto hacia la capa de infraestructura

  constructor(port: ModulePort) {
    this.port = port; 
  }

  // Crea un nuevo módulo (sin id ni timestamps definidos por el usuario)
  async createModule(moduleData: Omit<Module, "id" | "createdAt" | "updatedAt">): Promise<number> {
    const newModule: Omit<Module, "id"> = {
      ...moduleData,
      createdAt: new Date(), // Marca de creación automática
      updatedAt: new Date(), // Marca de última actualización
    };
    return this.port.createModule(newModule); // Delegación al puerto
  }

  async getModuleById(id: number): Promise<Module | null> {
    return this.port.getModuleById(id);
  }

  async getModulesByLevel(level: 'basico' | 'intermedio' | 'funcional'): Promise<Module[]> {
    return this.port.getModulesByLevel(level);
  }

  async getAllModules(): Promise<Module[]> {
    return this.port.getAllModules();
  }

  // Actualiza parcialmente los datos de un módulo existente
  async updateModule(id: number, module: Partial<Module>): Promise<boolean> {
    return this.port.updateModule(id, module);
  }

  async deleteModule(id: number): Promise<boolean> {
    return this.port.deleteModule(id);
  }
}
