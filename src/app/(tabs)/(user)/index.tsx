import UserBar from '@/components/user/UserBar';
import { View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

export default function Indextabs() {
  const { styles } = useStyles(stylesheet);

  return (
    <View style={styles.container}>
      <UserBar />
    </View>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  container: {
    width: '85%',
    alignSelf: 'center',
  },
}));
