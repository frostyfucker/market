# Data Model for AI-Powered Clothing Catalog

This document defines the core data entities for the application.

## 1. User
Represents an individual using the app.

| Field           | Type          | Constraints              | Description                            |
|-----------------|---------------|--------------------------|----------------------------------------|
| `id`            | SERIAL        | PRIMARY KEY              | Unique identifier for the user.        |
| `username`      | VARCHAR(255)  | UNIQUE, NOT NULL         | User's chosen username for login.      |
| `password_hash` | VARCHAR(255)  | NOT NULL                 | Hashed password using bcrypt.          |
| `refresh_token` | VARCHAR(255)  | NULLABLE                 | Hashed refresh token for session persistence. |

## 2. Item
Represents a piece of clothing in a user's inventory.

| Field               | Type          | Constraints              | Description                               |
|---------------------|---------------|--------------------------|-------------------------------------------|
| `id`                | SERIAL        | PRIMARY KEY              | Unique identifier for the item.           |
| `user_id`           | INT           | NOT NULL, FOREIGN KEY    | Links the item to a user.                 |
| `image_url_garment` | VARCHAR(255)  | NOT NULL                 | URL to the uploaded garment image.        |
| `image_url_label`   | VARCHAR(255)  | NOT NULL                 | URL to the uploaded label image.          |
| `brand`             | VARCHAR(255)  | NULLABLE                 | Brand of the item (from AI or user).      |
| `category`          | VARCHAR(255)  | NULLABLE                 | Category of the item (e.g., "Shirt").     |
| `size`              | VARCHAR(255)  | NULLABLE                 | Size of the item.                         |
| `material`          | VARCHAR(255)  | NULLABLE                 | Material of the item (e.g., "Cotton").    |
| `status`            | VARCHAR(50)   | DEFAULT 'To List'        | Current status of the item.               |
| `created_at`        | TIMESTAMP     | DEFAULT CURRENT_TIMESTAMP| Timestamp of when the item was created.   |
