import AsyncStorage from '@react-native-async-storage/async-storage';
import { renderRouter, screen, waitFor } from 'expo-router/testing-library';

describe('Auth - context', () => {
  it('Deve render (auth) se não tiver token salvo', async () => {
    jest.spyOn(AsyncStorage, 'getItem').mockResolvedValue(null);
    renderRouter('src/app');

    await waitFor(() => {
      expect(screen).toHaveSegments(['(auth)']);
    });
  });

  it('Deve render (tabs) se tiver token salvo', async () => {
    jest.spyOn(AsyncStorage, 'getItem').mockResolvedValue('token');
    renderRouter('src/app');

    await waitFor(() => {
      expect(screen).toHaveSegments(['(tabs)']);
    });
  });
});
