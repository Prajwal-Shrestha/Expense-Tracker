import { formatNPR, CURRENCY_SYMBOL } from '../utils/currency.js'

export default function TransactionItem({ transaction, onDelete, isNew = false }) {
  const { id, type, amount, category, description, date } = transaction
  const isIncome = type === 'income'

  return (
    <li
      className={`flex items-center gap-3 bg-surface rounded-2xl border border-line pl-1 pr-4 py-3 mb-2 group ${isNew ? 'animate-slide-in' : ''
        }`}
    >
      <span className={`w-1.5 self-stretch rounded-full ${isIncome ? 'bg-income' : 'bg-expense'}`} />
      <div className="min-w-0 flex-1">
        <p className="text-ink truncate">{description}</p>
        <p className="text-xs text-ink-soft mt-0.5">
          {new Date(date).toLocaleDateString()} · {category}
        </p>
      </div>
      <div className="flex items-center gap-4 shrink-0">
        <span className={`tabular text-sm sm:text-[1rem] font-medium ${isIncome ? 'text-income' : 'text-expense'}`}>          {isIncome ? '+' : '-'}
          {CURRENCY_SYMBOL} {formatNPR(amount)}
        </span>
        <button
          type="button"
          onClick={() => onDelete(id)}
          aria-label={`Delete ${description}`}
          className="text-ink-soft hover:text-expense text-sm opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity"
        >
          Delete
        </button>
      </div>
    </li>
  )
}
