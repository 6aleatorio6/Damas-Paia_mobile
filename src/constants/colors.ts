export const colorsLight = {
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
} as const;

export type Colors = keyof typeof colorsLight;
