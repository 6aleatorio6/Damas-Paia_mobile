import { styled } from 'nativewind';
import { View, ViewProps } from 'react-native';
import { TextPaia } from './themes';
import { ReqFrase } from '@/lib/querysMutations/useFrases';

interface PropsFraseItem {
  item: ReqFrase;
}
export function FraseItem({ item }: PropsFraseItem) {
  return (
    <View className="w-full justify-between">
      <TextPaia ColorName="pri" className="py-3 px-3 border border-b-gray-500">
        {item.frase}
      </TextPaia>
    </View>
  );
}
