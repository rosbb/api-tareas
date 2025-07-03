# API de Gestión de Tareas

API RESTful para la gestión de tareas, desarrollada con **Node.js**, **Express** y **MySQL**.

Permite:
- Registro e inicio de sesión de usuarios
- Autenticación con JWT y refresh tokens
- Operaciones CRUD sobre tareas protegidas por roles de usuario (admin/user)

---

## Requisitos previos

- [Node.js](https://nodejs.org/) >= 14.x
- [MySQL](https://www.mysql.com/)

---

## Instalación

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/rosbb/api-tareas.git
   cd api-tareas
   ```

2. **Instala las dependencias:**
   ```bash
   npm install
   ```

---

## Uso

1. **Inicia el servidor:**
   ```bash
   npm start
   ```
   El servidor estará disponible en `http://localhost:8000` (o el puerto configurado).

2. **Endpoints principales:**
   - `POST /auth/register` — Registro de usuario
   - `POST /auth/login` — Inicio de sesión y obtención de tokens
   - `POST /auth/refresh` — Renovar token de acceso
   - `GET /tasks` — Listar tareas (requiere autenticación)
   - `POST /tasks` — Crear tarea (requiere autenticación)
   - `PUT /tasks/:id` — Actualizar tarea (requiere autenticación y permisos)
   - `DELETE /tasks/:id` — Eliminar tarea (requiere autenticación y permisos)

3. **Autenticación:**
   - Usa el token JWT en el header `Authorization: Bearer <token>` para acceder a los endpoints protegidos.
   - Los roles de usuario determinan el acceso a ciertas operaciones (admin/user).


