import { useState } from 'react'

const CATEGORIES = ['Food', 'Transport', 'Housing', 'Utilities', 'Entertainment', 'Health', 'Income', 'Other']

const emptyForm = {
  type: 'expense',
  amount: '',
  category: 'Food',
  description: '',
  date: new Date().toISOString().slice(0, 10),
}

export default function TransactionForm({ onAdd }) {
  const [form, setForm] = useState(emptyForm)
  const [error, setError] = useState('')

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()

    const amount = parseFloat(form.amount)
    if (!form.amount || isNaN(amount) || amount <= 0) {
      setError('Enter an amount greater than zero.')
      return
    }
    if (!form.description.trim()) {
      setError('Add a short description.')
      return
    }

    onAdd({
      id: crypto.randomUUID(),
      type: form.type,
      amount,
      category: form.category,
      description: form.description.trim(),
      date: form.date,
    })

    setForm({ ...emptyForm, date: form.date })
    setError('')
  }

  return (
    <form onSubmit={handleSubmit} className="bg-surface rounded-3xl p-5 sm:p-6 border border-line mb-8">
      <h2 className="font-display text-lg font-semibold mb-4 text-ink">Add a transaction</h2>

      <div className="flex gap-2 mb-4">
        <button
          type="button"
          onClick={() => setForm((prev) => ({ ...prev, type: 'expense' }))}
          className={`flex-1 py-2 rounded-full text-sm font-medium transition-colors ${
            form.type === 'expense' ? 'bg-expense text-white' : 'bg-base text-ink-soft'
          }`}
        >
          Expense
        </button>
        <button
          type="button"
          onClick={() => setForm((prev) => ({ ...prev, type: 'income' }))}
          className={`flex-1 py-2 rounded-full text-sm font-medium transition-colors ${
            form.type === 'income' ? 'bg-income text-white' : 'bg-base text-ink-soft'
          }`}
        >
          Income
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <label className="block">
          <span className="text-xs uppercase tracking-wide text-ink-soft">Amount (रू)</span>
          <input
            type="number"
            name="amount"
            step="0.01"
            min="0"
            value={form.amount}
            onChange={handleChange}
            placeholder="0.00"
            className="mt-1 w-full rounded-xl border border-line bg-base px-3 py-2 tabular focus:outline-none focus:ring-2 focus:ring-income/40 focus:border-income"
          />
        </label>

        <label className="block">
          <span className="text-xs uppercase tracking-wide text-ink-soft">Category</span>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="mt-1 w-full rounded-xl border border-line bg-base px-3 py-2 focus:outline-none focus:ring-2 focus:ring-income/40 focus:border-income"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>

        <label className="block sm:col-span-2">
          <span className="text-xs uppercase tracking-wide text-ink-soft">Description</span>
          <input
            type="text"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="e.g. Groceries at the market"
            className="mt-1 w-full rounded-xl border border-line bg-base px-3 py-2 focus:outline-none focus:ring-2 focus:ring-income/40 focus:border-income"
          />
        </label>

        <label className="block">
          <span className="text-xs uppercase tracking-wide text-ink-soft">Date</span>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="mt-1 w-full rounded-xl border border-line bg-base px-3 py-2 tabular focus:outline-none focus:ring-2 focus:ring-income/40 focus:border-income"
          />
        </label>
      </div>

      {error && <p className="text-expense text-sm mb-3">{error}</p>}

      <button
        type="submit"
        className="w-full sm:w-auto bg-ink text-white rounded-full px-6 py-2.5 text-sm font-medium hover:opacity-90 active:scale-[0.98] transition"
      >
        Add entry
      </button>
    </form>
  )
}
