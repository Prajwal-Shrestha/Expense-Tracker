import { useState } from 'react'
import FilterBar from './FilterBar.jsx'
import TransactionItem from './TransactionItem.jsx'

export default function TransactionList({ transactions, onDelete, justAddedId }) {
  const [filters, setFilters] = useState({ category: 'All', sort: 'date-desc' })

  const filtered = transactions.filter(
    (t) => filters.category === 'All' || t.category === filters.category
  )

  const sorted = [...filtered].sort((a, b) => {
    switch (filters.sort) {
      case 'date-asc':
        return new Date(a.date) - new Date(b.date)
      case 'amount-desc':
        return b.amount - a.amount
      case 'amount-asc':
        return a.amount - b.amount
      case 'date-desc':
      default:
        return new Date(b.date) - new Date(a.date)
    }
  })

  return (
    <section className="animate-view-fade">
      <h2 className="font-display text-lg font-semibold mb-4 text-ink">Transactions</h2>
      <FilterBar filters={filters} onChange={setFilters} />

      {transactions.length === 0 ? (
        <p className="text-ink-soft text-sm py-8 text-center rounded-2xl border border-dashed border-line">
          No entries yet. Add your first transaction above.
        </p>
      ) : sorted.length === 0 ? (
        <p className="text-ink-soft text-sm py-8 text-center rounded-2xl border border-dashed border-line">
          No transactions match this filter.
        </p>
      ) : (
        <ul>
          {sorted.map((t) => (
            <TransactionItem
              key={t.id}
              transaction={t}
              onDelete={onDelete}
              isNew={t.id === justAddedId}
            />
          ))}
        </ul>
      )}
    </section>
  )
}
