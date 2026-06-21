# College Event Management System - Backend

## Overview

This backend is built with Node.js, Express, MongoDB, and JWT authentication. It provides APIs for users, events, registrations, announcements, notifications, and dashboard analytics.

## Setup

1. `cd backend`
2. `npm install`
3. Copy `.env.example` to `.env` and provide your MongoDB URI and JWT secret.
4. `npm run server`

## API Endpoints

- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/forgot-password`
- `POST /api/auth/reset-password`
- `GET /api/users/profile`
- `PUT /api/users/profile`
- `PUT /api/users/change-password`
- `GET /api/events`
- `GET /api/events/:id`
- `POST /api/events`
- `PUT /api/events/:id`
- `DELETE /api/events/:id`
- `POST /api/registrations`
- `GET /api/registrations`
- `PUT /api/registrations/:id`
- `GET /api/announcements`
- `POST /api/announcements`
- `PUT /api/announcements/:id`
- `DELETE /api/announcements/:id`
- `GET /api/notifications`
- `GET /api/dashboard/stats`

## Notes

- Protect routes with Authorization header: `Bearer <token>`
- Upload route uses `/uploads` for images.
