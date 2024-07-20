export const colorsLight = {
  //
  primary: '#4F41BC',
  secondary: '#534C8A',
  danger: 'C2240F',

  // text
  textPri: '#D7D7D7',

  // body
  body: '#2C2B33',
  bodySec: '#444157',
} as const;

export type Colors = keyof typeof colorsLight;
