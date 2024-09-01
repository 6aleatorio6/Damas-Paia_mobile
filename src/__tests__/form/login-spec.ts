import AsyncStorage from '@react-native-async-storage/async-storage';
import { renderRouter, screen, waitFor, userEvent } from 'expo-router/testing-library';

describe('Login - form', () => {
  beforeEach(() => {
    jest.spyOn(AsyncStorage, 'getItem').mockResolvedValue(null);
  });

  it('Deve renderizar o formulario de login', async () => {
    renderRouter('src/app', { initialUrl: '(auth)/entrar' });

    await waitFor(() => {
      expect(screen).toHaveSegments(['(auth)', 'entrar']);
    });

    expect(screen.getByPlaceholderText('Nome de usuario')).toBeDefined();
    expect(screen.getByPlaceholderText('senha')).toBeDefined();
  });

  // it('Botão de submit deve estar desabilitado com campos inválidos', async () => {
  //   renderRouter('src/app', { initialUrl: '(auth)/entrar' });

  //   await waitFor(() => {
  //     expect(screen).toHaveSegments(['(auth)', 'entrar']);
  //   });

  //   expect(screen.getByText('Entrar')).toBeDefined();
  //   screen.getByText('Entrar');

  //   await userEvent.press(screen.getByText('Entrar'));
  // });
});
