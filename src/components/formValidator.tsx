import useApi, { CbAxios } from '@/libs/useApi';
import { StatusValidy, useValidador, ValidacoesDoCampo } from '@/libs/useValidador';
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

interface ContextValues {
  isFormValidy: boolean;
  mutation: object;
  submit: () => void;
}
const FormContext = createContext<ContextValues | null>(null);

export function FormInputValidator<C extends string, InProps extends InputComponentProps>(
  submitOptions: CbAxios<UseMutationOptions<unknown, Error, Record<C, string>>>,
  campos: Record<C, ValidacoesDoCampo>,
  InputComponent: ComponentType<InProps | InputComponentProps>,
  FormComponent: ComponentType<PropsWithChildren> = View,
) {
  const values = useRef({} as Record<C, string>).current;
  const mutation = useApi('mutate', submitOptions);

  const contextValues: ContextValues = {
    get isFormValidy() {
      return !!Object.values(values).findIndex((errorInput) => !errorInput);
    },
    submit: () => mutation.mutate(values),
    mutation,
  };

  return {
    useContext: () => useContext(FormContext),
    Form({ children, ...props }: ComponentProps<typeof FormComponent>) {
      return (
        <FormComponent {...props}>
          <FormContext.Provider value={contextValues}>{children}</FormContext.Provider>
        </FormComponent>
      );
    },
    Input(props: Omit<InProps, 'error' | 'status' | 'input'> & { campo: C; defaultValue?: string }) {
      const { campo, defaultValue, ...propsInput } = props;
      const [value, setValue] = useState(values[campo] || defaultValue || '');

      values[campo] = value;

      const validacoesDesseCampo = campos[campo];
      const { error, status } = useValidador(value, validacoesDesseCampo);

      return (
        <InputComponent
          {...propsInput}
          status={status}
          error={error}
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

export type InputComponentProps<P = {}> = P & {
  error: string | null;
  status: StatusValidy;
  input: Pick<
    TextInputProps,
    'value' | 'onChangeText' | 'placeholder' | 'editable' | 'selectTextOnFocus' | 'defaultValue'
  >;
};
