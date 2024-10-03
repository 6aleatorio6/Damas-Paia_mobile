export default ({ config }) => ({
  ...config,
  name: 'Damas Paia',
  slug: 'Damas-Paia',
  scheme: 'damaspaia',
  version: (process.env.EXPO_PUBLIC_APP_VERSION || 'v0.0.0').replace('v', ''),
  updates: { url: 'https://u.expo.dev/fffe2c4d-7aae-46cf-95bf-cea2dfa97a40' },
  runtimeVersion: '1.3.0',
  orientation: 'portrait',
  icon: './src/assets/icon.png',
  userInterfaceStyle: 'automatic',
  splash: {
    image: './src/assets/splash.png',
    resizeMode: 'cover',
    backgroundColor: '#1E1E1E',
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './src/assets/icon.png',
      backgroundColor: '#1E1E1E',
    },
    package: 'com.leonardolf.damaspaia',
  },
  experiments: {
    typedRoutes: true,
  },
  plugins: [
    'expo-router',
    [
      'react-native-fbsdk-next',
      {
        appID: process.env.FACEBOOK_APP_ID || '123456789',
        clientToken: process.env.FACEBOOK_CLIENT_TOKEN || '123456789',
        displayName: 'Damas Paia',
        scheme: 'damaspaia',
        advertiserIDCollectionEnabled: false,
        autoLogAppEventsEnabled: false,
        isAutoInitEnabled: true,
      },
    ],
  ],
  extra: {
    router: {
      origin: false,
    },
    eas: {
      projectId: 'fffe2c4d-7aae-46cf-95bf-cea2dfa97a40',
    },
  },
});
