import React, { PropsWithChildren, useState } from 'react';
import { View, Text, Linking } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import ModalTemplate from '../ModalTemplate';
import ButtonBig from '../ButtonBig';
import { baseURL } from '@/libs/apiHooks/auth/utils';
import { useUpdates } from 'expo-updates';

export default function ButtonInfo() {
  const { styles } = useStyles(stylesPaia);
  const [modalVisible, setModalVisible] = useState(false);
  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);
  const { currentlyRunning } = useUpdates();

  return (
    <>
      <ButtonBig onPress={openModal} style={styles.button}>
        ?
      </ButtonBig>
      <ModalTemplate modalVisible={modalVisible} onRequestClose={closeModal}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>DAMAS PAIA</Text>
            <ButtonBig onPress={closeModal} style={styles.closeButton}>
              X
            </ButtonBig>
          </View>
          <View style={styles.modalBody}>
            <TextCol label="Versão instalada">
              {process.env.EXPO_PUBLIC_APP_VERSION || '---'}
            </TextCol>
            <TextCol label="Canal de atualização">{currentlyRunning.channel || '---'}</TextCol>
            <TextCol label="Ultima Atualização">
              {currentlyRunning.createdAt?.toLocaleString('pt-br') || '---'}
            </TextCol>
            <TextCol label="URL do backend atual" link={baseURL}>
              {baseURL}
            </TextCol>
            <TextCol label="Desenvolvido por" link="https://www.github.com/6aleatorio6">
              Leonardo (6aleatorio6)
            </TextCol>
          </View>
        </View>
      </ModalTemplate>
    </>
  );
}

function TextCol({ label, children, link }: PropsWithChildren<{ label: string; link?: string }>) {
  const { styles } = useStyles(stylesPaia);

  return (
    <>
      <Text style={styles.textColLabel}>{label}</Text>
      <Text onPress={() => link && Linking.openURL(link)} style={styles.textColValue(!!link)}>
        {children}
      </Text>
    </>
  );
}

const stylesPaia = createStyleSheet(({ colors }) => ({
  button: {
    width: 44,
    height: 44,
    marginEnd: 10,
    backgroundColor: colors.secondary,
    borderRadius: 22,
    color: colors.textPri,
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '100%',
    borderRadius: 12,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.textPri,
  },
  closeButton: {
    backgroundColor: undefined,
    paddingHorizontal: 5,
    color: colors.danger,
    borderRadius: 8,
    fontSize: 18,
    textAlign: 'center',
  },
  modalBody: {
    borderTopWidth: 1,
    borderTopColor: colors.textPri,
    marginTop: 10,
    paddingTop: 15,
  },
  textColLabel: {
    fontWeight: 'bold',
    fontSize: 16,
    color: colors.textPri,
    marginTop: 10,
  },
  textColValue: (isLink = false) => ({
    color: colors.textSec,
    textDecorationLine: isLink ? 'underline' : 'none',
    fontSize: 15,
  }),
}));
