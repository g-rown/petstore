# Tasks: PetStore E-Commerce MVP

**Input**: Design documents from `/specs/001-petstore-mvp/`
**Prerequisites**: plan.md ✅ | spec.md ✅

---

## Phase 1: Setup (Shared Infrastructure)

- [x] T001 Create root directory structure
- [x] T002 [P] Initialize Maven project in `backend/`
- [x] T003 [P] Initialize Vite + React project in `frontend/`
- [x] T004 [P] Add all backend Maven dependencies to `pom.xml`
- [x] T005 [P] Install all frontend npm packages
- [x] T006 [P] Install and configure Tailwind CSS in `frontend/`
- [x] T007 [P] Create root `.gitignore`

---

## Phase 2: Foundation (Blocking Prerequisites)

### 2A — Backend Configuration
- [x] T008 Create `application.yml`
- [x] T009 [P] Create `application-dev.yml`
- [x] T010 [P] Create `application-prod.yml`
- [x] T011 Create `PetStoreApplication.java`

### 2B — Enums
- [x] T012 [P] Create `PetStatus` enum
- [x] T013 [P] Create `UserRole` enum
- [x] T014 [P] Create `OrderStatus` enum

### 2C — Flyway Migrations
- [x] T015 V1 categories table
- [x] T016 V2 pets table
- [x] T017 V3 users table
- [x] T018 V4 cart_items table
- [x] T019 V5 orders tables
- [x] T020 V6 seed data

### 2D — JPA Entities
- [x] T021 [P] `Category.java`
- [x] T022 [P] `Pet.java`
- [x] T023 [P] `User.java`
- [x] T024 [P] `CartItem.java`
- [x] T025 `Order.java`
- [x] T026 `OrderItem.java`

### 2E — Repositories
- [x] T027–T032 All repositories

### 2F — Security Infrastructure
- [x] T033 `JwtUtil.java`
- [x] T034 `JwtAuthenticationFilter.java`
- [x] T035 `UserDetailsServiceImpl.java`
- [x] T036 `SecurityConfig.java`
- [x] T037 `CorsConfig.java`

### 2G — Response Infrastructure
- [x] T038 `ApiResponse.java`
- [x] T039 `GlobalExceptionHandler.java`
- [x] T040 Custom exceptions

### 2H — Frontend Core
- [x] T041 `index.css`
- [x] T042 `axiosInstance.js`
- [x] T043 `AuthContext.jsx`
- [x] T044 `CartContext.jsx`
- [x] T045 `App.jsx`
- [x] T046 `vite.config.js`
- [x] T047 `.env` files

---

## Phase 3: US1 — Browse Pet Catalog (P1) 🎯

- [x] T048–T054 Backend (services, controllers, DTOs)
- [x] T055–T068 Frontend (pages, components)

## Phase 4: US2 — Authentication (P2)
- [x] T069–T078

## Phase 5: US3 — Shopping Cart (P3)
- [x] T079–T087

## Phase 6: US4 — Checkout (P4)
- [x] T088–T094

## Phase 7: US5 — Order History (P5)
- [x] T095–T097

## Phase 8: US6 — Admin (P6)
- [x] T098–T105

## Phase 9: Deployment & Polish
- [x] T106–T115
