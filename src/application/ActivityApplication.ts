import { Activity } from "../domain/Activity.js";
import { ActivityPort } from "../domain/ActivityPort.js";

// creamos la clase que maneja la lógica de negocio relacionada con las actividades
export class ActivityApplication {
  private port: ActivityPort;

  constructor(port: ActivityPort) {
    this.port = port;
  }

  async createActivity(activityData: Omit<Activity, "id" | "createdAt" | "updatedAt">): Promise<number> {
    const newActivity: Omit<Activity, "id"> = {
      ...activityData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    return this.port.createActivity(newActivity);
  }

  async getActivityById(id: number): Promise<Activity | null> {
    return this.port.getActivityById(id);
  }

  async getActivitiesByModuleId(moduleId: number): Promise<Activity[]> {
    return this.port.getActivitiesByModuleId(moduleId);
  }

  async getAllActivities(): Promise<Activity[]> {
    return this.port.getAllActivities();
  }

  async updateActivity(id: number, activity: Partial<Activity>): Promise<boolean> {
    return this.port.updateActivity(id, activity);
  }

  async deleteActivity(id: number): Promise<boolean> {
    return this.port.deleteActivity(id);
  }
}