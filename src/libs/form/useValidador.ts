/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react';

const TIMEOUT_VALIDY = process.env.EXPO_PUBLIC_INPUT_VALIDY || 500;

export function useValidador(value: string, validacoes: Valid[]) {
  const [validStatus, setValidStatus] = useState<StatusValidy>('OFF');
  const errorRef = useRef<string | null>(null);

  useEffect(() => {
    if (!validacoes) return;
    const isInitial = validStatus === 'OFF';

    if (!isInitial) setValidStatus('LOADING');
    const timeoutId = setTimeout(
      async () => {
        for (const verify of validacoes) {
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

export type Valid<V = string | null | false | undefined> = 'optional' | ((v: string) => PromiseLike<V> | V);

export type StatusValidy = 'VALIDY' | 'ERROR' | 'LOADING' | 'OFF';
