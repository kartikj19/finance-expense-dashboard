const DeleteConfirmationModal = ({ open, onCancel, onConfirm, expense }) => {
  if (!open || !expense) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 px-4 py-6 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-3xl border border-orange-400/20 bg-slate-900 p-6 shadow-soft">
        <h2 className="text-xl font-semibold text-white">Delete expense?</h2>
        <p className="mt-3 text-sm text-slate-400">
          Are you sure you want to remove <strong className="text-orange-300">{expense.category}</strong> entry for <strong>{expense.note || 'this expense'}</strong> on {expense.date}?
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
          <button
            onClick={onCancel}
            className="rounded-3xl border border-slate-700 bg-slate-950 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:-translate-y-0.5 hover:bg-slate-900"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="rounded-3xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-orange-400"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
