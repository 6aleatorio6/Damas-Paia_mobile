import useApi, { CbAxios } from '@/libs/useApi';
import { useValidador, ValidacoesDoCampo } from '@/libs/useValidador';
import { UseMutationOptions, UseMutationResult } from '@tanstack/react-query';
import { createContext, useContext, useEffect, useReducer, useRef, useState } from 'react';
import { Text, TextInput, TextInputProps, View, ViewProps } from 'react-native';

const InfoForm = createContext<{
  isFormValidy: boolean;
  dispatchFormValidy: (action: [string, boolean]) => void;
  submit: () => void;
  mutation: UseMutationResult<unknown, Error, Record<string, string>>;
} | null>(null);

export class Form<C extends string> {
  private values = useRef({} as Record<C, string>).current;

  constructor(
    private submitOptions: CbAxios<UseMutationOptions<unknown, Error, Record<C, string>>>,
    private campos: Record<C, ValidacoesDoCampo>,
  ) {}

  public Provider = (props: ViewProps) => {
    const mutation = useApi('mutate', this.submitOptions);
    const statusDosCampos = useRef({} as Record<string, boolean>).current;

    const [isFormValidy, dispatchFormValidy] = useReducer(
      (_state: boolean, [campo, statusDoCampo]: [string, boolean]) => {
        statusDosCampos[campo] = statusDoCampo;

        return !Object.values(statusDosCampos).includes(false);
      },
      false,
    );

    const info = {
      isFormValidy,
      dispatchFormValidy,
      mutation,
      submit: () => mutation.mutate(this.values),
    };

    return (
      <InfoForm.Provider value={info}>
        <View {...props} />
      </InfoForm.Provider>
    );
  };

  public static getContext = () => {
    const context = useContext(InfoForm);

    if (!context) throw new Error('Context do form precisa ser chamada dentro do Form.Provider!');

    return context;
  };

  public Input = ({ campo, defaultValue, ...props }: TextInputProps & { campo: C }) => {
    const validacoesDesseCampo = this.campos[campo];

    const [value, setValue] = useState(this.values[campo] || defaultValue || '');
    const { error, status } = useValidador(value, validacoesDesseCampo);

    const context = Form.getContext();

    useEffect(() => context.dispatchFormValidy([campo, status === 'VALIDY']), [status]);

    this.values[campo] = value;

    return (
      <View>
        <Text>{error}</Text>
        <Text>{status}</Text>
        <TextInput
          {...props}
          value={value}
          onChangeText={setValue}
          placeholder={campo}
          editable={true}
          selectTextOnFocus={true}
        />
      </View>
    );
  };
}
