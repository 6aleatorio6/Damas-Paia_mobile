export default ({ config }) => ({
  name: 'Damas Paia',
  slug: 'Damas-Paia',
  version: '2.0.0',
  scheme: 'damaspaia',
  orientation: 'portrait',
  icon: './src/assets/icon.png',
  userInterfaceStyle: 'automatic',
  splash: {
    image: './src/assets/splash.png',
    resizeMode: 'cover',
    backgroundColor: '#1E1E1E',
  },
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.leonardolf.damaspaia',
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './src/assets/icon.png',
      backgroundColor: '#1E1E1E',
    },
    package: 'com.leonardolf.damaspaia',
  },
  web: {
    favicon: './src/assets/icon.png',
  },
  experiments: {
    typedRoutes: true,
  },
  plugins: ['expo-router', 'react-native-fbsdk-next'],
  extra: {
    router: {
      origin: false,
    },
    eas: {
      projectId: 'fffe2c4d-7aae-46cf-95bf-cea2dfa97a40',
    },
  },
});
