# Quickstart Guide

This guide walks through the primary user flow of registering, uploading an item, and getting AI-powered insights.

## 1. Register a User
Send a `POST` request to `/api/auth/register` with a username and password.
```json
{
  "username": "testuser",
  "password": "password123"
}
```

## 2. Log In
Send a `POST` request to `/api/auth/login` to receive your access and refresh tokens.

## 3. Upload an Item
Send a `POST` request to `/api/inventory/upload` as `multipart/form-data`, including your access token in the `Authorization` header. Attach two images: `garment` and `label`.

## 4. View Inventory
Send a `GET` request to `/api/inventory` to see the newly created item, which should have its details automatically populated by the AI.

## 5. Get Insights
Send a `POST` request to `/api/ai/market-research` or `/api/ai/generate-listing` with the `itemId` to receive AI-powered results.
