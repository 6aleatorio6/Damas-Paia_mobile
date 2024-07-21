import { createStyleSheet, useStyles } from 'react-native-unistyles';
import FormMolde from '@/components/FormMolde';
import { Input } from '@/components/Input';
import Copyright from '@/components/Copyright';

export default function IndexAuth() {
  const { styles } = useStyles(stylesPaia);

  return (
    <>
      <FormMolde submitOptions={() => ({})}>
        <Input field="email" />
      </FormMolde>
      <Copyright />
    </>
  );
}

const stylesPaia = createStyleSheet((theme) => ({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: theme.colors.body,
    justifyContent: 'space-between',
    paddingBottom: '10%',
  },
}));
