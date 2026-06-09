import { formatCurrency } from '../utils/format';

const SummaryCards = ({ summary, totals }) => {
  const highestValue = summary?.highestExpense?.amount || 0;

  return (
    <div className="grid gap-4 sm:grid-cols-3 md:grid-cols-4">
      <div className="rounded-3xl border border-slate-700 bg-slate-900 p-6 shadow-soft transition hover:-translate-y-1 min-h-[170px] sm:col-span-1 md:col-span-2 w-full">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-400">Total this month</p>
        <p className="mt-4 text-2xl font-semibold text-white">{formatCurrency(summary?.totalThisMonth || 0)}</p>
        <p className="mt-2 text-sm text-slate-400">Tracks the current month’s spending total.</p>
      </div>
      <div className="rounded-3xl border border-slate-700 bg-slate-900 p-6 shadow-soft transition hover:-translate-y-1 min-h-[170px] sm:col-span-1 md:col-span-2 w-full">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-400">Highest expense</p>
        <p className="mt-4 text-2xl font-semibold text-white">{formatCurrency(highestValue)}</p>
        <p className="mt-2 text-sm text-slate-400">Based on the largest recorded expense.</p>
      </div>
      <div className="sm:col-span-3 md:col-span-4 rounded-3xl border border-slate-700 bg-slate-900 p-6 shadow-soft transition hover:-translate-y-1">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-400">Spending by category</p>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {Object.entries(totals).map(([category, amount]) => (
            <div key={category} className="rounded-3xl border border-slate-800 bg-slate-950 p-4 transition hover:border-orange-400 hover:bg-slate-900">
              <p className="text-sm text-slate-400">{category}</p>
              <p className="mt-2 text-lg font-semibold text-orange-300">{formatCurrency(amount)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SummaryCards;
