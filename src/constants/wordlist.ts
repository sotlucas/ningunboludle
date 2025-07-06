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
    definition:
      'sinónimo de playo, bajo en profunidad. (De uso popular en Mendoza.)',
  },
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
    definition:
      'se usa para referirse a alguien bien arreglado, con buen aspecto.',
  },
  {
    word: 'facho',
    definition:
      'deformación de fascista. Aquel que realiza acciones o emite opiniones relacionadas con la extrema derecha.',
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
    word: 'garra',
    definition: 'sinónimo de esfuerzo (en deportes).',
  },
  {
    word: 'yerba',
    definition:
      'hojas desecadas, ligeramente tostadas usadas para elaborar el mate.',
  },
  {
    word: 'pingo',
    definition: 'sinónimo de pene.',
  },
  {
    word: 'lacra',
    definition: 'persona indeseable, criminal, sin escrúpulos.',
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
  },
  {
    word: 'tango',
    definition: 'género musical y baile originario del Río de la Plata.',
  },
  {
    word: 'messi',
    definition:
      'el mejor futbolista de todos los tiempos, originario de Rosario, Argentina.',
  },
  {
    word: 'croto',
    definition: 'persona que viste de forma descuidada o sucia.',
  },
  {
    word: 'chivo',
    definition: 'olor a transpiración muy fuerte',
  },
  {
    word: 'pampa',
    definition: 'llanura extensa y fértil, típica de Argentina.',
  },
  {
    word: 'chaco',
    definition: 'provincia del norte argentino, conocida por su biodiversidad.',
  },
  {
    word: 'termo',
    definition:
      'recipiente aislante que mantiene la temperatura de líquidos, muy usado para el mate.',
  },
  {
    word: 'yirar',
    definition: 'deambular sin rumbo fijo, especialmente por las calles.',
  },
  {
    word: 'siome',
    definition: 'persona tonta o poco inteligente.',
  },
  {
    word: 'garca',
    definition: 'persona que actúa de manera deshonesta o traicionera.',
  },
  {
    word: 'posta',
    definition: 'verdad; se usa para confirmar algo (“es la posta”).',
  },
  {
    word: 'trola',
    definition: 'término despectivo para referirse a una mujer promiscua.',
  },
  {
    word: 'zurdo',
    definition: 'persona con inclinaciones políticas de izquierda.',
  },
  {
    word: 'chupi',
    definition: 'bebida alcohólica, especialmente cerveza o vino.',
  },
  {
    word: 'nashe',
    definition:
      'expresión que denota algo bueno o agradable, similar a "cool".',
  },
  {
    word: 'biaba',
    definition: 'acción de golpear o dar un golpe fuerte.',
  },
  {
    word: 'bocho',
    definition: 'persona inteligente o astuta.',
  },
  {
    word: 'chata',
    definition: 'camioneta tipo pickup.',
  },
  {
    word: 'timba',
    definition: 'juego de azar, especialmente relacionado con apuestas.',
  },
  {
    word: 'diego',
    definition: 'Diego Armando Maradona, ícono del fútbol argentino y mundial.',
  },
  {
    word: 'fiaca',
    definition: 'pereza o falta de ganas de hacer algo.',
  },
  {
    word: 'junar',
    definition:
      'sinónimo de conocer, reconocer, prestar atención a una persona.',
  },
  {
    word: 'clave',
    definition: 'se usa para decir que algo esta bueno o es muy necesario.',
  },
  {
    word: 'langa',
    definition: 'creerse mejor que otros, "agrandarse".',
  },
  {
    word: 'birra',
    definition: 'cerveza.',
  },
  {
    word: 'tongo',
    definition: 'engaño o fraude, especialmente en juegos o apuestas.',
  },
  {
    word: 'bendi',
    definition: 'bendición, usado para referirse al hijo de alguien.',
  },
  {
    word: 'cheto',
    definition: 'persona de clase alta, con aires de superioridad.',
  },
  {
    word: 'agite',
    definition: 'acción de alborotar o hacer ruido, especialmente en fiestas.',
  },
  {
    word: 'grasa',
    definition: 'persona vulgar o de mal gusto.',
  },
  {
    word: 'faina',
    definition:
      'masa horneada, hecha con harina de garbanzos, que se come acompañando una pizza.',
  },
  {
    word: 'bagre',
    definition: 'persona muy fea.',
  },
]

let WORDS: string[] = []

DEFINITIONS.forEach(function (item, index) {
  WORDS.push(item.word)
})

export { WORDS, DEFINITIONS }
