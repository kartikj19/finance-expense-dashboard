const express = require('express');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { readData, writeData } = require('../utils/storage');
const validateExpense = require('../utils/validation');

const router = express.Router();
const DATA_PATH = path.join(__dirname, '..', 'data', 'expenses.json');

router.get('/', async (req, res, next) => {
  try {
    const expenses = await readData(DATA_PATH);
    const sorted = expenses.sort((a, b) => new Date(b.date) - new Date(a.date));
    res.json(sorted);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const expense = req.body;
    const validation = validateExpense(expense);
    if (!validation.valid) {
      return res.status(400).json({ errors: validation.errors });
    }

    const newExpense = {
      id: uuidv4(),
      amount: expense.amount,
      category: expense.category,
      date: expense.date,
      note: expense.note || '',
      createdAt: new Date().toISOString()
    };

    const expenses = await readData(DATA_PATH);
    expenses.push(newExpense);
    await writeData(DATA_PATH, expenses);

    res.status(201).json(newExpense);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const update = req.body;
    const validation = validateExpense(update);
    if (!validation.valid) {
      return res.status(400).json({ errors: validation.errors });
    }

    const expenses = await readData(DATA_PATH);
    const index = expenses.findIndex((item) => item.id === id);
    if (index === -1) {
      return res.status(404).json({ error: 'Expense not found.' });
    }

    expenses[index] = {
      ...expenses[index],
      amount: update.amount,
      category: update.category,
      date: update.date,
      note: update.note || ''
    };

    await writeData(DATA_PATH, expenses);
    res.json(expenses[index]);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const expenses = await readData(DATA_PATH);
    const updated = expenses.filter((item) => item.id !== id);
    if (updated.length === expenses.length) {
      return res.status(404).json({ error: 'Expense not found.' });
    }

    await writeData(DATA_PATH, updated);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
