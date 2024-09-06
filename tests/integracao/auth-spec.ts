import AsyncStorage from '@react-native-async-storage/async-storage';
import { fireEvent, screen, waitFor } from 'expo-router/testing-library';
import { apiTokenExpired, AsyncStorageMockSimulator, renderRouterPaia } from 'tests/utils';

describe('Lógica de autenticação', () => {
  describe('Roteamento baseado no token', () => {
    it('Deve redirecionar para a tela de autenticação se não houver token salvo', async () => {
      AsyncStorageMockSimulator(); // Inicializa o simulador de AsyncStorage
      jest.spyOn(AsyncStorage, 'getItem').mockResolvedValueOnce(null);

      await renderRouterPaia(['(auth)']);
      await waitFor(() => expect(AsyncStorage.getItem).toHaveBeenCalledWith('token'));
    });

    it('Deve redirecionar para a tela principal se houver token salvo', async () => {
      AsyncStorageMockSimulator();
      jest.spyOn(AsyncStorage, 'getItem').mockResolvedValueOnce('token');

      await renderRouterPaia(['(tabs)']);
      await waitFor(() => expect(AsyncStorage.getItem).toHaveBeenCalledWith('token'));
    });
  });

  describe('Fluxo de autenticação', () => {
    it('Deve criar um novo usuário, salvar o token no AsyncStorage e redirecionar para a tela principal', async () => {
      AsyncStorageMockSimulator();
      await renderRouterPaia(['(auth)', 'cadastrar'], { initialUrl: 'cadastrar' });

      // Preenche os campos e valida
      const [iEmail, iNome, iSenha] = screen.getAllByPlaceholderText(/.*/);
      fireEvent.changeText(iEmail, 'paiaCabral@gmail.com');
      fireEvent.changeText(iNome, 'paiaCabral');
      fireEvent.changeText(iSenha, '123456');
      await waitFor(() => expect(screen.getAllByText(/valido/i).length).toBe(3));

      // Clica no botão de cadastrar e espera a navegação
      fireEvent.press(screen.getByText(/cadastrar/i));
      await waitFor(() => expect(screen).toHaveSegments(['(tabs)']));

      expect(AsyncStorage.setItem).toHaveBeenCalledWith('token', 'paiaCabral');
      expect(AsyncStorage.getItem).toHaveBeenCalledWith('token');
    });

    it('Deve autenticar um usuário existente, salvar o token no AsyncStorage e redirecionar para a tela principal', async () => {
      const userInfo = AsyncStorageMockSimulator('onlyDb');
      await renderRouterPaia(['(auth)', 'entrar'], { initialUrl: 'entrar' });

      // Preenche os campos e valida
      const [iNome, iSenha] = screen.getAllByPlaceholderText(/.*/);
      fireEvent.changeText(iNome, userInfo.username);
      fireEvent.changeText(iSenha, userInfo.password);
      await waitFor(() => expect(screen.getAllByText(/valido/i).length).toBe(2));

      // Clica no botão de entrar e espera a navegação
      fireEvent.press(screen.getByText(/entrar/i));
      await waitFor(() => expect(screen).toHaveSegments(['(tabs)']));

      expect(AsyncStorage.setItem).toHaveBeenCalledWith('token', userInfo.username);
      expect(AsyncStorage.getItem).toHaveBeenCalledWith('token');
    });
  });

  describe('Fluxo de logout', () => {
    it('Deve realizar o logout, remover o token do AsyncStorage e redirecionar para a tela de autenticação', async () => {
      AsyncStorageMockSimulator('dbAndStorage');
      await renderRouterPaia(['(tabs)', '(user)'], { initialUrl: '(user)' });

      fireEvent.press(await screen.findByText('SAIR', {}, { timeout: 3000 }));

      await waitFor(() => expect(screen).toHaveSegments(['(auth)']));
      expect(AsyncStorage.removeItem).toHaveBeenCalledWith('token');
    });
  });

  describe('Renovação de token', () => {
    it('Deve renovar o token expirado e refazer a requisição com o token atualizado, mantendo o usuário logado', async () => {
      apiTokenExpired(true);
      await renderRouterPaia(['(tabs)', '(user)'], { initialUrl: '(user)' });

      expect(await screen.findByText('SAIR')).toBeTruthy();
      expect(AsyncStorage.setItem).toHaveBeenCalledWith('token', 'tokenRenovado');
    });

    it('Deve deslogar o usuário e remover o token do AsyncStorage se a renovação do token falhar', async () => {
      apiTokenExpired(false);
      await renderRouterPaia(['(tabs)', '(user)'], { initialUrl: '(user)' });

      await waitFor(() => expect(screen).toHaveSegments(['(auth)']));
      expect(AsyncStorage.removeItem).toHaveBeenCalledWith('token');
    });
  });
});
