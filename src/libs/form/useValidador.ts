/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react';

const TIMEOUT_VALIDY = 500;

export function useValidador(value: string, validacoes: ValidacoesDoCampo) {
  const [validStatus, setValidStatus] = useState<StatusValidy>('OFF');
  const errorRef = useRef<string | null>(null);

  useEffect(() => {
    if (!validacoes) return setValidStatus('OFF');
    setValidStatus('LOADING');

    const timeoutId = setTimeout(async () => {
      for (const verify of validacoes) {
        const error = await verify(value);
        errorRef.current = error || null;

        if (error) return setValidStatus('ERROR');

        setValidStatus('VALIDY');
      }
    }, TIMEOUT_VALIDY);

    return () => clearTimeout(timeoutId);
  }, [value]);

  return { status: validStatus, error: errorRef.current };
}

export type ValidacoesDoCampo =
  | ((v: string) => PromiseLike<string | null | false | undefined> | string | null | false | undefined)[]
  | null;

export type StatusValidy = 'VALIDY' | 'ERROR' | 'LOADING' | 'OFF';
