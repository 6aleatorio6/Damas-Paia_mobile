import { createQuery } from './reactQuery/createReq';

export const useGetUser = createQuery((axios) => ({
  queryKey: ['user'],
  queryFn: () => axios.get<User>('/user').then((res) => res.data),
}));
