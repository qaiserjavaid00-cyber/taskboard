# 📋 TaskBoard (Next.js 14)

A full-stack **Task Management Web App** built with **Next.js 14 (App Router)** featuring authentication, role-based authorization, protected routes, and API security using middleware.

---

## 🚀 Live Demo

Try it here:  
👉 https://taskboard-pi-seven.vercel.app/login

---

## 🧠 Tech Stack

- Next.js (App Router – Next.js 14)
- React
- MongoDB (Atlas)
- Axios
- React Query
- Vercel (deployment)
- JWT Authentication
- Middleware-based route protection

---

## ✨ Features

### 🔐 Authentication System
- Login / Register functionality
- JWT-based authentication
- HttpOnly cookies for security
- Refresh token support

---

### 🛡️ Security & Authorization
- Middleware-based API protection
- Protected routes for authenticated users
- Admin-only routes
- Role-based access control

---

### 📊 Task Management
- Create, update, delete tasks
- Assign tasks to users
- Project-based task grouping

---

### ⚙️ Full-Stack Architecture
- Next.js API Routes for backend logic
- MongoDB database integration
- Clean separation of services (API / UI / hooks)

---

## 🧱 Project Structure

```txt
/app
  /api          → API routes (backend logic)
  /dashboard    → Protected pages
  /login        → Auth pages
  /register

/components     → Reusable UI components
/hooks          → React Query hooks
/lib
  /api          → Axios API layer
  /auth         → JWT helpers
  /db           → MongoDB connection
  /models       → Mongoose models

/middleware.ts  → Route protection

## 🔐 Route Protection & Security System

This project implements a layered security system to protect both API routes and frontend pages.

---

### 🧠 Middleware Protection (Server-Level Security)

- Blocks unauthorized API access before request reaches route handlers
- Validates JWT tokens from HttpOnly cookies
- Prevents access to protected endpoints without authentication
- Centralized request filtering using Next.js Middleware

---

### 🧩 Frontend Route Guards

#### ProtectedRoute
- Restricts access to authenticated users only
- Redirects unauthenticated users to `/login`
- Prevents rendering of sensitive pages before auth validation

#### AdminRoute
- Restricts access to admin users only
- Used for admin dashboards and management features
- Role-based access control (RBAC)

---
## 🚀 Deployment

Deployed using **Vercel**

- Auto CI/CD from GitHub
- Environment variables configured in Vercel dashboard
- Optimized production deployment for Next.js 14

---

## 📌 Future Improvements

- 📌 Drag & drop task board
- ⚡ Real-time updates using WebSockets
- 🔔 Notifications system
- 📊 Activity logs
- 👥 Team collaboration features
- 📱 Mobile responsive enhancements
- 🧠 AI-powered task suggestions


## ⚙️ Environment Variables

Create a `.env.local` file in the root directory:

MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
REFRESH_SECRET=your_refresh_token_secret


git clone https://github.com/your-username/taskboard.git
cd taskboard
npm install
npm run dev
