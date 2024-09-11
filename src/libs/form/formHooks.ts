import { useEffect, useRef, useState } from 'react';
import { useValidador, ValidacoesDoCampo } from './useValidador';
import { useValidsPaia } from './validacoes';

export function useForm<K extends string>(
  valids?: Record<K, ValidacoesDoCampo>,
  mode: 'replace' | 'merge' = 'merge',
) {
  const valuesRef = useRef({} as Record<K, string>);
  const statusRef = useRef({} as Record<K, boolean>);
  const formValidyState = useState(false);
  const validsPaia = useValidsPaia();

  let validacoes: Record<K & keyof typeof validsPaia, ValidacoesDoCampo> = validsPaia;
  if (valids) {
    if (mode === 'merge') validacoes = { ...validsPaia, ...valids };
    if (mode === 'replace') validacoes = valids;
  }

  return {
    valuesFields: valuesRef.current,
    statusFields: statusRef.current,
    formValidyState,
    validacoes,
  };
}

export interface UseFormR<Fields extends string> {
  valuesFields: Record<Fields, string>;
  statusFields: Record<Fields, boolean>;
  validacoes: Record<Fields, ValidacoesDoCampo>;
  formValidyState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}
export function useInput<F extends UseFormR<K>, K extends string>(formData: F, field: K, dValue?: string) {
  const [value, setValue] = useState(dValue || '');
  const { status, error } = useValidador(value, formData.validacoes[field]);

  formData.valuesFields[field] = value;

  const isFieldValidy = status === 'VALIDY' || status === 'OFF';
  useEffect(() => {
    formData.statusFields[field] = isFieldValidy;

    const [isFormValidyAntigo, setStatusForm] = formData.formValidyState;
    const isFormValidyAtual = !Object.values(formData.statusFields).includes(false);

    if (isFormValidyAtual !== isFormValidyAntigo) setStatusForm(isFormValidyAtual);
  }, [isFieldValidy]);

  return { value, setValue, status, error };
}
