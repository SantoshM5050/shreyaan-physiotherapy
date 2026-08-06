<div align="center">

  <img src="frontend/assets/logo.png" alt="Shreyaan Physiotherapy Center Logo" width="100%" />

  # 🏥 SHREYAAN PHYSIOTHERAPY CENTER

  ### *Full-Stack Enterprise Medical Portal & Cloud-Native Content Management System*

  [![Live Website](https://img.shields.io/badge/Live%20Website-shreyaanphysiotherapycenter.in-0d9488?style=for-the-badge&logo=google-chrome&logoColor=white)](https://www.shreyaanphysiotherapycenter.in)
  [![GitHub Repository](https://img.shields.io/badge/GitHub-santoshm5050%2Fshreyaan--physiotherapy-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/SantoshM5050/shreyaan-physiotherapy)
  [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

  <br />

  [![Next.js 16](https://img.shields.io/badge/Next.js-16.2-black?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org/)
  [![React 19](https://img.shields.io/badge/React-19.0-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
  [![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
  [![Express.js](https://img.shields.io/badge/Express.js-4.21-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com/)
  [![MongoDB Atlas](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://www.mongodb.com/cloud/atlas)
  [![Cloudinary](https://img.shields.io/badge/Cloudinary-Media_CDN-3448C5?style=flat-square&logo=cloudinary&logoColor=white)](https://cloudinary.com/)

  <br />

  <a href="https://www.shreyaanphysiotherapycenter.in"><strong>🌐 Explore Live Website »</strong></a>
  &nbsp;•&nbsp;
  <a href="https://www.shreyaanphysiotherapycenter.in/doctor/login"><strong>🔐 Doctor CMS Login »</strong></a>
  &nbsp;•&nbsp;
  <a href="#-rest-api-overview"><strong>📡 API Documentation »</strong></a>

</div>

<br />

---

## 📸 Project Banner

![Shreyaan Physiotherapy Banner](frontend/assets/banner.png)

---

## 📌 Executive Summary

**Shreyaan Physiotherapy Center** is a production-grade, full-stack enterprise web application for a premier clinical physiotherapy practice led by **Dr. Sonam Maurya (BPTh, Mumbai University, Reg No. 10534)**. Structured as a clean **Full-Stack Monorepo**, the platform pairs an ultra-fast Next.js 16 frontend with an Express REST API backend and MongoDB Atlas cloud storage.

The platform includes dynamic care delivery channels (In-Clinic, Home Visit, Tele-Consultation), interactive symptom selectors, clinical recovery success stories, and a secure **Doctor CMS Workspace** featuring an embedded interactive **Live Website Preview Viewport** with device frame switchers.

> [!IMPORTANT]
> **Production Status**: Fully operational in production. Frontend built with **Next.js 16 Turbopack**, REST API microservice powered by **Node.js Express & MongoDB Atlas**, and Media Assets delivered via **Cloudinary CDN**.

---

## ⚡ Key Feature Highlights

### 🌐 Public Patient Web Application
- **🎯 Interactive Body Pain & Symptom Selector**: Visual body region checker (*Neck, Lumbar Disc, Knee/Hip, Shoulder, Ankle*) displaying common conditions, evidence-based therapies, and pre-filled WhatsApp consultation triggers.
- **🏥 3 Care Delivery Channels**: Clearly presented treatment modes (*In-Clinic Visit*, *Home Visit Physiotherapy*, *Online Tele-Consultation*).
- **⚡ Advanced Clinical Procedures**: Dedicated showcases for Dry Needling, Cupping Therapy, IFT & Electrotherapy, K-Taping, Spinal Traction & Decompression, and Maitland Joint Mobilization.
- **🏅 Patient Rehabilitation Success Stories**: Clinical outcome milestones featuring post-stroke gait rehab, non-surgical lumbar disc relief, and knee osteoarthritis recovery.
- **🧮 Treatment & Recovery Estimator**: Interactive calculator computing session counts, rehabilitation phases, and recovery timelines.
- **🏥 Clinic Amenities & Facilities Grid**: Icon showcase highlighting clinic setup, private consultation bays, advanced modalities, and free parking.
- **📲 Smart WhatsApp Care Selector**: Floating WhatsApp button with 1-click care mode selector and pre-filled messages.
- **🔍 Search Engine Optimization (SEO)**: Full JSON-LD `MedicalClinic` structured data, dynamic OpenGraph meta tags, `sitemap.xml`, and `robots.txt`.

### 🔐 Secure Doctor CMS Portal & Workspace
- **📱 Embedded Interactive Live Website Preview**: Dedicated CMS tab featuring live interactive website testing inside the dashboard with device frame switchers (**Desktop 100%**, **Tablet 768px**, **Mobile 375px**).
- **🎨 Persistent Dark Navy Sidebar Navigation**: Collapsible left sidebar featuring Doctor Bio (`Dr. Sonam Maurya • BPTh`), Clinic Branding, Navigation Links, Quick Post Creation, and Logout.
- **📝 Full Blog Article CRUD**: Create, edit, draft, publish, and delete clinical articles with custom category tags and SEO metadata.
- **☁️ Cloudinary Media Upload Pipeline**: Direct file upload integration converting local multipart media streams into secure Cloudinary HTTPS CDN URLs.
- **📊 Real-Time Analytics Overview**: Live stats cards tracking published articles, drafts, gallery media count, and doctor session timestamps.

---

## 📖 Table of Contents

- [📌 Executive Summary](#-executive-summary)
- [⚡ Key Feature Highlights](#-key-feature-highlights)
- [🛠️ Technology Stack](#️-technology-stack)
- [📸 Application Screenshots](#-application-screenshots)
- [🏗️ System Architecture](#️-system-architecture)
- [📁 Monorepo Folder Structure](#-monorepo-folder-structure)
- [📡 REST API Overview](#-rest-api-overview)
- [⚙️ Local Installation Guide](#️-local-installation-guide)
- [🔐 Environment Variables](#-environment-variables)
- [📜 License](#-license)
- [👨‍💻 Author & Maintainer](#-author--maintainer)

---

## 🛠️ Technology Stack

<details open>
<summary><strong>Frontend Core Engine (`frontend/`)</strong></summary>

| Technology                                          | Purpose                             | Version    |
| :-------------------------------------------------- | :---------------------------------- | :--------- |
| **[Next.js](https://nextjs.org/)**                  | React Framework & App Router Engine | `^16.2.11` |
| **[React](https://react.dev/)**                     | Component Library                   | `^19.0.0`  |
| **[TypeScript](https://www.typescriptlang.org/)**   | Static Type Safety & Path Aliases  | `^5.0.0`   |
| **[Tailwind CSS](https://tailwindcss.com/)**        | Utility-First Styling Framework     | `^3.4.1`   |
| **[Framer Motion](https://www.framer.com/motion/)** | Declarative Animation & Micro-Motion| `^12.4.7`  |
| **[Lucide React](https://lucide.dev/)**             | Vector Icon Library                 | `^0.475.0` |

</details>

<details open>
<summary><strong>Backend REST API Microservice (`backend/`)</strong></summary>

| Technology                                                                         | Purpose                                 | Version       |
| :--------------------------------------------------------------------------------- | :-------------------------------------- | :------------ |
| **[Node.js](https://nodejs.org/)**                                                 | Asynchronous JavaScript Runtime         | `v20.x`       |
| **[Express.js](https://expressjs.com/)**                                           | HTTP Web Application Framework          | `^4.21.2`     |
| **[MongoDB Atlas](https://www.mongodb.com/cloud/atlas)**                           | Cloud NoSQL Document Database           | Cloud Cluster |
| **[Mongoose](https://mongoosejs.com/)**                                            | Object Data Modeling (ODM)              | `^8.9.5`      |
| **[JSON Web Token](https://jwt.io/)**                                              | Stateless Access Token Authentication   | `^9.0.2`      |
| **[BcryptJS](https://github.com/dcodeIO/bcrypt.js)**                               | Password Hashing & Encryption           | `^2.4.3`      |
| **[Multer Cloudinary](https://github.com/dcfd90/multer-storage-cloudinary)**       | Multipart File Upload Stream Storage    | `^4.0.0`      |

</details>

---

## 📸 Application Screenshots

<div align="center">

### 🌐 Public Homepage & Hero Experience

![Homepage Screenshot](frontend/assets/home.png)

<br />

### 🔐 Doctor CMS Dashboard & Live Website Preview Viewport

![Doctor Dashboard Screenshot](frontend/assets/dashboard.png)

<br />

### 📰 Dynamic Health Blog Catalog

![Blog Catalog Screenshot](frontend/assets/blog.png)

<br />

### 🖼️ Clinic Photo Gallery & Lightbox

![Gallery Screenshot](frontend/assets/gallery.png)

</div>

---

## 📁 Monorepo Folder Structure

```
Shreyaan/
├── frontend/                # Next.js 16 Web Application & Doctor CMS
│   ├── app/                 # App Router Pages, Layouts & API proxies
│   │   ├── api/             # Serverless API proxy routes
│   │   ├── blog/            # Health blog catalog & [slug] pages
│   │   ├── contact/         # Contact & Appointment booking page
│   │   ├── doctor/          # Doctor CMS Portal (login & dashboard)
│   │   ├── gallery/         # Clinic photo gallery page
│   │   └── services/        # Service detail pages
│   ├── components/          # React UI Components
│   │   ├── 3d/              # 3D interactive Card3D & motion wrappers
│   │   ├── AboutSection.tsx # Doctor qualifications & profile card
│   │   ├── ClinicAmenities.tsx # Facilities & patient comfort grid
│   │   ├── ContactSection.tsx # Slot picker & Google Directions link
│   │   ├── FAQSection.tsx   # Searchable FAQ accordion
│   │   ├── FloatingActions.tsx # Smart WhatsApp care mode selector
│   │   ├── ProceduresSection.tsx # Specialized clinical procedures
│   │   ├── RecoveryStories.tsx # Patient rehabilitation milestones
│   │   ├── ServicesSection.tsx # 3-Channel care modes & services
│   │   ├── SymptomSelector.tsx # Interactive body pain checker
│   │   └── TreatmentCalculator.tsx # Recovery estimator widget
│   ├── lib/                 # Utilities, constants & API services
│   ├── types/               # TypeScript type definitions
│   ├── hooks/               # Custom React hooks
│   ├── public/              # Public static media & clinic images
│   ├── package.json         # Frontend dependencies & build scripts
│   └── tsconfig.json        # Path aliases (@/components, @/lib, etc.)
│
├── backend/                 # Node.js Express REST API Server
│   ├── src/
│   │   ├── config/          # MongoDB Atlas & Cloudinary SDK setup
│   │   ├── controllers/     # Auth, Blog & Gallery API controllers
│   │   ├── middleware/      # JWT protection & Multer Cloudinary storage
│   │   ├── models/          # Mongoose models (Blog, Doctor, Gallery)
│   │   └── routes/          # Express route definitions
│   ├── logs/                # Audit & security logs
│   ├── package.json         # Backend dependencies & scripts
│   └── .env                 # Database credentials & JWT secret
│
├── package.json             # Root Monorepo Orchestration Scripts
└── .gitignore               # Unified Monorepo gitignore
```

---

## ⚙️ Local Installation Guide

Follow these steps to set up and run the full-stack monorepo locally.

### 📋 Prerequisites

- **Node.js**: `v18.x` or `v20.x` installed
- **npm**: `v9.x` or higher
- **MongoDB**: A free **MongoDB Atlas** cluster URI
- **Cloudinary**: A free **Cloudinary** account (`Cloud Name`, `API Key`, `API Secret`)

### 1️⃣ Clone Repository

```bash
git clone https://github.com/SantoshM5050/shreyaan-physiotherapy.git
cd shreyaan-physiotherapy
```

### 2️⃣ Install Dependencies

Install root, frontend, and backend dependencies with a single command:

```bash
# Install root monorepo dependencies
npm install

# Install frontend dependencies
cd frontend && npm install && cd ..

# Install backend dependencies
cd backend && npm install && cd ..
```

---

## 🔐 Environment Variables

### 1️⃣ Backend Environment File (`backend/.env`)

Create `backend/.env`:

```env
PORT=5000
NODE_ENV=development

# MongoDB Atlas Connection URI
MONGO_URI=mongodb+srv://YOUR_USER:YOUR_PASSWORD@cluster0.wurtrpm.mongodb.net/shreyaan?retryWrites=true&w=majority

# JWT Authentication Secret
JWT_SECRET=YOUR_SECURE_JWT_SECRET_KEY
JWT_EXPIRES_IN=24h

# Allowed Client Origin (CORS)
CLIENT_URL=http://localhost:3000

# Cloudinary Cloud Storage Configuration
CLOUDINARY_CLOUD_NAME=YOUR_CLOUD_NAME
CLOUDINARY_API_KEY=YOUR_API_KEY
CLOUDINARY_API_SECRET=YOUR_API_SECRET

# Default Doctor Credentials
DEFAULT_DOCTOR_NAME=Dr. Sonam Maurya
DEFAULT_DOCTOR_EMAIL=doctor@example.com
DEFAULT_DOCTOR_PASSWORD=YOUR_SECURE_DOCTOR_PASSWORD
DEFAULT_DOCTOR_QUALIFICATION=BPTh (Mumbai University)
DEFAULT_DOCTOR_REGISTRATION=10534
```

---

### 3️⃣ Launch Monorepo Development Servers

Run both **Frontend** and **Backend** concurrently using the root monorepo script:

```bash
# Launch both Next.js Frontend (port 3000) and Express Backend (port 5000)
npm run dev
```

Alternatively, you can launch individual services:

```bash
# Launch Frontend only
npm run dev:frontend

# Launch Backend only
npm run dev:backend
```

---

## 📡 REST API Overview

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/login` | Public | Doctor login & JWT token issue |
| `GET` | `/api/auth/me` | Protected | Authenticated doctor profile |
| `GET` | `/api/blog` | Public | Fetch published health blogs |
| `POST` | `/api/blog` | Protected | Create blog with Cloudinary image upload |
| `PUT` | `/api/blog/:id` | Protected | Update existing blog post |
| `DELETE` | `/api/blog/:id` | Protected | Delete blog post |
| `GET` | `/api/gallery` | Public | Fetch clinic photo gallery |
| `POST` | `/api/gallery` | Protected | Upload gallery photo to Cloudinary |
| `DELETE` | `/api/gallery/:id` | Protected | Delete gallery photo |

---

## 📜 License

Distributed under the **MIT License**. See `LICENSE` for details.

---

## 👨‍💻 Author & Maintainer

**Dr. Sonam Maurya (BPTh, Mumbai University)**  
*Lead Physiotherapist & Clinical Director*  
Shreyaan Physiotherapy Center, Unchahar, Raebareli, UP 229406  
📞 **Phone**: [+91 9140574645](tel:+919140574645)
