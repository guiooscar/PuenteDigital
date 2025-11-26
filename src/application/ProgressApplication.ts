import { Progress } from "../domain/Progress.js";
import { ProgressPort } from "../domain/ProgressPort.js";
import { ProgressDomainService } from "../domain/services/ProgressDomainService.js";

// Capa de aplicación para organizar las operaciones sin contener lógica de negocio, llamando al Domain Service para la lógica compleja
// esta capa organiza las rutas, flujo, integraciones, prepara los datos y coordina.
export class ProgressApplication {
  private port: ProgressPort;
  private domainService: ProgressDomainService;

  constructor(port: ProgressPort) {
    this.port = port;
    this.domainService = new ProgressDomainService();
  }

  //Registra un nuevo progreso (primer intento de una actividad)

  async recordProgress(
    progressData: Omit<Progress, "id" | "createdAt" | "updatedAt">
  ): Promise<number> {
    // Validación usando el Domain Service
    this.domainService.validateProgressData(progressData);

    const newProgress: Omit<Progress, "id"> = {
      ...progressData, // spread operator para copiar las propiedades de progressData
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    return this.port.createProgress(newProgress);
  }

  async getProgressByUserId(userId: number): Promise<Progress[]> {
    return this.port.getProgressByUserId(userId);
  }

  async getProgressByUserIdAndActivityId(
    userId: number,
    activityId: number
  ): Promise<Progress | null> {
    return this.port.getProgressByUserIdAndActivityId(userId, activityId);
  }

  async updateProgress(
    id: number,
    progress: Partial<Progress>
  ): Promise<boolean> {
    // Validación usando el Domain Service
    this.domainService.validateProgressData(progress);

    return this.port.updateProgress(id, { ...progress, updatedAt: new Date() });
  }

  async getModuleCompletionPercentage(
    userId: number,
    moduleId: number
  ): Promise<number> {
    const userProgress = await this.port.getProgressByUserIdAndModuleId(
      userId,
      moduleId
    );
    const totalActivities = await this.port.countActivitiesByModuleId(moduleId);

    // Delegamos el cálculo al Domain Service ya que este contiene la lógica
    return this.domainService.calculateModuleCompletionPercentage(
      userProgress,
      totalActivities
    );
  }

  async isModuleCompleted(userId: number, moduleId: number): Promise<boolean> {
    const userProgress = await this.port.getProgressByUserIdAndModuleId(
      userId,
      moduleId
    );
    const totalActivities = await this.port.countActivitiesByModuleId(moduleId);

    return this.domainService.isModuleCompleted(userProgress, totalActivities);
  }

  async getModuleAverageScore(
    userId: number,
    moduleId: number
  ): Promise<number> {
    const userProgress = await this.port.getProgressByUserIdAndModuleId(
      userId,
      moduleId
    );
    // Delegamos el cálculo al Domain Service que ya tiene la lógica
    return this.domainService.calculateAverageScore(userProgress);
  }

  async getUserStatistics(userId: number) {
    const allProgress = await this.port.getProgressByUserId(userId);

    return this.domainService.calculateUserStatistics(allProgress);
  }

  async canUserRetryActivity(
    userId: number,
    activityId: number,
    maxAttempts: number = 3
  ): Promise<boolean> {
    const progress = await this.port.getProgressByUserIdAndActivityId(
      userId,
      activityId
    );

    if (!progress) return true; // Si no hay progreso previo, puede intentar

    return this.domainService.canRetryActivity(progress, maxAttempts);
  }
}
