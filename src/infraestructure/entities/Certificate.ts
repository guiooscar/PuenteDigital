import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User.js";
import { Module } from "./Module.js";

@Entity({ name: 'certificates', schema: 'puente_digital' })
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
  created_at!: Date;
}