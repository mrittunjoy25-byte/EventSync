# College Event Management System

## Overview

This repository contains a full-stack College Event Management System.

- Backend: Node.js, Express, MongoDB, JWT, Multer
- Frontend: React, Vite, Tailwind CSS, React Router, Axios, React Hook Form, React Toastify, Chart.js

## Folder Structure

- `backend/` - API server
- `frontend/` - React application

## Installation

1. Open terminal in `backend`:
   - `npm install`
   - copy `.env.example` to `.env`
   - set `MONGO_URI` and `JWT_SECRET`
   - `npm run server`

2. Open terminal in `frontend`:
   - `npm install`
   - copy `.env.example` to `.env`
   - `npm run dev`

## Notes

- Backend runs on port 5000 by default.
- Frontend runs on port 5173 by default.
- Use `http://localhost:5000/api` as API base URL in frontend env.
