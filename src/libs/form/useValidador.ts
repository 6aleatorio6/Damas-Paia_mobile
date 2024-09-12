/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useRef, useState } from 'react';

const TIMEOUT_VALIDY = process.env.EXPO_PUBLIC_INPUT_VALIDY || 500;

export function useValidador(value: string, validacoes: Valid[]) {
  const [validStatus, setValidStatus] = useState<StatusValidy>('OFF');
  const errorRef = useRef<string | null>(null);

  const [isOptional, validacoesWithoutOptional] = useMemo(
    () => [validacoes.includes('OPTIONAL'), validacoes.filter((v) => v !== 'OPTIONAL')],
    [validacoes],
  );

  useEffect(() => {
    if (!validacoes) return;
    if (isOptional && !value) return setValidStatus('OPTIONAL');

    const isInitial = validStatus === 'OFF';
    if (!isInitial) setValidStatus('LOADING');
    
    const timeoutId = setTimeout(
      async () => {
        for (const verify of validacoesWithoutOptional) {
          const error = await verify(value);
          errorRef.current = error || null;

          if (error) return setValidStatus('ERROR');

          setValidStatus('VALIDY');
        }
      },
      isInitial ? 0 : +TIMEOUT_VALIDY,
    );

    return () => clearTimeout(timeoutId);
  }, [value]);

  return { status: validStatus, error: errorRef.current };
}

export type Valid<V = string | null | false | undefined> = 'OPTIONAL' | ((v: string) => PromiseLike<V> | V);
export type StatusValidy = 'VALIDY' | 'ERROR' | 'LOADING' | 'OFF' | 'OPTIONAL';

