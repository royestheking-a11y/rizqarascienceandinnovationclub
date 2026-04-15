# RSIC — Backend API

This is the Node.js/Express backend server for the Rizqara Science & Innovation Club platform.

## ⚙️ Tech Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose)
- **File Handling**: Multer
- **Security**: CORS, Environment-based secrets

## 🚀 Getting Started

### 1. Installation
```bash
npm install
```

### 2. Configuration
Create a `.env` file in this directory:
```env
MONGODB_URI=your_mongodb_atlas_uri
FRONTEND_URL=http://localhost:5173  # Change to your Vercel URL in production
PORT=5555
```

### 3. Development
```bash
npm run dev
```

### 4. Seed Data
To populate the database with initial mock data:
```bash
npm run seed
```

## 📡 API Endpoints

### 📁 Common Resources
| Route | Method | Description |
|---|---|---|
| `/api/projects` | GET | Fetch all projects |
| `/api/programs` | GET | Fetch all programs |
| `/api/events` | GET | Fetch all upcoming events |
| `/api/members` | GET | Admin: List all members |

### ⬆️ File Uploads
- **Endpoint**: `POST /api/upload`
- **Field**: `image`
- **Max Size**: 5MB

---

## ☁️ Deployment (Render)
- **Primary Branch**: `main`
- **Root Directory**: `backend`
- **Build Command**: `npm install`
- **Start Command**: `npm start`
