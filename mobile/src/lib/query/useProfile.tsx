import { useApi } from '../axiosApi';

export default () =>
  useApi<{ nome: string; avatar: unknown }>('query', (axios) => ({
    queryKey: ['profile'],
    async queryFn() {
      const res = await axios.get('/user');

      return res.data;
    },
  }));
