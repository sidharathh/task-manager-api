# Task Manager API

## Features
- User Authentication (JWT)
- Create, Read, Update, Delete Tasks
- User-specific data
- Pagination & Filtering
- Validation & Error Handling

## Tech Stack
- Node.js
- Express.js
- MongoDB
- JWT

## API Endpoints

### Auth
- POST /api/auth/signup
- POST /api/auth/login

### Tasks
- POST /api/tasks
- GET /api/tasks
- PUT /api/tasks/:id
- DELETE /api/tasks/:id

## Run Locally

npm install  
npm run dev