# Tasks: AI-Powered Clothing Catalog

**Input**: Design documents from `specs/001-build-an-application/`

## Path Conventions
- **Backend**: `backend/src/`, `backend/tests/`
- **Frontend**: `frontend/src/`, `frontend/tests/`

## Phase 3.1: Backend Setup
- [x] T001 Create project structure directories `backend/` and `frontend/`.
- [x] T002 [P] In `backend/`, initialize a Node.js project (`npm init -y`) and install dependencies: `express`, `pg`, `bcrypt`, `jsonwebtoken`, `multer`, `@google/genai`.
- [x] T003 [P] In `backend/`, install development dependencies: `jest`, `supertest`, `nodemon`.
- [x] T004 [P] In `backend/`, configure Jest and add a basic `test` script to `package.json`.
- [x] T005 [P] In `backend/src/`, create a database connection module (`db.js`) for PostgreSQL.

## Phase 3.2: Backend Tests First (TDD)
**CRITICAL: These tests MUST be written and MUST FAIL before ANY implementation**
- [x] T006 [P] Create contract test `backend/tests/contract/auth.test.js` for `POST /api/auth/register` and `POST /api/auth/login` based on `contracts/auth.json`.
- [x] T007 [P] Create contract test `backend/tests/contract/inventory.test.js` for `POST /api/inventory/upload` and `GET /api/inventory` based on `contracts/inventory.json`.
- [x] T008 [P] Create contract test `backend/tests/contract/ai.test.js` for AI endpoints based on `contracts/ai.json`.
- [x] T009 [P] Create integration test `backend/tests/integration/auth.flow.test.js` to simulate the user registration and login flow from `quickstart.md`.

## Phase 3.3: Core Backend Implementation
- [x] T010 Create a SQL script to set up the `users` and `items` tables in the database as defined in `data-model.md`.
- [x] T011 [P] Create the User model in `backend/src/models/user.js` with methods to interact with the `users` table.
- [x] T012 [P] Create the Item model in `backend/src/models/item.js` with methods to interact with the `items` table.
- [x] T013 Create the authentication service in `backend/src/services/authService.js` to handle registration and login logic, using the User model.
- [x] T014 Create the authentication API routes in `backend/src/api/auth.js`, connect them to the `authService`, and make the tests from T006 and T009 pass.
- [x] T015 Create the inventory service in `backend/src/services/inventoryService.js` to handle item creation logic.
- [x] T016 Create the inventory API routes in `backend/src/api/inventory.js`, connect them to the `inventoryService`, and make the tests from T007 pass. This includes setting up `multer` for file uploads.
- [x] T017 Create the AI service in `backend/src/services/aiService.js` with mock implementations for market research and listing generation.
- [x] T018 Create the AI API routes in `backend/src/api/ai.js`, connect them to the `aiService`, and make the tests from T008 pass.

## Phase 3.4: Frontend Setup
- [x] T019 [P] In `frontend/`, initialize a React/TypeScript project using Vite (`npm create vite@latest . -- --template react-ts`).
- [x] T020 [P] In `frontend/`, install dependencies: `axios`, `tailwindcss`.
- [x] T021 [P] In `frontend/`, configure TailwindCSS.
- [x] T022 [P] In `frontend/`, install development dependencies: `jest`, `@testing-library/react`.
- [x] T023 [P] In `frontend/`, configure Jest for React testing.

## Phase 3.5: Frontend Tests First (TDD)
- [x] T024 [P] Create a component test `frontend/src/components/RegisterForm.test.jsx` for the user registration form.
- [x] T025 [P] Create a component test `frontend/src/components/LoginForm.test.jsx` for the user login form.
- [x] T026 [P] Create a component test `frontend/src/components/ImageUploader.test.jsx` for the image upload component.

## Phase 3.6: Frontend Core Implementation
- [x] T027 [P] Create the `RegisterForm` component in `frontend/src/components/RegisterForm.jsx` and make the test from T024 pass.
- [x] T028 [P] Create the `LoginForm` component in `frontend/src/components/LoginForm.jsx` and make the test from T025 pass.
- [x] T029 [P] Create an API service module in `frontend/src/services/api.js` to handle communication with the backend.
- [x] T030 [P] Implement the `ImageUploader` component in `frontend/src/components/ImageUploader.jsx` and make the test from T026 pass.
- [x] T031 Create a main `App.jsx` that includes routing and renders the different components.

## Dependencies
- Backend setup (T001-T005) must be done before backend tests and implementation.
- Backend tests (T006-T009) must be done before their corresponding implementation tasks.
- Frontend setup (T019-T023) must be done before frontend tests and implementation.
- Frontend tests (T024-T026) must be done before their corresponding implementation tasks.

## Parallel Example
```
# The following setup tasks can be run in parallel:
Task: "T002 [P] In backend/, initialize a Node.js project..."
Task: "T003 [P] In backend/, install development dependencies..."
Task: "T019 [P] In frontend/, initialize a React/TypeScript project..."
Task: "T020 [P] In frontend/, install dependencies..."

# The following test creation tasks can be run in parallel:
Task: "T006 [P] Create contract test backend/tests/contract/auth.test.js..."
Task: "T007 [P] Create contract test backend/tests/contract/inventory.test.js..."
Task: "T024 [P] Create a component test frontend/src/components/RegisterForm.test.jsx..."
```