# EventEasy - Modern Luxury Event Architecture & Smart AI Event Planner

EventEasy is a full-stack Java Spring Boot and React enterprise web application for luxury event architecture, venue styling, tiered packages, and instant AI-assisted event planning. Built with a modern, high-end design aesthetic, it provides separate workflows for public clients and system administrators.

The core idea is simple: deliver a visual event discovery experience where clients can explore curated design themes, view package inclusions in ₹ INR, interact with an AI Event Planner powered by Google Gemini, and submit booking enquiries—which administrators can review, manage, and process through a real-time management portal.

---

## Tech Stack

### Backend
- **Core**: Java 21, Spring Boot 3.3.2
- **Security & Auth**: Spring Security 6, Stateless JWT (JJWT 0.12.6), BCrypt Password Hashing
- **Database & ORM**: MySQL 8.0, Spring Data JPA / Hibernate, HikariCP Connection Pool
- **Artificial Intelligence**: Google Gemini AI (v1beta REST API Integration)
- **API Documentation**: SpringDoc OpenAPI 2.6 (Swagger UI)
- **Build Tool**: Maven

### Frontend
- **Core**: React 18, Vite 5
- **UI & Styling**: Ant Design (antd 5.24), Vanilla CSS with HSL Tokens, Framer Motion
- **State & Data Fetching**: TanStack React Query v5, Zustand v4
- **Routing**: React Router DOM v6
- **Charts & Data Viz**: Recharts v2
- **HTTP Client**: Axios with JWT Interceptors

---

## Main Modules

### 1. Public Customer Module

Public clients can:

- **Interactive Hero Experience**: Switch between high-resolution event video backgrounds (Wedding, Corporate, Birthday, Engagement, Reception) with interactive audio controls.
- **Explore Event Categories**: Browse curated event categories (Weddings, Corporate Galas, Birthdays, Engagements, Receptions, Anniversaries).
- **Compare Service Packages**: View package options (**Silver Celebration**, **Gold Elegance**, **Platinum Royalty**) in ₹ INR with complete inclusion feature checklists.
- **Signature Visual Themes**: Preview design themes featuring multi-color palette swatches (e.g. Royal Gold & Crimson, Midnight Opulence).
- **Celebration Gallery**: Filter high-resolution past celebration photography by category and location.
- **Smart AI Event Planner**: Generate customized event plans using an interactive 3-step wizard powered by Google Gemini AI (returns instant timeline, budget breakdown, decor, and entertainment recommendations).
- **Submit Booking Enquiry**: Send direct event booking enquiries with automated validation (`EVT-2026-000001`).
- **Newsletter Subscription**: Subscribe to website updates directly from the footer with instant API feedback.

### 2. Admin Management Module

Administrators can:

- **Secure JWT Authentication**: Login using seeded system administrator credentials.
- **Analytics Dashboard**: View real-time metric counters (Total Enquiries, Active Subscribers, Total Packages, Design Themes) and interactive Recharts graphs (Status Distribution, Category Breakdown, Growth Trends).
- **Customer Enquiries Portal**: Search, filter by status or event type, view full AI Event Plan summaries, update workflow statuses, and manage notes.
- **Newsletter Subscribers Portal**: View active subscribers, search email addresses, and copy all subscriber emails to the clipboard with one click.
- **Event Categories Management**: Create, edit, toggle active status, and reorder event categories.
- **Service Packages Management**: Manage package pricing in ₹ INR, subtitles, descriptions, and feature inclusion lists.
- **Design Themes Management**: Configure multi-color hex palette strings (`#D97706,#DC2626,#F59E0B,#78350F`), category tags, and media URLs.
- **Celebration Gallery Management**: Add and manage past event showcase media items.

---

## AI Event Planner Workflow

The AI Event Planner allows clients to generate instant, structured event blueprints:

```text
Client fills 3-step form -> Gemini AI processes prompt -> Returns structured JSON (Timeline, Budget, Decor) -> Client saves/submits -> Enquiry created in Admin Portal
```

---

## Customer Enquiry Workflow

The lifecycle of an event booking request is:

```text
Client submits enquiry -> Enquiry created (Status: NEW)
Admin reviews details & AI Plan -> Status: CONTACTED
Admin sends quotation -> Status: QUOTATION_SENT
Client & Admin negotiate -> Status: NEGOTIATION
Booking confirmed -> Status: CONFIRMED
Event executed -> Status: COMPLETED
```

Enquiry statuses:

```text
NEW
CONTACTED
QUOTATION_SENT
NEGOTIATION
CONFIRMED
COMPLETED
CANCELLED
```

---

## Database Tables

The application uses the following main relational database tables:

