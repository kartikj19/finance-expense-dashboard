import { useEffect, useState } from 'react';
import { categories } from '../utils/format';

const initialState = {
  amount: '',
  category: 'Food',
  date: '',
  note: ''
};

const ExpenseForm = ({ onSubmit, selectedExpense, setSelectedExpense }) => {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (selectedExpense) {
      setForm({
        amount: selectedExpense.amount,
        category: selectedExpense.category,
        date: selectedExpense.date,
        note: selectedExpense.note,
        id: selectedExpense.id
      });
    } else {
      setForm(initialState);
    }
  }, [selectedExpense]);

  const handleChange = (key) => (event) => {
    setForm((prev) => ({ ...prev, [key]: event.target.value }));
    setErrors((prev) => ({ ...prev, [key]: '' }));
  };

  const validate = () => {
    const nextErrors = {};
    const amount = Number(form.amount);
    if (Number.isNaN(amount) || amount <= 0) nextErrors.amount = 'Amount must be positive.';
    if (!form.category) nextErrors.category = 'Category is required.';
    if (!form.date) nextErrors.date = 'Date is required.';
    if (form.date && new Date(form.date) > new Date()) nextErrors.date = 'Future dates not allowed.';
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const submit = (event) => {
    event.preventDefault();
    if (!validate()) return;
    onSubmit({
      id: form.id,
      amount: Number(form.amount),
      category: form.category,
      date: form.date,
      note: form.note.trim()
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-white">Add / Edit expense</h2>
        <p className="mt-1 text-sm text-slate-400">Complete the form and save to keep your budget on track.</p>
      </div>
      <form onSubmit={submit} className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-2 text-sm text-slate-300">
          <span>Amount</span>
          <input
            value={form.amount}
            onChange={handleChange('amount')}
            type="number"
            min="0"
            step="0.01"
            placeholder="e.g. 1200"
            className="w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition hover:border-orange-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-500/20"
          />
          {errors.amount && <p className="text-xs text-rose-400">{errors.amount}</p>}
        </label>
        <label className="space-y-2 text-sm text-slate-300">
          <span>Category</span>
          <select
            value={form.category}
            onChange={handleChange('category')}
            className="w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition hover:border-orange-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-500/20"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.category && <p className="text-xs text-rose-400">{errors.category}</p>}
        </label>
        <label className="space-y-2 text-sm text-slate-300">
          <span>Date</span>
          <input
            value={form.date}
            onChange={handleChange('date')}
            type="date"
            className="w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition hover:border-orange-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-500/20"
          />
          {errors.date && <p className="text-xs text-rose-400">{errors.date}</p>}
        </label>
        <label className="space-y-2 text-sm text-slate-300 sm:col-span-2">
          <span>Note</span>
          <textarea
            value={form.note}
            onChange={handleChange('note')}
            rows="3"
            placeholder="Optional note"
            className="w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition hover:border-orange-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-500/20"
          />
        </label>
        <div className="sm:col-span-2 flex flex-col gap-3 sm:flex-row sm:justify-end">
          {selectedExpense && (
            <button
              type="button"
              onClick={() => setSelectedExpense(null)}
              className="rounded-3xl border border-slate-700 bg-slate-950 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:-translate-y-0.5 hover:bg-slate-900"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="rounded-3xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white shadow-glow transition hover:-translate-y-0.5 hover:bg-orange-400"
          >
            {selectedExpense ? 'Update Expense' : 'Add Expense'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ExpenseForm;
