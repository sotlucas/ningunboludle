import { getTodayDateString, getYesterdayDateString, daysBetween } from './date'
import { loadStatsFromLocalStorage as loadBoludleStats } from './localStorage'
import { loadStatsFromLocalStorage as loadBoluxionesStats } from '../games/boluxiones/localStorage'

const globalStreakKey = 'globalStreak'
const migratedKey = 'globalStreakMigrated'

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

// One-time bootstrap so players who already had a streak going in a single
// game (before the global streak existed) don't see it reset to 1.
const migrateFromGameStreaks = (stored: GlobalStreak): GlobalStreak => {
  if (localStorage.getItem(migratedKey)) return stored
  localStorage.setItem(migratedKey, '1')

  const bootstrapStreak = Math.max(
    loadBoludleStats()?.currentStreak ?? 0,
    loadBoluxionesStats()?.currentStreak ?? 0
  )

  if (bootstrapStreak <= stored.currentStreak) return stored

  const migrated: GlobalStreak = {
    lastPlayedDate: stored.lastPlayedDate || getYesterdayDateString(),
    currentStreak: bootstrapStreak,
    bestStreak: Math.max(stored.bestStreak, bootstrapStreak),
  }
  localStorage.setItem(globalStreakKey, JSON.stringify(migrated))
  return migrated
}

const load = (): GlobalStreak => {
  const raw = localStorage.getItem(globalStreakKey)
  const stored = raw ? (JSON.parse(raw) as GlobalStreak) : defaultStreak
  return migrateFromGameStreaks(stored)
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
