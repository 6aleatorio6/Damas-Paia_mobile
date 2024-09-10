import axios from 'axios';
import { Alert } from 'react-native';
import { useAuth } from './tokenContext';

export const baseURL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000';
export const apiTimeout = process.env.EXPO_PUBLIC_API_TIMEOUT || 10000;

export function formatError(error: Error) {
  if (!axios.isAxiosError<{ message?: string | string[] }>(error)) return error.message;

  let message = error?.response?.data?.message;
  if (!message) message = error?.message;
  if (Array.isArray(message)) message = message.join('\n');

  return message;
}

export async function refreshTokenOrLogout(useAuthHook: ReturnType<typeof useAuth>) {
  try {
    const response = await axios.get(`${baseURL}/auth/refresh`, {
      headers: { Authorization: `Bearer ${useAuthHook.token}` },
      timeout: +apiTimeout,
    });

    // Atualiza o token no hook de autenticação e no axios
    await useAuthHook.setToken(response.data.token, false);
    return response.data.token;
  } catch {
    // Não conseguiu fazer refresh do token, desloga o usuário
    Alert.alert('Sessão expirada', 'Não foi possível renovar a sessão, faça login novamente');
    await useAuthHook.logout();
  }
}
