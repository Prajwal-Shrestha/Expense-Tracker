import { useMemo, useState } from 'react'
import { buildMonthGrid, dateKey, monthLabel, WEEKDAY_LABELS } from '../utils/date.js'
import {
  adToBs,
  bsCellKey,
  bsMonthLabel,
  buildBsMonthGrid,
  shiftBsMonth,
  WEEKDAYS_NE,
} from '../utils/nepaliDate.js'
import { formatNPR, CURRENCY_SYMBOL } from '../utils/currency.js'
import TransactionItem from './TransactionItem.jsx'

export default function CalendarView({ transactions, onDelete, justAddedId }) {
  const today = new Date()
  const [system, setSystem] = useState('bs') 

  const [adCursor, setAdCursor] = useState(new Date(today.getFullYear(), today.getMonth(), 1))

  const todayBs = adToBs(today)
  const [bsCursor, setBsCursor] = useState({ year: todayBs.year, month: todayBs.month })

  const [selected, setSelected] = useState(dateKey(today))

  const totalsByDay = useMemo(() => {
    const map = {}
    for (const t of transactions) {
      const key = dateKey(t.date)
      const signed = t.type === 'income' ? t.amount : -t.amount
      map[key] = (map[key] || 0) + signed
    }
    return map
  }, [transactions])

  const selectedTransactions = transactions
    .filter((t) => dateKey(t.date) === selected)
    .sort((a, b) => new Date(b.date) - new Date(a.date))

  const adGrid = useMemo(
    () => buildMonthGrid(adCursor.getFullYear(), adCursor.getMonth()),
    [adCursor]
  )
  const bsGrid = useMemo(
    () => buildBsMonthGrid(bsCursor.year, bsCursor.month),
    [bsCursor]
  )

  function goToAdMonth(offset) {
    setAdCursor(new Date(adCursor.getFullYear(), adCursor.getMonth() + offset, 1))
  }
  function goToBsMonth(offset) {
    setBsCursor(shiftBsMonth(bsCursor.year, bsCursor.month, offset))
  }

  const weekdayLabels = system === 'bs' ? WEEKDAYS_NE : WEEKDAY_LABELS
  const monthTitle = system === 'bs' ? bsMonthLabel(bsCursor.year, bsCursor.month) : monthLabel(adCursor.getFullYear(), adCursor.getMonth())

  return (
    <section className="animate-view-fade">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display text-lg font-semibold text-ink">{monthTitle}</h2>
        <div className="flex items-center gap-3">
          <div className="inline-flex bg-surface border border-line rounded-full p-1">
            <button
              type="button"
              onClick={() => setSystem('bs')}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                system === 'bs' ? 'bg-ink text-white' : 'text-ink-soft'
              }`}
            >
              BS
            </button>
            <button
              type="button"
              onClick={() => setSystem('ad')}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                system === 'ad' ? 'bg-ink text-white' : 'text-ink-soft'
              }`}
            >
              AD
            </button>
          </div>
          <div className="flex gap-1">
            <button
              type="button"
              onClick={() => (system === 'bs' ? goToBsMonth(-1) : goToAdMonth(-1))}
              aria-label="Previous month"
              className="w-8 h-8 rounded-full bg-surface border border-line text-ink-soft hover:text-ink hover:border-income transition-colors"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={() => (system === 'bs' ? goToBsMonth(1) : goToAdMonth(1))}
              aria-label="Next month"
              className="w-8 h-8 rounded-full bg-surface border border-line text-ink-soft hover:text-ink hover:border-income transition-colors"
            >
              ›
            </button>
          </div>
        </div>
      </div>

      <div className="bg-surface rounded-3xl border border-line p-3 sm:p-4">
        <div className="grid grid-cols-7 gap-1 mb-1">
          {weekdayLabels.map((label) => (
            <div key={label} className="text-center text-xs uppercase tracking-wide text-ink-soft py-1">
              {label}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {system === 'bs'
            ? bsGrid.map((cell, i) => {
                if (!cell) return <div key={i} className="min-h-[3.75rem]" />
                const key = bsCellKey(cell.year, cell.month, cell.day)
                const net = totalsByDay[key]
                const isSelected = key === selected
                const isToday = cell.year === todayBs.year && cell.month === todayBs.month && cell.day === todayBs.day

                return (
                  <DayCell
                    key={i}
                    label={cell.day}
                    net={net}
                    isSelected={isSelected}
                    isToday={isToday}
                    onClick={() => setSelected(key)}
                  />
                )
              })
            : adGrid.map((date, i) => {
                if (!date) return <div key={i} className="min-h-[3.75rem]" />
                const key = dateKey(date)
                const net = totalsByDay[key]
                const isSelected = key === selected
                const isToday = key === dateKey(today)

                return (
                  <DayCell
                    key={i}
                    label={date.getDate()}
                    net={net}
                    isSelected={isSelected}
                    isToday={isToday}
                    onClick={() => setSelected(key)}
                  />
                )
              })}
        </div>
      </div>

      <div className="mt-6">
        <h3 className="font-display text-base font-semibold text-ink mb-3">
          {new Date(selected).toLocaleDateString(undefined, {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })}
        </h3>

        {selectedTransactions.length === 0 ? (
          <p className="text-ink-soft text-sm py-6 text-center rounded-2xl border border-dashed border-line">
            No entries on this day.
          </p>
        ) : (
          <ul>
            {selectedTransactions.map((t) => (
              <TransactionItem key={t.id} transaction={t} onDelete={onDelete} isNew={t.id === justAddedId} />
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}

function DayCell({ label, net, isSelected, isToday, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`min-h-[3.75rem] rounded-xl p-1.5 text-left flex flex-col justify-between transition-colors ${
        isSelected
          ? 'bg-ink text-white'
          : isToday
          ? 'bg-highlight/15 hover:bg-highlight/25'
          : 'hover:bg-base'
      }`}
    >
      <span className={`text-xs ${isSelected ? 'text-white' : 'text-ink-soft'}`}>{label}</span>
      {net !== undefined && (
        <span
          className={`tabular text-[10px] sm:text-[11px] leading-tight font-medium ${
            isSelected ? 'text-white' : net < 0 ? 'text-expense' : 'text-income'
          }`}
        >
          {net < 0 ? '-' : '+'}
          {CURRENCY_SYMBOL} {formatNPR(Math.abs(net))}
        </span>
      )}
    </button>
  )
}
