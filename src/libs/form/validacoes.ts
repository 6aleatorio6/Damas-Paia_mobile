import { useIsInvalid } from '../apiHooks/mutations';
import { ValidacoesDoCampo } from './useValidador';

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
    email: [
      (t) => !t && 'Campo obrigatório',
      (t) => t.length > 64 && 'Máx. 64 caracteres',
      (t) => !/^[a-zA-Z0-9._%+-]+/.test(t) && 'Caractere inválido no início',
      (t) => !/@[a-zA-Z0-9.-]+\./.test(t) && 'Formato de email inválido',
      (t) => !/[a-zA-Z]{2,}$/.test(t) && 'Terminação inválida',
      (t) => mutateVerify({ email: t }),
    ],
    username: [
      (t) => !t && 'Campo obrigatório',
      (t) => (t.length < 3 || t.length > 40) && 'Entre 3 e 40 caracteres',
      (t) => /\s/.test(t) && 'Não pode conter espaço',
      (t) => !/^[a-zA-Z]/.test(t) && 'Deve começar com uma letra',
      (t) => !/^[a-zA-Z0-9._-]*$/.test(t) && 'apenas  (.), (_) e (-) são permitido',
      (t) => mutateVerify({ username: t }),
    ],
    password: [
      (t) => !t && 'Campo obrigatório',
      (t) => (t.length < 4 || t.length > 40) && 'Entre 4 e 40 caracteres',
    ],
  } satisfies Record<string, ValidacoesDoCampo>;
};
