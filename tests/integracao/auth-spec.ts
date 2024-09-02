import AsyncStorage from '@react-native-async-storage/async-storage';
import { act, screen, userEvent, waitFor } from '@testing-library/react-native';
import { UserEventInstance } from '@testing-library/react-native/build/user-event/setup';
import { renderRouterPaia } from 'tests/utils';

describe('Lógica de auth', () => {
  describe('Verifica qual rota abre de acordo com a situação do token', () => {
    it('Deve renderizar a rota (auth) se não houver token salvo', async () => {
      jest.spyOn(AsyncStorage, 'getItem').mockResolvedValue(null);
      await renderRouterPaia(['(auth)']);
    });

    it('Deve renderizar a rota (tabs) se houver token salvo', async () => {
      jest.spyOn(AsyncStorage, 'getItem').mockResolvedValue('token');
      await renderRouterPaia(['(tabs)']);
    });
  });

  describe('Me cadastrando no app', () => {
    let userE: UserEventInstance;
    beforeEach(() => {
      userE = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
      jest.spyOn(AsyncStorage, 'getItem').mockResolvedValue(null);
      jest.useFakeTimers();
    });
    afterEach(async () => {
      act(jest.runOnlyPendingTimers);
      jest.useRealTimers();
    });

    it('Deve renderizar a rota (auth) se não houver token salvo', async () => {
      await renderRouterPaia(['(auth)', 'cadastrar'], { initialUrl: '(auth)/cadastrar' });

      const button = screen.getByRole('button');
      const [iEmail, iUsername, iSenha] = screen.getAllByPlaceholderText(/.*/g);

      await act(async () => {
        await userE.type(iUsername, 'paia123');
        await userE.type(iEmail, 'leo@gmail.com');
        await userE.type(iSenha, '123456');
        jest.runOnlyPendingTimers();
      });

      await userE.press(button);
      expect(screen.getByText('aguarde...')).toBeDefined();
      await waitFor(() => expect(AsyncStorage.setItem).toHaveBeenLastCalledWith('token'));
    });
  });
});
