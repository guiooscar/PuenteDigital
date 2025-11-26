export interface Module {
  id?: number;
  title: string;
  description?: string;
  level: 'basico' | 'intermedio' | 'funcional';
  order: number;
  createdAt?: Date;
  updatedAt?: Date;
}