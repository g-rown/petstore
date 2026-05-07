# Feature Specification: PetStore E-Commerce Application

**Feature Branch**: `001-petstore-mvp`  
**Created**: 2026-05-05  
**Status**: Draft  
**Input**: User description: "Build a full-stack e-commerce application named PetStore that allows users to browse and purchase pets through a clean, minimal UI, featuring a categorized catalog with tile-based previews, a detailed view for each pet, and a secure shopping cart and checkout system. The backend must be a Spring Boot 3 REST API using PostgreSQL for data persistence, while the frontend is a responsive React application built with Vite, Tailwind CSS, and Material UI, ensuring all operations follow an API-first design with strict JWT-based security and a clear separation of concerns. The application organizes the inventory into top-level categories like Dogs, Cats, Birds, and Fish, ensuring a flat and simple navigation structure where users can easily filter and view pet listings across all device types."

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Browse Pet Catalog (Priority: P1)

As a visitor, I want to browse pets organized by category (Dogs, Cats, Birds, Fish) so that I can discover available pets without needing to create an account.

I land on the home page and immediately see a hero section with a call-to-action and the four pet categories displayed as prominent navigation tiles. I click on "Dogs" and the catalog page opens, showing a responsive grid of pet cards — each displaying a photo, name, breed, age, and price. I can sort by price or name, paginate through results, and click any card to open the full pet detail view with a larger image, full description, and an "Add to Cart" button.

**Why this priority**: Browsing is the core value proposition. Without a working catalog, no other feature (cart, checkout, orders) has purpose. This story alone delivers a functional storefront that showcases inventory.

**Independent Test**: Can be fully tested by seeding the database with sample pets across all four categories, loading the home page, navigating categories, applying filters, paginating, and verifying the detail page renders complete pet information.

**Acceptance Scenarios**:

1. **Given** the database contains 20+ pets across 4 categories, **When** a visitor loads the home page, **Then** the visitor sees a hero section, featured pets, and four category navigation tiles (Dogs, Cats, Birds, Fish).
2. **Given** the visitor is on the home page, **When** they click the "Dogs" category tile, **Then** the catalog page displays only pets where `category = DOG`, shown as a responsive card grid.
3. **Given** the catalog page is showing Dogs, **When** the visitor clicks "Sort by Price (Low to High)", **Then** the pet cards reorder by ascending price.
4. **Given** the catalog has more than 12 pets in a category, **When** the visitor scrolls to the bottom, **Then** pagination controls appear allowing navigation to the next page of results.
5. **Given** the visitor is on the catalog page, **When** they click a pet card, **Then** the pet detail page opens showing: large image, name, breed, age, price, description, availability status, and an "Add to Cart" button.
6. **Given** the visitor is on any page, **When** they resize the browser to mobile width (< 768px), **Then** the layout adjusts responsively — pet cards stack into a single column, the navbar collapses to a hamburger menu, and all content remains accessible.

---

### User Story 2 — User Registration & Authentication (Priority: P2)

As a visitor, I want to register for an account and log in so that I can add pets to my cart and place orders.

I click "Sign Up" in the navbar and fill out a registration form with my name, email, and password. After submitting, I'm logged in and redirected to the catalog. Later, I return and click "Log In", enter my credentials, and gain access to my cart and order history. My session persists across page refreshes via a stored JWT.

**Why this priority**: Authentication is a prerequisite for cart, checkout, and order management. It must exist before any transactional user story can function.

**Independent Test**: Can be tested by registering a new account, verifying the JWT is returned and stored, logging out, logging back in, and confirming protected routes are accessible only when authenticated.

**Acceptance Scenarios**:

