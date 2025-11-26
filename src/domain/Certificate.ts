export interface Certificate {
  id?: number;
  userId: number; // Referencia al usuario
  moduleId: number; // Referencia al módulo
  createdAt?: Date;
}
