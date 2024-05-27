import { clientQuery } from '@/app/_layout';
import { useApi } from '../axiosApi';

export interface ReqFrase {
  id: number;
  autorId: string;
  frase: string;
  dataCriacao: Date;
}

export const useFrases = () =>
  useApi<ReqFrase[]>('query', (axios) => ({
    queryKey: ['allFrases'],
    async queryFn() {
      const res = await axios.get('/fraseTriste');

      return res.data;
    },
    staleTime: 5000,
  }));

export const useMyFrases = () =>
  useApi<ReqFrase[]>('query', (axios) => ({
    queryKey: ['myFrases'],
    async queryFn() {
      const res = await axios.get('/fraseTriste/all');

      return res.data;
    },
  }));

export const useCreateFrase = (frase: string) =>
  useApi('mutate', (axios) => ({
    async mutationFn() {
      const res = await axios.post('/fraseTriste/', { frase });

      return res.data;
    },
    onSuccess() {
      clientQuery.refetchQueries({ queryKey: ['allFrases'] });
      clientQuery.refetchQueries({ queryKey: ['myFrases'] });
    },
  }));
