const express = require('express');
const cors = require('cors');
const expensesRouter = require('./routes/expenses');
const summaryRouter = require('./routes/summary');
const errorHandler = require('./middleware/error');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/expenses', expensesRouter);
app.use('/api/summary', summaryRouter);

app.get('/', (req, res) => {
  res.json({ message: 'Expense Tracker API is running.' });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
