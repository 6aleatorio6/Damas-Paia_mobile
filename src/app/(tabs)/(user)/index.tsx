import UserBar from '@/components/user/UserBar';
import { UserMatches } from '@/components/user/UserMatches';
import { View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

export default function Indextabs() {
  const { styles } = useStyles(stylesheet);

  return (
    <View style={styles.container}>
      <UserBar />
      <UserMatches />
    </View>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  container: {
    flex: 1,
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'center',
  },
}));
