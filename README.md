# Dawx666 Web Portfolio & Admin Dashboard

Welcome to the **Dawx666 Web Portfolio**! This is a modern, full-stack Next.js web application featuring a stunning public portfolio/storefront and a secure admin dashboard to manage content.

## 🚀 Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **UI & Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Database:** [PostgreSQL](https://www.postgresql.org/) (via [Supabase](https://supabase.com/))
- **ORM:** [Prisma](https://www.prisma.io/)
- **Authentication:** [NextAuth.js](https://next-auth.js.org/)
- **State Management:** [Zustand](https://zustand-demo.pmnd.rs/)
- **Validation:** [Zod](https://zod.dev/)
- **Icons:** [Lucide React](https://lucide.dev/)

## ✨ Key Features

- **Public Storefront / Portfolio:** Beautiful public facing UI including a shop, cart functionality, and contact page.
- **Admin Dashboard:** Secure access to manage orders, products, and portfolio content.
- **Cart System:** Persistent client-side cart managed globally via Zustand.
- **Authentication:** Secure login for administrators using NextAuth and encrypted passwords.
- **Responsive Design:** Optimized for both desktop and mobile devices.

## 🛠️ Getting Started

Follow these instructions to set up the project locally on your machine.

### Prerequisites

- Node.js 18+ installed
- A PostgreSQL database (e.g., Supabase, Neon, or local Postgres)

### 1. Clone the repository

```bash
git clone https://github.com/dawx666studio/web-portfolio-with-admin-dashboard.git
cd web-portfolio-with-admin-dashboard
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

Create a new `.env` file in the root of your project based on the provided `.env.example`:

```bash
cp .env.example .env
```

Open `.env` and configure the following required variables:

- `DATABASE_URL`: Your PostgreSQL connection string.
- `NEXTAUTH_SECRET`: Generate a random string (e.g., using `openssl rand -base64 32`) or use the default for local development.
- `NEXTAUTH_URL`: Should be `http://localhost:3000` for local development.
- `ADMIN_EMAIL` & `ADMIN_PASSWORD`: Used to log in to the admin dashboard.

### 4. Setup the Database

Push the Prisma schema to your configured database:

```bash
npm run prisma:push
```

Generate the Prisma client:

```bash
npm run prisma:generate
```

*(Optional)* You can view your database at any time using Prisma Studio:
```bash
npm run prisma:studio
```

### 5. Start the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application!

## 🔐 Admin Access

To access the admin dashboard, navigate to the `/admin` route or the login page.
Use the credentials you defined in your `.env` file:

- **Email:** `admin@dawx666.com` (default)
- **Password:** `admin123456` (default)
