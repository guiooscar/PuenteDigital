import { Module } from "./Module.js";

export interface ModulePort {
  createModule(module: Omit<Module, 'id'>): Promise<number>;
  updateModule(id: number, module: Partial<Module>): Promise<boolean>;
  deleteModule(id: number): Promise<boolean>;
  getModuleById(id: number): Promise<Module | null>;
  getModulesByLevel(level: 'basico' | 'intermedio' | 'funcional'): Promise<Module[]>;
  getAllModules(): Promise<Module[]>;
}