import { useEffect, useRef, useState } from 'react'
import { useLocalStorage } from './hooks/useLocalStorage.js'
import Header from './components/header.jsx'
import Summary from './components/summary.jsx'
import TransactionForm from './components/TransactionForm.jsx'
import TransactionList from './components/TransactionList.jsx'
import CalendarView from './components/CalendarView.jsx'

export default function App() {
  const [transactions, setTransactions] = useLocalStorage('expense-tracker:transactions', [])
  const [view, setView] = useState('list') // 'list' | 'calendar'
  const [justAddedId, setJustAddedId] = useState(null)
  const clearTimer = useRef()

  // Keep the browser tab title in sync with the entry count —
  // a small, real use of useEffect beyond the persistence hook itself.
  useEffect(() => {
    document.title = transactions.length
      ? `Money Manager (${transactions.length})`
      : 'Money Manager'
  }, [transactions.length])

  function handleAdd(transaction) {
    setTransactions((prev) => [transaction, ...prev])
    setJustAddedId(transaction.id)
    clearTimeout(clearTimer.current)
    clearTimer.current = setTimeout(() => setJustAddedId(null), 500)
  }

  function handleDelete(id) {
    setTransactions((prev) => prev.filter((t) => t.id !== id))
  }

  return (
    <div className="min-h-screen bg-base">
      <main className="max-w-2xl mx-auto px-4 py-10 sm:py-14">
        <Header />
        <Summary transactions={transactions} />
        <TransactionForm onAdd={handleAdd} />

        <div className="inline-flex bg-surface border border-line rounded-full p-1 mb-4">
          <button
            type="button"
            onClick={() => setView('list')}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              view === 'list' ? 'bg-ink text-white' : 'text-ink-soft'
            }`}
          >
            List
          </button>
          <button
            type="button"
            onClick={() => setView('calendar')}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              view === 'calendar' ? 'bg-ink text-white' : 'text-ink-soft'
            }`}
          >
            Calendar
          </button>
        </div>

        {view === 'list' ? (
          <TransactionList transactions={transactions} onDelete={handleDelete} justAddedId={justAddedId} />
        ) : (
          <CalendarView transactions={transactions} onDelete={handleDelete} justAddedId={justAddedId} />
        )}
      </main>
    </div>
  )
}
