-- This script initializes the database schema for the application.

-- Create the 'users' table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    refresh_token VARCHAR(255)
);

-- Create the 'items' table
CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    image_url_garment VARCHAR(255) NOT NULL,
    image_url_label VARCHAR(255) NOT NULL,
    brand VARCHAR(255),
    category VARCHAR(255),
    size VARCHAR(255),
    material VARCHAR(255),
    status VARCHAR(50) DEFAULT 'To List',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create an index to speed up lookups by user
CREATE INDEX items_user_id_idx ON items(user_id);
