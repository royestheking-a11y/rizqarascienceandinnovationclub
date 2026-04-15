# RSIC — Rizqara Science & Innovation Club

![RSIC Banner]https://scontent.fdac177-2.fna.fbcdn.net/v/t39.30808-6/668295022_122108989083285497_8939487573721088208_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=2a1932&_nc_ohc=w8srC6nMyCoQ7kNvwGkrItX&_nc_oc=AdrULMbxOXnr0rcWN2IHxdUj2QVMx7DYsFxRk-HH33lRYfeYy3xp5wNXdKPnr9XmkZM&_nc_zt=23&_nc_ht=scontent.fdac177-2.fna&_nc_gid=MDazgx9LU9RtAgeKVrZHwA&_nc_ss=7a3a8&oh=00_Af2cgd8M-v-zaPsaqp5_NxxaNlM0k_MdXUe_FS8fkC3W4A&oe=69E5B893

Welcome to the official digital platform of the **Rizqara Science & Innovation Club (RSIC)**. This is a premium, full-stack ecosystem designed to empower students through technology, science, and real-world innovation.

## 🚀 Project Overview

RSIC is more than just a club website—it's a comprehensive learning and management system. It features a project-driven curriculum, an AI-powered student dashboard, automated certificate verification, and a robust administrative control center.

### Core Modules
- **Student Dashboard**: Personalized activity tracking, enrollment management, and professional certificate claiming.
- **Innovation Programs**: Specialized tracks in **AI**, **Robotics**, **Programming**, and **Research**.
- **Portfolio Showcase**: High-quality project galleries and achievement displays (including our National Science Fair winner).
- **Admin Control Center**: A secure, multi-module dashboard for managing members, blog posts, events, and gallery assets.
- **Support & Global Reach**: Integrated system for donations and international support.

---

## 🛠️ Technology Stack

**Frontend**
- **Framework**: React 18 with Vite (Ultra-fast HMR)
- **Styling**: Tailwind CSS (Modern Utility-first)
- **Animations**: Framer Motion (Smooth high-end transitions)
- **Icons**: Lucide React
- **Notifications**: Sonner

**Backend**
- **Server**: Node.js & Express
- **Database**: MongoDB (via Mongoose)
- **Storage**: Local multipart uploads (Production host detection)
- **Validation**: Multer & Custom Middleware

---

## 💻 Local Development

Before you begin, ensure you have **Node.js** and **npm** installed.

### 1. Installation
Clone the repository and install dependencies in the root directory:
```bash
npm install
```

### 2. Backend Setup
Navigate to the `backend` folder and install dependencies:
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` folder with your MongoDB URI:
```env
MONGODB_URI=your_mongodb_atlas_connection_string
```

### 3. Running the App
From the root directory, you can run both the frontend and backend simultaneously:
```bash
npm run dev
```

---

## 🌐 Production Deployment

This project is optimized for a hybrid deployment: **Vercel** for the frontend and **Render** for the backend.

### Frontend (Vercel)
1. Set **Root Directory** to the project root.
2. Add the following **Environment Variable**:
   - `VITE_API_URL`: Your Render backend URL (e.g., `https://backend.onrender.com`)

### Backend (Render)
1. Set **Root Directory** to `backend`.
2. Add the following **Environment Variables**:
   - `MONGODB_URI`: Your MongoDB connection string.
   - `FRONTEND_URL`: Your Vercel frontend URL (for secure CORS).

> [!IMPORTANT]
> **SPA Routing**: The `vercel.json` file in the root ensures that deep-linking (e.g., `/dashboard`) works correctly on Vercel without 404 errors.

---

## 📁 Project Structure

```text
├── src/                 # React Frontend
│   ├── app/
│   │   ├── components/  # Reusable UI components
│   │   ├── data/        # Central API and Mock data
│   │   ├── pages/       # Page components (Home, Programs, etc.)
│   │   └── routes.tsx   # Application router
│   ├── styles/          # Global CSS and themes
│   └── main.tsx         # Entry point
├── backend/             # Node.js Backend
│   ├── config/          # Database configuration
│   ├── models/          # Mongoose Schemas
│   ├── server.js        # Main Express server
│   └── uploads/         # Local image storage
├── public/              # Static assets (Favicons, images)
└── vercel.json          # Deployment configuration
```

---

## 🛡️ Security Note

The Admin Panel is protected with secure credentials.
- **Admin Email**: `admin@rizqara.org`
- **Authorized Actions**: Only authenticated administrators can modify database records or access system logs.

---

## ✉️ Contact & Support

- **Email**: rizqarascienceandinnovationclub@gmail.com
- **Phone**: 0134-3042761
- **Location**: Dhaka, Bangladesh

© 2026 Rizqara Science & Innovation Club. Built with passion for future innovators.
