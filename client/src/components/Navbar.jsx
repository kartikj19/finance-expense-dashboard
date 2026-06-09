const Navbar = () => {
  return (
    <header className="border-b border-slate-800 bg-slate-950/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-orange-400">Expense Tracker</p>
          <h1 className="text-xl font-semibold text-white">Personal Finance Dashboard</h1>
        </div>
        <div className="rounded-2xl border border-orange-400/20 bg-slate-900 px-4 py-2 text-sm text-orange-300 shadow-glow">
         Your personal finance companion for tracking expenses, managing budgets, and achieving financial goals.
        </div>
      </div>
    </header>
  );
};

export default Navbar;
