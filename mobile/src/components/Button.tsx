import { router } from 'expo-router';
import { styled } from 'nativewind';
import { PropsWithChildren } from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

interface ButtonProps extends PropsWithChildren<TouchableOpacityProps> {
  href: string;
}

function Button({ href, children, ...props }: ButtonProps) {
  return (
    <TouchableOpacity {...props} onPress={() => router.navigate(href)}>
      {children}
    </TouchableOpacity>
  );
}

export default styled(
  Button,
  ' flex-row items-center justify-center bg-gray-500 py-3 space-x-3 rounded-lg',
);
