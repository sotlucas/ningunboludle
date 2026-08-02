const formatDateString = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`

const parseDateString = (dateStr: string) => {
  const [year, month, day] = dateStr.split('-').map(Number)
  return new Date(year, month - 1, day)
}

export const getTodayDateString = () => formatDateString(new Date())

export const getYesterdayDateString = () => {
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  return formatDateString(yesterday)
}

export const daysBetween = (a: string, b: string) => {
  const msPerDay = 1000 * 60 * 60 * 24
  return Math.round(
    (parseDateString(b).getTime() - parseDateString(a).getTime()) / msPerDay,
  )
}

export const isWeekend = (dateStr: string) => {
  const day = parseDateString(dateStr).getDay()
  return day === 0 || day === 6
}

// La racha continúa si todos los días entre lastPlayedDate y today (sin
// contar los extremos) son fin de semana, para que saltarse sábado/domingo
// no la rompa.
export const canContinueStreak = (lastPlayedDate: string, today: string) => {
  const gap = daysBetween(lastPlayedDate, today)
  if (gap <= 1) return true

  const last = parseDateString(lastPlayedDate)
  for (let i = 1; i < gap; i++) {
    const between = new Date(last)
    between.setDate(between.getDate() + i)
    if (!isWeekend(formatDateString(between))) return false
  }
  return true
}
