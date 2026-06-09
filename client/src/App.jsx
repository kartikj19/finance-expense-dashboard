import { useEffect, useMemo, useState } from 'react';
import api from './utils/api';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import LoadingSpinner from './components/LoadingSpinner';
import EmptyState from './components/EmptyState';
import { useLocalStorage } from './hooks/useLocalStorage';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [summary, setSummary] = useState(null);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filterState, setFilterState] = useLocalStorage('expenseTrackerFilters', {
    category: 'All',
    range: 'This Month',
    startDate: '',
    endDate: ''
  });

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [expenseRes, summaryRes] = await Promise.all([
          api.get('/expenses'),
          api.get('/summary')
        ]);
        setExpenses(expenseRes.data);
        setSummary(summaryRes.data);
        setError('');
      } catch (err) {
        setError('Unable to load expense data. Please check your connection.');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    const filteredItems = expenses.filter((expense) => {
      const expenseDate = new Date(expense.date);
      const start = filterState.startDate ? new Date(filterState.startDate) : null;
      const end = filterState.endDate ? new Date(filterState.endDate) : null;

      const categoryMatch = filterState.category === 'All' || expense.category === filterState.category;
      const withinRange = (() => {
        if (filterState.range === 'Custom Range' && start && end) {
          return expenseDate >= start && expenseDate <= end;
        }
        const now = new Date();
        const monthOffset = filterState.range === 'Last Month' ? -1 : 0;
        if (filterState.range === 'This Month' || filterState.range === 'Last Month') {
          const target = new Date(now.getFullYear(), now.getMonth() + monthOffset, 1);
          const monthEnd = new Date(target.getFullYear(), target.getMonth() + 1, 0);
          return expenseDate >= target && expenseDate <= monthEnd;
        }
        return true;
      })();

      return categoryMatch && withinRange;
    });

    setFiltered(filteredItems);
  }, [expenses, filterState]);

  const sortedExpenses = useMemo(() => filtered.sort((a, b) => new Date(b.date) - new Date(a.date)), [filtered]);

  const reloadData = async () => {
    setLoading(true);
    try {
      const [expenseRes, summaryRes] = await Promise.all([
        api.get('/expenses'),
        api.get('/summary')
      ]);
      setExpenses(expenseRes.data);
      setSummary(summaryRes.data);
      setError('');
    } catch (err) {
      setError('Unable to update expenses. Try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-slate-100">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {loading ? (
          <div className="flex min-h-[60vh] items-center justify-center">
            <LoadingSpinner />
          </div>
        ) : error ? (
          <div className="rounded-3xl border border-rose-700 bg-slate-900/90 p-8 text-rose-200 shadow-soft">
            <h2 className="text-xl font-semibold">Something went wrong</h2>
            <p className="mt-2">{error}</p>
          </div>
        ) : expenses.length === 0 ? (
          <EmptyState />
        ) : (
          <Dashboard
            expenses={sortedExpenses}
            allExpenses={expenses}
            summary={summary}
            selectedExpense={selectedExpense}
            setSelectedExpense={setSelectedExpense}
            reloadData={reloadData}
            filterState={filterState}
            setFilterState={setFilterState}
          />
        )}
      </main>
    </div>
  );
}

export default App;
