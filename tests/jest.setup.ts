import '@testing-library/react-native/extend-expect';
//
import 'fast-text-encoding';
import 'react-native-url-polyfill/auto';
import { setupServer } from 'msw/node'; // msw/native não funciona no @testing-library/react-native
import { handlers } from './mocks.handlers';

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);
jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');
jest.mock('react-native-reanimated', () => null, { virtual: true });
jest.mock('@testing-library/jest-native/extend-expect', () => null, { virtual: true });

export const server = setupServer(...handlers);
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
