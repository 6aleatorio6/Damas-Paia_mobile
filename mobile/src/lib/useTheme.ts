import { useColorScheme } from 'nativewind';
import { storeProfile } from './store/profile';
import colorWind from 'tailwindcss/colors';
import { CaminhoParaAsPontasDoObj, getByPath } from './typeComplexo';

export default function useTheme() {
  const { setTheme, theme } = storeProfile();
  const { setColorScheme } = useColorScheme();

  type PathsColor = CaminhoParaAsPontasDoObj<typeof colorWind>;
  return {
    /**
     * [light, dark]
     */
    getColor(color: [PathsColor, PathsColor]) {
      return getByPath(colorWind, color[theme === 'light' ? 0 : 1]);
    },
    setTheme(tema: typeof theme) {
      setTheme(tema);
      setColorScheme(tema);
    },
  };
}
