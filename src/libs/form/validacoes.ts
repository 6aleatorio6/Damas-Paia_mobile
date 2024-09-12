import { useIsInvalid } from '../apiHooks/mutations';
import { Valid } from './useValidador';

/**
 * Hook que deve retornar as validações de campos pre definidas
 *
 *
 * Dicas:
 * - Se a validação falhar, a função deve retornar uma string com a mensagem de erro;
 * - Se a validação passar, a função deve retornar false;
 */
export const useValidsPaia = () => {
  const { mutateAsync: mutateVerify } = useIsInvalid({});

  return {
    email: {
      required: (t) => !t && 'Campo obrigatório',
      maxLength: (t) => t.length > 64 && 'Máx. 64 caracteres',
      invalidStart: (t) => !/^[a-zA-Z0-9._%+-]+/.test(t) && 'Caractere inválido no início',
      invalidFormat: (t) => !/@[a-zA-Z0-9.-]+\./.test(t) && 'Formato de email inválido',
      invalidEnding: (t) => !/[a-zA-Z]{2,}$/.test(t) && 'Terminação inválida',
      verify: (t) => mutateVerify({ email: t }),
    },
    username: {
      required: (t) => !t && 'Campo obrigatório',
      length: (t) => (t.length < 3 || t.length > 40) && 'Entre 3 e 40 caracteres',
      noSpaces: (t) => /\s/.test(t) && 'Não pode conter espaço',
      startsWithLetter: (t) => !/^[a-zA-Z]/.test(t) && 'Deve começar com uma letra',
      validChars: (t) => !/^[a-zA-Z0-9._-]*$/.test(t) && 'apenas  (.), (_) e (-) são permitido',
      verify: (t) => mutateVerify({ username: t }),
    },
    password: {
      required: (t) => !t && 'Campo obrigatório',
      length: (t) => (t.length < 4 || t.length > 40) && 'Entre 4 e 40 caracteres',
    },
  } satisfies Record<string, Record<string, Valid>>;
};
