export const colorsDark = {
  // Principais
  primary: '#4F41BC',
  secondary: '#534C8A',
  danger: '#FF1F3D',
  warning: '#FFB300',
  success: '#43A047',

  // Texto
  textPri: '#D7D7D7',
  textSec: '#A1A1A1',

  // Corpo
  body: '#2C2B33',
  bodySec: '#444157',
  bodyTri: '#3A4C60',

  // Tabuleiro
  squarePath: '#4CAF50',
  squareDark: '#50536A',
  squareLight: '#E0E4F1',

  // Peças
  pieceLight: '#FFFFFF', // Branco puro e mais vibrante para as peças claras
  pieceDark: '#1F1F1F', // Preto com um toque mais brilhante, moderno e marcante para peças escuras
} as const;

export type Colors = keyof typeof colorsDark;