| Table | Purpose |
|---|---|
| `users` | Stores system administrator and customer user accounts |
| `roles` | Stores security RBAC roles (`ROLE_ADMIN`, `ROLE_CUSTOMER`) |
| `user_roles` | Join table mapping user accounts to security roles |
| `event_types` | Stores event category classifications (Wedding, Corporate, etc.) |
| `event_packages` | Stores pricing tiers in ₹ INR (Silver, Gold, Platinum) |
| `package_features` | Stores detailed inclusion feature items for each package |
| `event_themes` | Stores design themes and multi-color palette strings |
| `gallery_items` | Stores past celebration showcase media items |
| `enquiries` | Stores client booking enquiries with attached AI Event Plans |
| `newsletter_subscribers` | Stores website email newsletter subscriptions |

The application automatically creates and updates tables on startup via:

```properties
spring.jpa.hibernate.ddl-auto=update
```

---

## Folder Structure

```text
event-management-app
├── backend
│   ├── pom.xml
│   ├── README.md
│   └── src
│       └── main
│           ├── java
│           │   └── com
│           │       └── eventeasy
│           │           ├── EventManagementApplication.java
│           │           ├── config
│           │           ├── controller
│           │           ├── dto
│           │           ├── entity
│           │           ├── enums
│           │           ├── exception
│           │           ├── filter
│           │           ├── initializer
│           │           ├── repository
│           │           ├── security
│           │           └── service
│           └── resources
│               ├── application.properties
│               ├── application-dev.properties
│               └── application-prod.properties
└── frontend
    ├── package.json
    ├── vite.config.js
    ├── index.html
    └── src
        ├── App.jsx
        ├── main.jsx
        ├── api
        ├── components
        ├── config
        ├── constants
        ├── features
        ├── hooks
        ├── layouts
        ├── pages
        ├── routes
        ├── services
        ├── store
        ├── styles
        └── theme
```

---

## Important Java Packages

| Package | Description |
|---|---|
| `config` | Security CORS, OpenAPI, and Jackson configuration beans |
| `controller` | REST API controllers for auth, admin, public, and AI endpoints |
| `dto` | Data Transfer Objects for request validation and response payloads |
| `entity` | JPA Entity models and relational mapping classes |
| `enums` | System state enumerations (EnquiryStatus, RoleType, UserStatus) |
| `filter` | JWT Authentication filter intercepting HTTP request headers |
| `initializer` | `BusinessDataInitializer` seeding default roles, admin, packages, themes & demo data |
| `repository` | Spring Data JPA interfaces for database queries |
| `security` | UserDetailsService implementation and JWT token utilities |
| `service` | Core business logic and Google Gemini AI service integration |

---

## Key Files

| File | Purpose |
|---|---|
| `EventManagementApplication.java` | Spring Boot main application entry point |
| `application-dev.properties` | Local MySQL database credentials, JWT secret, and Gemini AI configuration |
| `BusinessDataInitializer.java` | Seeds default Admin, Categories, Packages with Inclusions, Multi-Color Themes, and Enquiries |
| `SecurityConfig.java` | Spring Security 6 stateless JWT authorization & CORS rules |
| `GeminiAIService.java` | REST API client for Google Gemini AI Event Planner generation |
| `PublicNewsletterController.java` | Public API endpoint for newsletter email subscriptions |
| `AdminNewsletterController.java` | Admin API endpoint for subscriber management |
| `AppRouter.jsx` | Frontend React Router DOM route definitions (Public & Admin) |
| `designTokens.js` | Visual design system tokens (colors, typography, spacing, box shadows) |
| `AdminSubscribers.jsx` | Admin newsletter subscriber table view with search & copy features |

---

## Prerequisites

Install the following software before running the application:

- **Java 21** or higher
- **Node.js 18** or higher (with `npm`)
- **MySQL Server 8.0** or higher
- **Maven 3.8+** (or use the provided `.\mvnw` wrapper)

Verify Java installation:

```bash
java -version
```

Verify Node.js installation:

```bash
node -v
npm -v
```

---

## Database Setup

Create the MySQL database:

```sql
CREATE DATABASE event_management_db;
```

---

## Configure Credentials

Open `backend/src/main/resources/application-dev.properties` and verify your MySQL connection settings:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/event_management_db?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC&createDatabaseIfNotExist=true
spring.datasource.username=root
spring.datasource.password=root
```

Optionally, set your Google Gemini AI API key from [Google AI Studio](https://aistudio.google.com/):

```properties
gemini.api.key=YOUR_GEMINI_API_KEY
```

---

## How To Run

### 1. Start the Backend (Spring Boot)

Navigate to the `backend` folder and start the server:

```powershell
cd backend
.\mvnw spring-boot:run
```

The backend server will start at:
- **REST API Base**: `http://localhost:8080/api/v1`
- **Swagger API Docs**: `http://localhost:8080/swagger-ui.html`

### 2. Start the Frontend (React + Vite)

Navigate to the `frontend` folder, install dependencies, and launch the dev server:

```powershell
cd frontend
npm install
npm run dev
```

The frontend application will start at:
- **Public Application**: `http://localhost:5173`
- **Admin Portal**: `http://localhost:5173/admin/login`

---

## Default Admin Credentials

The backend automatically creates the primary system administrator account on initial startup:

```text
Email: admin@eventeasy.com
Password: Admin@12345
```

