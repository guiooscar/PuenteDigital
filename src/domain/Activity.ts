export interface Activity {
  id?: number;
  moduleId: number; 
  title: string;
  type: 'video' | 'quiz' | 'exercise';
  content?: string;
  order: number;
  createdAt?: Date;
  updatedAt?: Date;
}