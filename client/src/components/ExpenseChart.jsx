import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { formatCurrency } from '../utils/format';

const ExpenseChart = ({ totals }) => {
  const chartData = Object.entries(totals).map(([name, value]) => ({ name, value }));

  return (
    <div className="rounded-3xl border border-slate-700 bg-slate-900 p-6 shadow-soft transition hover:-translate-y-1 min-h-[380px]">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-orange-400">Category spend</p>
          <h2 className="mt-2 text-lg font-semibold text-white">Spend by category</h2>
        </div>
        <p className="text-sm text-slate-400">Visual insights for your budget.</p>
      </div>
      <div className="mt-6 h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 8, bottom: 0, left: -10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="name" tickLine={false} axisLine={false} stroke="#94a3b8" />
            <YAxis tickLine={false} axisLine={false} tick={{ fill: '#94a3b8' }} tickFormatter={(value) => `₹${value}`} />
            <Tooltip formatter={(value) => formatCurrency(value)} contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc' }} />
            <Bar dataKey="value" fill="#fb923c" radius={[12, 12, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ExpenseChart;
