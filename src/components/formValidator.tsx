import useApi, { CbAxios } from '@/libs/useApi';
import { UseMutationOptions } from '@tanstack/react-query';
import {
  ComponentProps,
  ComponentType,
  createContext,
  PropsWithChildren,
  useContext,
  useRef,
  useState,
} from 'react';
import { TextInputProps, View } from 'react-native';

export function FormInputValidator<C extends string, InProps extends InputComponentProps>(
  submitOptions: CbAxios<UseMutationOptions<unknown, Error, Record<C, string>>>,
  campos: Record<C, string>,
  InputComponent: ComponentType<InProps | InputComponentProps>,
  FormComponent: ComponentType<PropsWithChildren> = View,
) {
  const FormContext = createContext(null);
  const values = useRef({} as Record<C, string>).current;

  return {
    useContext: () => useContext(FormContext),
    Form({ children, ...props }: ComponentProps<typeof FormComponent>) {
      return (
        <FormComponent {...props}>
          <FormContext.Provider value={null}>{children}</FormContext.Provider>
        </FormComponent>
      );
    },
    Input(props: InProps & { input: { campo: C } }) {
      const { campo, defaultValue } = props.input;

      const [value, setValue] = useState(values[campo] || defaultValue || '');

      return (
        <InputComponent
          {...props}
          input={{
            value,
            onChangeText: setValue,
            placeholder: campo,
            editable: true,
            selectTextOnFocus: true,
          }}
        />
      );
    },
  };
}

type InputComponentProps<P = {}> = P & {
  input: Pick<
    TextInputProps,
    'value' | 'onChangeText' | 'placeholder' | 'editable' | 'selectTextOnFocus' | 'defaultValue'
  >;
};
