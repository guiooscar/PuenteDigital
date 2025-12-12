import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Progress } from "./Progress.js";
import { Certificate } from "./Certificate.js";

@Entity({ name: 'users', schema: 'puente_digital' })
export class User {
  @PrimaryGeneratedColumn()
  id_user!: number;

  @Column({ type: "varchar", length: 255 })
  name_user!: string;

  @Column({ type: "varchar", length: 255, unique: true })
  email_user!: string;

  @Column({ type: "varchar", length: 255 })
  password_user!: string;

  @Column({ type: "enum", enum: ["basico", "intermedio", "funcional"], default: "basico" })
  level_user!: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at!: Date;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" }) 
  updated_at!: Date;

  @OneToMany(() => Progress, progress => progress.user)
  progress!: Progress[];

  @OneToMany(() => Certificate, certificate => certificate.user)
  certificates!: Certificate[];
}