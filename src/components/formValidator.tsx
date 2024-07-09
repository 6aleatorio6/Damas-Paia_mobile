import useApi, { CbAxios } from '@/libs/useApi';
import { StatusValidy, useValidador, ValidacoesDoCampo } from '@/libs/useValidador';
import { UseMutationOptions, UseMutationResult } from '@tanstack/react-query';
import { ComponentProps, createContext, useContext, useEffect, useReducer, useRef, useState } from 'react';
import { Text, TextInput, TextInputProps, View, ViewProps } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import ButtonBig from './ButtonBig';

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
    const context = Form.getContext();
    const validacoesDesseCampo = this.campos[campo];

    // Validacao e controle do campo
    const [value, setValue] = useState(this.values[campo] || defaultValue || '');
    const { error, status } = useValidador(value, validacoesDesseCampo);
    useEffect(() => context.dispatchFormValidy([campo, status === 'VALIDY']), [status]);
    this.values[campo] = value;

    // style
    const { styles } = useStyles(stylesPaia);

    return (
      <View>
        <Text style={styles.label}>{campo}:</Text>
        <TextInput
          style={styles.input}
          {...props}
          value={value}
          onChangeText={setValue}
          placeholder={campo}
          editable={!context.mutation.isPending}
          selectTextOnFocus={!context.mutation.isPending}
        />
        <Text style={styles.textInfo(status)}>
          {status === 'LOADING' ? 'carregando' : error || `${campo} valido`}
        </Text>
      </View>
    );
  };

  ButtonSubmit = (props: Omit<ComponentProps<typeof ButtonBig>, 'backgroundColor' | 'color'>) => {
    const context = Form.getContext();

    return (
      <ButtonBig
        backgroundColor="success"
        color={context.isFormValidy ? 'gray' : 'danger'}
        onPress={context.submit}
        {...props}
      />
    );
  };
}

const stylesPaia = createStyleSheet((theme) => ({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
  label: {
    fontSize: 20,
    color: theme.colors.gray,
    fontWeight: 'bold',
  },
  textInfo: (colorText: StatusValidy) => {
    const colors: Partial<Record<StatusValidy, string>> = {
      ERROR: theme.colors.danger,
      LOADING: theme.colors.warning,
      VALIDY: theme.colors.success,
    };

    return {
      color: colors[colorText],
      fontSize: 15,
    };
  },
}));
