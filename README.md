¡Por supuesto! A continuación, te presento una versión **actualizada, profesional y detallada** de tu archivo `README.md` para el proyecto **“Puente Digital”**, incorporando:

- ✅ La migración completa a **PostgreSQL** (no MySQL).
- ✅ La estructura de carpetas **real de tu proyecto** (`application`, `infrastructure/adapters`, etc.).
- ✅ Instrucciones claras para **ejecutar el proyecto desde cero**.
- ✅ Aviso sobre **`ExecutionPolicy` en Windows**.
- ✅ Uso del archivo `.env.example` incluido en el repositorio.
- ✅ Confirmación de que el backend está listo para los **Sprints 1–3**.

---

# 🌉 Puente Digital

**Plataforma digital de alfabetización tecnológica para adultos de Chía, Cundinamarca**

Este proyecto busca **reducir la brecha digital** mediante una aplicación educativa backend que ofrece una API REST segura, escalable y mantenible, orientada a la formación en competencias digitales básicas, intermedias y funcionales para adultos.

> **Meta alineada**: ODS 4.4 — Asegurar que todos los jóvenes y adultos adquieran conocimientos y competencias para el empleo, el emprendimiento y la ciudadanía digital.

---

## 📌 Descripción General

**Puente Digital** es un **backend en Node.js** desarrollado con **arquitectura hexagonal**, que gestiona:
- Registro y autenticación de usuarios (con JWT)
- Asignación de niveles mediante prueba diagnóstica (HU03)
- Módulos de aprendizaje por nivel (básico, intermedio, funcional)
- Actividades interactivas (videos, cuestionarios, ejercicios)
- Seguimiento del progreso y estadísticas del usuario
- Emisión lógica de certificados digitales
- Gestión de contenidos por tutores/administradores


---

## 🏗 Arquitectura

El backend implementa rigurosamente la **arquitectura hexagonal (puertos y adaptadores)**, garantizando separación de responsabilidades y testabilidad:

- **Dominio** (`/src/domain`): Entidades y servicios de negocio puros.
- **Aplicación** (`/src/application`): Casos de uso (orquestación).
- **Infraestructura** (`/src/infrastructure`):
  - *Adaptadores de entrada*: Controladores Express.
  - *Adaptadores de salida*: Repositorios con TypeORM → **PostgreSQL**.
  - *Middleware*: Autenticación JWT, CORS.
  - *Utilidades*: Validación con Joi.



---

## 🛠 Tecnologías Utilizadas

| Capa                  | Tecnología               |
|-----------------------|--------------------------|
| Lenguaje              | TypeScript               |
| Framework Backend     | Express.js               |
| Base de Datos         | **PostgreSQL**           |
| ORM                   | TypeORM                  |
| Autenticación         | JWT + bcrypt             |
| Validación            | Joi                      |
| Gestión de entorno    | dotenv                   |
| Ejecución (dev)       | `tsx` + `nodemon`        |
| Pruebas               | postman                  |

---

## 🗂 Estructura del Proyecto

```
src/
├── domain/               # Entidades y puertos del dominio
├── application/          # Casos de uso (UserApplication, ProgressApplication, etc.)
├── infrastructure/
│   ├── adapters/         # Repositorios (UserAdapter, ModuleAdapter, etc.)
│   ├── controllers/      # Controladores Express
│   ├── routes/           # Definición de rutas
│   ├── util/             # Validación con Joi
│   ├── config/           # Conexión a PostgreSQL (.env)
│   └── middleware/       # authenticateToken
├── web/
│   └── app.ts            # Configuración de Express, CORS, rutas
└── index.ts              # Punto de entrada
```

---

## 🚀 Guía de Instalación y Ejecución

### Requisitos previos
- **Node.js** ≥ 18.x
- **npm** o **pnpm**
- **PostgreSQL** ≥ 12 (con pgAdmin 4 recomendado)
- Editor de código (VS Code recomendado)

### Paso 1: Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/puente-digital-backend.git
cd puente-digital-backend
```

### Paso 2: Instalar dependencias
```bash
npm install
```

### Paso 3: Configurar la base de datos en PostgreSQL
1. Abre **pgAdmin 4**.
2. Crea una base de datos llamada `puente_digital`.
3. Crea un **schema** llamado `puente_digital`.
4. Ejecuta el [script SQL de inicialización](#) (incluido en la documentación del proyecto) para crear las tablas y datos de prueba.

### Paso 4: Configurar variables de entorno
El proyecto incluye un archivo `.env.example`.  
**Renombrarlo a `.env`** y ajustar los valores si es necesario:

```ini
PORT=4001
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=tu_contraseña_de_postgres
DB_NAME=puente_digital
JWT_SECRET=PuenteDigital_Secret_2025_Seguro
```

> 🔑 **Importante**: No comprometas tu `.env` en Git. Ya está ignorado en `.gitignore`.

### Paso 5: Ejecutar en modo desarrollo
```bash
npm run dev
```
El servidor se levantará en: `http://localhost:4001`

---

## ⚠️ Solución de problemas comunes

### **Error en Windows: "ExecutionPolicy"**
Si al ejecutar `npm run dev` ves un error como:
> *`... no se puede cargar porque la ejecución de scripts está deshabilitada en este sistema...`*

**Solución**:
1. Abre **PowerShell como Administrador**.
2. Ejecuta:
   ```powershell
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```
3. Confirma con `Y` y vuelve a intentar `npm run dev`.

### **Error de conexión a PostgreSQL**
- Asegúrate de que el servicio de PostgreSQL esté **en ejecución**.
- Verifica que el **puerto** sea `5432`.
- Confirma que el usuario y contraseña en `.env` sean correctos.

---

## 📅 Estado del Proyecto (Scrum)

| Sprint | Estado    | Funcionalidades Completas |
|--------|-----------|----------------------------|
| **1**  | ✅ Listo  | Registro, Login, Diagnóstico (HU01–HU03) |
| **2**  | ✅ Listo  | Módulos, Actividades, Progreso (HU04–HU05) |
| **3**  | ✅ Listo  | Certificados, Gestión de Contenidos (HU06–HU07) |
| **4**  | 🚧 Pendiente | Reportes, Roles, Configuración Avanzada (HU08–HU09) |



**Docente**: Kellyn Johanna Delgado Jaimes  
**Curso**: Patrones, Estándares y Metodologías para la Construcción de Software  
**Institución**: Corporación Universitaria Minuto de Dios – UNIMINUTO  
**Programa**: Ingeniería de Sistemas  
**Equipo**: Grupo 8 

---

✅ **Listo para usar y evaluar** — Backend funcional, seguro y alineado con el Product Backlog.