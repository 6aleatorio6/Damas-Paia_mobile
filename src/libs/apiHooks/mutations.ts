import { createMutation } from './reactQuery/createReq';

export const useUserPut = createMutation((axios) => ({
  async mutationFn(values: Record<string, string>) {
    await axios.put('/user', values);
  },
}));

export const useUserPostAndLogin = createMutation((axios) => ({
  async mutationFn(values: Record<string, string>) {
    await axios.post('/user', values).then((res) => res.data);

    return axios.post<{ token: string }>('/auth/login', values).then((res) => res.data);
  },
}));

export const useLoginPost = createMutation((axios) => ({
  mutationFn: async (values: Record<string, string>) => {
    return axios.post<{ token: string }>('/auth/login', values).then((res) => res.data);
  },
}));

export const useUserDelete = createMutation((axios) => ({
  mutationFn: async () => {
    await axios.delete('/user');
  },
}));

export const useIsInvalid = createMutation((axios) => ({
  async mutationFn(data: Partial<Pick<User, 'username' | 'email'>>) {
    const query = new URLSearchParams(data).toString();

    return await axios
      .get(`user/verify?${query}`)
      .then(() => false)
      .catch((r) => r.message);
  },
}));
