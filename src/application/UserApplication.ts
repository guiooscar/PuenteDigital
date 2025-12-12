import bcrypt from "bcryptjs";
import { User } from "../domain/User.js";
import { UserPort } from "../domain/UserPort.js";
import { AuthApplication } from "./AuthApplication.js";

export class UserApplication {
  private port: UserPort;

  constructor(port: UserPort) {
    this.port = port;
  }

  // HU02: Login seguro con JWT
  async login(email: string, password: string): Promise<string> {
    const user = await this.port.getUserByEmail(email);
    if (!user) {
      throw new Error("Credenciales inválidas");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Credenciales inválidas");
    }

    // Generar token con ID y email 
    const token = AuthApplication.generateToken({
      id: user.id,
      email: user.email,
    });

    return token;
  }

  // HU01: Registro con hashing de contraseña
  async registerUser(userData: Omit<User, "id" | "level" | "createdAt" | "updatedAt">): Promise<number> {
    const existingUser = await this.port.getUserByEmail(userData.email);
    if (existingUser) {
      throw new Error("El email ya está registrado");
    }

    // Hashear la contraseña antes de guardar
    const hashedPassword = await bcrypt.hash(userData.password, 12);
    const newUser: Omit<User, "id"> = {
      // los tres puntos copian las demás propiedades de userData
      ...userData,
      password: hashedPassword, 
      level: "basico", // Nivel inicial por defecto
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return this.port.createUser(newUser);
  }

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

  // --- Métodos CRUD ---
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

    // Si se actualiza la contraseña, hashearla
    if (user.password) {
      user.password = await bcrypt.hash(user.password, 12);
    }

    return this.port.updateUser(id, user);
  }

  async deleteUser(id: number): Promise<boolean> {
    return this.port.deleteUser(id);
  }
}