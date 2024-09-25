import ButtonBig, { IButtonStyle } from '@/components/ButtonBig';
import { useAuth } from '@/libs/apiHooks/auth/tokenContext';
import { useGetUser } from '@/libs/apiHooks/querys';
import { router } from 'expo-router';
import { Frown, LogOut, RotateCcw, UserCircle2 } from 'lucide-react-native';
import { Text, TouchableOpacity, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

export default function UserBar() {
  const { styles, theme } = useStyles(stylesheet);
  const { data, isError, isLoading, isSuccess, refetch } = useGetUser({});
  const { logout } = useAuth();

  const Icon = isError ? Frown : UserCircle2;

  return (
    <View style={styles.containerPerfil}>
      <Icon size={65} color={theme.colors.textPri} />
      <View style={styles.meioPerfil}>
        {isError && <Text style={styles.username}>{'Erro'}</Text>}
        {isLoading && <Text style={styles.username}>{'...'}</Text>}
        {isSuccess && (
          <>
            <Text style={styles.username} numberOfLines={1} ellipsizeMode="tail">
              {data?.username}
            </Text>
            <ButtonBig style={styles.editButton} onPress={() => router.navigate('/(tabs)/(user)/editar')}>
              Editar
            </ButtonBig>
          </>
        )}
      </View>

      {!isSuccess && (
        <TouchableOpacity style={styles.logoutIcon} onPress={() => refetch()}>
          <RotateCcw size={30} color={theme.colors.danger} />
        </TouchableOpacity>
      )}
      {isSuccess && (
        <TouchableOpacity onPress={() => logout()}>
          <View style={styles.logoutIcon}>
            <LogOut size={20} color={theme.colors.danger} />
          </View>
          <Text style={styles.logoutText}>SAIR</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  containerPerfil: {
    flex: 0.2,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  meioPerfil: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  username: {
    color: theme.colors.textPri,
    fontSize: 30,
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
