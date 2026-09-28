const CATEGORIES = ['All', 'Food', 'Transport', 'Housing', 'Utilities', 'Entertainment', 'Health', 'Income', 'Other']

export default function FilterBar({ filters, onChange }) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-4">
      <label className="flex-1">
        <span className="text-xs uppercase tracking-wide text-ink-soft">Category</span>
        <select
          value={filters.category}
          onChange={(e) => onChange({ ...filters, category: e.target.value })}
          className="mt-1 w-full rounded-xl border border-line bg-surface px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-income/40 focus:border-income"
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </label>

      <label className="flex-1">
        <span className="text-xs uppercase tracking-wide text-ink-soft">Sort by</span>
        <select
          value={filters.sort}
          onChange={(e) => onChange({ ...filters, sort: e.target.value })}
          className="mt-1 w-full rounded-xl border border-line bg-surface px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-income/40 focus:border-income"
        >
          <option value="date-desc">Date (newest)</option>
          <option value="date-asc">Date (oldest)</option>
          <option value="amount-desc">Amount (high to low)</option>
          <option value="amount-asc">Amount (low to high)</option>
        </select>
      </label>
    </div>
  )
}
