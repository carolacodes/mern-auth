# MERN Auth App (JWT + Cookies)

Aplicación full-stack estilo MERN con autenticación completa (Register/Login), manejo de sesión mediante **JWT almacenado en cookies HTTP-only**, y gestión de usuarios en **MongoDB**. Incluye UI en **React** y API en **Node.js + Express**.

---

## ✨ Features

- ✅ Registro e inicio de sesión
- ✅ JWT para autenticación
- ✅ Cookie **HTTP-only** con el token (más seguro que localStorage)
- ✅ Rutas protegidas (requieren sesión)
- ✅ Perfil de usuario
- ✅ Editar perfil
- ✅ Eliminar cuenta
- ✅ Persistencia en MongoDB (Mongoose)
- ✅ Deploy:
  - Backend en **Render**
  - Frontend en **Vercel**

---

## 🧰 Tecnologías

### Frontend

- React (Vite)
- TailwindCSS
- shadcn/ui
- React Router
- React Hook Form
- Axios

### Backend

- Node.js
- Express
- MongoDB + Mongoose
- bcryptjs (hash de contraseñas)
- jsonwebtoken (JWT)
- cookie-parser (lectura/escritura de cookies)
- cors (CORS con credenciales)
- dotenv (variables de entorno)
- morgan (logs HTTP)

---

## 🏗️ Arquitectura (estructura del proyecto)

```
mern-auth/
├─ client/ # Frontend (React + Vite)
│ ├─ src/
│ ├─ index.html
│ ├─ vite.config.js
│ └─ vercel.json
├─ src/ # Backend (Node + Express)
│ ├─ app.js
│ ├─ index.js
│ ├─ db.js
│ ├─ models/
│ ├─ routes/
│ ├─ controllers/
│ └─ middlewares/
├─ package.json # Backend scripts/deps
└─ .env # (NO se sube a GitHub)

```
