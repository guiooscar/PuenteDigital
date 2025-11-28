import { Repository } from "typeorm";
import { Progress as ProgressDomain } from "../../domain/Progress.js";
import { Progress as ProgressEntity } from "../entities/Progress.js";
import { Activity as ActivityEntity } from "../entities/Activity.js";
import { ProgressPort } from "../../domain/ProgressPort.js";
import { AppDataSource } from "../config/data-base.js";

/**
 * ProgressAdapter: Adaptador de infraestructura para la entidad Progress.
 *
 * Esta clase es más compleja que otros adaptadores porque Progress tiene relaciones
 * ManyToOne con User y Activity, y necesita consultas que atraviesan múltiples tablas
 * (Progress → Activity → Module) para funcionalidades como el dashboard de progreso.
 *
 * Responsabilidades principales:
 * - Mapear entre el modelo de dominio y la entidad de TypeORM
 * - Manejar relaciones con User y Activity
 * - Ejecutar queries  para obtener progreso por módulo
 * - Contar actividades de un módulo (necesario para calcular porcentajes)
 */
export class ProgressAdapter implements ProgressPort {
  private progressRepository: Repository<ProgressEntity>;
  private activityRepository: Repository<ActivityEntity>;

  constructor() {
    this.progressRepository = AppDataSource.getRepository(ProgressEntity);
    this.activityRepository = AppDataSource.getRepository("Activity");
  }

  //Mapper: Convierte Entidad de BD → Modelo de Dominio

  private toDomain(progress: ProgressEntity): ProgressDomain {
    return {
      id: progress.id_progress,
      userId: progress.user.id_user,
      activityId: progress.activity.id_activity,
      completed: progress.completed,
      score: progress.score,
      attempts: progress.attempts,
      lastAttemptDate: progress.last_attempt_date ?? undefined,
      createdAt: progress.created_at,
      updatedAt: progress.updated_at,
    };
  }

  // Mapper: Convierte Modelo de Dominio → Entidad de BD

  private toEntity(
    progress: Omit<ProgressDomain, "id" | "createdAt" | "updatedAt">
  ): ProgressEntity {
    const progressEntity = new ProgressEntity();
    progressEntity.user = { id_user: progress.userId } as any;
    progressEntity.activity = { id_activity: progress.activityId } as any;
    progressEntity.completed = progress.completed;
    progressEntity.score = progress.score;
    progressEntity.attempts = progress.attempts;
    progressEntity.last_attempt_date = progress.lastAttemptDate ?? null;

    return progressEntity;
  }

  // --- Implementación de los métodos del contrato ProgressPort ---

  /**
   * Crea un nuevo registro de progreso
   *
   * Usado cuando un usuario intenta una actividad por primera vez.
   * TypeORM establece automáticamente las foreign keys basándose en los objetos
   * user y activity que creamos en toEntity().
   */
  async createProgress(progress: Omit<ProgressDomain, "id">): Promise<number> {
    try {
      const newProgress = this.toEntity(progress);
      const savedProgress = await this.progressRepository.save(newProgress);
      return savedProgress.id_progress;
    } catch (error) {
      console.error("Error creando progreso:", error);
      throw new Error("Error al registrar el progreso.");
    }
  }

  /**
   * Actualiza un progreso existente
   *
   * Usado cuando un usuario reintenta una actividad o completa una en curso. Solo actualiza los campos proporcionados (merge parcial).
   *
   * Casos de uso típicos:
   * - Incrementar attempts cuando el usuario reintenta
   * - Actualizar score con el nuevo puntaje obtenido
   * - Marcar completed: true cuando finaliza exitosamente
   */
  async updateProgress(id: number,progress: Partial<ProgressDomain>): Promise<boolean> {
    try {
      const existingProgress = await this.progressRepository.findOne({
        where: { id_progress: id },
      });
      if (!existingProgress) return false;

      // Merge: mantiene valores existentes si no se proporciona nuevo valor
      Object.assign(existingProgress, {
        completed: progress.completed ?? existingProgress.completed,
        score: progress.score ?? existingProgress.score,
        attempts: progress.attempts ?? existingProgress.attempts,
        last_attempt_date:
          progress.lastAttemptDate ?? existingProgress.last_attempt_date,
      });

      await this.progressRepository.save(existingProgress);
      return true;
    } catch (error) {
      console.error("Error actualizando progreso:", error);
      throw new Error("Error al actualizar el progreso.");
    }
  }

  /**
   * Elimina un registro de progreso (poco común, pero incluido para completitud)
   *
   * Maneja correctamente el caso donde result.affected puede ser null, undefined o number.
   * El operador ?? convierte null/undefined en 0 para una comparación segura.
   */
  async deleteProgress(id: number): Promise<boolean> {
    try {
      const result = await this.progressRepository.delete(id);
      // Manejo seguro de null/undefined en result.affected
      return (result.affected ?? 0) > 0;
    } catch (error) {
      console.error("Error eliminando progreso:", error);
      throw new Error("Error al eliminar el registro de progreso.");
    }
  }

