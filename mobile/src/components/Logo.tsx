import { styled } from 'nativewind';
import { Image, Text, View, ViewProps } from 'react-native';

function Logo(props: ViewProps) {
  return (
    <View {...props} className=" flex-row w-full justify-between">
      <Image source={require('@/assets/icon.png')} className="w-10 h-10" />
      <Text className="font-bold text-center text-3xl text-white">
        DAMAS PAIA
      </Text>
      <Image source={require('@/assets/icon.png')} className="w-10 h-10" />
    </View>
  );
}

export default styled(Logo);
