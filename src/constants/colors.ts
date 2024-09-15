export const colorsDark = {
  // Principais
  primary: '#4F41BC',
  secondary: '#534C8A',
  danger: '#E53935',
  warning: '#FFB300',
  success: '#43A047',

  // Texto
  textPri: '#D7D7D7',
  textSec: '#A1A1A1',

  // Corpo
  body: '#2C2B33',
  bodySec: '#444157',

  // Tabuleiro
  squarePath: '#4CAF50', // Verde mais vivo e dinâmico, mantendo suavidade
  squareDark: '#50536A', // Cinza escuro com um toque de azul para mais vida e modernidade
  squareLight: '#E0E4F1', // Cinza claro com mais brilho, trazendo vivacidade ao tabuleiro

  // Peças
  pieceLight: '#FFFFFF', // Branco puro e mais vibrante para as peças claras
  pieceDark: '#2B2B33', // Preto com um toque mais brilhante, moderno e marcante para peças escuras
  // Sombras
  shadowLight: '#8A8A8A', // Cinza claro mais forte para sombras mais marcantes
  shadowDark: '#0D0D0D', // Cinza escuro mais forte para sombras mais profundas
} as const;

export type Colors = keyof typeof colorsDark;
