import { getTodayDateString, daysBetween } from './date'

const globalStreakKey = 'globalStreak'

type GlobalStreak = {
  lastPlayedDate: string
  currentStreak: number
  bestStreak: number
}

const defaultStreak: GlobalStreak = {
  lastPlayedDate: '',
  currentStreak: 0,
  bestStreak: 0,
}

const load = (): GlobalStreak => {
  const raw = localStorage.getItem(globalStreakKey)
  return raw ? (JSON.parse(raw) as GlobalStreak) : defaultStreak
}

export const recordPlayedToday = () => {
  const today = getTodayDateString()
  const stored = load()

  if (stored.lastPlayedDate === today) return

  const gap = stored.lastPlayedDate
    ? daysBetween(stored.lastPlayedDate, today)
    : null
  const currentStreak = gap === 1 ? stored.currentStreak + 1 : 1

  const updated: GlobalStreak = {
    lastPlayedDate: today,
    currentStreak,
    bestStreak: Math.max(stored.bestStreak, currentStreak),
  }
  localStorage.setItem(globalStreakKey, JSON.stringify(updated))
}

export const getDisplayStreak = () => {
  const stored = load()
  if (!stored.lastPlayedDate) return 0
  const gap = daysBetween(stored.lastPlayedDate, getTodayDateString())
  return gap <= 1 ? stored.currentStreak : 0
}
