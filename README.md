# Employee Management System

A full-stack MERN employee management system with a React Vite frontend, Node.js + Express backend, MongoDB storage, CRUD operations, validation, search, filtering, sorting, and responsive UI.

## Features

- Add, update, delete, and list employees
- MongoDB employee storage with Mongoose
- Server-side validation for employee data
- Client-side form validation
- Search by name, email, role, department, or phone
- Filter by employment status
- Sortable employee table
- Responsive professional dashboard UI

## Project Structure

```text
Employee-Management-System/
  backend/
    src/
      config/
      controllers/
      middleware/
      models/
      routes/
      server.js
  frontend/
    src/
      components/
      services/
      App.jsx
      main.jsx
      styles.css
```

## Setup

1. Open this folder in VS Code:

```bash
cd Employee-Management-System
```

2. Install dependencies:

```bash
npm install
npm run install:all
```

On Windows PowerShell, if `npm` is blocked by script execution policy, use `npm.cmd` instead:

```bash
npm.cmd install
npm.cmd run install:all
```

3. Create backend environment file:

```bash
copy backend\.env.example backend\.env
```

4. Update `backend/.env` if your MongoDB URL is different.

5. Start MongoDB locally, or use a MongoDB Atlas connection string.

6. Run both frontend and backend:

```bash
npm run dev
```

PowerShell alternative:

```bash
npm.cmd run dev
```

If your terminal has trouble running both apps together, open two VS Code terminals:

```bash
cd backend
node --watch src/server.js
```

```bash
cd frontend
node node_modules/vite/bin/vite.js --host 0.0.0.0
```

Frontend: `http://localhost:5173`

Backend API: `http://localhost:5000/api/employees`

## Deployment

### Frontend on Vercel

This repo includes `vercel.json`, so Vercel can build the React Vite app from the `frontend` folder.

In Vercel, add this environment variable:

```bash
VITE_API_URL=https://your-backend-url.com/api
```

Then redeploy the project.

### Backend

Deploy the backend separately on a Node.js host such as Render, Railway, or Cyclic.

Add these environment variables on the backend host:

```bash
MONGODB_URI=your_mongodb_atlas_connection_string
CLIENT_URL=https://your-vercel-frontend-url.vercel.app
PORT=5000
```
