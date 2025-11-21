import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { User } from '../entities/User.js';
import { Module } from '../entities/Module.js';
import { Activity } from '../entities/Activity.js';
import { Progress } from '../entities/Progress.js';
import { Certificate } from '../entities/Certificate.js';
import envs from './environment-vars.js';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: envs.DB_HOST,
  port: Number(envs.DB_PORT),
  username: envs.DB_USER,
  password: envs.DB_PASSWORD,
  database: envs.DB_NAME,
  synchronize: true, 
  logging: true,
  entities: [User, Module, Activity, Progress, Certificate],
});

export const connectDB = async () => {
  try {
    await AppDataSource.initialize();
    console.log('Conectado a la base de datos!');
  } catch (err) {
    console.error('Error al conectar a la base de datos: ', err);
    process.exit(1);
  }
};