1. **Given** the visitor is not authenticated, **When** they click "Sign Up" in the navbar, **Then** a registration form is displayed with fields: first name, last name, email, and password (with confirmation).
2. **Given** the visitor fills the registration form with valid data, **When** they submit, **Then** a new user account is created, a JWT is returned, the user is automatically logged in, and they are redirected to the catalog page.
3. **Given** the visitor submits a registration form with an already-registered email, **When** the server responds, **Then** a clear error message is displayed: "An account with this email already exists."
4. **Given** a registered user is on the login page, **When** they enter valid credentials and submit, **Then** a JWT access token is returned, stored in `localStorage`, and the user is redirected to their previous page or the catalog.
5. **Given** a user is authenticated, **When** they refresh the page, **Then** their session persists — the navbar shows their name and they retain access to protected routes.
6. **Given** a user is authenticated, **When** they click "Log Out", **Then** the JWT is cleared, the navbar reverts to showing "Log In / Sign Up", and protected routes redirect to the login page.
7. **Given** a visitor enters incorrect credentials, **When** they submit the login form, **Then** a generic error message is displayed: "Invalid email or password."

---

### User Story 3 — Shopping Cart Management (Priority: P3)

As an authenticated user, I want to add pets to my shopping cart, adjust quantities, and remove items so that I can prepare my purchase before checkout.

From a pet detail page, I click "Add to Cart." A badge on the cart icon in the navbar updates to reflect the new count. I click the cart icon and see a cart page listing all items with their image, name, price, and quantity controls. I can increase/decrease quantities or remove items. The subtotal updates in real-time. The cart persists across sessions because it's stored server-side.

**Why this priority**: The cart is the bridge between browsing and purchasing. Without it, there is no path to conversion.

**Independent Test**: Can be tested by logging in, adding multiple pets to the cart from different categories, adjusting quantities, removing an item, verifying the subtotal calculates correctly, refreshing the page and confirming cart state persists.

**Acceptance Scenarios**:

1. **Given** a user is authenticated and viewing a pet detail page for an available pet, **When** they click "Add to Cart", **Then** the pet is added to their server-side cart, a success toast notification appears, and the navbar cart badge increments by 1.
2. **Given** the user already has a pet in their cart, **When** they try to add the same pet again, **Then** a message indicates "This pet is already in your cart" (pets are unique items, quantity is always 1).
3. **Given** a user has 3 items in their cart, **When** they navigate to the cart page, **Then** they see a list of all 3 items with: pet image thumbnail, name, breed, price, and a "Remove" button for each item.
4. **Given** a user is on the cart page with items, **When** they click "Remove" on an item, **Then** the item is removed from the cart, the cart badge decrements, and the subtotal recalculates.
5. **Given** a user has items in their cart, **When** they log out and log back in, **Then** their cart contents are preserved (server-side persistence).
6. **Given** a user has an empty cart, **When** they visit the cart page, **Then** they see an empty state with a message "Your cart is empty" and a link back to the catalog.

---

### User Story 4 — Checkout & Order Placement (Priority: P4)

As an authenticated user with items in my cart, I want to place an order so that I can purchase my selected pets.

From the cart page, I click "Proceed to Checkout." I see an order summary listing all items and the total. I click "Place Order." The system creates the order, clears my cart, and shows an order confirmation page with an order number and summary. The pets I ordered are marked as SOLD/PENDING and no longer appear as AVAILABLE to other users.

**Why this priority**: Checkout is the transaction completion — it converts cart contents into a persisted order. This is the primary business outcome of the application.

**Independent Test**: Can be tested by adding items to a cart, proceeding to checkout, placing the order, verifying the order appears in order history, the cart is emptied, and the purchased pets are no longer listed as available.

**Acceptance Scenarios**:

1. **Given** a user has 2 items in their cart totaling $650, **When** they click "Proceed to Checkout", **Then** an order summary page displays the 2 items, individual prices, and the total of $650.
2. **Given** the user is on the checkout summary page, **When** they click "Place Order", **Then** a new order is created with status CONFIRMED, the cart is cleared, and an order confirmation page displays the order number, items, and total.
3. **Given** the user places an order for Pet A, **When** another user browses the catalog, **Then** Pet A's status is SOLD and it no longer appears in the available catalog listings.
4. **Given** a user has no items in their cart, **When** they try to navigate directly to `/checkout`, **Then** they are redirected to the cart page with a message "Add items to your cart before checkout."

---

### User Story 5 — Order History (Priority: P5)

As an authenticated user, I want to view my past orders so that I can track my purchase history.

