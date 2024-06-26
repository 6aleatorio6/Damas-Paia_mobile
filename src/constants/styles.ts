import { DimensionValue } from 'react-native';
import { createStyleSheet } from 'react-native-unistyles';

export const stylesPaiaGlobal = createStyleSheet({
  image: (size: DimensionValue, aspectRatio: `${number}/${number}`) => ({
    height: size,
    aspectRatio,
  }),
});
