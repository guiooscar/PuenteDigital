// Este puerto define como la aplicación interactúa con la entidad User
// Quien implemente esto, debe tener estos métodos con estos parámetros y tipos de retrno

import { User } from "./User.js";

export interface UserPort {
  createUser(user: Omit<User, "id">): Promise<number>;

  updateUser(id: number, user: Partial<User>): Promise<boolean>;

  deleteUser(id: number): Promise<boolean>;

  getUserById(id: number): Promise<User | null>;

  getUserByEmail(email: string): Promise<User | null>;

  getAllUsers(): Promise<User[]>;
}
