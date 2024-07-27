import { useContext, useEffect, useState } from 'react';
import { useValidador } from './useValidador';
import { Fields, FormContext } from './formContext';

// HOOKS
export function useForm() {
  const context = useContext(FormContext);
  if (!context) throw new Error('provedor de contexto não encontrado, envolva em um FormProvider');

  const {
    mutation,
    formValidyState: [isFormValidy],
    valuesFields,
  } = context;

  return { mutation, isFormValidy, valuesFields };
}

export function useInput(field: Fields) {
  const context = useContext(FormContext);
  if (!context) throw new Error('provedor de contexto não encontrado, envolva em um FormProvider');

  const [value, setValue] = useState(context.valuesFields[field] || '');
  const { status, error } = useValidador(value, context.validacoes[field]);

  context.valuesFields[field] = value;

  const isFieldValidy = status === 'VALIDY' || status === 'OFF';
  useEffect(() => {
    context.statusFields[field] = isFieldValidy;

    const [isFormValidyAntigo, setStatusForm] = context.formValidyState;
    const isFormValidyAtual = !Object.values(context.statusFields).includes(false);

    if (isFormValidyAtual !== isFormValidyAntigo) setStatusForm(isFormValidyAtual);
  }, [isFieldValidy]);

  const isLoadingApi = context.mutation.isPending;

  return { value, setValue, status, error, isLoadingApi };
}
