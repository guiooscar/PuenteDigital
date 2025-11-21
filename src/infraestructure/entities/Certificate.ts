import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User.js";
import { Module } from "./Module.js";

@Entity('certificates')
export class Certificate {
  @PrimaryGeneratedColumn()
  id_certificate!: number;

  @ManyToOne(() => User, user => user.certificates)
  @JoinColumn({ name: "id_user" })
  user!: User;

  @ManyToOne(() => Module, module => module.certificates)
  @JoinColumn({ name: "id_module" })
  module!: Module;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  issued_date!: Date;

  @Column({ type: "date", nullable: true })
  valid_until!: Date | null;

  @Column({ type: "enum", enum: ['active', 'expired'], default: 'active' })
  status_certificate!: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at!: Date;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
  updated_at!: Date;
}