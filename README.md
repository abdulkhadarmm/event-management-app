# EventEasy - Enterprise Event Management SaaS Application (Phase 1 & Phase 2 Complete)

![EventEasy Platform](https://img.shields.io/badge/Architecture-Clean%20%2F%20SOLID-indigo)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.3-brightgreen)
![Java](https://img.shields.io/badge/Java-21-orange)
![MySQL](https://img.shields.io/badge/MySQL-8.0-blue)
![React](https://img.shields.io/badge/React-19-blue)
![Vite](https://img.shields.io/badge/Vite-5.3-purple)
![Ant Design](https://img.shields.io/badge/Ant%20Design-5.19-darkblue)

**EventEasy** is a production-ready enterprise SaaS application built for a modern luxury event management company. Phase 1 delivered the underlying layered architecture, JWT authentication, MySQL database, and luxury UI theme system. Phase 2 completes all business modules: Event Types, Event Packages & Features, Design Themes, Customer Enquiries, Admin Management Dashboard with Recharts, and Home Page Public API Integration.

---

## 🚀 Phase 2 Delivered Business Modules

1. **Event Categories Module (`/api/v1/event-types`)**:
   - Public listing & Admin CRUD management.
   - Fields: `name`, `code`, `description`, `iconName`, `imagePath`, `displayOrder`, `activeStatus`.

2. **Event Packages Module (`/api/v1/packages`)**:
   - Public listing & Admin CRUD management.
   - Entity: `EventPackage` linked via `@OneToMany` to `PackageFeature` (`featureName`, `displayOrder`, `activeStatus`).
   - Fields: `name`, `subtitle`, `description`, `price`, `popularFlag`, `imagePath`, `displayOrder`, `activeStatus`.

3. **Design Themes Module (`/api/v1/themes`)**:
   - Public listing & Admin CRUD management.
   - Fields: `name`, `category`, `description`, `accentColor`, `imagePath`, `displayOrder`, `activeStatus`.

4. **Customer Enquiry Management System (`/api/v1/enquiries`)**:
   - **Public Submission**: Unauthenticated customer enquiry form on `/contact` with strict validation (full name regex, email format, phone regex, future event date, guest count min 1, budget min 0, additional notes max 500 chars).
   - **Enquiry Number**: Generates unique human-readable code e.g. `EVT-2026-000001` exposed to users and admins (UUID primary key preserved internally).
   - **Admin Management Suite**: Full paginated, searchable, multi-criteria filtered (status, type, package, theme, date range), sorted enquiry table.
   - **Workflow Statuses**: `NEW`, `CONTACTED`, `QUOTATION_SENT`, `NEGOTIATION`, `CONFIRMED`, `COMPLETED`, `CANCELLED`.
   - **Soft Delete**: Non-destructive deletion populating `deleted`, `deletedAt`, `deletedBy`.

5. **Dedicated Admin Dashboard Analytics (`/api/v1/dashboard`)**:
   - `DashboardController` (`/api/v1/dashboard/stats`).
   - **Metric Cards**: Total Enquiries, Today's Enquiries, Pending Enquiries, Confirmed Events, Upcoming Events (`eventDate >= today` and `status != CANCELLED`), Cancelled Events.
   - **Interactive Recharts**: Status Distribution Pie Chart, Event Category Bar Chart, Monthly Growth Trend Line Chart, and Recent 5 Enquiries Feed.

6. **Home Page Public API Integration**:
   - Replaced Phase 1 placeholders with dynamic TanStack Query (`useQuery`) API calls on `ServicesPreview`, `PackagesPreview`, and `ThemesPreview`.

7. **Database Seeder (`BusinessDataInitializer`)**:
   - Automatically seeds default Admin User (`admin@eventeasy.com` / `Admin@12345`), default Event Categories, default Packages & Features, and default Design Themes into MySQL on startup. Enquiries list starts clean and empty per requirements.

---

## 🛠 Tech Stack

### Backend
- **Java 21**
- **Spring Boot 3.3.x** (`com.eventeasy`)
- **Maven**
- **Spring Data JPA** & **Specifications**
- **Spring Security 6** & **JWT**
- **Spring Validation**
- **MySQL 8.x** (`mysql-connector-j`)
- **HikariCP**
- **JJWT 0.12.6**
- **Lombok**
- **SpringDoc OpenAPI (Swagger UI)**

### Frontend
- **React 19**
- **Vite 5**
- **React Router DOM 6**
- **Axios**
- **Ant Design 5**
- **Zustand 4**
- **TanStack Query 5**
- **Framer Motion 11**
- **React Helmet Async**
- **Recharts 2**

---

## 💻 Getting Started

### Backend Execution
```bash
cd backend
mvn spring-boot:run
```
Swagger UI: `http://localhost:8080/swagger-ui.html`

### Frontend Execution
```bash
cd frontend
npm install
npm run dev
```
Public App: `http://localhost:5173`
Admin Portal: `http://localhost:5173/admin/login` (Seed Admin: `admin@eventeasy.com` / `Admin@12345`)
