# Star Food & Banquet

A premium event management and banquet service application with a dynamic CMS-driven frontend and a robust Express.js backend.

## Architecture

- **Frontend**: Built with React (Lovable), featuring a stunning, responsive design with smooth animations and dynamic data fetching via React Query.
- **Backend**: Node.js & Express.js server providing a secure RESTful API for both public data and admin management.
- **Database**: MongoDB Atlas for persistent storage of menu items, gallery assets, and configurations.
- **Storage**: Remote MinIO (`88.222.242.12:9000`) for high-performance asset management (images and media).

## Project Structure

- `/src`: Frontend application components and pages.
- `/backend`: Express.js server and Mongoose models.
- `/backend/routes`: API endpoints for Auth, Cafe, Gallery, Banquet Menu, etc.
- `/backend/minioClient.js`: Unified MinIO client handling uploads to the remote `starbanquet` bucket.

## Getting Started

1. **Backend**:
   - `cd backend`
   - `npm install`
   - Copy `.env.example` to `.env` and configure your credentials.
   - `npm run dev` to start the server on port 5001.

2. **Frontend**:
   - `npm install`
   - `npm run dev` to start the Vite development server.

## Features

- **Dynamic Cafe Menu**: Fully searchable and categorized cafe menu with inline editing.
- **Banquet Packages**: Gold and Diamond package management with category-based item grouping.
- **Admin Dashboard**: Secure login and management portal for updating all site content in real-time.
- **Integrated Gallery**: Categorized portfolio of past events with light-box viewing.
