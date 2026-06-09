const LoadingSpinner = () => (
  <div className="flex items-center justify-center gap-3 rounded-3xl border border-orange-500/20 bg-slate-900 px-6 py-8 shadow-glow">
    <div className="h-12 w-12 animate-spin rounded-full border-4 border-orange-400 border-t-transparent"></div>
    <div>
      <p className="text-lg font-semibold text-white">Loading data</p>
      <p className="text-sm text-slate-400">Just a moment while we fetch your expenses.</p>
    </div>
  </div>
);

export default LoadingSpinner;
