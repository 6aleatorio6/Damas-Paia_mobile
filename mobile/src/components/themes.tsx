import { SetColorAtComp } from '@/lib/SetColorsC';
import { Text } from 'react-native';

export const TextPaia = SetColorAtComp(Text, {
  pri: ['bg-amber-100', 'dark:bg-amber-100'],
});

export const ViewPaia = SetColorAtComp(Text, {
  pri: ['bg-amber-100', 'dark:bg-amber-100'],
});
