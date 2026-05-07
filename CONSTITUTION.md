# PetStore Constitution

## Project Overview

**PetStore** is a full-stack e-commerce web application for selling pets — including dogs, cats, birds, and fish. The application provides a clean, minimal shopping experience with a modern, responsive UI and a robust, scalable backend API.

---

## Core Principles

### I. Clean Architecture & Separation of Concerns

The codebase is organized into two independent modules — `backend/` and `frontend/` — each with its own build system, dependencies, and deployment configuration. Backend exposes a RESTful API; frontend consumes it. No shared runtime code exists between the two. Each module must be independently buildable, testable, and deployable.

### II. API-First Design

All features begin as API contracts. The backend defines RESTful endpoints with clear request/response schemas before any frontend work begins. API versioning (`/gulles/v1/`) is mandatory from day one. All endpoints return consistent JSON response envelopes with proper HTTP status codes and error structures.

### III. Clean & Minimal UI

The user interface follows a **clean, minimal design** philosophy. Avoid visual clutter — use generous whitespace, consistent typography, and a restrained color palette. Every UI element must serve a purpose. Prefer simplicity and usability over decoration. Responsive design is non-negotiable; the app must work seamlessly on desktop, tablet, and mobile.

### IV. Security by Default

All user passwords are hashed with BCrypt. Authentication uses JWT tokens with short-lived access tokens and refresh token rotation. All API endpoints that modify data require authentication. Input validation occurs on both client and server. SQL injection, XSS, and CSRF protections are built-in via framework defaults and explicit configuration.

### V. Convention Over Configuration

Follow framework conventions and community best practices. Use Spring Boot auto-configuration where possible. Follow React component naming conventions (PascalCase). Use standard project layouts recognized by each ecosystem. Avoid custom abstractions when framework-provided solutions exist.

### VI. Simplicity & YAGNI

Start simple. Do not introduce patterns, libraries, or infrastructure that are not immediately needed. No premature optimization. No speculative generalization. Repository pattern is used for data access; service layer for business logic — no additional abstraction layers unless complexity demands it.

---

## Technology Stack

### Backend

| Layer | Technology | Version / Notes |
|---|---|---|
| **Language** | Java | 17+ (LTS) |
| **Framework** | Spring Boot | 3.x |
| **Database** | PostgreSQL | 15+ |
| **ORM** | Spring Data JPA / Hibernate | |
| **Security** | Spring Security + JWT | |
| **Build** | Maven | |
| **API Docs** | SpringDoc OpenAPI (Swagger) | |
| **Validation** | Jakarta Bean Validation | |
| **Migration** | Flyway | |

### Frontend

| Layer | Technology | Version / Notes |
|---|---|---|
| **Framework** | React | 18+ (Vite build) |
| **Styling** | Tailwind CSS | v3 |
| **Component Library** | MUI (Material UI) | v5+ |
| **State Management** | React Context + hooks (escalate to Zustand if needed) |
| **HTTP Client** | Axios | |
| **Routing** | React Router | v6+ |
| **Build Tool** | Vite | |

### Deployment

| Concern | Technology |
|---|---|
| **Platform** | Render |
| **Backend** | Render Web Service (Docker or native Java) |
| **Frontend** | Render Static Site |
| **Database** | Render PostgreSQL (managed) |
| **Environment Config** | Render environment variables |

---

## Project Structure

```text
petstore/
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/petstore/
│   │   │   │   ├── PetStoreApplication.java
│   │   │   │   ├── config/          # Security, CORS, app config
│   │   │   │   ├── controller/      # REST controllers
│   │   │   │   ├── dto/             # Request/Response DTOs
│   │   │   │   ├── exception/       # Global exception handling
│   │   │   │   ├── model/           # JPA entities
│   │   │   │   ├── repository/      # Spring Data repositories
│   │   │   │   └── service/         # Business logic services
│   │   │   └── resources/
│   │   │       ├── application.yml
│   │   │       ├── application-dev.yml
│   │   │       ├── application-prod.yml
│   │   │       └── db/migration/    # Flyway migrations
│   │   └── test/
│   │       └── java/com/petstore/   # Unit + integration tests
│   ├── pom.xml
│   ├── Dockerfile
│   └── render.yaml
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/                     # Axios instances & API calls
│   │   ├── assets/                  # Static images, icons
│   │   ├── components/              # Reusable UI components
│   │   │   ├── common/              # Buttons, inputs, cards
│   │   │   ├── layout/              # Navbar, Footer, Sidebar
│   │   │   └── pet/                 # Pet-specific components
│   │   ├── context/                 # React Context providers
│   │   ├── hooks/                   # Custom React hooks
│   │   ├── pages/                   # Route-level page components
│   │   ├── utils/                   # Helper functions
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css                # Tailwind directives + globals
│   ├── index.html
│   ├── tailwind.config.js
│   ├── vite.config.js
│   ├── package.json
│   └── Dockerfile
│
├── CONSTITUTION.md                  # This file
├── README.md
└── .gitignore
```

**Structure Decision**: Web application layout — `backend/` + `frontend/` as two independent deployable units.

---

## Data Model (Core Entities)

