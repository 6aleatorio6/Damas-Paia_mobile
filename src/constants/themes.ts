import { colorsDark } from './colors';
import { stylesPaiaGlobal } from './styles';

export const temas = {
  dark: {
    colors: colorsDark,
    styles: stylesPaiaGlobal,
  },
} as const;

export type Themes = typeof temas;
