import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { User } from '../entities/User.js';
// no se usan {} porque es un archivo y no un modulo
import envs from '../config/environment-vars.js';
import { error } from 'console';    

dotenv.config();
export const AppDataSource = new DataSource({
    type: 'mysql',
    port: Number(envs.DB_PORT),
    username: envs.DB_USER,
    password: envs.DB_PASSWORD,
    database: envs.DB_NAME,
    synchronize: true,
    logging: true,
    entities: [User],
});

// metodo para conectar a la base de datos
export const connectDB = async () => {
    try {
        await AppDataSource.initialize();
        console.log('Conectado a la base de datos!');
    } catch (err) {
        console.error('Error al conectar a la base de datos: ', error);
        process.exit(1);
    }
};