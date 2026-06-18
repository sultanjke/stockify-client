# Stockify

![Project Status](https://img.shields.io/badge/status-active-green.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

## Table of Contents
- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [UI/UX Design](#uiux-design)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Setup](#environment-setup)
- [Running the Application](#running-the-application)
- [Deployment](#deployment)

## Project Overview

This is a complete Full Stack Inventory Management Dashboard Application designed to streamline business operations. It allows users to track inventory, manage products, monitor sales and purchases, and view expense summaries through an interactive dashboard.

The application is built using **Next.js** for a high-performance frontend, styled with **Tailwind CSS**, and utilizes **Material UI Data Grid** for handling complex datasets. State management is robustly handled by **Redux Toolkit** and **RTK Query**. The backend is powered by **Node.js** and **Express**, using **Prisma ORM** for seamless database interactions with PostgreSQL.

The project is deployed on **Render** (free tier) with PostgreSQL database.

## Tech Stack

### Frontend
- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **Language:** TypeScript
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Components:** [Material UI](https://mui.com/) (Data Grid, Base components)
- **State Management:** [Redux Toolkit](https://redux-toolkit.js.org/) & [RTK Query](https://redux-toolkit.js.org/rtk-query/overview)
- **Authentication:** [Clerk](https://clerk.com/)
- **Icons:** Lucide React
- **Charts:** Recharts
- **Utilities:** Numeral.js, UUID, Axios

### Backend
- **Runtime:** [Node.js](https://nodejs.org/)
- **Framework:** [Express.js](https://expressjs.com/)
- **Language:** TypeScript
- **ORM:** [Prisma](https://www.prisma.io/)
- **Database:** PostgreSQL
- **Security/Utils:** Helmet, Morgan, Body-parser, Cors

### Deployment (Render)
- **Backend:** Render Web Service (Node.js)
- **Frontend:** Render Web Service (Next.js)
- **Database:** Render PostgreSQL (free tier)

## Features

- **Dashboard:** Real-time overview of sales, purchases, expenses, and popular products.
- **Authentication:** Secure Sign-in/Sign-up with Clerk, including route protection.
- **User Management:** Admin-controlled user list with deletion capabilities.
- **Profile Settings:** Update user details, change passwords, and upload profile pictures.
- **Product Management:** Create new products, view ratings, and pricing.
- **Expense Tracking:** Categorized expense views and summaries.

## UI/UX Design

<img width="1918" height="961" alt="image" src="https://github.com/user-attachments/assets/183e27e8-3fa4-4944-8fa1-d29668b143e1" />

## Architecture

The application follows a client-server architecture:
- **Client:** Next.js application serving the UI and consuming APIs.
- **Server:** Node.js/Express REST API handling business logic and database operations.
- **Database:** PostgreSQL database managed via Prisma.

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- PostgreSQL (Local or Cloud)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/sultanjke/inventory-management-system.git
   cd inventory-management-system
   ```

2. **Install Server Dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install Client Dependencies**
   ```bash
   cd ../client
   npm install
   ```

### Environment Setup

#### Server (`server/.env`)
Create a `.env` file in the `server` directory:
```env
PORT=8000
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
```

#### Client (`client/.env.local`)
Create a `.env.local` file in the `client` directory:
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
```

### Database Setup
Navigate to the server directory and run the Prisma migrations and seed command:
```bash
cd server
npx prisma generate
npx prisma migrate dev --name init
npm run seed
```

## Running the Application

You can run both the client and server concurrently or in separate terminals.

**Option 1: Separate Terminals**

*Terminal 1 (Server):*
```bash
cd server
npm run dev
```

*Terminal 2 (Client):*
```bash
cd client
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Deployment

This project uses Render for hosting. A `render.yaml` Blueprint is included for easy deployment.

### Deploy to Render

1. **Create a Render account** at [render.com](https://render.com)

2. **Connect your repository** and use the Blueprint feature:
   - Go to Dashboard → New → Blueprint
   - Select this repository
   - Render will auto-detect `render.yaml` and create all services

3. **Set environment variables** in Render dashboard:
   - `CLERK_SECRET_KEY` - from Clerk dashboard
   - `CLERK_WEBHOOK_SECRET` - from Clerk webhook settings
   - `NEXT_PUBLIC_API_BASE_URL` - your server URL (e.g., `https://stockify-server.onrender.com`)
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - from Clerk dashboard

4. **Run database migrations** via Render shell:
   ```bash
   npx prisma migrate deploy
   npm run seed
   ```

5. **Update Clerk webhook URL** to `https://<your-server>.onrender.com/webhooks/clerk`

### Free Tier Notes
- Server spins down after 15 min inactivity (~30s cold start)
- PostgreSQL: 1GB storage, 90-day retention

### Keeping the App Awake (Free Tier)

Render free services spin down after 15 minutes of inactivity. The first visit then shows Render's "spinning up" interstitial. To avoid it, keep the **client** service warm with a free uptime monitor:

1. Create a free monitor on [UptimeRobot](https://uptimerobot.com) (or [cron-job.org](https://cron-job.org)).
2. Type: **HTTP(s)**, URL: `https://stockify-client.onrender.com/sign-in` (public page, returns 200 without an auth redirect).
3. Interval: **5 minutes** (under the 15-min spin-down threshold).

> Only the **client** is kept warm — keeping both services awake 24/7 (~1460 hrs/mo) would exceed the ~750 free instance-hours per workspace. The server is left to sleep; a built-in client-side loading screen (`ServerWakeGate`) polls `/health` and covers its cold start so users see a branded loader instead of a half-empty dashboard.

---
Contact me @ [Telegram](https://t.me/mecheyev)
