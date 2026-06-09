import { formatCurrency, formatDate } from '../utils/format';

const ExpenseTable = ({ expenses, onEdit, onDelete }) => {
  return (
    <div className="mt-6 overflow-hidden rounded-3xl border border-slate-700 bg-slate-950 shadow-soft">
      <table className="min-w-full divide-y divide-slate-800 text-sm">
        <thead className="bg-slate-900">
          <tr>
            <th className="px-4 py-3 text-left font-semibold text-slate-300">Date</th>
            <th className="px-4 py-3 text-left font-semibold text-slate-300">Category</th>
            <th className="px-4 py-3 text-left font-semibold text-slate-300">Note</th>
            <th className="px-4 py-3 text-right font-semibold text-slate-300">Amount</th>
            <th className="px-4 py-3 text-right font-semibold text-slate-300">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800 bg-slate-950">
          {expenses.map((expense) => (
            <tr key={expense.id} className="transition hover:bg-slate-900/80">
              <td className="whitespace-nowrap px-4 py-3 text-slate-200">{formatDate(expense.date)}</td>
              <td className="px-4 py-3 text-slate-200">{expense.category}</td>
              <td className="px-4 py-3 text-slate-400">{expense.note || '—'}</td>
              <td className="whitespace-nowrap px-4 py-3 text-right font-semibold text-orange-400">{formatCurrency(expense.amount)}</td>
              <td className="whitespace-nowrap px-4 py-3 text-right">
                <div className="inline-flex gap-2">
                  <button
                    onClick={() => onEdit(expense)}
                    className="rounded-2xl border border-orange-500/20 bg-orange-500/10 px-3 py-2 text-xs font-semibold text-orange-300 transition hover:bg-orange-500/20 hover:text-orange-100"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(expense)}
                    className="rounded-2xl border border-rose-500/20 bg-rose-500/10 px-3 py-2 text-xs font-semibold text-rose-300 transition hover:bg-rose-500/20 hover:text-rose-100"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseTable;
