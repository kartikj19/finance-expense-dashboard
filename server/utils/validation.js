const categories = ['Food', 'Transport', 'Bills', 'Entertainment', 'Other'];

const validateExpense = (expense) => {
  const errors = {};
  const amount = Number(expense.amount);
  const date = expense.date ? new Date(expense.date) : null;
  const now = new Date();

  if (!expense.category || !categories.includes(expense.category)) {
    errors.category = 'Category is required and must be one of Food, Transport, Bills, Entertainment, or Other.';
  }

  if (Number.isNaN(amount) || amount <= 0) {
    errors.amount = 'Amount must be a positive number.';
  }

  if (!expense.date) {
    errors.date = 'Date is required.';
  } else if (Number.isNaN(date.getTime())) {
    errors.date = 'Date is invalid.';
  } else if (date > now) {
    errors.date = 'Future dates are not allowed.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors
  };
};

module.exports = validateExpense;
