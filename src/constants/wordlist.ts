type Definition = {
  word: string
  definition: string
}

const DEFINITIONS: Definition[] = [
  {
    word: 'cacha',
    definition: 'del verbo "cachar", sinónimo de entender.',
  },
  {
    word: 'afano',
    definition: 'sinónimo de robo.',
  },
  {
    word: 'morfi',
    definition: 'sinónimo de comida.',
  },
  {
    word: 'pucho',
    definition: 'sinónimo de cigarrillo.',
  },
  {
    word: 'bardo',
    definition: 'sinónimo de lío, quilombo.',
  },
  {
    word: 'crack',
    definition: 'dícese de alguien que es muy bueno para algo.',
  },
  {
    word: 'mufar',
    definition: 'causar mala suerte.',
  },
  {
    word: 'ñaupa',
    definition: 'sinónimo de antiguo.',
  },
  {
    word: 'forro',
    definition: 'sinónimo de profiláctico, sinónimo de mala persona.',
  },
  {
    word: 'ladri',
    definition: 'persona que obtiene éxito sin esforzarse.',
  },
  {
    word: 'boton',
    definition: 'sinónimo de delator, alcahuete.',
  },
  {
    word: 'pando',
    definition: 'sinónimo de playo, bajo en profunidad. (De uso popular en Mendoza.)',
  },
  {
    word: 'pingo',
    definition: 'sinónimo de pene.',
  },
  // {
  //   word: 'lacra',
  //   definition: 'persona indeseable, criminal, sin escrúpulos.',
  // },
  {
    word: 'bondi',
    definition: 'sinónimo de colectivo, bus.',
  },
  {
    word: 'guita',
    definition: 'sinónimo de dinero.',
  },
  {
    word: 'ñoqui',
    definition: 'aquel que cobra un sueldo sin trabajar',
  },
  {
    word: 'upite',
    definition: 'sinónimo de cola, trasero.',
  },
  {
    word: 'gamba',
    definition: 'sinónimo de pierna.',
  },
  {
    word: 'bocha',
    definition: 'sinónimo de un montón.',
  },
  {
    word: 'asado',
    definition: 'carne vacuna cocinada lentamente a las brasas.',
  },
  {
    word: 'orsai',
    definition: 'posición adelantada, off-side.',
  },
  {
    word: 'punga',
    definition: 'ladrón que hurta objetos de carteras o abrigos.',
  },
  {
    word: 'ceibo',
    definition: 'árbol de la flor nacional del mejor país del mundo.',
  },
  {
    word: 'facha',
    definition: 'se usa para referirse a alguien bien arreglado, con buen aspecto.',
  },
  {
    word: 'skere',
    definition: 'dícese de algo que va a estar bueno, de "lets get it"',
  },
  {
    word: 'lompa',
    definition: 'sinónimo de pantalón.',
  },
  {
    word: 'truco',
    definition: 'juego de cartas popular en el mejor país.',
  },
  {
    word: 'choto',
    definition: 'sinóninimo de algo feo, no agradable. (enviada por @camdesk)',
  },
  {
    word: 'pique',
    definition: 'dícese de un breve corrida o trote hacia algún lugar.',
  },
  {
    word: 'zapan',
    definition: 'panza.',
  },
  {
    word: 'banda',
    definition: 'mucha cantidad',
  },
  {
    word: 'chivo',
    definition: 'olor corporal',
  },
  {
    word: 'gorra',
    definition: 'policía, vigilante (despectivo)',
  },
  {
    word: 'funyi',
    definition: 'sinónimo de sombrero',
  },
  {
    word: 'piola',
    definition: 'dícese de algo bueno o interesante.',
  },
  {
    word: 'grosa',
    definition: 'dícese de una persona genial, o muy buena (en algo).',
  },
  {
    word: 'guaso',
    definition: 'hombre, fulano, tipo (Córdoba).',
  },
  {
    word: 'zafar',
    definition: 'liberarse de una situación con lo mínimo indispensable.',
  },
  {
    word: 'pinta',
    definition: 'buena apariencia.',
  },
  {
    word: 'minga',
    definition: 'usase para negar lo que dice alguien fuertemente.',
  },
  {
    word: 'lorca',
    definition: 'vesre de "calor".',
  },
  {
    word: 'yerba',
    definition: 'hojas desecadas, ligeramente tostadas usadas para elaborar el mate.',
  },
  {
    word: 'garra',
    definition: 'sinónimo de esfuerzo (en deportes).',
  },
  {
    word: 'nashe',
    definition: 'dícese de algo que está muy bueno; palabra popularizada por el youtuber Coscu.',
  },
  {
    word: 'rajar',
    definition: 'irse rápidamente.',
  },
  {
    word: 'fulbo',
    definition: 'fútbol.',
  },
  {
    word: 'plomo',
    definition: 'dícese de una persona o cosa molesta, pesada.',
  },
  {
    word: 'bajon',
    definition: 'depresión, falta de ánimo.',
  },
  {
    word: 'napia',
    definition: 'sinónimo de nariz.',
  },
  {
    word: 'curro',
    definition: 'sinónimo de estafa, o trabajo fácil para ganar dinero.',
  }
]

let WORDS: string[] = []

DEFINITIONS.forEach(function (item, index) {
  WORDS.push(item.word)
})

export { WORDS, DEFINITIONS }
