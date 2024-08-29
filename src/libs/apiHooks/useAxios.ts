import axios, { AxiosResponse, isAxiosError } from 'axios';
import { useAuth } from './context/tokenContext';

export const baseURL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000';
const apiTimeout = process.env.EXPO_PUBLIC_API_TIMEOUT || 10000;

const axiosInstance = axios.create({ baseURL, timeout: +apiTimeout });

let useAuthHook: ReturnType<typeof useAuth>;

// Middleware para interceptar as respostas de erro do servidor e caso seja 401, tentar fazer o refresh do token
axiosInstance.interceptors.response.use(null, async (configAxios: AxiosResponse) => {
  const isUnauthorized = isAxiosError(configAxios) && configAxios.response?.status === 401;
  if (!isUnauthorized) return Promise.reject(configAxios);

  try {
    const response = await axios.get(`${baseURL}/auth/refresh`, {
      headers: { Authorization: `Bearer ${useAuthHook.token}` },
    });

    // Atualiza o token no hook de autenticação e no axios
    await useAuthHook.setToken(response.data.token, false);
    configAxios.config.headers.Authorization = `Bearer ${response.data.token}`;

    // Refaz a requisição com o token atualizado
    return axios({ ...configAxios.config });
  } catch {
    // Não conseguiu fazer refresh do token, desloga o usuário
    await useAuthHook.logout();
    return Promise.reject(configAxios);
  }
});

// Middleware para interceptar as requisições e adicionar o token de autenticação
axiosInstance.interceptors.request.use((axiosReq) => {
  axiosReq.headers.Authorization = `Bearer ${useAuthHook.token || ''}`;

  return axiosReq;
});

/**
 * Hook que retorna a instância do axios já configurada com o token de autenticação
 */
export const useAxios = () => {
  useAuthHook = useAuth();

  return axiosInstance;
};
