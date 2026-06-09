const EmptyState = () => (
  <div className="rounded-3xl border border-slate-700 bg-slate-900 p-10 text-center shadow-soft">
    <div className="mx-auto max-w-md">
      <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-orange-400/10 text-orange-300">
        <span className="text-2xl">📊</span>
      </div>
      <h2 className="text-2xl font-semibold text-white">No expenses yet</h2>
      <p className="mt-4 text-sm leading-7 text-slate-400">
        Start by adding your first expense. Your spending summary and charts will appear here once data is available.
      </p>
    </div>
  </div>
);

export default EmptyState;
