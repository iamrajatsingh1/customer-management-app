# Customer Management Application

A full-stack customer management application built as part of a technical assessment.

The application allows users to:

* Create customers
* View registered customers
* Validate form inputs
* Persist customer data using a Spring Boot backend and H2 database

---

# Tech Stack

## Frontend

* React 19
* TypeScript
* Vite
* React Query
* React Hook Form
* Axios
* Tailwind CSS
* Vitest + React Testing Library

## Backend

* Java 21
* Spring Boot 3
* Spring Data JPA
* Hibernate
* H2 Database
* Maven
* JUnit 5
* MockMvc

---

# Architecture

## Frontend

Feature-based React architecture:

```text
src/
├── features/
│   └── customers/
│       └── api/
│       └── hooks/
│       └── types/
│       └── CustomerForm/
│       └── CustomerList/
│       └── index/
├── shared/
│       └── components/
├── lib/
└── test/
```

Key frontend decisions:

* React Query for server state management
* React Hook Form for form handling and validation
* Reusable shared UI components
* Feature-oriented structure for scalability

---

## Backend

Layered Spring Boot architecture:

```text
src/main/java/com/customerapp/backend
├── common
├── customer
│   ├── controller
│   ├── service
│   ├── repository
│   ├── dto
│   ├── entity
│   └── mapper
└── config
```

Key backend decisions:

* DTO separation between API and persistence layers
* Centralized exception handling
* Request validation using Jakarta Validation
* Global CORS configuration
* Service-layer business logic isolation

---

# Features

## Customer Creation

* First name validation
* Last name validation
* Date of birth validation
* API error handling
* Loading states
* Success feedback

## Customer Listing

* Fetch all customers
* Loading state
* Empty state
* Error state
* Responsive table UI

---

# Running The Application

## Prerequisites

* Node.js 20+
* Java 21
* Maven

---

# Backend Setup

```bash
cd backend
./mvnw spring-boot:run
```

Backend runs on:

```text
http://localhost:8080
```
---

# Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

# Running Tests

## Frontend

```bash
cd frontend
npm run test -- --run
```

## Backend

```bash
cd backend
./mvnw test
```

---

# API Endpoints

## Create Customer

```http
POST /api/v1/customers
```

Request:

```json
{
  "firstName": "Rajat",
  "lastName": "Singh",
  "dateOfBirth": "1998-01-02"
}
```

---

## Get Customers

```http
GET /api/v1/customers
```

---

# Design Decisions & Tradeoffs

* Chose monorepo structure for simpler evaluation and setup
* Used H2 for lightweight local persistence
* Kept backend architecture layered instead of overengineering
* Focused on maintainability and developer experience
* Added meaningful automated tests without excessive complexity

---

# AI Usage

AI tools were used selectively for:

* Boilerplate generation
* Test scaffolding
* Initial component/service structure
* Refactoring suggestions

All generated code was manually reviewed, modified, validated, and integrated.

See `AI_USAGE.md` for detailed breakdown.

---

# Future Improvements

* Docker support
* Pagination and sorting
* Authentication/authorization
* API rate limiting
* CI/CD pipeline
* Enhanced accessibility support
* Persistent production database

---
