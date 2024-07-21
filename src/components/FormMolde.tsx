import { FormProvider, FormProviderProps, useForm } from '@/libs/form/formContext';
import { PropsWithChildren } from 'react';
import { Text, View } from 'react-native';

function FormMoldeStyle(props: PropsWithChildren) {
  const { isFormValidy } = useForm();

  return <View>{props.children}</View>;
}

export default function FormMolde(props: FormProviderProps) {
  return (
    <FormProvider {...props}>
      <FormMoldeStyle>{props.children}</FormMoldeStyle>
    </FormProvider>
  );
}
