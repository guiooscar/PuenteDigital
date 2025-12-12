import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Module } from "./Module.js";
import { Progress } from "./Progress.js";

@Entity({ name: 'activities', schema: 'puente_digital' })
export class Activity {
  @PrimaryGeneratedColumn()
  id_activity!: number;

  @ManyToOne(() => Module, module => module.activities)
  @JoinColumn({ name: "id_module" })
  module!: Module;

  @Column({ type: "varchar", length: 255 })
  title_activity!: string;

  @Column({ type: "enum", enum: ["video", "quiz", "exercise"] })
  type_activity!: string;

  @Column({ type: "text", nullable: true })
  content_activity!: string | null;

  @Column({ type: "integer", default: 0 }) 
  order_activity!: number;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at!: Date;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" }) 
  updated_at!: Date;

  @OneToMany(() => Progress, progress => progress.activity)
  progress!: Progress[];
}