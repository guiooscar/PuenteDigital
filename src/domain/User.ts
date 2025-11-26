// En la arquitectura hexagonal, la entidad User en el dominio debe reflejar la lógica de negocio, no la estructura de la base de datos.
// Por lo tanto, se definen solo los atributos esenciales que representan a un usuario en el sistema. 
// La transformación entre el dominio y la persistencia (TypeORM) la realizaremos en la capa de los adaptadores.
export interface User {
  id?: number; 
  name: string;
  email: string;
  password: string;
  level: 'basico' | 'intermedio' | 'funcional'; // Nivel del usuario según HU03
  createdAt?: Date;
  updatedAt?: Date;
}