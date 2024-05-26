import { AxiosError } from 'axios';
import { Alert } from 'react-native';

/**
 * Função responsável por exibir um alerta de erro se for um erro do axios.
 *
 * Usado como padrao no `useApi`.
 */
export default function onError(error: unknown) {
  if (!(error instanceof AxiosError)) throw error;

  let data = error.response?.data as {
    error: string;
    message: string | string[];
  };

  if (Array.isArray(data.message)) data.message = data.message.join(';\n \n');

  Alert.alert(data.error || error.message, data.message || 'Erro desconhecido');
}
