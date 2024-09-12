import { createQuery } from './reactQuery/createReq';

export const useGetUser = createQuery((axios) => ({
  queryKey: ['user'],
  queryFn: () => axios.get<User>('/user').then((res) => res.data),
}));

export const useHealthcheck = createQuery((axios) => ({
  queryKey: ['healthcheck'],
  queryFn: () => axios.get<string>('/').then((res) => res.data),
  retry: 1,
}));
