import { styled } from 'nativewind';
import { PropsWithChildren } from 'react';
import {
  Text,
  TextProps,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

interface ButtonProps extends PropsWithChildren<TouchableOpacityProps> {
  textName?: TextProps['style'];
}

function ButtonForm({ children, textName, ...props }: ButtonProps) {
  return (
    <TouchableOpacity {...props}>
      <Text
        className="text-white text-2xl font-bold text-center"
        style={textName}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
}

export default styled(
  ButtonForm,
  ' flex-row items-center justify-center bg-gray-500 py-2 space-x-3 rounded-lg',
  {
    props: {
      textName: true,
    },
  },
);
