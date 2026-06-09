export const categories = ['Food', 'Transport', 'Bills', 'Entertainment', 'Other'];

export const formatCurrency = (value) => {
  const amount = Number(value) || 0;
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2
  }).format(amount);
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-IN', {
    year: 'numeric',
    month: 'short',
    day: '2-digit'
  }).format(date);
};

export const exportToCsv = (expenses, filename) => {
  const headers = ['Date', 'Category', 'Amount', 'Note'];
  const rows = expenses.map((expense) => [expense.date, expense.category, expense.amount, expense.note]);
  const csvContent = [headers, ...rows].map((row) => row.map((item) => `"${String(item).replace(/"/g, '""')}"`).join(',')).join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
