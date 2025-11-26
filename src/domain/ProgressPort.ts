import { Progress } from "./Progress.js";
// acá definimos y traemos los métodos que el Application Service va a necesitar para interactuar con la capa de infraestructura (base de datos, APIs, etc.)
export interface ProgressPort {
  createProgress(progress: Omit<Progress, 'id'>): Promise<number>;
  updateProgress(id: number, progress: Partial<Progress>): Promise<boolean>;
  deleteProgress(id: number): Promise<boolean>;
  getProgressById(id: number): Promise<Progress | null>;
  getProgressByUserIdAndActivityId(userId: number, activityId: number): Promise<Progress | null>;
  getProgressByUserId(userId: number): Promise<Progress[]>;
  getAllProgress(): Promise<Progress[]>;
  getProgressByUserIdAndModuleId(userId: number, moduleId: number): Promise<Progress[]>;
  countActivitiesByModuleId(moduleId: number): Promise<number>;
}
