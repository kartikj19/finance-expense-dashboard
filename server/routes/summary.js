const express = require('express');
const path = require('path');
const { readData } = require('../utils/storage');

const router = express.Router();
const DATA_PATH = path.join(__dirname, '..', 'data', 'expenses.json');
const categories = ['Food', 'Transport', 'Bills', 'Entertainment', 'Other'];

router.get('/', async (req, res, next) => {
  try {
    const expenses = await readData(DATA_PATH);
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const monthExpenses = expenses.filter((expense) => {
      const expenseDate = new Date(expense.date);
      return (
        expenseDate.getMonth() === currentMonth &&
        expenseDate.getFullYear() === currentYear
      );
    });

    const totalThisMonth = monthExpenses.reduce((sum, expense) => sum + Number(expense.amount), 0);
    const categoryTotals = categories.reduce((acc, category) => {
      acc[category] = expenses
        .filter((expense) => expense.category === category)
        .reduce((sum, expense) => sum + Number(expense.amount), 0);
      return acc;
    }, {});

    const highestExpense = expenses.reduce((highest, expense) => {
      return !highest || expense.amount > highest.amount ? expense : highest;
    }, null);

    res.json({
      totalThisMonth,
      categoryTotals,
      highestExpense
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
