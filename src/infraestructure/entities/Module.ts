import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Activity } from "./Activity.js";
import { Certificate } from "./Certificate.js";

@Entity('modules')
export class Module {
  @PrimaryGeneratedColumn()
  id_module!: number;

  @Column({ type: "varchar", length: 255 })
  title_module!: string;

  @Column({ type: "text", nullable: true })
  description_module!: string | null;

  @Column({ type: "enum", enum: ['basico', 'intermedio', 'funcional'] })
  level_module!: string;

  @Column({ type: "int", default: 0 })
  order_module!: number;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at!: Date;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
  updated_at!: Date;

  @OneToMany(() => Activity, activity => activity.module)
  activities!: Activity[];

  @OneToMany(() => Certificate, certificate => certificate.module)
  certificates!: Certificate[];
}