I click "My Orders" in the navbar dropdown. I see a list of all my past orders, each showing the order number, date, total, status, and number of items. I click on an order to expand its details and see the individual pets I purchased.

**Why this priority**: Order history provides post-purchase value and is essential for a complete e-commerce experience, but it does not block any other user story.

**Independent Test**: Can be tested by placing multiple orders across separate sessions, navigating to the order history page, verifying all orders are listed with correct details, and expanding each to verify line items.

**Acceptance Scenarios**:

1. **Given** a user has placed 3 orders, **When** they navigate to "My Orders", **Then** they see a list of 3 orders sorted by date (newest first), each showing: order number, date, total, status, and item count.
2. **Given** the user is on the orders page, **When** they click on an order row, **Then** the order expands to show the individual pets purchased with name, breed, and price.
3. **Given** a user has no orders, **When** they visit "My Orders", **Then** they see an empty state: "You haven't placed any orders yet" with a link to the catalog.

---

### User Story 6 — Admin Pet Management (Priority: P6)

As an administrator, I want to create, update, and delete pet listings so that I can manage the store's inventory.

I log in with an admin account and see an "Admin" link in the navbar. I click it and see a table of all pets with search and filter options. I can add a new pet by filling out a form (name, species/category, breed, age, price, description, image URL, status). I can edit existing pets inline or via an edit form. I can delete pets that are no longer available.

**Why this priority**: Admin functionality is essential for a production store but is not part of the customer-facing MVP flow. It can be built after the customer journey is complete.

**Independent Test**: Can be tested by logging in as admin, creating a new pet, verifying it appears in the public catalog, editing its price, verifying the change reflects publicly, and deleting it.

**Acceptance Scenarios**:

1. **Given** an admin user is logged in, **When** they click "Admin" in the navbar, **Then** they see an admin dashboard with a pets management table showing all pets (paginated) with columns: ID, name, category, breed, price, status, and action buttons (Edit, Delete).
2. **Given** the admin clicks "Add New Pet", **When** they fill out the form with valid data and submit, **Then** a new pet is created and appears in both the admin table and the public catalog (if status is AVAILABLE).
3. **Given** the admin clicks "Edit" on a pet row, **When** they modify the price and save, **Then** the updated price is reflected in the admin table and the public catalog.
4. **Given** the admin clicks "Delete" on a pet row, **When** they confirm the deletion, **Then** the pet is removed from the database and no longer appears in the catalog or admin table.
5. **Given** a non-admin user tries to access `/admin`, **When** the route guard checks their role, **Then** they are redirected to the home page with an "Unauthorized" message.

---

### Edge Cases

- What happens when a user tries to add a pet to the cart that was just purchased by another user (race condition)? → The server should check availability at add-to-cart time and return a clear error if the pet is no longer available.
- What happens when a user's JWT expires mid-session? → The frontend should detect 401 responses, clear the stored token, and redirect to the login page with a message "Your session has expired. Please log in again."
- What happens when the database is seeded with no pets? → Category pages show an empty state: "No pets available in this category. Check back soon!"
- How does the system handle concurrent checkout of the same pet by two users? → The order placement endpoint must use optimistic locking or a database constraint to ensure a pet can only appear in one confirmed order. The second user receives an error: "One or more pets in your cart are no longer available."
- What happens if the user navigates to a pet detail page for a pet that has been deleted? → A 404 page is displayed: "This pet is no longer available."
- What happens with very long pet names or descriptions? → Text is truncated with ellipsis on cards; full text shown on detail pages. Backend enforces max lengths via validation.

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST display a categorized pet catalog with four top-level categories: Dogs, Cats, Birds, and Fish.
- **FR-002**: System MUST render pet listings as responsive tile/card-based previews showing image, name, breed, age, and price.
- **FR-003**: System MUST provide a pet detail page with full information including large image, name, breed, age, price, description, and availability status.
- **FR-004**: System MUST support filtering pets by category and sorting by price and name.
- **FR-005**: System MUST paginate pet listings with configurable page size (default 12 per page).
- **FR-006**: System MUST allow users to register with email, first name, last name, and password.
- **FR-007**: System MUST authenticate users via email/password and issue JWT access tokens.
- **FR-008**: System MUST hash all passwords using BCrypt before storage.
- **FR-009**: System MUST maintain a server-side shopping cart per authenticated user.
- **FR-010**: System MUST enforce that each pet can only appear once in a cart (pets are unique items, not bulk inventory).
- **FR-011**: System MUST allow authenticated users to place orders that convert cart contents into a persisted order record.
- **FR-012**: System MUST update pet status from AVAILABLE to SOLD upon successful order placement.
- **FR-013**: System MUST prevent checkout if any pet in the cart is no longer AVAILABLE (concurrent safety).
- **FR-014**: System MUST display order history for authenticated users, listing all past orders with details.
- **FR-015**: System MUST provide an admin interface for CRUD operations on pet listings, accessible only to users with the ADMIN role.
- **FR-016**: System MUST expose a RESTful API under `/gulles/v1/` following the endpoint contracts defined in the Constitution.
- **FR-017**: System MUST return consistent JSON response envelopes (success/error) as defined in the Constitution.
- **FR-018**: System MUST be fully responsive across desktop (1280px+), tablet (768px–1279px), and mobile (< 768px) viewports.
- **FR-019**: System MUST use Flyway for database schema migrations.
- **FR-020**: System MUST provide a health check endpoint at `GET /gulles/v1/health` for Render deployment monitoring.

