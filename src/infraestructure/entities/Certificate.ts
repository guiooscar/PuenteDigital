import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User.js";
import { Module } from "./Module.js";


@Entity('certificates')
export class Certificate {
  @PrimaryGeneratedColumn()
  id_certificate!: number;

  // Relación ManyToOne: Muchos certificados pueden pertenecer a un usuario
  // Un usuario puede tener múltiples certificados (uno por módulo completado)
  @ManyToOne(() => User, user => user.certificates)
  @JoinColumn({ name: "id_user" })
  user!: User;

  // Relación ManyToOne: Muchos certificados pueden ser del mismo módulo
  // Un módulo puede tener múltiples certificados (uno por usuario que lo completó)
  @ManyToOne(() => Module, module => module.certificates)
  @JoinColumn({ name: "id_module" })
  module!: Module;

  // Fecha de creación del certificado (equivale a la fecha de emisión)
  // Se establece automáticamente al crear el registro
  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at!: Date;
}
