import { Activity } from "./Activity.js";

export interface ActivityPort {
  createActivity(activity: Omit<Activity, 'id'>): Promise<number>;
  updateActivity(id: number, activity: Partial<Activity>): Promise<boolean>;
  deleteActivity(id: number): Promise<boolean>;
  getActivityById(id: number): Promise<Activity | null>;
  getActivitiesByModuleId(moduleId: number): Promise<Activity[]>;
  getAllActivities(): Promise<Activity[]>;
}