/* eslint-disable react-hooks/rules-of-hooks */
import useApi from '../useApi';

export const useGetUser = () =>
  useApi('query', (axios) => ({
    queryKey: ['user'],
    queryFn: async () => axios.get<User>('/user').then((res) => res.data),
  }));
