import NepaliDateLib, { dateConfigMap } from 'nepali-date-converter'
import { dateKey } from './date.js'

const MONTH_KEYS = [
  'Baisakh', 'Jestha', 'Asar', 'Shrawan', 'Bhadra', 'Aswin',
  'Kartik', 'Mangsir', 'Poush', 'Magh', 'Falgun', 'Chaitra',
]

const MONTHS_NE = [
  'बैशाख', 'जेठ', 'असार', 'श्रावण', 'भदौ', 'आश्विन',
  'कार्तिक', 'मंसिर', 'पुष', 'माघ', 'फागुन', 'चैत',
]

const WEEKDAYS_NE = ['आइत', 'सोम', 'मंगल', 'बुध', 'बिहि', 'शुक्र', 'शनि']

const DEV_DIGITS = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९']

export { WEEKDAYS_NE }

export function toDevanagariDigits(value) {
  return String(value).replace(/[0-9]/g, (d) => DEV_DIGITS[d])
}

export function adToBs(dateLike) {
  const bs = NepaliDateLib.fromAD(new Date(dateLike))
  return { year: bs.getYear(), month: bs.getMonth(), day: bs.getDate() }
}

export function bsMonthLength(year, month) {
  const monthName = MONTH_KEYS[month]
  return dateConfigMap[String(year)]?.[monthName] ?? 30
}

export function bsMonthLabel(year, month) {
  return `${MONTHS_NE[month]} ${toDevanagariDigits(year)}`
}

export function bsToDate(year, month, day) {
  return new NepaliDateLib(year, month, day).toJsDate()
}

export function bsCellKey(year, month, day) {
  return dateKey(bsToDate(year, month, day))
}

export function buildBsMonthGrid(year, month) {
  const daysInMonth = bsMonthLength(year, month)
  const startOffset = bsToDate(year, month, 1).getDay()

  const cells = []
  for (let i = 0; i < startOffset; i++) cells.push(null)
  for (let day = 1; day <= daysInMonth; day++) cells.push({ year, month, day })
  while (cells.length % 7 !== 0) cells.push(null)

  return cells
}

export function shiftBsMonth(year, month, offset) {
  let m = month + offset
  let y = year
  while (m < 0) {
    m += 12
    y -= 1
  }
  while (m > 11) {
    m -= 12
    y += 1
  }
  return { year: y, month: m }
}
