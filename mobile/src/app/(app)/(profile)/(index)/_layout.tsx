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
  const { getColor } = useTheme();

  return (
    <>
      <HeaderProfile />
      <MaterialTopTabs
        screenOptions={{
          tabBarStyle: {
            backgroundColor: getColor(['white', 'gray-900']),
            borderColor: getColor(['white', 'white']),
            // height: 60,
          },
          tabBarLabelStyle: {
            fontWeight: '400',
            fontSize: 18,
            color: getColor(['gray-900', 'white']),
          },
          tabBarIndicatorStyle: {
            borderColor: getColor(['gray-900', 'white']),
          },
          tabBarContentContainerStyle: {
            flex: 1,
          },
        }}
      >
        <MaterialTopTabs.Screen
          name="myFrases"
          options={{ title: 'MINHAS FRASES' }}
        />
        <MaterialTopTabs.Screen
          name="config"
          options={{ title: 'CONFIGURAÇÔES' }}
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
    <View className="flex-row  items-center justify-center  h-[15%]">
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
