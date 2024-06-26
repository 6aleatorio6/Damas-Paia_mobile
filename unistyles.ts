import { temas, Themes } from '@/constants/themes';
import { UnistylesRegistry } from 'react-native-unistyles';

declare module 'react-native-unistyles' {
  export interface UnistylesThemes extends Themes {}
}

// CONFIG
UnistylesRegistry.addThemes(temas);
