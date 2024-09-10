import axios, { AxiosResponse, isAxiosError } from 'axios';
import { useAuth } from './tokenContext';
import { apiTimeout, baseURL, refreshTokenOrLogout } from './utils';

const axiosInstance = axios.create({ baseURL, timeout: +apiTimeout });
let useAuthHook: ReturnType<typeof useAuth>;

// Middleware para interceptar as respostas de erro do servidor e caso seja 401, tentar fazer o refresh do token
axiosInstance.interceptors.response.use(null, async (configAxios: AxiosResponse) => {
  const isUnauthorized = isAxiosError(configAxios) && configAxios.response?.status === 401;
  if (!isUnauthorized) return Promise.reject(configAxios);

  // Tenta fazer o refresh do token e se não conseguir, desloga o usuário
  const tokenNovo = await refreshTokenOrLogout(useAuthHook);

  // refaz a requisição com o token atualizado
  configAxios.config.headers.Authorization = `Bearer ${tokenNovo}`;
  return axios({ ...configAxios.config });
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
