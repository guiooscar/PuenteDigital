
# 🌉 Puente Digital

**Plataforma digital de alfabetización tecnológica para adultos de Chía, Cundinamarca**

Este proyecto busca **reducir la brecha digital** mediante una aplicación educativa backend que ofrece una API REST segura, escalable y mantenible, orientada a la formación en competencias digitales básicas, intermedias y funcionales para adultos.

> **Meta alineada**: ODS 4.4 — Asegurar que todos los jóvenes y adultos adquieran conocimientos y competencias para el empleo, el emprendimiento y la ciudadanía digital.

---

## 📌 Descripción General

**Puente Digital** es un **backend en Node.js** con arquitectura hexagonal, que gestiona:
- Registro y autenticación de usuarios (con JWT)
- Asignación de niveles mediante prueba diagnóstica
- Módulos de aprendizaje por nivel (básico, intermedio, funcional)
- Actividades interactivas (videos, cuestionarios, ejercicios)
- Seguimiento del progreso del usuario
- Emisión lógica de certificados digitales
- Gestión de contenidos por tutores/administradores

El proyecto está desarrollado siguiendo metodología **Scrum (Ágil)** y está dividido en **4 sprints** de 2 semanas cada uno.

---

## 🏗 Arquitectura

Este backend se construye bajo los siguientes principios:

- **Arquitectura Hexagonal (Puertos y Adaptadores)**
  - **Dominio**: Entidades y lógica de negocio independientes de frameworks.
  - **Caso de Uso**: Orquestación de la lógica del dominio.
  - **Adaptadores**:
    - *Entrada*: Controladores Express (API REST)
    - *Salida*: Repositorios con TypeORM → PostgreSQL

- **Patrón de Diseño Strategy**: Para rutas de aprendizaje personalizadas según el nivel inicial del usuario.

- **Separación de responsabilidades**: Código limpio, testeable y fácil de mantener.

---

## 🛠 Tecnologías Utilizadas

| Capa                  | Tecnología               |
|-----------------------|--------------------------|
| Lenguaje              | TypeScript               |
| Framework Backend     | Express.js               |
| Base de Datos         | PostgreSQL               |
| ORM                   | TypeORM                  |
| Autenticación         | JWT + bcrypt             |
| Validación            | Joi                      |
| Gestión de entorno    | dotenv                   |
| Ejecución (dev)       | `tsx` + `nodemon`        |
| Pruebas               | Jest + Supertest *(en desarrollo)* |

---

## 🗂 Estructura del Proyecto (en construcción)

```
src/
├── entities/             # Entidades del dominio (TypeORM)
├── domain/               # Lógica de negocio pura (interfaces, servicios)
├── use-cases/            # Casos de uso (interactors)
├── ports/                # Interfaces de los puertos (repositorios, servicios externos)
├── adapters/
│   ├── controllers/      # Adaptadores de entrada (Express)
│   └── repositories/     # Adaptadores de salida (TypeORM)
├── infraestructure/
│   ├── config/           # Configuración (DB, envs)
│   └── bootstrap/        # Inicialización del servidor
├── app.ts                # Configuración de Express
└── index.ts              # Punto de entrada
```

> **Nota**: En la primera entrega (Sprint 1), se prioriza la conexión a la base de datos y el modelo de entidades. La arquitectura hexagonal se implementará progresivamente en los sprints siguientes.

---

## 🚀 Instalación y Ejecución

### Requisitos previos
- Node.js ≥ 18.x
- npm o pnpm
- Servidor MySQL o PostgreSQL (actualmente en migración a PostgreSQL)
- phpMyAdmin / pgAdmin (opcional, para gestión visual)

### Pasos

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/puente-digital-backend.git
   cd puente-digital-backend
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   Copia el archivo `.env.example` a `.env` y ajusta los valores:
   ```env
   PORT=4000
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=postgres
   DB_PASSWORD=tu_contraseña
   DB_NAME=puente_digital
   JWT_SECRET=tu_secreto_jwt_seguro
   ```

4. **Ejecutar en desarrollo**
   ```bash
   npm run dev
   ```
   El servidor se levantará en: `http://localhost:4000`

5. **Generar build de producción**
   ```bash
   npm run build
   npm start
   ```

---

## 📅 Planificación (Scrum)

| Sprint | Objetivo Principal                           | Historias Clave                     |
|--------|----------------------------------------------|-------------------------------------|
| 1      | Registro, login y diagnóstico                | HU01, HU02, HU03                    |
| 2      | Acceso a módulos y actividades               | HU04, HU05                          |
| 3      | Progreso, certificados y gestión de contenidos | HU06, HU07                        |
| 4      | Reportes, roles y configuración avanzada     | HU08, HU09                          |

---



**Docente**: Kellyn Johanna Delgado Jaimes  
**Curso**: Patrones, Estándares y Metodologías para la Construcción de Software  
**Institución**: Corporación Universitaria Minuto de Dios – UNIMINUTO  
**Programa**: Ingeniería de Sistemas

