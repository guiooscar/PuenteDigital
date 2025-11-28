import { Repository } from "typeorm";
import { Activity as ActivityDomain } from "../../domain/Activity.js";
import { Activity as ActivityEntity } from "../entities/Activity.js";
import { ActivityPort } from "../../domain/ActivityPort.js";
import { AppDataSource } from "../config/data-base.js";

// creamos la clase ActivityAdapter que implementa el puerto ActivityPort
export class ActivityAdapter implements ActivityPort {
  private activityRepository: Repository<ActivityEntity>;

  constructor() {
    this.activityRepository = AppDataSource.getRepository(ActivityEntity);
  }

  // --- Mappers: Infraestructura ↔ Dominio ---
  private toDomain(activity: ActivityEntity): ActivityDomain {
    return {
      id: activity.id_activity,
      moduleId: activity.module.id_module,
      title: activity.title_activity,
      type: activity.type_activity as 'video' | 'quiz' | 'exercise',
      content: activity.content_activity ?? undefined,
      order: activity.order_activity,
      createdAt: activity.created_at,
      updatedAt: activity.updated_at,
    };
  }

  private toEntity(activity: Omit<ActivityDomain, "id" | "createdAt" | "updatedAt">): ActivityEntity {
    const activityEntity = new ActivityEntity();
    activityEntity.module = { id_module: activity.moduleId } as any; // Solo necesitamos el ID para la relación
    activityEntity.title_activity = activity.title;
    activityEntity.type_activity = activity.type;
    activityEntity.content_activity = activity.content ?? null;
    activityEntity.order_activity = activity.order;
    return activityEntity;
  }

  // --- Implementación de ActivityPort ---
  async createActivity(activity: Omit<ActivityDomain, "id">): Promise<number> {
    try {
      const newActivity = this.toEntity(activity);
      const savedActivity = await this.activityRepository.save(newActivity);
      return savedActivity.id_activity;
    } catch (error) {
      console.error("Error creando la actividad:", error);
      throw new Error("Error al crear la actividad.");
    }
  }

  async updateActivity(id: number, activity: Partial<ActivityDomain>): Promise<boolean> {
    try {
      const existingActivity = await this.activityRepository.findOne({ where: { id_activity: id } });
      if (!existingActivity) return false;
        // object.assign es un metodo que nos permite unir dos objetos
        // Usamos el operador ??  para mantener valores originales si vienen undefined
      Object.assign(existingActivity, {
        title_activity: activity.title ?? existingActivity.title_activity,
        type_activity: activity.type ?? existingActivity.type_activity,
        content_activity: activity.content ?? existingActivity.content_activity,
        order_activity: activity.order ?? existingActivity.order_activity,
        module: activity.moduleId ? { id_module: activity.moduleId } as any : existingActivity.module,
      });

      await this.activityRepository.save(existingActivity);
      return true;
    } catch (error) {
      console.error("Error actualizando actividad:", error);
      throw new Error("Error al actualizar la actividad.");
    }
  }

  async deleteActivity(id: number): Promise<boolean> {
    try {
      const result = await this.activityRepository.delete(id);
      return (result.affected ?? 0) > 0;
    } catch (error) {
      console.error("Error eliminando actividad:", error);
      throw new Error("Error al eliminar la actividad.");
    }
  }

  async getActivityById(id: number): Promise<ActivityDomain | null> {
    try {
      const activity = await this.activityRepository.findOne({ where: { id_activity: id } });
      return activity ? this.toDomain(activity) : null;
    } catch (error) {
      console.error("Error obteniendo actividad por ID:", error);
      throw new Error("Error al obtener la actividad.");
    }
  }

  async getActivitiesByModuleId(moduleId: number): Promise<ActivityDomain[]> {
    try {
      const activities = await this.activityRepository.findBy({ module: { id_module: moduleId } });
      return activities.map(activity => this.toDomain(activity));
    } catch (error) {
      console.error("Error obteniendo actividades por módulo:", error);
      throw new Error("Error al obtener actividades del módulo.");
    }
  }

  async getAllActivities(): Promise<ActivityDomain[]> {
    try {
      const activities = await this.activityRepository.find();
      return activities.map(activity => this.toDomain(activity));
    } catch (error) {
      console.error("Error obteniendo todas las actividades:", error);
      throw new Error("Error al obtener la lista de actividades.");
    }
  }
}