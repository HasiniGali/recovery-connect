# Recovery Connect — Spring Boot 3 + MySQL 8 Backend

> **Tagline:** *“Finding the right support, when you need it.”*  
> **Hackathon:** ByteQuest Hackathon — Track A: Tech for Recovery  
> **Architecture:** Spring Boot 3.3.4 (Java 21) · MySQL 8+ · Flyway · Spring Security · JWT · Springdoc OpenAPI (Swagger)

---

## 1. Executive Overview

**Recovery Connect Backend** is a privacy-first REST API powering the Recovery Resource Navigator. It enables students, youth, and community members in Vellore, Katpadi, and surrounding regions to discover verified counselling, recovery support circles, emergency hotlines, and campus guidance.

### Core Ethical & Architectural Principles
- **100% Non-Diagnostic**: Zero medical diagnostics, treatment prescriptions, psychological risk scores, or clinical profiling.
- **Privacy-First**: No storage of personal health records or continuous precise user locations. Anonymous community reporting is fully supported (`reports.user_id` is nullable).
- **Single Source of Truth**: Database schema and initial seeds are managed exclusively via Flyway migrations (`V1` to `V9`).
- **Append-Only Verification History**: Whenever an administrator updates a resource's verification state, an immutable audit log is appended to `verification_history`.
- **Synthetic Data Transparency**: All demo and hackathon prototype resources are explicitly flagged with `is_synthetic = true`. Real emergency numbers (Tele-MANAS `14416`, Ambulance `108`, Vandrevala Foundation `+91 9999 666 555`) use verified official public data.

---

## 2. Requirements

- **Java Development Kit (JDK):** Version 21+ (Java 21 or 26)
- **Database:** MySQL 8.0+ or MySQL 8.4 LTS
- **Containerization (Optional):** Docker & Docker Compose
- **Build Tool:** Maven 3.9+ (Included via `./mvnw` and `mvnw.cmd`)

---

## 3. Quick Start Guide

### Step 1: Environment Configuration
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Default local credentials:
```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=recovery_connect
DB_USERNAME=recovery_user
DB_PASSWORD=recovery_secret_pass
DB_ROOT_PASSWORD=root_secure_pass

DEFAULT_ADMIN_EMAIL=admin@recoveryconnect.local
DEFAULT_ADMIN_PASSWORD=AdminSecurePass2026!

JWT_SECRET=404E635266556A586E3272357538782F413F4428472B4B6250645367566B5970
JWT_EXPIRATION_MS=86400000

CORS_ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173
```

### Step 2: Start MySQL 8 via Docker Compose
```bash
docker compose up -d mysql
```
*Note: MySQL will start on port `3306` with persistent volume `recovery_connect_mysql_data` and healthcheck configured.*

Alternatively, if running a local native MySQL server:
```sql
CREATE DATABASE IF NOT EXISTS recovery_connect
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;
```

### Step 3: Start Spring Boot Application

**On Linux / macOS:**
```bash
./mvnw spring-boot:run
```

**On Windows (PowerShell):**
```powershell
.\mvnw.cmd spring-boot:run
```

On startup:
1. Flyway automatically executes migrations `V1__create_users.sql` through `V9__seed_initial_data.sql`.
2. Initial seed resources, categories, languages, and the admin account are created.
3. Server starts listening on `http://localhost:8080`.

### Step 4: Run Tests
```bash
# Linux/macOS
./mvnw test

# Windows
.\mvnw.cmd test
```

### Step 5: Package / Production Build
```bash
./mvnw clean package
```

---

## 4. API Documentation & Swagger UI

Once started, explore and test the interactive OpenAPI documentation:

