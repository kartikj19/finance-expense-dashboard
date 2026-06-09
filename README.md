# Expense Tracker

A working full-stack Expense Tracker built with React + Vite on the frontend and Node.js + Express on the backend. The app supports expense CRUD, filtering, summaries, charts, and CSV export.

## Features

- Add, edit, and delete expenses
- Filter by category and date range
- Summary cards for monthly spending and highest expense
- Category spending bar chart using Recharts
- Export filtered expenses as CSV
- Responsive dashboard for desktop and mobile
- Backend JSON storage in `server/data/expenses.json`
- Validation and API error handling

## Tech Stack

- Frontend: React, Vite, Tailwind CSS, Axios, Recharts
- Backend: Node.js, Express, UUID, CORS
- Storage: File-based JSON data in `server/data/expenses.json`

## Folder Structure

```
Expense_Tracker/
├── client/
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── src/
│       ├── App.jsx
│       ├── main.jsx
│       ├── index.css
│       ├── components/
│       ├── hooks/
│       ├── pages/
│       └── utils/
├── server/
│   ├── index.js
│   ├── package.json
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   └── data/
│       ├── expenses.json
│       └── test_expenses.csv
└── README.md
```

## Installation

### Backend

```bash
cd server
npm install
```

### Frontend

```bash
cd client
npm install
```

## Running Locally

Open two terminals.

### Start backend

```bash
cd server
npm run dev
```

### Start frontend

```bash
cd client
npm run dev
```

- Frontend: `http://127.0.0.1:5173`
- Backend API: `http://127.0.0.1:5000`

## Environment Variables

When deploying the frontend separately, set the backend API URL in the frontend environment.

Create a `.env` file in `client/` or use the included `.env.example`:

```bash
VITE_API_URL=https://your-backend-url.com/api
```

This makes the frontend call the deployed backend instead of the local proxy.

## Test Data

A test CSV file is included at `server/data/test_expenses.csv` for quick import or verification.

### Example test CSV row format

```csv
id,description,amount,category,date
1a3f9e6a-7b44-4f2d-a1a1-111111111111,Grocery shopping - Weekly,1840,Groceries,2026-06-05
```

## API Documentation

### GET /api/expenses

Returns all expenses.

### POST /api/expenses

Create a new expense.

Request body:

```json
{
  "description": "Lunch",
  "amount": 250,
  "category": "Food",
  "date": "2026-06-10"
}
```

### PUT /api/expenses/:id

Update an existing expense with the same request body shape as POST.

### DELETE /api/expenses/:id

Delete an expense by ID.

### GET /api/summary

Returns summary data:

- `totalThisMonth`
- `categoryTotals`
- `highestExpense`

## Deployment

### Deploy backend on Render

1. Create a free Render account at https://render.com.
2. Click "New" → "Web Service".
3. Connect your GitHub/GitLab repository.
4. Choose the `server/` folder.
5. Set the environment:
   - Name: `expense-tracker-backend`
   - Runtime: `Node`
   - Branch: `main` (or your branch)
6. Set the build and start commands:
   - Build command: `npm install`
   - Start command: `npm start`
7. Leave the port blank — Render will assign `PORT` automatically.
8. Deploy the service.

After deployment, copy the public backend URL, for example:

```text
https://expense-tracker-backend.onrender.com
```

### Deploy frontend on Vercel

1. Create a free Vercel account at https://vercel.com.
2. Click "New Project" and import the same repository.
3. When Vercel asks for the root directory, choose `client/`.
4. Set the build command to:

```bash
npm run build
```

5. Set the output directory to:

```text
dist
```

6. Add an environment variable:
   - Key: `VITE_API_URL`
   - Value: `https://expense-tracker-backend.onrender.com/api`

7. Deploy the frontend.

### Use the deployed app publicly

- Backend URL: `https://<your-render-service>.onrender.com`
- Frontend URL: `https://<your-vercel-project>.vercel.app`

The frontend will call the backend through the `VITE_API_URL` value.

### Important note

The backend currently uses file-based JSON storage in `server/data/expenses.json`. Render may not preserve file changes indefinitely after redeploys. This is fine for testing, but for production use a real database later.

## Notes

- The frontend is configured to use `VITE_API_URL` when available, or `/api` locally.
- The backend uses file-based JSON storage so data persists between app restarts locally.
- For local testing, use the provided `server/data/test_expenses.csv` dataset or modify `server/data/expenses.json`.

## Future Improvements

- Add authentication for multiple users
- Add budgets and spending limits
- Add more export/import options
- Replace JSON file storage with a production database
- Add end-to-end tests for the full app
