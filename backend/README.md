# Shreyaan Physiotherapy Center - Backend REST API Service

A modern Node.js + Express + MongoDB REST API backend service powering doctor authentication, blog publishing, and gallery management.

## 🚀 Getting Started

### Installation
```bash
cd backend
npm install
```

### Run Server in Development
```bash
npm run dev
```

### Seed Default Doctor Credentials
```bash
npm run seed
```

## 🔐 Environment Variables (`.env`)
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://127.0.0.1:27017/shreyaan_physiotherapy
JWT_SECRET=shreyaan-doctor-portal-secret-jwt-key-2026
JWT_EXPIRES_IN=24h
CLIENT_URL=http://localhost:3000
```

## 🛠️ REST API Documentation

### Doctor Authentication
- `POST /api/auth/login` - Authenticate doctor and retrieve JWT token.
- `POST /api/auth/logout` - Clear authentication session/cookies.
- `GET /api/auth/me` - Fetch authenticated doctor profile (Protected).

### Blog Module
- `GET /api/blog` - Retrieve published blogs (filter by `status`, `category`, `search`).
- `GET /api/blog/:slug` - Fetch single blog post by slug.
- `POST /api/blog` - Create new blog entry with optional featured image (Doctor Protected).
- `PUT /api/blog/:id` - Update existing blog entry (Doctor Protected).
- `DELETE /api/blog/:id` - Delete blog entry (Doctor Protected).

### Gallery Module
- `GET /api/gallery` - Retrieve gallery items (filter by `category`: Clinic, Treatment, Equipment).
- `POST /api/gallery` - Upload new gallery image entry (Doctor Protected).
- `PUT /api/gallery/:id` - Edit title/category of gallery item (Doctor Protected).
- `DELETE /api/gallery/:id` - Remove gallery image item (Doctor Protected).
