# Money Manager

A single-page React app for logging income and expenses, tracking a running balance,
and reviewing spending day by day.

## Features

- Add transactions with amount, type (income/expense), category, description, and date
- Amounts shown in Nepali Rupees (रू), using lakh/crore-style number grouping
- Running balance, total income, and total expenses, with an animated count-up display
- List view: filter by category, sort by date or amount, delete individual entries
- Calendar view: switch between Bikram Sambat (BS) and Gregorian (AD) calendars, browse
  by month, see each day's net total at a glance, and click a day to see just that
  day's transactions
- New transactions slide into the list, and switching between List/Calendar crossfades
- Data persists in `localStorage`, so it survives a page refresh
- Empty and no-results states throughout
- Responsive layout (mobile through desktop)

## Technologies used

- React 18 (functional components, hooks only)
- Vite (build tool / dev server)
- Tailwind CSS
- `nepali-date-converter` (AD ↔ Bikram Sambat conversion)
- Browser `localStorage` API (no backend)

## Setup

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually `http://localhost:5173`).

To build for production:

```bash
npm run build
npm run preview
```

## Project structure

```
src/
  components/
    Header.jsx
    Summary.jsx
    TransactionForm.jsx
    FilterBar.jsx
    TransactionList.jsx
    TransactionItem.jsx
    CalendarView.jsx
  hooks/
    useLocalStorage.js
    useCountUp.js
  utils/
    date.js
  App.jsx
  main.jsx
  index.css
```

## Screenshots

<!-- Add 2–3 screenshots of the running app here before submitting, e.g.: -->
<!-- ![Empty state](./screenshots/empty-state.png) -->
<!-- ![With transactions](./screenshots/with-transactions.png) -->
<!-- ![Calendar view](./screenshots/calendar.png) -->

## Known limitations

- No charting yet (spending-by-category chart is a stretch goal, not implemented)
- No monthly grouping/summary view beyond the calendar
- No budget-limit warnings
- Single currency, no formatting for locales other than the browser default
