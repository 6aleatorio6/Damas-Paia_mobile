import useApi, { Resto } from '../useApi';

export const useUserPut = (resto?: Resto<'m'>) =>
  useApi('mutate', (axios) => ({
    async mutationFn(values: Record<string, string>) {
      await axios.put('/user', values);
    },
    ...(resto || {}),
  }));
