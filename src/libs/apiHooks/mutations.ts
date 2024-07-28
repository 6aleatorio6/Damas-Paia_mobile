import { router } from 'expo-router';
import { SubmitOptions } from '../form/formContext';
import { useAuth } from './authToken';

// options do form

export const useLogin = (): SubmitOptions => {
  const { setToken } = useAuth();

  return (axios) => ({
    async mutationFn(values) {
      const { data } = await axios.post('/auth/login', values);

      await setToken(data.token);
      router.replace('(tabs)');
    },
  });
};

export const useCadastrar = (): SubmitOptions => {
  const { setToken } = useAuth();

  return (axios) => ({
    async mutationFn(values) {
      await axios.post('/user', values);
      const { data } = await axios.post('/auth/login', values);

      await setToken(data.token);
      router.replace('(tabs)');
    },
  });
};
