import { Stack } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LayoutAuth() {
  return (
    <SafeAreaView className="flex-1">
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
    </SafeAreaView>
  );
}
