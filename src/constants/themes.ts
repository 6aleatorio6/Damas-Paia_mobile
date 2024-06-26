import { colorsLight } from './colors';
import { stylesPaiaGlobal } from './styles';

export const temas = {
  light: {
    colors: colorsLight,
    styles: stylesPaiaGlobal,
  },
} as const;

export type Themes = typeof temas;
