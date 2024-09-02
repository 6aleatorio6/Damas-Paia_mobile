import { setupServer } from 'msw/native';
import '@testing-library/react-native/extend-expect';
import 'fast-text-encoding';
import 'react-native-url-polyfill/auto';
import { handlers } from './mocks.handlers';

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);
jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');
jest.mock('react-native-reanimated', () => null, {
  virtual: true,
});
jest.mock('@testing-library/jest-native/extend-expect', () => null, {
  virtual: true,
});

export let server: ReturnType<typeof setupServer>;

beforeEach(async () => {
  server = setupServer(...handlers);
  server.listen();
});

afterEach(() => server.close());
