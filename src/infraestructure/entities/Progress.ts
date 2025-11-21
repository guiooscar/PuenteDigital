import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User.js";
import { Activity } from "./Activity.js";

@Entity('progress')
export class Progress {
  @PrimaryGeneratedColumn()
  id_progress!: number;

  @ManyToOne(() => User, user => user.progress)
  @JoinColumn({ name: "id_user" })
  user!: User;

  @ManyToOne(() => Activity, activity => activity.progress)
  @JoinColumn({ name: "id_activity" })
  activity!: Activity;

  @Column({ type: "boolean", default: false })
  completed!: boolean;

  @Column({ type: "decimal", precision: 3, scale: 2, default: 0.00 })
  score!: number;

  @Column({ type: "int", default: 0 })
  attempts!: number;

  @Column({ type: "timestamp", nullable: true })
  last_attempt_date!: Date | null;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at!: Date;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
  updated_at!: Date;
}