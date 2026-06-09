import { useMemo, useState } from 'react';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseTable from '../components/ExpenseTable';
import ExpenseFilters from '../components/ExpenseFilters';
import SummaryCards from '../components/SummaryCards';
import ExpenseChart from '../components/ExpenseChart';
import DeleteConfirmationModal from '../components/DeleteConfirmationModal';
import EmptyState from '../components/EmptyState';
import { exportToCsv } from '../utils/format';
import api from '../utils/api';

const Dashboard = ({
  expenses,
  allExpenses,
  summary,
  selectedExpense,
  setSelectedExpense,
  reloadData,
  filterState,
  setFilterState
}) => {
  const [showModal, setShowModal] = useState(false);
  const [deletingExpense, setDeletingExpense] = useState(null);
  const [actionError, setActionError] = useState('');

  const categoryTotals = useMemo(() => {
    const totals = {};
    expenses.forEach((expense) => {
      totals[expense.category] = (totals[expense.category] || 0) + Number(expense.amount);
    });
    return totals;
  }, [expenses]);

  const handleSubmit = async (payload) => {
    setActionError('');
    try {
      if (payload.id) {
        await api.put(`/expenses/${payload.id}`, payload);
      } else {
        await api.post('/expenses', payload);
      }
      setSelectedExpense(null);
      reloadData();
    } catch (error) {
      setActionError(error.response?.data?.errors ? Object.values(error.response.data.errors).join(' ') : 'Unable to save expense.');
    }
  };

  const handleDelete = async (expense) => {
    setDeletingExpense(expense);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    if (!deletingExpense) return;
    setActionError('');
    try {
      await api.delete(`/expenses/${deletingExpense.id}`);
      setShowModal(false);
      setDeletingExpense(null);
      reloadData();
    } catch (error) {
      setActionError('Unable to remove expense.');
    }
  };

  const handleExportCsv = () => {
    exportToCsv(expenses, 'filtered-expenses.csv');
  };

  return (
    <div className="space-y-8">
      <div className="grid gap-6 xl:grid-cols-[1.6fr_0.7fr]">
        <div className="rounded-3xl border border-slate-700 bg-slate-900/95 p-6 shadow-soft transition hover:-translate-y-0.5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm uppercase tracking-[0.25em] text-orange-400">Expense Dashboard</p>
              <h1 className="mt-3 text-3xl font-semibold text-white">Manage your expenses</h1>
              <p className="mt-2 text-sm text-slate-400">Add, update, delete and track spending across categories.</p>
            </div>
            <button
              onClick={handleExportCsv}
              className="inline-flex items-center justify-center rounded-3xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white shadow-glow transition hover:-translate-y-0.5 hover:bg-orange-400"
            >
              Export CSV
            </button>
          </div>

          <div className="mt-8 grid gap-6 xl:grid-cols-[1.05fr_1fr]">
            <div className="rounded-3xl border border-slate-700 bg-slate-950 p-6 shadow-soft transition hover:-translate-y-0.5">
              <ExpenseForm onSubmit={handleSubmit} selectedExpense={selectedExpense} setSelectedExpense={setSelectedExpense} />
            </div>
            <div className="grid gap-6">
              <div className="rounded-3xl border border-slate-700 bg-slate-950 p-6 shadow-soft transition hover:-translate-y-0.5">
                <SummaryCards summary={summary} totals={categoryTotals} />
              </div>
              <div className="rounded-3xl border border-slate-700 bg-slate-950 p-6 shadow-soft transition hover:-translate-y-0.5">
                <ExpenseChart totals={categoryTotals} />
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-700 bg-slate-900/95 p-6 shadow-soft transition hover:-translate-y-0.5">
          <ExpenseFilters filterState={filterState} setFilterState={setFilterState} />
          {actionError && (
            <div className="mt-4 rounded-2xl bg-rose-500/10 px-4 py-3 text-sm text-rose-200">{actionError}</div>
          )}
          <div className="mt-6 overflow-hidden rounded-3xl border border-slate-700 bg-slate-950 p-5">
            <h2 className="text-lg font-semibold text-white">Current spending</h2>
            <p className="mt-2 text-sm text-slate-400">Filtered expenses are shown in the table and exported to CSV.</p>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-700 bg-slate-900/95 p-6 shadow-soft transition hover:-translate-y-0.5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-white">Expense list</h2>
            <p className="mt-1 text-sm text-slate-400">Showing newest expenses first.</p>
          </div>
          <div className="rounded-full bg-slate-950 px-4 py-2 text-sm text-slate-300 ring-1 ring-slate-700">{expenses.length} records</div>
        </div>
        {expenses.length === 0 ? (
          <div className="mt-10">
            <EmptyState />
          </div>
        ) : (
          <ExpenseTable
            expenses={expenses}
            onEdit={setSelectedExpense}
            onDelete={handleDelete}
          />
        )}
      </div>

      <DeleteConfirmationModal
        open={showModal}
        onCancel={() => setShowModal(false)}
        onConfirm={confirmDelete}
        expense={deletingExpense}
      />
    </div>
  );
};

export default Dashboard;
