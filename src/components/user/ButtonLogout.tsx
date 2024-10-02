import { useState } from 'react';
import { useAuth } from '@/libs/apiHooks/auth/tokenContext';
import { LogOut } from 'lucide-react-native';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import ModalTemplate from '../ModalTemplate';
import ButtonBig from '../ButtonBig';
import { Colors } from '@/constants/colors';
import { router } from 'expo-router';

export default function ButtonLogout() {
  const { styles, theme } = useStyles(stylesPaia);
  const { logout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 400));
      await logout();
      router.replace('/');
    } finally {
      setIsLoggingOut(false);
    }
  };

  const handleConfirmLogout = () => {
    setIsConfirmModalVisible(true);
  };

  const handleCancelLogout = () => {
    setIsConfirmModalVisible(false);
  };

  const handleConfirmLogoutAction = async () => {
    setIsConfirmModalVisible(false);
    await handleLogout();
  };

  return (
    <>
      <TouchableOpacity onPress={handleConfirmLogout}>
        <View style={styles.logoutIcon}>
          <LogOut size={20} color={theme.colors.danger} />
        </View>
        <Text style={styles.logoutText}>SAIR</Text>
      </TouchableOpacity>
      <ModalTemplate
        title="Você tem certeza que quer sair?"
        modalVisible={isConfirmModalVisible}
        onRequestClose={handleCancelLogout}
      >
        <ButtonBig onPress={handleCancelLogout} style={styles.cancelOrConfirmButton('bodyTri')}>
          Cancelar
        </ButtonBig>
        <ButtonBig onPress={handleConfirmLogoutAction} style={styles.cancelOrConfirmButton('danger')}>
          Confirmar
        </ButtonBig>
      </ModalTemplate>
      <ModalTemplate width="30%" title="saindo..." modalVisible={isLoggingOut}>
        <ActivityIndicator size={40} color={theme.colors.danger} style={styles.spinner} />
      </ModalTemplate>
    </>
  );
}

const stylesPaia = createStyleSheet(({ colors }) => ({
  logoutIcon: {
    backgroundColor: colors.bodySec,
    borderRadius: 6,
    padding: 7,
  },
  logoutText: {
    color: colors.danger,
    fontSize: 9,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 2,
  },
  spinner: {
    margin: 'auto',
  },
  cancelOrConfirmButton: (color: Colors) => ({
    flexGrow: 1,
    backgroundColor: colors[color],
    padding: 10,
    borderRadius: 5,
    fontSize: 17,
  }),
}));
