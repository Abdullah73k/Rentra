# Property Management Application

[PLACEHOLDER: Dashboard overview showing property analytics and tenant status]

## Project Overview

This is a production-grade, full-stack property management platform designed to close the gap between basic spreadsheets and complex enterprise software. It provides a unified interface for portfolio management, multi-currency financial reporting, and secure document handling.

**Engineering Team**
This application was architected and built by a collaborative team of two (myself and my brother). It serves as a demonstration of our ability to deliver a complex, real-world product from requirements gathering through to deployment, utilizing strict version control and code review practices.

## Technical Goals & Engineering Decisions

Specifically designed to demonstrate modular architecture and full-stack type safety, this project emphasizes:

- **End-to-End Type Safety**: Unifying the frontend and backend with TypeScript and shared Zod schemas. This eliminates mismatched API contracts and reduces runtime errors significantly.
- **Separation of Concerns**: A strict monorepo structure separating the React client (SPA) from the Node.js API (Stateless), allowing for independent scaling and distinct build pipelines.
- **Security-First Architecture**: Implementing `BetterAuth` for session management and standardizing on HTTP-only cookies to mitigate XSS risks, rather than storing tokens in local storage.
- **Infrastructure as Code**: Fully containerized environment using Docker ensures that development, staging, and production environments are identical, eliminating "works on my machine" issues.

## System Architecture

[PLACEHOLDER: High-level system architecture diagram showing Client, Server, Database, and Object Storage interactions]

The system is composed of three primary blocks:

1.  **Client Layer (`/client`)**: Built with **React** and **Vite**. It uses **TanStack Query** for efficient server-state caching and **Zustand** for transient client-side state. The UI follows a component-driven design using **shadcn/ui** and **Tailwind CSS**.
2.  **Service Layer (`/server`)**: A RESTful API built with **Express** and **TypeScript**. It leverages **Drizzle ORM** for high-performance SQL queries against a **PostgreSQL** database.
3.  **Data & Storage**: **PostgreSQL** (via Supabase) serves as the primary relational store, while private buckets handle document blobs. Access to sensitive documents is brokered via short-lived signed URLs.

## Authentication & Security Flow

We prioritized a secure, low-maintenance auth strategy suitable for sensitive tenant data.

[PLACEHOLDER: Sequence diagram illustrating the secure login and session refresh flow]

- **Authentication**: Implemented via BetterAuth.
- **Transport Security**: All sensitive data is encrypted in transit; API endpoints are rate-limited using `express-rate-limit`.
- **Validation**: Zod schemas validate every request body and query parameter at the controller level before reaching business logic.
- **Secrets**: Zero-trust secret management using **Doppler**; no `.env` files are tracked in git.

## Production Readiness

The application is not a prototype; it is built to run.

- **Reliability**: CI pipelines run linting and compile checks on every commit.
- **Scalability**: The stateless backend can be horizontally scaled behind a load balancer. Support for mobile is architected via CapacitorJS.
- **Maintainability**: Strict Eslint rules and Prettier configuration ensure code consistency across the team.

## Tech Stack

### Frontend Engineering

- **Core**: React 19, TypeScript, Vite
- **State**: TanStack Query (Server Store), Zustand (Client Store)
- **UI/UX**: Tailwind CSS, shadcn/ui, Recharts, Framer Motion
- **Forms**: React Hook Form with Zod resolvers

### Backend Engineering

- **Runtime**: Node.js ecosystem
- **Framework**: Express (chosen for stability and middleware ecosystem)
- **Database**: PostgreSQL, managed via Drizzle ORM
- **Auth**: BetterAuth
- **Validation**: Zod (shared with frontend)

### DevOps & Tooling

- **Containerization**: Docker, Docker Compose
- **CI/Workflow**: Husky, Commitlint, Jira (Kanban)
- **Secrets**: Doppler

## Analytics & Reporting

The platform aggregates financial data across portfolios to generate real-time performance reports.

[PLACEHOLDER: Graph showing monthly revenue trends vs expenses]

## Development Workflow

As a two-person team, we established a professional workflow to maintain velocity and code quality:

1.  **Kanban Management**: Tasks tracked via Jira sprints.
2.  **Conventional Commits**: Enforced commit message standards for automated changelog generation.
3.  **Feature Branching**: All code merges via Pull Request, ensuring peer review (my brother and I reviewing each other's code) before hitting the main branch.

## Running Locally

The project is fully containerized for a consistent development environment.

### Prerequisites

- **Docker & Docker Compose**: Ensure Docker Desktop is running.
- **Doppler CLI**: Required for injecting secrets into the containers.
- **Node.js**: (Optional) If you wish to run outside of Docker.

### Steps

1.  **Clone the repository**

    ```bash
    git clone https://github.com/your-username/property-management.git
    cd property-management
    ```

2.  **Configure Secrets**
    Ensure you have access to the Doppler project and your CLI is configured.

    ```bash
    doppler setup
    ```

3.  **Start the Application**
    Run the full stack (Frontend + Backend + Postgres) using Docker Compose.

    ```bash
    npm run compose:up
    ```

    - **Client**: http://localhost:5173
    - **Server**: http://localhost:4000

4.  **Stopping the App**
    ```bash
    npm run compose:down
    ```

## License

This project is open-source and available under the **MIT License**.