### Key Entities

- **Category**: Represents a pet species group — Dogs, Cats, Birds, Fish. Has a name, display name, description, and image URL. Pre-seeded; not user-created.
- **Pet**: A specific animal available for sale. Belongs to one Category. Key attributes: name, breed, age (in months), price, description, imageUrl, status (AVAILABLE, PENDING, SOLD). One pet = one physical animal.
- **User**: A registered account holder. Key attributes: email (unique), passwordHash, firstName, lastName, role (CUSTOMER, ADMIN), createdAt. One user can have many orders and one active cart.
- **CartItem**: Represents a pet in a user's shopping cart. Key attributes: references to User and Pet. One-to-one relationship with Pet per User (no duplicate entries).
- **Order**: A completed purchase. Key attributes: user reference, totalAmount, status (PENDING, CONFIRMED, SHIPPED, DELIVERED, CANCELLED), orderDate, createdAt.
- **OrderItem**: A line item within an Order. Key attributes: references to Order and Pet, priceAtPurchase (snapshot of price at order time).

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A visitor can browse the full pet catalog, navigate categories, and view pet details in under 3 clicks from the home page.
- **SC-002**: A new user can register, log in, add a pet to cart, and place an order in under 5 minutes on first attempt.
- **SC-003**: The catalog page loads in under 2 seconds on a standard broadband connection (initial page load including API call).
- **SC-004**: The application renders correctly and is fully functional on Chrome, Firefox, Safari, and Edge (latest versions).
- **SC-005**: All API endpoints return appropriate HTTP status codes and consistent JSON response envelopes — no unhandled exceptions leak stack traces.
- **SC-006**: Concurrent checkout of the same pet by two users results in exactly one successful order; the other receives a clear error message.
- **SC-007**: The application deploys successfully to Render with zero manual configuration beyond environment variables.
- **SC-008**: The admin can add a new pet and see it appear in the public catalog within one page refresh.

---

## Assumptions

- Users have a modern browser with JavaScript enabled (Chrome, Firefox, Safari, or Edge — latest two versions).
- Internet connectivity is stable; offline mode is out of scope.
- Payment processing is **out of scope** for this version — "Place Order" simulates a purchase without real payment integration.
- Email verification is **out of scope** — registration is immediate without a verification step.
- Pet images are provided as external URLs (e.g., from Unsplash or a CDN); image upload functionality is out of scope for v1.
- The initial dataset of pets will be seeded via Flyway migration scripts or a `data.sql` file for development/demo purposes.
- The application supports a single currency (USD) with no internationalization.
- Render's free/starter tier is sufficient for initial deployment. No auto-scaling or CDN configuration is required.
- The admin user is created via a seed script or migration — there is no self-service admin registration.
- Search functionality (full-text search across pet names/descriptions) is a stretch goal and not required for MVP.
