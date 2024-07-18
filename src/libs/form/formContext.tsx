import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { UseMutationOptions, UseMutationResult } from '@tanstack/react-query';

import useApi, { CbAxios } from '../useApi';
import { useValidador, ValidacoesDoCampo } from './useValidador';
import { validsPaia } from './validacoes';

// CONTEXT
const FormContext = createContext<null | Context>(null);

// PROVIDER
export function FormProvider(props: FormProviderProps) {
  const mutation = useApi('mutate', props.submitOptions);
  const valuesFields = useRef({} as RecordField).current;
  const statusFieldsState = useState({} as RecordField<boolean>);

  const validacoes = { ...validsPaia, ...(props.replaceValids || {}) };

  return (
    <FormContext.Provider value={{ mutation, valuesFields, statusFieldsState, validacoes }}>
      {props.children}
    </FormContext.Provider>
  );
}

// HOOKS
export function useForm() {
  const context = useContext(FormContext);
  if (!context) throw new Error('provedor de contexto não encontrado, envolva em um FormProvider');

  const { mutation, statusFieldsState, valuesFields } = context;
  const isFormValidy = !Object.values(statusFieldsState[0]).includes(false);

  return { mutation, isFormValidy, valuesFields };
}

export function useInput(field: Fields) {
  const context = useContext(FormContext);
  if (!context) throw new Error('provedor de contexto não encontrado, envolva em um FormProvider');

  const [value, setValue] = useState(context.valuesFields[field] || '');
  const { status, error } = useValidador(value, context.validacoes[field]);

  useEffect(() => {
    const [statusAll, setStatusAll] = context.statusFieldsState;
    setStatusAll({ ...statusAll, [field]: status === 'VALIDY' });

    context.valuesFields[field] = value;
  }, [status]);

  const isLoadingApi = context.mutation.isPending;

  return { value, setValue, status, error, isLoadingApi };
}

// TIPAGENS
export type Fields = Partial<keyof typeof validsPaia>;
type RecordField<V = string> = Record<Fields, V>;

interface Context {
  mutation: UseMutationResult<unknown, Error, RecordField>;
  valuesFields: RecordField;
  validacoes: RecordField<ValidacoesDoCampo>;
  statusFieldsState: [RecordField<boolean>, Dispatch<SetStateAction<RecordField<boolean>>>];
}

export interface FormProviderProps extends PropsWithChildren {
  submitOptions: CbAxios<UseMutationOptions<unknown, Error, RecordField>>;
  replaceValids?: RecordField<ValidacoesDoCampo>;
}
