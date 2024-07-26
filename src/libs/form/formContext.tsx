import { createContext, Dispatch, PropsWithChildren, SetStateAction, useRef, useState } from 'react';
import { UseMutationOptions, UseMutationResult } from '@tanstack/react-query';

import useApi, { CbAxios } from '../apiHooks/useApi';
import { ValidacoesDoCampo } from './useValidador';
import { validsPaia } from './validacoes';

// CONTEXT
export const FormContext = createContext<null | Context>(null);

// PROVIDER
export function FormProvider(props: FormProviderProps) {
  const mutation = useApi('mutate', props.submitOptions);
  const valuesFields = useRef({} as RecordField).current;
  //
  const statusFields = useRef({} as RecordField<boolean>).current;
  const formValidyState = useState(false);

  const validacoes = { ...validsPaia, ...(props.replaceValids || {}) };

  return (
    <FormContext.Provider value={{ mutation, valuesFields, statusFields, formValidyState, validacoes }}>
      {props.children}
    </FormContext.Provider>
  );
}

// TIPAGENS
export type Fields = Partial<keyof typeof validsPaia>;
type RecordField<V = string> = Record<Fields, V>;

interface Context {
  mutation: UseMutationResult<unknown, Error, RecordField>;
  valuesFields: RecordField;
  validacoes: RecordField<ValidacoesDoCampo>;
  statusFields: RecordField<boolean>;
  formValidyState: [boolean, Dispatch<SetStateAction<boolean>>];
}

export interface FormProviderProps extends PropsWithChildren {
  submitOptions: CbAxios<UseMutationOptions<unknown, Error, RecordField>>;
  replaceValids?: Partial<RecordField<ValidacoesDoCampo>>;
}
