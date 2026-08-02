const formatDateString = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`

export const getTodayDateString = () => formatDateString(new Date())

export const getYesterdayDateString = () => {
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  return formatDateString(yesterday)
}

export const daysBetween = (a: string, b: string) => {
  const msPerDay = 1000 * 60 * 60 * 24
  return Math.round((new Date(b).getTime() - new Date(a).getTime()) / msPerDay)
}