Seeded by:
`backend/src/main/java/com/eventeasy/initializer/BusinessDataInitializer.java`

---

## Demo Flow For Evaluation

Follow this step-by-step walkthrough to demonstrate the full application capability:

1. **Launch Both Servers**: Ensure Spring Boot (`8080`) and Vite (`5173`) are running.
2. **Explore Public Home Page**: Open `http://localhost:5173` to experience the video hero slider, audio toggle, category cards, and client trust banner.
3. **View Packages**: Navigate to `/packages` to inspect tiered pricing in ₹ INR and complete **Package Inclusions** checklists.
4. **View Visual Themes**: Navigate to `/themes` to explore signature design themes with **Multi-Color Palette Swatches**.
5. **View Gallery**: Navigate to `/gallery` and filter past celebration photography by category.
6. **Try AI Event Planner**:
   - Navigate to `/ai-event-planner`.
   - Complete the 3-step wizard (Select event type, city, budget, guest count, venue preference).
   - Click **Generate AI Event Plan** to receive an instant timeline, budget breakdown, and decor plan powered by Gemini AI.
7. **Submit Booking Enquiry**: Click **Book This Event Plan** or navigate to `/contact`, fill the client enquiry form, and submit (`EVT-2026-000001`).
8. **Subscribe to Newsletter**: Scroll to the footer, enter an email address (e.g. `user@example.com`), and click **Subscribe**.
9. **Access Admin Portal**:
   - Navigate to `http://localhost:5173/admin/login`.
   - Login with `admin@eventeasy.com` / `Admin@12345`.
10. **View Admin Dashboard**: Review analytics metric cards, status distribution pie chart, and category bar chart.
11. **Review Enquiries**: Open `/admin/enquiries` to view submitted client enquiries, view attached AI Event Plans, and update status from `NEW` to `CONFIRMED`.
12. **Manage Newsletter Subscribers**: Open `/admin/subscribers` to view active subscribers, search emails, or copy all emails to clipboard.
13. **Manage Event Categories**: Open `/admin/event-types` to add or edit event categories.
14. **Manage Packages**: Open `/admin/packages` to edit package prices and feature inclusions.
15. **Manage Themes**: Open `/admin/themes` to update design theme color palettes.

---

## URL Map

| URL | Access | Description |
|---|---|---|
| `/` | Public | Modern Home Page Showcase with Video Hero |
| `/services` | Public | Event Categories & Services Directory |
| `/packages` | Public | Event Service Packages & Inclusions |
| `/themes` | Public | Signature Visual Design Themes & Color Palettes |
| `/gallery` | Public | Celebration Showcase Photography Gallery |
| `/ai-event-planner` | Public | Interactive Google Gemini AI Event Planner |
| `/contact` | Public | Event Booking Concierge & Enquiry Form |
| `/admin/login` | Public | Administrator JWT Login Portal |
| `/admin/dashboard` | Admin | Real-time Analytics Dashboard |
| `/admin/enquiries` | Admin | Customer Booking Enquiries Management |
| `/admin/subscribers` | Admin | Newsletter Email Subscribers Management |
| `/admin/event-types` | Admin | Event Categories Management |
| `/admin/packages` | Admin | Service Packages & Features Management |
| `/admin/themes` | Admin | Design Themes & Color Swatches Management |
| `/admin/gallery` | Admin | Celebration Gallery Showcase Management |

---

## Security Notes

- **Password Hashing**: User passwords are encrypted using BCrypt.
- **Stateless JWT**: Authentication relies on stateless JWT Bearer tokens passed via `Authorization` headers.
- **Role-Based Access Control**: Admin routes (`/admin/*`) are protected by Spring Security filters requiring `ROLE_ADMIN`.
- **Validation**: Strict input validation is enforced on both REST APIs (Spring Validation) and frontend forms (Ant Design / regex checks).
- **Secret Protection**: API keys and secrets are injected via externalized environment variables.

---

## Troubleshooting

### Database Connection Failed
- Verify MySQL Server is running on port `3306`.
- Ensure database `event_management_db` exists or `createDatabaseIfNotExist=true` is enabled.
- Verify username and password in `application-dev.properties` (default: `root`/`root`).

### Port 8080 Already In Use
- Stop existing processes on port 8080 or change `server.port` in `application-dev.properties`:
  ```properties
  server.port=8081
  ```

### Port 5173 Already In Use
- Vite will automatically prompt or switch to port `5174`.

---

## Project Summary

EventEasy is an event management and AI planning application featuring:

- **Luxury Visual Architecture**: Premium typography, video hero slider, multi-color swatches, and responsive design.
- **AI-Powered Event Planning**: Instant structured event blueprint generation via Google Gemini AI.
- **Complete Admin Control**: Real-time analytics dashboard, customer enquiry management, newsletter subscriber portal, and content management tools.
- **Enterprise Tech Stack**: Java 21, Spring Boot 3, Spring Security JWT, React 18, Vite, and Ant Design.

---
