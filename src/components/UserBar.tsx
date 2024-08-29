import ButtonBig, { IButtonStyle } from '@/components/ButtonBig';
import { useAuth } from '@/libs/apiHooks/context/tokenContext';
import { useGetUser } from '@/libs/apiHooks/querys';
import { router } from 'expo-router';
import { LogOut, UserCircle2 } from 'lucide-react-native';
import { Text, TouchableOpacity, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

export default function UserBar() {
  const { styles, theme } = useStyles(stylesheet);
  const { data, isLoading, isError } = useGetUser();
  const { logout } = useAuth();

  if (isLoading) return <Text>Carregando </Text>;
  if (isError) return <Text>Erro</Text>;

  return (
    <View style={styles.containerPerfil}>
      <UserCircle2 size={65} color={theme.colors.textPri} />
      <View style={styles.meioPerfil}>
        <Text style={styles.username}>{data?.username}</Text>
        <ButtonBig style={styles.editButton} onPress={() => router.navigate('/(tabs)/(user)/editar')}>
          Editar
        </ButtonBig>
      </View>
      <TouchableOpacity onPress={() => logout()}>
        <View style={styles.logoutIcon}>
          <LogOut size={20} color={theme.colors.danger} />
        </View>
        <Text style={styles.logoutText}>SAIR</Text>
      </TouchableOpacity>
    </View>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  //
  containerPerfil: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: '10%',
  },
  meioPerfil: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  username: {
    color: theme.colors.textPri,
    fontSize: 35,
    fontWeight: 'bold',
  },
  editButton: {
    backgroundColor: theme.colors.bodySec,
    color: theme.colors.warning,
    fontSize: 12,
    padding: 1.5,
    width: '50%',
  } satisfies IButtonStyle,
  logoutIcon: {
    backgroundColor: theme.colors.bodySec,
    borderRadius: 6,
    padding: 7,
  },
  logoutText: {
    color: theme.colors.danger,
    fontSize: 9,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 2,
  },
}));
