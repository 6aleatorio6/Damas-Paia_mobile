import { Href, router } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { ArrowLeftCircle } from 'lucide-react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

export function ButtonLeftHeader({ backTo }: { backTo?: Href }) {
  const { styles, theme } = useStyles(stylesPaia);

  if (!router.canGoBack() && !backTo) return null;

  const navbackTo = backTo && (() => router.navigate(backTo));

  return (
    <TouchableOpacity style={styles.buttonBack} onPress={navbackTo || router.back}>
      <ArrowLeftCircle size={36} color={theme.colors.textPri} />
    </TouchableOpacity>
  );
}

const stylesPaia = createStyleSheet((theme) => ({
  buttonBack: {
    position: 'absolute',
    start: 0,
    paddingHorizontal: 15,
    paddingVertical: 30,
    margin: 0,
    color: theme.colors.textPri,
  },
}));
