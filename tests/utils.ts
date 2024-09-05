import AsyncStorage from '@react-native-async-storage/async-storage';
import { RouteSegments, StaticRoutes } from 'expo-router';
import { renderRouter, screen, waitFor } from 'expo-router/testing-library';
import { dbMock } from './mocks.handlers';
import { HttpResponse, HttpResponseResolver } from 'msw';

export function renderRouterPaia(
  segments: RouteSegments<StaticRoutes>,
  options?: Parameters<typeof renderRouter>[1],
) {
  renderRouter('src/app', options);

  return waitFor(() => {
    expect(screen).toHaveSegments(segments);
  });
}

/**
 * Não simula perfeitamente o AsyncStorage, mas é suficiente para testes atualmente
 *
 * O ``addUser`` é opcional e pode ser:
 *   - `onlyDb`: cria um usuário ao banco de dados mas não salva o token no AsyncStorage (deslogado, mas cadastrado)
 *   - `dbAndStorage`: cria um usuário ao banco de dados e salva o token no AsyncStorage (logado)
 */
export function AsyncStorageMockSimulator(addUser?: 'onlyDb' | 'dbAndStorage') {
  const map = new Map<string, string>() as any; // não preciso que seja exatamente igual ao AsyncStorage

  const user = { username: 'paiaTriste', email: 'paia@gmail.com', password: '123456', uuid: '123456' };
  if (addUser) {
    dbMock.set(user.username, user);
    if (addUser === 'dbAndStorage') map.set('token', user.username);
  }

  jest.spyOn(AsyncStorage, 'getItem').mockImplementation(map.get.bind(map));
  jest.spyOn(AsyncStorage, 'setItem').mockImplementation(map.set.bind(map));
  jest.spyOn(AsyncStorage, 'removeItem').mockImplementation(map.delete.bind(map));
  jest.spyOn(AsyncStorage, 'clear').mockImplementation(map.clear.bind(map));

  return user;
}

/**
 * Middleware para MSW que verifica se o usuário está logado e retorna
 * o usuário no parâmetro da função de callback
 */
export const mswRouter = (cb: CbRouterUser): HttpResponseResolver => {
  return (info) => {
    const { request } = info;

    const userName = request.headers.get('Authorization')?.split(' ')[1];
    const user = dbMock.get(userName || '');
    if (!user) {
      const status = request.url.includes('refresh') ? 401 : 404;
      return HttpResponse.json({ message: 'User not found' }, { status });
    }

    return cb(info, user);
  };
};
type CbRouterUser = (i: Parameters<HttpResponseResolver>[0], user: User) => ReturnType<HttpResponseResolver>;
