import { useEffect, useState } from 'react';

const TIMEOUT_VALIDY = 500;

export function useValidador(value: string, validacoes: OpcaoDeValidacaoDocampo) {
  const [validStatus, setValidStatus] = useState<StatusValidy>('OFF');

  useEffect(() => {
    setValidStatus('LOADING');

    const timeoutId = setTimeout(() => {
      setValidStatus('VALIDY');
    }, TIMEOUT_VALIDY);

    return () => clearTimeout(timeoutId);
  }, [value]);
}

export type OpcaoDeValidacaoDocampo =
  | [(value: string) => boolean | string | PromiseLike<boolean | string>, string][]
  | null;

type StatusValidy = 'VALIDY' | 'ERROR' | 'LOADING' | 'OFF';