| Entity | Description | Key Attributes |
|---|---|---|
| **Pet** | A pet available for sale | name, species, breed, age, price, description, imageUrl, status (AVAILABLE / SOLD / PENDING) |
| **Category** | Pet category/species | name (DOG, CAT, BIRD, FISH), description |
| **User** | Registered customer or admin | email, password (hashed), firstName, lastName, role (CUSTOMER / ADMIN) |
| **Order** | A customer purchase order | user, orderItems, totalAmount, status (PENDING / CONFIRMED / SHIPPED / DELIVERED / CANCELLED), orderDate |
| **OrderItem** | Line item within an order | order, pet, quantity, price |
| **CartItem** | Item in a user's shopping cart | user, pet, quantity |

---

## API Design

### Endpoint Conventions

- Base path: `/gulles/v1/`
- Resource naming: plural nouns (`/pets`, `/orders`, `/categories`)
- Standard HTTP methods: `GET`, `POST`, `PUT`, `DELETE`
- Pagination: `?page=0&size=10&sort=price,asc`
- Filtering: query params (`?category=DOG&minPrice=100&maxPrice=500`)

### Core Endpoints

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/gulles/v1/pets` | Public | List/search pets with filtering & pagination |
| `GET` | `/gulles/v1/pets/{id}` | Public | Get pet details |
| `POST` | `/gulles/v1/pets` | Admin | Create a new pet listing |
| `PUT` | `/gulles/v1/pets/{id}` | Admin | Update a pet listing |
| `DELETE` | `/gulles/v1/pets/{id}` | Admin | Delete a pet listing |
| `GET` | `/gulles/v1/categories` | Public | List all categories |
| `POST` | `/gulles/v1/auth/register` | Public | Register new user |
| `POST` | `/gulles/v1/auth/login` | Public | Login, returns JWT |
| `GET` | `/gulles/v1/cart` | User | View cart |
| `POST` | `/gulles/v1/cart/items` | User | Add item to cart |
| `DELETE` | `/gulles/v1/cart/items/{id}` | User | Remove item from cart |
| `POST` | `/gulles/v1/orders` | User | Place order from cart |
| `GET` | `/gulles/v1/orders` | User | View user's orders |
| `GET` | `/gulles/v1/orders/{id}` | User | View order details |

### Response Envelope

```json
{
  "success": true,
  "data": { ... },
  "message": "Operation successful",
  "timestamp": "2026-05-05T08:00:00Z"
}
```

### Error Envelope

```json
{
  "success": false,
  "error": {
    "code": "PET_NOT_FOUND",
    "message": "Pet with ID 42 not found"
  },
  "timestamp": "2026-05-05T08:00:00Z"
}
```

---

## Design System

### Visual Principles

- **Color Palette**: Neutral base (slate/gray tones) with a warm accent color (amber/orange) for CTAs. Green for success, red for errors.
- **Typography**: Inter or system font stack. Limited font weights (400, 500, 600, 700).
- **Spacing**: 4px grid system via Tailwind. Generous padding and margins.
- **Cards**: Rounded corners (`rounded-xl`), subtle shadows, clean borders.
- **Layout**: Maximum content width of 1280px, centered. Responsive grid (1 col mobile → 2 col tablet → 3-4 col desktop).
- **Animations**: Subtle transitions on hover/focus (150-200ms). No gratuitous animations.

### Key UI Pages

1. **Home / Landing** — Hero section, featured pets, category navigation
2. **Pet Catalog** — Filterable grid of pet cards with pagination
3. **Pet Detail** — Full pet info, image, add-to-cart button
4. **Shopping Cart** — Cart items, quantities, total, checkout button
5. **Checkout / Order Confirmation** — Order summary and confirmation
6. **Auth Pages** — Login and Registration forms
7. **User Dashboard** — Order history
8. **Admin Panel** — CRUD management for pets and categories (stretch goal)

---

## Development Workflow

### Branching Strategy

- `main` — production-ready code
- `develop` — integration branch
- `feature/*` — individual features
- `fix/*` — bug fixes

### Code Quality

- Backend: Follow standard Java/Spring conventions. Use Lombok sparingly (prefer records for DTOs).
- Frontend: ESLint + Prettier enforced. Functional components only. Props destructuring. Named exports.
- Commit messages: Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`)

### Environment Management

- **Development**: `application-dev.yml` with local PostgreSQL or H2 in-memory
- **Production**: `application-prod.yml` with Render PostgreSQL connection via env vars
- All secrets via environment variables — never committed to source control

---

## Deployment Strategy (Render)

### Backend Deployment

- **Type**: Web Service
- **Build**: Docker or native Java buildpack
- **Start Command**: `java -jar target/*.jar`
- **Health Check**: `/gulles/v1/health`
- **Environment Variables**: `DATABASE_URL`, `JWT_SECRET`, `SPRING_PROFILES_ACTIVE=prod`

### Frontend Deployment

- **Type**: Static Site
- **Build Command**: `npm run build`
- **Publish Directory**: `dist`
- **Rewrite Rule**: `/* → /index.html` (SPA routing)
- **Environment Variables**: `VITE_API_BASE_URL`

### Database

- **Type**: Render Managed PostgreSQL
- **Connection**: Via `DATABASE_URL` env var injected into backend service

---

## Governance

- This constitution is the authoritative reference for all architectural and design decisions on the PetStore project.
- All code changes and pull requests must align with the principles defined here.
- Amendments to this constitution require documentation and team agreement.
- When in doubt, prefer simplicity, convention, and the YAGNI principle.

**Version**: 1.0.0 | **Ratified**: 2026-05-05 | **Last Amended**: 2026-05-05
