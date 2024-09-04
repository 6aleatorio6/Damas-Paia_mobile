import AsyncStorage from '@react-native-async-storage/async-storage';
import { fireEvent, screen, userEvent, waitFor } from 'expo-router/testing-library';
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
      await userEvent.press(screen.getByText(/cadastrar/i));
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
      await userEvent.press(screen.getByText(/entrar/i));
      await waitFor(() => expect(screen).toHaveSegments(['(tabs)']));

      expect(AsyncStorage.setItem).toHaveBeenCalledWith('token', userInfo.username);
      expect(AsyncStorage.getItem).toHaveBeenCalledWith('token');
    });
  });
});
