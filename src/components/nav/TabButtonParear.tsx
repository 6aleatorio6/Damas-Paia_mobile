import { Text, TouchableOpacity } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import { Href, router } from 'expo-router';

export default function TabButtonParear({ to }: BottomTabBarButtonProps) {
  const { styles } = useStyles(stylesPaia);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => router.navigate(to as Href)}
      style={styles.container}
    >
      <Text style={styles.text}>JOGAR</Text>
    </TouchableOpacity>
  );
}

const stylesPaia = createStyleSheet((theme) => ({
  container: {
    width: '28%',
    aspectRatio: 2 / 1,
    flexDirection: 'column',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.textSec,
    borderWidth: 2,
    marginTop: '-5%',
  },
  text: {
    color: theme.colors.textPri,
    fontSize: 18,
    fontWeight: 'bold',
  },
}));
