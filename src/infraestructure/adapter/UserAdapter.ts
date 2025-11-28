import { Repository } from "typeorm";
import { User as UserDomain } from "../../domain/User.js";
import { User as UserEntity } from "../entities/User.js";
import { UserPort } from "../../domain/UserPort.js";
import { AppDataSource } from "../config/data-base.js";

/**
 * UserAdapter: Implementación del puerto de Usuario en la capa de infraestructura.
 * 
 * Este adaptador traduce entre el modelo de dominio (UserDomain) y la entidad 
 * de base de datos (UserEntity), manteniendo el dominio independiente de TypeORM.
 * 
 * Responsabilidades:
 * - Implementar el contrato UserPort definido en el dominio
 * - Mapear datos entre el dominio y la base de datos
 * - Interactuar con TypeORM para persistencia
 */
export class UserAdapter implements UserPort {
  private userRepository: Repository<UserEntity>;

  constructor() {
    // Obtiene el repositorio de TypeORM asociado a la entidad UserEntity, AppDataSource es la conexión a la base de datos configurada previamente
    this.userRepository = AppDataSource.getRepository(UserEntity);
  }

  /**
   * Mapper: Convierte de Entidad de BD (UserEntity) → Modelo de Dominio (UserDomain)
   * 
   * Transforma los nombres de campos de la base de datos (snake_case: id_user, name_user)
   * a los nombres del dominio (camelCase: id, name).
   * 
   * Este mapeo permite que el dominio use nomenclatura limpia sin depender
   * de convenciones de base de datos.
   */
  private toDomain(user: UserEntity): UserDomain {
    return {
      id: user.id_user,                
      name: user.name_user,            
      email: user.email_user,          
      password: user.password_user,    
      level: user.level_user as 'basico' | 'intermedio' | 'funcional',  
      createdAt: user.created_at,      
      updatedAt: user.updated_at,      
    };
  }

  //Mapper: Convierte de Modelo de Dominio (UserDomain) → Entidad de BD (UserEntity)
  
  private toEntity(user: Omit<UserDomain, "id" | "createdAt" | "updatedAt">): UserEntity {
    const userEntity = new UserEntity();
    userEntity.name_user = user.name;        
    userEntity.email_user = user.email;      
    userEntity.password_user = user.password; 
    userEntity.level_user = user.level;      
    return userEntity;
  }

  // --- Implementación de los métodos del contrato UserPort ---

  async createUser(user: Omit<UserDomain, "id">): Promise<number> {
    try {
      // Mapea dominio → entidad
      const newUser = this.toEntity(user);
      
      // TypeORM persiste y retorna la entidad con el ID generado
      const savedUser = await this.userRepository.save(newUser);
      
      // Retorna solo el ID al dominio (cumple el contrato del Port)
      return savedUser.id_user;
    } catch (error) {
      console.error("Error creando el usuario:", error);
      throw new Error("Error al crear el usuario.");
    }
  }

  
  async updateUser(id: number, user: Partial<UserDomain>): Promise<boolean> {
    try {
      // Busca el usuario existente por el campo id_user de la BD
      const existingUser = await this.userRepository.findOne({ where: { id_user: id } });
      if (!existingUser) return false;

      // Object.assign realiza un merge: conserva valores existentes si no se proporciona nuevo valor
      // Usamos el operador ??  para mantener valores originales si vienen undefined
      Object.assign(existingUser, {
        name_user: user.name ?? existingUser.name_user,
        email_user: user.email ?? existingUser.email_user,
        password_user: user.password ?? existingUser.password_user,
        level_user: user.level ?? existingUser.level_user,
      });

      // TypeORM actualiza automáticamente el campo updated_at si está configurado
      await this.userRepository.save(existingUser);
      return true;
    } catch (error) {
      console.error("Error actualizando usuario:", error);
      throw new Error("Error al actualizar el usuario.");
    }
  }

  async deleteUser(id: number): Promise<boolean> {
    try {
      // Primero verifica que el usuario existe
      const existingUser = await this.userRepository.findOne({ where: { id_user: id } });
      if (!existingUser) return false;
      
      // DELETE físico (elimina el registro de la tabla)
      await this.userRepository.delete(id);
      return true;
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
      throw new Error("Error al eliminar el usuario.");
    }
  }


// Obtiene un usuario por su IDRetorna el modelo de dominio (UserDomain), no la entidad de BD 
   
  async getUserById(id: number): Promise<UserDomain | null> {
    try {
      // Busca en la BD usando el campo id_user de la entidad
      const user = await this.userRepository.findOne({ where: { id_user: id } });
      
      // Si existe, lo mapea a dominio; si no, retorna null
      return user ? this.toDomain(user) : null;
    } catch (error) {
      console.error("Error obteniendo usuario por ID:", error);
      throw new Error("Error al obtener el usuario.");
    }
  }

  

  async getUserByEmail(email: string): Promise<UserDomain | null> {
    try {
      // Busca en la BD usando el campo email_user de la entidad
      const user = await this.userRepository.findOne({ where: { email_user: email } });
      
      // Mapea a dominio si existe
      return user ? this.toDomain(user) : null;
    } catch (error) {
      console.error("Error obteniendo usuario por email:", error);
      throw new Error("Error al obtener el usuario por email.");
    }
  }

  //Obtiene todos los usuarios del sistema Mapea cada entidad de BD a modelo de dominio usando el mapper.
  
  async getAllUsers(): Promise<UserDomain[]> {
    try {
      // TypeORM retorna un array de UserEntity
      const users = await this.userRepository.find();
      
      // Mapea cada entidad a dominio usando toDomain
      return users.map(user => this.toDomain(user));
    } catch (error) {
      console.error("Error obteniendo todos los usuarios:", error);
      throw new Error("Error al obtener la lista de usuarios.");
    }
  }
}
