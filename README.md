# EventEasy - Modern Luxury Event Architecture & Smart AI Event Planner

[![Production Web App](https://img.shields.io/badge/Live_Demo-https%3A%2F%2Feventeasyofficial.vercel.app%2F-7C3AED?style=for-the-badge&logo=vercel)](https://eventeasyofficial.vercel.app/)
[![Java 21](https://img.shields.io/badge/Java-21-007396?style=for-the-badge&logo=java)](https://www.oracle.com/java/)
[![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.3.2-6DB33F?style=for-the-badge&logo=springboot)](https://spring.io/projects/spring-boot)
[![React 18](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)

EventEasy is an enterprise-grade, full-stack event architecture and AI-assisted event planning web application. Built with **Java 21, Spring Boot 3, Spring Security 6 (Stateless JWT)** on the backend, and **React 18, Vite 5, Ant Design, and TanStack React Query** on the frontend, EventEasy bridges the gap between luxury event planning, automated AI prompt-to-blueprint generation, and real-time administrative pipeline operations.

---

## 🌟 Executive Project Overview & Vision

Planning luxury weddings, corporate galas, milestone birthdays, and grand receptions often presents clients with confusing pricing, vague package offerings, and slow consultation turnarounds. 

**EventEasy** solves this problem by providing a dual-portal platform:

1. **For Public Clients**: An immersive visual experience where users can explore high-definition video backgrounds, interact with signature design themes featuring multi-color swatches, compare tiered service packages in ₹ INR with itemized inclusion checklists, and generate an **instant structured AI event blueprint** (including schedule timeline, budget allocation, decor, and entertainment).
2. **For Administrators**: An executive management workspace featuring real-time analytics metric cards, interactive data visualization charts (Recharts ring and bar charts), an end-to-end customer enquiry pipeline management suite, subscriber management, and complete CMS control over categories, packages, themes, and gallery showcases.

---

## 🚀 Live Deployments

- 🌐 **Public Portal & Admin Interface**: [https://eventeasyofficial.vercel.app/](https://eventeasyofficial.vercel.app/)
- ⚙️ **Backend REST Services**: Render Cloud Infrastructure (`/api/v1`)
- 🔑 **Seeded Admin Credentials**: `admin@eventeasy.com` / `Admin@12345`

---

## 🔍 Detailed Feature Breakdown

### 🏛️ Public Customer Experience

#### 1. 🎥 Interactive Video Hero Slider & Background Switcher
- **Dynamic Backgrounds**: Switch between 5 high-definition ambient event videos (*Weddings, Corporate Galas, Birthdays, Engagements, Receptions*).
- **Audio Control**: Integrated background ambient audio toggle (mute/unmute) with smooth sound fades.
- **Glassmorphism Overlay**: Ultra-modern frosted glass badges, sleek typography, and call-to-action buttons.

#### 2. 🤖 Smart AI Event Planner
- **Interactive 3-Step Wizard**:
  - *Step 1*: Select Event Category (Wedding, Corporate, Birthday, etc.) & Location/City.
  - *Step 2*: Specify Estimated Budget in ₹ INR & Guest Capacity.
  - *Step 3*: Choose Venue Preference (Indoor Ballroom, Outdoor Garden, Beachside, Luxury Resort) & Special Wishes.
- **Instant AI Blueprint Generation**: Intelligent backend REST engine returning structured JSON containing:
  - **Hourly Event Timeline**: Morning prep to evening reception schedule.
  - **Itemized Budget Allocation**: Venue, catering, decor, photography, and entertainment breakdown.
  - **Decor & Lighting Blueprint**: Theme recommendations, floral arrangements, and stage setups.
  - **Entertainment & Guest Experience**: Live acoustic sets, DJs, guest favors, and interactive stalls.
- **One-Click Booking Request**: Clients can review their AI plan and attach it directly to an official enquiry form.

#### 3. 💎 Tiered Service Package Comparison
- **Package Tiers**: *Silver Celebration*, *Gold Elegance*, *Platinum Royalty*.
- **Transparent ₹ INR Pricing**: Displays base pricing, duration, guest capacity caps, and highlight tags (*"Most Popular"*, *"Luxury Best Value"*).
- **Inclusion Checklist**: Detailed feature items dynamically fetched from database (`package_features`).

#### 4. 🎨 Signature Design Themes & Multi-Color Swatches
- **Visual Color Palette Swatches**: Real-time rendering of signature multi-color palette strings (`#D97706,#DC2626,#F59E0B,#78350F` e.g., *Royal Gold & Crimson*, *Midnight Opulence*, *Emerald & Champagne*).
- **Theme Descriptions & Media**: Shows decor aesthetic details, lighting mood recommendations, and preview imagery.

#### 5. 📸 Past Celebration Showcase Gallery
- **Categorized Gallery Filtering**: Filter high-resolution past event photography by category (*Weddings, Birthdays, Corporate, Engagement*).
- **Interactive Modal Viewer**: Full-screen image preview modal with location and date tags.

#### 6. 📨 Public Newsletter Subscription
- **Footer Newsletter Form**: Instant email subscription with validation regex and real-time backend API feedback.

---

### 🛡️ Admin Executive Portal

#### 1. 📊 Real-Time Analytics Dashboard
- **Executive Metric Cards**:
  - **Total Enquiries Received**: Cumulative pipeline lead count.
  - **Confirmed Events**: Total historical and active confirmed booking success count.
  - **Pending Enquiries**: Active leads awaiting quotations or in negotiation.
  - **Upcoming Galas & Events**: Real-time count of active non-cancelled events scheduled today or in the future.
- **Interactive Recharts Visualizations**:
  - **Pipeline Breakdown**: Responsive doughnut ring chart displaying status counts (`NEW`, `CONTACTED`, `QUOTATION_SENT`, `NEGOTIATION`, `CONFIRMED`, `COMPLETED`, `CANCELLED`) with non-zero legend filtering.
  - **Category Performance**: Bar chart tracking enquiry volume grouped by event category.

#### 2. 📋 Customer Enquiries Management Portal
- **Advanced Searching & Filtering**: Search by client name, email, city, or unique enquiry number (`EVT-2026-000001`). Filter by status or category.
- **Interactive AI Plan Modal**: View full structured AI Event Planner blueprints attached to client submissions.
- **Workflow Lifecycle Updates**: Update status across 7 stages (`NEW` → `CONTACTED` → `QUOTATION_SENT` → `NEGOTIATION` → `CONFIRMED` → `COMPLETED` / `CANCELLED`).
- **Internal Admin Notes**: Save internal notes and follow-up logs for team collaboration.

#### 3. 📧 Newsletter Subscribers Portal
- **Real-Time Subscriber Directory**: View subscriber list with unique IDs, email addresses, signup timestamps, and active status tags.
- **Search Capabilities**: Instant search filter for finding subscriber emails.

#### 4. ⚙️ Content Management System (CMS)
- **Event Categories**: Add, edit, reorder, or soft-delete event types with custom icon tags and preview images.
- **Service Packages**: Edit base prices (₹ INR), package subtitles, descriptions, and dynamic inclusion feature items.
- **Design Themes**: Manage multi-color palette strings, category mappings, and aesthetic descriptions.
- **Celebration Showcase**: Upload and manage gallery showcase media items.

#### 5. 📱 Ultra-Responsive UI Architecture
- **Adaptive Drawer & Compact Sidebar**: Hides sidebar on mobile viewports (< 768px) into a smooth slide-out drawer menu; collapses to a 72px compact icon sidebar on tablets.
- **Horizontal Scrollable Data Tables**: All admin tables feature `scroll={{ x: 'max-content' }}` ensuring zero text clipping or page overflow on narrow screens.
- **Header Profile Avatar**: High-resolution user profile icon badge replacing default text avatars.

---

## 🛠️ Technology Stack & System Architecture

```text
                                +-----------------------------------+
                                |     Public Client / Administrator  |
                                +-----------------------------------+
                                                  |
                                                  v
                                +-----------------------------------+
                                |    React 18 + Vite Frontend App   |
                                | (AntD, React Query, Zustand, CSS) |
                                +-----------------------------------+
                                                  |  Axios JWT HTTP
                                                  v
                                +-----------------------------------+
                                |    Spring Boot 3.3.2 REST API     |
                                |  (Spring Security 6, JJWT 0.12)   |
                                +-----------------------------------+
                                     /                         \
                                    v                           v
                    +-----------------------+       +-----------------------+
                    |   MySQL 8.0 Database  |       |   AI Event Engine     |
                    | (Spring Data JPA/ORM) |       | (REST JSON Prompt)    |
                    +-----------------------+       +-----------------------+
```

### Backend (Java / Spring Boot)
- **Java 21**: Modern Java syntax, records, pattern matching, and virtual thread readiness.
- **Spring Boot 3.3.2**: Spring Web REST APIs, Jackson JSON serialization, and annotation-driven service layers.
- **Spring Security 6 & JWT**: Stateless JWT token authentication, BCrypt password encryption, and Role-Based Access Control (`ROLE_ADMIN`, `ROLE_CUSTOMER`).
- **Spring Data JPA & Hibernate**: Relational ORM mapping, custom JPQL queries, and HikariCP connection pooling.
- **AI Event Planning Integration**: Custom AI Service calling REST endpoints to generate JSON event blueprints.

### Frontend (React / Vite)
- **React 18 & Vite 5**: Blazing-fast HMR build system with modular component architecture.
- **Ant Design 5 & Vanilla CSS**: Custom HSL color design tokens, modern typography (*Plus Jakarta Sans / Inter*), glassmorphism cards, and smooth micro-animations.
- **TanStack React Query v5**: Automatic background refetching, query caching, and optimistic mutations.
- **Recharts**: Responsive SVG charts (*PieChart*, *BarChart*, *ResponsiveContainer*).

---

## 🔄 Business Workflows & State Machines

### 1. AI Event Planner Flow

```text
[Client 3-Step Input] ──> [AIService] ──> [AI Prompt Engine] ──> [Structured JSON Plan] ──> [Attach to Enquiry]
```

### 2. Enquiry Lifecycle State Machine

```text
 [NEW] ──> [CONTACTED] ──> [QUOTATION_SENT] ──> [NEGOTIATION] ──> [CONFIRMED] ──> [COMPLETED]
   │                                                                 │
   └───> ────────────────────────> [CANCELLED] <─────────────────────┘
```

---

## 🗄️ Database Schema Overview

| Table | Primary Key | Description |
|---|---|---|
| `users` | `UUID` | Stores system administrator and client user accounts with BCrypt passwords |
| `roles` | `Long` | RBAC security roles (`ROLE_ADMIN`, `ROLE_CUSTOMER`) |
| `user_roles` | Composite | Join table mapping users to security roles |
| `event_types` | `UUID` | Event category classifications (Wedding, Corporate, Birthday, etc.) |
| `event_packages` | `UUID` | Service pricing tiers in ₹ INR (Silver, Gold, Platinum) |
| `package_features` | `UUID` | Itemized inclusion items linked to service packages |
| `event_themes` | `UUID` | Visual design themes with multi-color palette strings |
| `gallery_items` | `UUID` | Past celebration showcase photography |
| `enquiries` | `UUID` | Client booking requests with attached AI Event Plans and workflow status |
| `newsletter_subscribers` | `Long` | Newsletter email subscriptions with timestamps |

---

## 💻 Local Setup & Installation Guide

### Prerequisites
- **Java 21** or higher
- **Node.js 18** or higher (`npm v9+`)
- **MySQL 8.0** database server
- **Maven 3.8+** (or use included `.\mvnw` wrapper)

### 1. Database Configuration
Create a local MySQL database:

```sql
CREATE DATABASE event_management_db;
```

Update `backend/src/main/resources/application-dev.properties` if needed:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/event_management_db?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC&createDatabaseIfNotExist=true
spring.datasource.username=root
spring.datasource.password=root
```

### 2. Launch Backend Server
Navigate to `backend` directory and run:

```powershell
cd backend
.\mvnw spring-boot:run
```
- **API Base URL**: `http://localhost:8080/api/v1`
- **Swagger Documentation**: `http://localhost:8080/swagger-ui.html`

### 3. Launch Frontend Application
Navigate to `frontend` directory and run:

```powershell
cd frontend
npm install
npm run dev
```
- **Public Web Application**: `http://localhost:5173`
- **Admin Portal**: `http://localhost:5173/admin/login`

### 4. Admin Credentials
The database automatically seeds the initial administrator account on startup:
- **Email**: `admin@eventeasy.com`
- **Password**: `Admin@12345`

---

## 🗺️ Application Route Directory

| Route | Access Level | Description |
|---|---|---|
| `/` | Public | Video Hero Showcase, Featured Categories, Package Preview, Trust Banner |
| `/services` | Public | Comprehensive Event Categories & Services Directory |
| `/packages` | Public | Tiered Service Packages in ₹ INR with Inclusions Checklist |
| `/themes` | Public | Signature Design Themes & Multi-Color Palette Swatches |
| `/gallery` | Public | Filterable Past Celebration Photography Showcase |
| `/ai-event-planner` | Public | Interactive 3-Step Smart AI Event Planner |
| `/contact` | Public | Concierge Contact & Booking Enquiry Form |
| `/admin/login` | Public | Administrator JWT Login Portal |
| `/admin/dashboard` | Admin | Real-time Analytics Dashboard & Recharts Analytics |
| `/admin/enquiries` | Admin | Customer Booking Enquiries Suite & AI Blueprint Viewer |
| `/admin/subscribers` | Admin | Newsletter Email Subscribers Directory & Search |
| `/admin/event-types` | Admin | Event Categories CMS |
| `/admin/packages` | Admin | Service Packages & Inclusion Features CMS |
| `/admin/themes` | Admin | Design Themes & Color Palette CMS |
| `/admin/gallery` | Admin | Celebration Gallery CMS |

---

## 📜 License & Copyright

Designed and engineered for **EventEasy Architecture & Platform**. All rights reserved.
