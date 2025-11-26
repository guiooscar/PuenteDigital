import { Progress } from "../Progress.js";

// Domain Service: contiene toda la lógica de negocio relacionada con Progress
export class ProgressDomainService {
  
  
   
  calculateModuleCompletionPercentage(userProgress: Progress[], totalActivities: number): number {
    if (totalActivities === 0) return 0;
    
    const completedActivities = userProgress.filter(p => p.completed).length;
    return Math.round((completedActivities / totalActivities) * 100);
  }

  isModuleCompleted(userProgress: Progress[], totalActivities: number): boolean {
    if (totalActivities === 0) return false;
    
    const completedActivities = userProgress.filter(p => p.completed).length;
    return completedActivities === totalActivities;
  }

  calculateAverageScore(userProgress: Progress[]): number {
    if (userProgress.length === 0) return 0;
    
    const totalScore = userProgress.reduce((sum, p) => sum + p.score, 0);
    return Math.round(totalScore / userProgress.length);
  }

  canRetryActivity(progress: Progress, maxAttempts: number = 3): boolean {
    return progress.attempts < maxAttempts;
  }

  isActivityPassed(progress: Progress, passingScore: number = 70): boolean {
    return progress.score >= passingScore;
  }

  calculateUserStatistics(allProgress: Progress[]): {
    totalActivities: number;
    completedActivities: number;
    averageScore: number;
    totalAttempts: number;
  } {
    return {
      totalActivities: allProgress.length,
      completedActivities: allProgress.filter(p => p.completed).length,
      averageScore: this.calculateAverageScore(allProgress),
      totalAttempts: allProgress.reduce((sum, p) => sum + p.attempts, 0)
    };
  }

  // Validamos que los datos de progreso sean correctos antes de guardar
   
  validateProgressData(progress: Partial<Progress>): void {
    if (progress.score !== undefined && (progress.score < 0 || progress.score > 100)) {
      throw new Error("El score debe estar entre 0 y 100");
    }

    if (progress.attempts !== undefined && progress.attempts < 0) {
      throw new Error("Los intentos no pueden ser negativos");
    }
  }
}
