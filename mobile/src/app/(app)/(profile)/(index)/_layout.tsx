// app/(top-tabs)/_layout.tsx
import {
  MaterialTopTabNavigationEventMap,
  MaterialTopTabNavigationOptions,
  createMaterialTopTabNavigator,
} from '@react-navigation/material-top-tabs';
import { withLayoutContext } from 'expo-router';
import { ParamListBase, TabNavigationState } from '@react-navigation/native';
import { CircleUserRound } from 'lucide-react-native';
import { Image, Text, View } from 'react-native';
import { useGetProfile } from '@/lib/querysMutations/useProfile';
import useTheme from '@/lib/useTheme';

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

export default function TabLayout() {
  return (
    <>
      <HeaderProfile />
      <MaterialTopTabs>
        <MaterialTopTabs.Screen name="config" options={{ title: 'Tab One' }} />
        <MaterialTopTabs.Screen
          name="myFrases"
          options={{ title: 'Tab Two' }}
        />
      </MaterialTopTabs>
    </>
  );
}

function HeaderProfile() {
  const { getColor } = useTheme();

  const { data, isLoading } = useGetProfile();
  const avatar = data?.avatar;

  if (isLoading) return <Text className="m-auto">Loading...</Text>;

  return (
    <View className="flex-row   items-center ">
      {avatar ? (
        <Image source={avatar} className="w-10 h-10" />
      ) : (
        <CircleUserRound size={70} color={getColor(['black', 'white'])} />
      )}
      <Text className="text-3xl dark:text-white text-center font-bold mx-3">
        {data?.nome}
      </Text>
    </View>
  );
}

// return (
//   <View className="flex-1 items-center justify-center">
//     <View className="space-y-3">
//       <ButtonLink href="/(app)/(profile)/change" className="bg-blue-500 px-4">
//         <Text className="dark:text-white text-2xl font-bold">EDITAR</Text>
//       </ButtonLink>

//       <ButtonForm onPress={mutate} className="bg-red-500 px-4">
//         DELETAR CONTA
//       </ButtonForm>

//       <ButtonForm onPress={loggout} className="bg-grau-500 px-4">
//         SAIR DA CONTA
//       </ButtonForm>
//     </View>
//   </View>
// );
