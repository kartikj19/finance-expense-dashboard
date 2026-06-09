import { categories } from '../utils/format';

const ranges = ['This Month', 'Last Month', 'Custom Range', 'All'];

const ExpenseFilters = ({ filterState, setFilterState }) => {
  const updateField = (field) => (event) => {
    setFilterState((prev) => ({ ...prev, [field]: event.target.value }));
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-lg font-semibold text-white">Filters</h2>
        <p className="mt-1 text-sm text-slate-400">Narrow results by category or date range.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-2 text-sm text-slate-300">
          <span>Category</span>
          <select
            value={filterState.category}
            onChange={updateField('category')}
            className="w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition hover:border-orange-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-500/20"
          >
            <option value="All">All</option>
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </label>
        <label className="space-y-2 text-sm text-slate-300">
          <span>Range</span>
          <select
            value={filterState.range}
            onChange={updateField('range')}
            className="w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition hover:border-orange-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-500/20"
          >
            {ranges.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </label>
      </div>
      {filterState.range === 'Custom Range' && (
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="space-y-2 text-sm text-slate-300">
            <span>Start date</span>
            <input
              type="date"
              value={filterState.startDate}
              onChange={updateField('startDate')}
              className="w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition hover:border-orange-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-500/20"
            />
          </label>
          <label className="space-y-2 text-sm text-slate-300">
            <span>End date</span>
            <input
              type="date"
              value={filterState.endDate}
              onChange={updateField('endDate')}
              className="w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition hover:border-orange-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-500/20"
            />
          </label>
        </div>
      )}
    </div>
  );
};

export default ExpenseFilters;
