import { PropsWithChildren } from 'react';
import { View } from 'react-native';
import Logo from './Logo';

export default function AuthModal(props: PropsWithChildren) {
  return (
    <View className=" flex-1 container  bg-gray-900 w-full ">
      <View className="w-11/12 py-10  m-auto bg-gray-500 rounded-xl items-center justify-center">
        <View className="w-10/12 space-y-5">
          <Logo />

          {props.children}
        </View>
      </View>
    </View>
  );
}
