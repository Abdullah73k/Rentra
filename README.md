<div align="center">

# 🏠 Rentra

**The open-source property management platform for independent landlords.**

Manage all your properties across multiple countries in one simple, secure place.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Drizzle-4169E1)](https://orm.drizzle.team/)

[Documentation](#documentation) · [Getting Started](#getting-started) · [Features](#features) · [Contributing](#contributing)

</div>

---

## What is Rentra?

Rentra is an open-source, self-hostable property management solution designed for **small landlords** and individuals who own a few rental properties—whether in one city or across multiple countries.

Most property management software is either too basic or too complex. Rentra fills the gap by offering:

- 🌍 **Multi-property, multi-currency support** — Manage properties in different countries with their respective currencies
- 🔒 **Privacy-first** — Self-host your data, no vendor lock-in
- 📱 **Cross-platform** — Web-first with mobile support via CapacitorJS (iOS & Android)
- 🧩 **Simple by design** — No bloated features, just what you need

> **Why open source?** Because your property data shouldn't be locked in someone else's SaaS. Fork it, customize it, run it on your own servers.

---

## Features

### Property Management
- ✅ Add and manage unlimited properties
- ✅ Track property details (bedrooms, bathrooms, size, furnishing, parking)
- ✅ Support for multiple property types (houses, apartments, villas, townhouses, duplexes, studios)
- ✅ Property photos and documentation

### Tenant Management
- ✅ Store tenant contact information
- ✅ Link tenants to properties
- ✅ Manage lease agreements (start/end dates, rent amounts, payment frequency)

### Financial Tracking
- ✅ Record income and expenses per property
- ✅ Multi-currency support
- ✅ Transaction categorization
- ✅ Loan and mortgage tracking (lender, term, interest rate, monthly payments)

### Document Storage
- ✅ Secure document uploads (contracts, receipts, legal documents)
- ✅ Documents linked to properties or tenants
- ✅ Private storage with signed URLs for secure access

### Security & Authentication
- ✅ Email/password authentication
- ✅ OAuth providers (Google, GitHub, Discord)
- ✅ Two-factor authentication (2FA)
- ✅ Passkey support
- ✅ Email verification & password reset

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 19, TypeScript, Vite, Tailwind CSS, shadcn/ui, TanStack Query |
| **Global State Management** | Zustand |
| **Backend** | Node.js, Express 5, TypeScript |
| **Database** | PostgreSQL (SupaBase) with Drizzle ORM |
| **Authentication** | BetterAuth (sessions, OAuth, 2FA, Passkeys) |
| **Validation** | Zod |
| **File Storage** | Supabase Storage (S3-compatible) |
| **Containerization** | Docker, Docker Compose |

---

## Getting Started

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/) & Docker Compose
- [Doppler CLI](https://docs.doppler.com/docs/install-cli) (for secret management)
- [Node.js 20+](https://nodejs.org/) & [pnpm](https://pnpm.io/) (optional, for local development)

### Quick Start with Docker

1. **Clone the repository**

   ```bash
   git clone https://github.com/Abdullah73k/Rentra.git
   cd Rentra
   ```

2. **Configure secrets**

   Rentra uses [Doppler](https://doppler.com) for secret management. Set up your project:

   ```bash
   doppler setup
   ```

   <details>
   <summary>Required environment variables</summary>

   ```
   # Authentication
   BETTER_AUTH_SECRET
   BETTER_AUTH_URL

   # Domains
   DEVELOPMENT_DOMAIN
   PRODUCTION_DOMAIN

   # OAuth Providers (optional)
   DISCORD_CLIENT_ID
   DISCORD_CLIENT_SECRET
   GITHUB_CLIENT_ID
   GITHUB_CLIENT_SECRET
   GOOGLE_CLIENT_ID
   GOOGLE_CLIENT_SECRET

   # Email
   GMAIL_APP_PASSWORD
   GMAIL_USER

   # Server
   PORT

   # Supabase
   SUPABASE_API_KEY
   SUPABASE_CONNECTION_STRING
   SUPABASE_POSTGRES_PASSWORD
   SUPABASE_PRIVATE_BUCKET_NAME
   SUPABASE_PUBLIC_BUCKET_NAME
   SUPABASE_SERVICE_ROLE_KEY
   SUPABASE_URL

   # Doppler (auto-injected)
   DOPPLER_CONFIG
   DOPPLER_ENVIRONMENT
   DOPPLER_PROJECT
   ```

   </details>

3. **Start the application**

   ```bash
   pnpm run compose:up
   ```

4. **Access the app**

   - 🌐 **Frontend**: http://localhost:5173
   - 🔌 **API**: http://localhost:4000

5. **Stop the application**

   ```bash
   pnpm run compose:down
   ```

### Local Development (without Docker)

<details>
<summary>Click to expand</summary>

1. **Install dependencies**

   ```bash
   # Root
   pnpm install

   # Client
   cd client && pnpm install

   # Server
   cd ../server && pnpm install
   ```

2. **Start the development servers**

   ```bash
   # Terminal 1 - Backend
   cd server
   pnpm run dev

   # Terminal 2 - Frontend
   cd client
   pnpm run dev
   ```

3. **Database migrations**

   ```bash
   cd server
   pnpm run drizzle
   ```

</details>

---

## Project Structure

```
Rentra/
├── client/                 # React frontend (Vite)
│   ├── src/
│   │   ├── components/     # UI components (shadcn/ui based)
│   │   ├── pages/          # Route pages
│   │   ├── stores/         # Zustand stores
│   │   ├── lib/            # Utilities, types, schemas
│   │   └── utils/          # HTTP client, auth utilities
│   └── Dockerfile
│
├── server/                 # Express backend
│   ├── src/
│   │   ├── controllers/    # Route handlers
│   │   ├── db/             # Database schemas & config
│   │   ├── middlewares/    # Auth, error handling, file upload
│   │   ├── repositories/   # Data access layer
│   │   ├── routes/         # API route definitions
│   │   ├── schemas/        # Zod validation schemas
│   │   └── services/       # Business logic
│   └── Dockerfile
│
├── docker-compose.yaml     # Container orchestration
└── package.json            # Root workspace config
```

---

## Documentation

- 📖 [API Documentation](./docs/api.md) *(coming soon)*
- 🏗️ [Architecture Overview](./docs/architecture.md) *(coming soon)*
- 🔐 [Security & Authentication](./docs/security.md) *(coming soon)*
- 📱 [Mobile Setup (CapacitorJS)](./docs/mobile.md) *(coming soon)*

---

## Contributing

We welcome contributions! Whether it's bug fixes, new features, or documentation improvements.

### How to Contribute

1. **Fork the repository**

2. **Create a feature branch**
   ```bash
   git checkout -b PM-00-Epic-Name-task/short-summary
   ```
   
   Branch format: `<JIRA-KEY>-<Epic-Name>-<task or bug>/<short-summary>`
   
   > For external contributors, always use `PM-00` as the Jira key.

3. **Make your changes** and commit using our commit format:
   ```bash
   git commit -m "PM-00[Epic-Name][task]: add new property export feature"
   ```
   
   Commit format: `<Jira-Key>[Epic-Name][task or bug]: <Concise explanation of what you did>`

4. **Push and open a Pull Request**

### Development Guidelines

- We use **ESLint** and **Prettier** for code formatting
- Commit messages are enforced via **Commitlint** and **Husky**
- All PRs should pass linting and type checks

---

## Current Status

🚧 **Currently working on:** 
   - Finishing iOS and Android mobile integration via CapacitorJS.
   - Resolving existing bugs and working towards 100% functionality in production.


---

## License

Rentra is open-source software licensed under the [MIT License](./LICENSE).

---

## Acknowledgments

Built with amazing open-source tools:

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Express](https://expressjs.com/)
- [Drizzle ORM](https://orm.drizzle.team/)
- [shadcn/ui](https://ui.shadcn.com/)
- [BetterAuth](https://better-auth.com/)
- [TanStack Query](https://tanstack.com/query)
- [Tailwind CSS](https://tailwindcss.com/)

---

<div align="center">

**[⬆ Back to Top](#-rentra)**

</div>
