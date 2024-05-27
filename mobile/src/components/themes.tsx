import { SetColorAtComp } from '@/lib/SetColorsC';
import { Text } from 'react-native';

export const TextPaia = SetColorAtComp(Text, {
  pri: ['text-white', 'dark:text-warmGray-200'],
});

export const ViewPaia = SetColorAtComp(Text, {
  pri: ['text-amber-100', 'dark:text-amber-100'],
});
