import AsyncStorage from '@react-native-async-storage/async-storage';
import { fireEvent, screen, waitFor } from 'expo-router/testing-library';
import { http, HttpResponse } from 'msw';
import { server } from 'tests/jest.setup';
import { dbMock } from 'tests/mocks.handlers';
import { AsyncStorageMockSimulator, renderRouterPaia } from 'tests/utils';

describe('Lógica de auth', () => {
  describe('Roteamento baseado no token', () => {
    it('Deve renderizar a rota (auth) se não houver token salvo', async () => {
      AsyncStorageMockSimulator(); // Inicia o simulador para testes
      jest.spyOn(AsyncStorage, 'getItem').mockResolvedValueOnce(null);

      await renderRouterPaia(['(auth)']);
      await waitFor(() => expect(AsyncStorage.getItem).toHaveBeenCalledWith('token'));
    });

    it('Deve renderizar a rota (tabs) se houver token salvo', async () => {
      AsyncStorageMockSimulator();
      jest.spyOn(AsyncStorage, 'getItem').mockResolvedValueOnce('token');

      await renderRouterPaia(['(tabs)']);
      await waitFor(() => expect(AsyncStorage.getItem).toHaveBeenCalledWith('token'));
    });
  });

  describe('Fluxo de autenticação', () => {
    it('Deve criar e autenticar o usuário e salvar o token no AsyncStorage', async () => {
      AsyncStorageMockSimulator();
      await renderRouterPaia(['(auth)', 'cadastrar'], { initialUrl: 'cadastrar' });
      const [iEmail, iNome, iSenha] = screen.getAllByPlaceholderText(/.*/);

      // preenche os campos e esperando a validação
      fireEvent.changeText(iEmail, 'paiaCabral@gmail.com');
      fireEvent.changeText(iNome, 'paiaCabral');
      fireEvent.changeText(iSenha, '123456');
      await waitFor(() => expect(screen.getAllByText(/valido/i).length).toBe(3));

      // após a validação, clica no botão de cadastrar e espera a navegação
      fireEvent.press(screen.getByText(/cadastrar/i));
      await waitFor(() => expect(screen).toHaveSegments(['(tabs)']));

      expect(AsyncStorage.setItem).toHaveBeenCalledWith('token', 'paiaCabral');
      expect(AsyncStorage.getItem).toHaveBeenCalledWith('token');
    });

    it('Deve autenticar o usuário e salvar o token no AsyncStorage', async () => {
      const userInfo = AsyncStorageMockSimulator('onlyDb');
      await renderRouterPaia(['(auth)', 'entrar'], { initialUrl: 'entrar' });
      const [iNome, iSenha] = screen.getAllByPlaceholderText(/.*/);

      // preenche os campos e esperando a validação
      fireEvent.changeText(iNome, userInfo.username);
      fireEvent.changeText(iSenha, userInfo.password);
      await waitFor(() => expect(screen.getAllByText(/valido/i).length).toBe(2));

      // após a validação, clica no botão de entrar e espera a navegação
      fireEvent.press(screen.getByText(/entrar/i));
      await waitFor(() => expect(screen).toHaveSegments(['(tabs)']));

      expect(AsyncStorage.setItem).toHaveBeenCalledWith('token', userInfo.username);
      expect(AsyncStorage.getItem).toHaveBeenCalledWith('token');
    });
  });

  describe('Fluxo de logout', () => {
    it('Deve deslogar o usuário e remover o token do AsyncStorage', async () => {
      AsyncStorageMockSimulator('dbAndStorage');
      await renderRouterPaia(['(tabs)', '(user)'], { initialUrl: '(user)' });

      fireEvent.press(await screen.findByText('SAIR'));

      await waitFor(() => expect(screen).toHaveSegments(['(auth)']));
      expect(AsyncStorage.removeItem).toHaveBeenCalledWith('token');
    });
  });

  describe('Refresh', () => {
    it('Deve fazer o refresh do token e manter o usuário logado', async () => {
      const userInfo = AsyncStorageMockSimulator('dbAndStorage');
      dbMock.set('tokenRenovado', userInfo); // precisa disso pq acabei usando o username como token

      server.use(
        http.get('*/user', ({ request }) => {
          const token = request.headers.get('Authorization')?.split(' ')[1];
          if (token !== 'tokenRenovado') return HttpResponse.json(null, { status: 401 });
          return HttpResponse.json(userInfo);
        }),
        http.get('*/auth/refresh', () => HttpResponse.json({ token: 'tokenRenovado' })),
      );

      await renderRouterPaia(['(tabs)', '(user)'], { initialUrl: '(user)' });

      expect(await screen.findByText('SAIR')).toBeTruthy();
      expect(AsyncStorage.setItem).toHaveBeenCalledWith('token', 'tokenRenovado');
    });

    it('Deve deslogar o usuário caso não consiga fazer o refresh do token', async () => {
      AsyncStorageMockSimulator('dbAndStorage');

      server.use(http.get('*/user', () => HttpResponse.json(null, { status: 401 })));
      server.use(http.get('*/auth/refresh', () => HttpResponse.json(null, { status: 401 })));

      await renderRouterPaia(['(tabs)', '(user)'], { initialUrl: '(user)' });

      expect(screen).toHaveSegments(['(auth)']);
      expect(AsyncStorage.removeItem).toHaveBeenCalledWith('token');
    });
  });
});