  /**
   * Obtiene un registro de progreso por su ID
   */
  async getProgressById(id: number): Promise<ProgressDomain | null> {
    try {
      const progress = await this.progressRepository.findOne({
        where: { id_progress: id },
        // TypeORM carga automáticamente las relaciones user y activity
        // necesarias para el mapper toDomain()
        relations: ["user", "activity"],
      });
      return progress ? this.toDomain(progress) : null;
    } catch (error) {
      console.error("Error obteniendo progreso por ID:", error);
      throw new Error("Error al obtener el progreso.");
    }
  }

  /**
   * Busca el progreso específico de un usuario en una actividad
   *
   * Usado para verificar si un usuario ya intentó una actividad antes de crear
   * un nuevo registro, o para actualizar el progreso existente.
   *
   * Las condiciones where con objetos anidados buscan por foreign keys:
   * user: { id_user: userId } → WHERE user_id = userId
   */
  async getProgressByUserIdAndActivityId(userId: number,activityId: number): Promise<ProgressDomain | null> {
    try {
      const progress = await this.progressRepository.findOne({
        where: {
          user: { id_user: userId },
          activity: { id_activity: activityId },
        },
        // relations almacena un arreglo de relaciones ManyToOne a cargar 
        relations: ["user", "activity"],
      });
      return progress ? this.toDomain(progress) : null;
    } catch (error) {
      console.error(
        "Error obteniendo progreso por usuario y actividad:",
        error
      );
      throw new Error(
        "Error al obtener el progreso del usuario en la actividad."
      );
    }
  }

  /**
   * Obtiene todo el historial de progreso de un usuario
   *
   * Usado para mostrar el dashboard completo del usuario con todas sus actividades.
   * Soporta HU05: visualizar progreso general del estudiante.
   */
  async getProgressByUserId(userId: number): Promise<ProgressDomain[]> {
    try {
      const progresses = await this.progressRepository.find({
        where: { user: { id_user: userId } },
        relations: ["user", "activity"],
      });
      return progresses.map((p) => this.toDomain(p));
    } catch (error) {
      console.error("Error obteniendo progreso por usuario:", error);
      throw new Error("Error al obtener el historial de progreso del usuario.");
    }
  }

  /**
   * Obtiene todos los registros de progreso del sistema para el rol admin 
   */
  async getAllProgress(): Promise<ProgressDomain[]> {
    try {
      const progresses = await this.progressRepository.find({
        relations: ["user", "activity"],
      });
      return progresses.map((p) => this.toDomain(p));
    } catch (error) {
      console.error("Error obteniendo todo el progreso:", error);
      throw new Error("Error al obtener todos los registros de progreso.");
    }
  }

  /**
   * Obtiene el progreso de un usuario en un módulo específico
   *
   * Requiere unir 3 tablas (Progress → Activity → Module)
   *
   * Por qué usamos QueryBuilder en lugar de find():
   * - Progress tiene relación con Activity, pero NO directamente con Module porque progress no tiene una columna module_id directa
   * - Activity tiene relación con Module
   * - Necesitamos filtrar Progress por un campo de Module (id_module)
   *
   * El QueryBuilder construye:
   * SELECT progress.*
   * FROM progress
   * INNER JOIN activity ON progress.activity_id = activity.id_activity
   * WHERE progress.user_id = :userId
   * AND activity.module_id = :moduleId
   *
   * Esta query es esencial para:
   * - HU05: Mostrar progreso por módulo
   * - HU06: Calcular % de avance antes de emitir certificado
   */
  async getProgressByUserIdAndModuleId(userId: number,moduleId: number): Promise<ProgressDomain[]> {
    try {
      const progresses = await this.progressRepository
        .createQueryBuilder("progress")
        // innerJoin sólo devuelve filas donde exista actividad relacionada (si hay un progress sin activity, se excluye).
        .innerJoin("progress.activity", "activity")
        // Filtra por el usuario (tabla progress)
        .where("progress.user.id_user = :userId", { userId })
        // Filtra por el módulo (tabla activity)
        .andWhere("activity.module.id_module = :moduleId", { moduleId })
        // Carga las relaciones necesarias para el mapper
        .leftJoinAndSelect("progress.user", "user")
        .leftJoinAndSelect("progress.activity", "act")
        .getMany();

      return progresses.map((p) => this.toDomain(p));
    } catch (error) {
      console.error("Error obteniendo progreso por usuario y módulo:", error);
      throw new Error("Error al obtener el progreso del usuario en el módulo.");
    }
  }

  /**
   * Cuanta cuántas actividades tiene un módulo
   *
   * ACOPLAMIENTO LEVE CON ACTIVITY:
   * Este método cruza el límite del agregado Progress para obtener información
   * del agregado Activity. En una arquitectura más estricta, esto se resolvería:
   * Acceso directo al repository de Activity (más simple para Sprint 1)
   *
   * Necesario en HU06: Para determinar si el usuario completó el 100% antes de emitir certificado
   */
  async countActivitiesByModuleId(moduleId: number): Promise<number> {
    try {
      const count = await this.activityRepository.count({
        where: { module: { id_module: moduleId } },
      });
      return count;
    } catch (error) {
      console.error("Error contando actividades por módulo:", error);
      throw new Error("Error al contar las actividades del módulo.");
    }
  }
}
