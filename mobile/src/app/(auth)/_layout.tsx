import { Stack } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';

export default function LayoutAuth() {
  return (
    <Stack
      screenOptions={{
        header: (props) => {
          const isBack = props.navigation.canGoBack();
          return (
            isBack && (
              <ArrowLeft
                className="absolute m-2"
                color={'white'}
                size={45}
                onPress={props.navigation.goBack}
              />
            )
          );
        },
      }}
    />
  );
}