- **Swagger UI:** [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)
- **OpenAPI JSON Spec:** [http://localhost:8080/v3/api-docs](http://localhost:8080/v3/api-docs)

---

## 5. API Endpoints Reference

### Public Endpoints
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | System health and diagnostic status |
| `POST` | `/api/auth/register` | Register standard user account (returns JWT) |
| `POST` | `/api/auth/login` | Login with email and password (returns JWT) |
| `GET` | `/api/resources` | Paginated listing of active verified resources |
| `GET` | `/api/resources/{id}` | Get full operational & verification details by ID |
| `GET` | `/api/resources/search` | Multi-filter search (category, cost, language, city, availability, status, q) |
| `GET` | `/api/resources/nearby` | Haversine geographical distance search (`latitude`, `longitude`, `radius`) |
| `GET` | `/api/categories` | Retrieve all database support categories |
| `GET` | `/api/languages` | Retrieve supported languages (English, Tamil, Hindi, Telugu, etc.) |
| `POST` | `/api/reports` | Submit anonymous or authenticated accuracy report |

### Authenticated User Endpoints
| Method | Endpoint | Header | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/bookmarks` | `Authorization: Bearer <token>` | Bookmark a resource (prevents duplicates) |
| `GET` | `/api/bookmarks` | `Authorization: Bearer <token>` | Get user's saved resources (paginated) |
| `DELETE`| `/api/bookmarks/{resourceId}` | `Authorization: Bearer <token>` | Remove bookmark |

### Administrator Endpoints (`ROLE_ADMIN`)
| Method | Endpoint | Header | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/admin/resources` | `Authorization: Bearer <admin-token>` | Paginated listing including unverified & archived items |
| `POST` | `/api/admin/resources` | `Authorization: Bearer <admin-token>` | Create new resource |
| `PUT` | `/api/admin/resources/{id}` | `Authorization: Bearer <admin-token>` | Update resource operational metadata |
| `PATCH`| `/api/admin/resources/{id}/status` | `Authorization: Bearer <admin-token>` | Update verification status & append audit history |
| `DELETE`| `/api/admin/resources/{id}` | `Authorization: Bearer <admin-token>` | Soft-deactivate resource (`is_active = false`, `ARCHIVED`) |
| `GET` | `/api/admin/reports` | `Authorization: Bearer <admin-token>` | View community reports (filter by status) |
| `PATCH`| `/api/admin/reports/{id}` | `Authorization: Bearer <admin-token>` | Resolve report with notes and restore resource status |
| `GET` | `/api/admin/verification-history` | `Authorization: Bearer <admin-token>` | Chronological audit trail logs |
| `GET` | `/api/admin/analytics` | `Authorization: Bearer <admin-token>` | Database-aggregated counts and distribution metrics |

---

## 6. Sample API Requests (cURL)

### 1. Health Check
```bash
curl -X GET http://localhost:8080/api/health
```

### 2. User Registration & Login
```bash
# Register
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Student User",
    "email": "student@example.com",
    "password": "Password123!"
  }'

# Login
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@recoveryconnect.local",
    "password": "AdminSecurePass2026!"
  }'
```

### 3. Search Free Tamil Counselling in Vellore (Hero Query)
```bash
curl -X GET "http://localhost:8080/api/resources/search?category=Counselling&cost=Free&language=Tamil&city=Vellore&page=0&size=10"
```

### 4. Nearby Coordinates Search (Near Katpadi / VIT)
```bash
curl -X GET "http://localhost:8080/api/resources/nearby?latitude=12.9698&longitude=79.1432&radius=10.0"
```

### 5. Submit Anonymous Community Accuracy Report
```bash
curl -X POST http://localhost:8080/api/reports \
  -H "Content-Type: application/json" \
  -d '{
    "resourceId": 1,
    "reason": "HOURS_INCORRECT",
    "description": "Saturday timing now opens at 9:00 AM instead of 9:30 AM."
  }'
```

### 6. Admin Update Verification Status
```bash
curl -X PATCH http://localhost:8080/api/admin/resources/1/status \
  -H "Authorization: Bearer <ADMIN_JWT_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "VERIFIED",
    "notes": "Contact line and operating hours audited with center administrator.",
    "source": "Official Phone Verification"
  }'
```

---

## 7. Database Verification SQL Queries

To verify database state directly via MySQL client:

```sql
USE recovery_connect;

-- Check migration history
SELECT version, description, success, installed_on FROM flyway_schema_history;

-- Check resources count by verification status
SELECT verification_status, COUNT(*) FROM resources GROUP BY verification_status;

-- View append-only audit trail
SELECT vh.id, r.name, vh.status, vh.notes, vh.verified_at 
FROM verification_history vh
JOIN resources r ON vh.resource_id = r.id
ORDER BY vh.verified_at DESC;

-- View community reports queue
SELECT rep.id, r.name, rep.reason, rep.status, rep.created_at 
FROM reports rep
JOIN resources r ON rep.resource_id = r.id;
```
