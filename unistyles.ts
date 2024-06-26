import { temas } from '@/themes';
import { UnistylesRegistry } from 'react-native-unistyles';

type Themes = typeof temas;
declare module 'react-native-unistyles' {
  export interface UnistylesThemes extends Themes {}
}

// CONFIG
UnistylesRegistry.addThemes(temas);
