export default function Header() {
  const today = new Date().toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <header className="mb-8 animate-rise-in">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-1">
        <div className="flex items-center gap-3">
          <span className="w-10 h-10 shrink-0 rounded-full bg-income flex items-center justify-center font-display font-semibold text-white text-lg">
            रू
          </span>
          <div>
            <h1 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-ink">
              Money Manager
            </h1>
            <p className="text-ink-soft text-sm mt-0.5">Keep track of every Rupees</p>
          </div>
        </div>
        <p className="text-xs text-ink-soft">{today}</p>
      </div>
    </header>
  )
}
