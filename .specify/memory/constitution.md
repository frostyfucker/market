<!--
Sync Impact Report:
- Version change: none → 1.0.0
- Added sections:
  - Core Principles
  - Additional Constraints
  - Development Workflow
  - Governance
- Templates requiring updates:
  - ⚠ pending: .specify/templates/plan-template.md
  - ⚠ pending: .specify/templates/spec-template.md
  - ⚠ pending: .specify/templates/tasks-template.md
- Follow-up TODOs:
  - TODO(SECTION_2_CONTENT): Define additional constraints if any.
  - TODO(SECTION_3_CONTENT): Detail the development workflow.
-->
# market Constitution

## Core Principles

### I. Defined Technology Stack
The project adheres to a specific technology stack: React with TypeScript and TailwindCSS for the frontend, Node.js with Express for the backend, and PostgreSQL for the database. This ensures consistency and leverages team expertise.

### II. Secure Authentication
All user authentication must be implemented using a custom JWT-based system. This includes using `bcrypt` for password hashing and implementing a refresh token strategy for secure and persistent sessions. All protected routes must validate the access token.

### III. API-First Design
The application is built around a clear API contract between the frontend and backend. All backend functionality is exposed through a well-defined set of RESTful API endpoints.

### IV. Standardized AI Integration
All interactions with AI models must be done through the `@google/genai` SDK to ensure a consistent and maintainable approach to AI feature integration.

### V. Structured Database Schema
The database schema is explicitly defined. Changes to the schema should be managed through a migration process to ensure data integrity and consistency across environments.

### VI. Specification and Test-Driven Development
Development must follow a strict process. First, a feature specification is created and approved. This specification then defines the scope of the implementation. All code written to meet the specification must be accompanied by tests, following a Test-Driven Development (TDD) approach where tests are written before the code they validate.

## Additional Constraints

(No additional constraints defined yet.)

## Development Workflow

(Development workflow details to be added.)

## Governance

All PRs/reviews must verify compliance with this constitution. Complexity must be justified. Use `docs/development_guidance.md` for runtime development guidance.

**Version**: 1.0.0 | **Ratified**: 2025-09-19 | **Last Amended**: 2025-09-19
