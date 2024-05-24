import { styled } from 'nativewind';
import { Dispatch, SetStateAction, useState } from 'react';
import { Text, TextInput, TextInputProps, View } from 'react-native';

interface Props extends TextInputProps {
  valState: [any, Dispatch<SetStateAction<any>>];
  field: string;
}
function TextInputStyled({ field, valState, ...props }: Props) {
  const [allValues, setAllValues] = valState;
  const [value, setValue] = useState(allValues[field] || '');

  setAllValues((v: { [K: string]: string }) => {
    v[field] = value;
    return v;
  });

  return (
    <>
      <Text className="font-semibold text-base text-neutral-200 mx-1">
        {props.placeholder}:
      </Text>
      <TextInput
        {...props}
        value={value}
        onChangeText={setValue}
        className="bg-neutral-200  h-10 rounded px-3 py-1"
      />
    </>
  );
}

export default styled(TextInputStyled);
