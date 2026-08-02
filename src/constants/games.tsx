import type { ReactNode } from 'react'

export type GameMeta = {
  slug: string
  path: string
  title: ReactNode
  tabTitle: string
  cardDescription: string
  tabDescription: string
  icon: string
}

export const GAMES: GameMeta[] = [
  {
    slug: 'boludle',
    path: '/boludle',
    title: 'Boludle',
    tabTitle: 'Boludle · el Wordle argentino',
    cardDescription:
      'El Wordle argentino: adiviná la palabra del día en 6 intentos.',
    tabDescription:
      'El Wordle argentino: adiviná la palabra del día en 6 intentos.',
    icon: '/boludle-icon.svg',
  },
  {
    slug: 'conexiones',
    path: '/conexiones',
    title: 'Boluxiones',
    tabTitle: 'Conexiones Argentinas',
    cardDescription:
      'Armá cuatro grupos de cuatro palabras que tengan algo en común.',
    tabDescription:
      'Armá cuatro grupos de cuatro palabras que tengan algo en común.',
    icon: '/conexiones-icon.svg',
  },
]
