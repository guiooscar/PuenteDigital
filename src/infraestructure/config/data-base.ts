import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
// Importamos las entidades. Estas clases le dicen a TypeORM qué tablas existen en la base de datos y cómo lucen
import { User } from '../entities/User.js';
import { Module } from '../entities/Module.js';
import { Activity } from '../entities/Activity.js';
import { Progress } from '../entities/Progress.js';
import { Certificate } from '../entities/Certificate.js';
import envs from './environment-vars.js';

// Carga las variables de entorno desde el archivo .env
dotenv.config();
// creamos un nuevo DataSource de TypeORM que representa la conexión a la base de datos
export const AppDataSource = new DataSource({
  type: 'postgres',
  host: envs.DB_HOST,
  port: Number(envs.DB_PORT),
  username: envs.DB_USER,
  password: envs.DB_PASSWORD,
  database: envs.DB_NAME,
  schema: 'puente_digital',
  synchronize: true, 
  logging: true,
  entities: [User, Module, Activity, Progress, Certificate],
});
// ESta función se encarga de inicializar la conexión a la base de datos
export const connectDB = async () => {
  try {
    // tomamos el DataSource y llamamos a su método initialize para establecer la conexión
    await AppDataSource.initialize();
    console.log('Conectado a la base de datos!');
  } catch (err) {
    console.error('Error al conectar a la base de datos: ', err);
    // Si hay un error, salimos del proceso con un código de error
    process.exit(1);
  }
};