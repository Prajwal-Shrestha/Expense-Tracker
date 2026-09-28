import { useCountUp } from '../hooks/useCountUp.js'
import { formatNPR, CURRENCY_SYMBOL } from '../utils/currency.js'

export default function Summary({ transactions }) {
  const income = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0)

  const expenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0)

  const balance = income - expenses

  const animatedBalance = useCountUp(balance)
  const animatedIncome = useCountUp(income)
  const animatedExpenses = useCountUp(expenses)

  return (
    <section className="mb-8 animate-rise-in">
      <div className="bg-surface rounded-3xl p-6 sm:p-8 shadow-sm border border-line mb-3">
        <p className="text-xs uppercase tracking-wide text-ink-soft mb-1">Current balance</p>
        <p
          className={`font-display tabular text-4xl sm:text-5xl font-semibold ${
            balance < 0 ? 'text-expense' : 'text-ink'
          }`}
        >
          {balance < 0 ? '-' : ''}
          {CURRENCY_SYMBOL} {formatNPR(Math.abs(animatedBalance))}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-surface rounded-2xl p-4 border border-line flex items-center gap-3">
          <span className="w-8 h-8 rounded-full bg-income/10 text-income flex items-center justify-center text-sm">
            ↑
          </span>
          <div>
            <p className="text-xs text-ink-soft">Income</p>
            <p className="font-display tabular text-lg font-semibold text-income">
              {CURRENCY_SYMBOL} {formatNPR(animatedIncome)}
            </p>
          </div>
        </div>
        <div className="bg-surface rounded-2xl p-4 border border-line flex items-center gap-3">
          <span className="w-8 h-8 rounded-full bg-expense/10 text-expense flex items-center justify-center text-sm">
            ↓
          </span>
          <div>
            <p className="text-xs text-ink-soft">Expenses</p>
            <p className="font-display tabular text-lg font-semibold text-expense">
              {CURRENCY_SYMBOL} {formatNPR(animatedExpenses)}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
