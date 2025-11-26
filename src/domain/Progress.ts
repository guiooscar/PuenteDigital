export interface Progress {
  id?: number;
  userId: number; 
  activityId: number; 
  completed: boolean;
  score: number; 
  attempts: number;
  lastAttemptDate?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}