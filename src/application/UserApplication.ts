import { User } from "../domain/User.js";
import { UserPort } from "../domain/UserPort.js";

export class UserApplication {
  private port: UserPort;

  constructor(port: UserPort) {
    this.port = port;
  }

  //Registra un nuevo usuario. El nivel se asigna por defecto como 'basico'hasta que se complete el diagnóstico (HU03).
   
  async registerUser(userData: Omit<User, "id" | "level" | "createdAt" | "updatedAt">): Promise<number> {
    // Validar que el email no exista
    const existingUser = await this.port.getUserByEmail(userData.email);
    if (existingUser) {
      throw new Error("El email ya está registrado");
    }

    // Asignar nivel inicial por defecto (será actualizado tras diagnóstico)
    const newUser: Omit<User, "id"> = {
        // ...userData indica que se copian todas las propiedades de userData
      ...userData,
      level: "basico", // Valor por defecto. Se actualizará con assignInitialLevel()
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return this.port.createUser(newUser);
  }

  //Simula la lógica del diagnóstico y asigna el nivel correcto, cuando hagamos una implementación real, se recibiría las respuestas del test.
  async assignInitialLevel(userId: number, testScore: number): Promise<string> {
    const user = await this.port.getUserById(userId);
    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    let assignedLevel: 'basico' | 'intermedio' | 'funcional';
    if (testScore >= 80) {
      assignedLevel = "funcional";
    } else if (testScore >= 50) {
      assignedLevel = "intermedio";
    } else {
      assignedLevel = "basico";
    }

    await this.port.updateUser(userId, { level: assignedLevel });
    return assignedLevel;
  }

  // métodos CRUD 
  async getUserById(id: number): Promise<User | null> {
    return this.port.getUserById(id);
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.port.getUserByEmail(email);
  }

  async getAllUsers(): Promise<User[]> {
    return this.port.getAllUsers();
  }

  async updateUser(id: number, user: Partial<User>): Promise<boolean> {
    const existingUser = await this.port.getUserById(id);
    if (!existingUser) {
      throw new Error("Usuario no encontrado");
    }

    if (user.email) {
      const emailTaken = await this.port.getUserByEmail(user.email);
      if (emailTaken && emailTaken.id !== id) {
        throw new Error("El email ya está registrado por otro usuario");
      }
    }

    return this.port.updateUser(id, user);
  }

  async deleteUser(id: number): Promise<boolean> {
    return this.port.deleteUser(id);
  }
}


