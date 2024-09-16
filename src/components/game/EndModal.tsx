import React, { useEffect, useState } from 'react';
import { Modal, View, Text, Button } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { useMatchSocket } from '@/libs/apiHooks/socketIo/MatchCtx';
import { router } from 'expo-router';
import { Trophy } from 'lucide-react-native';
import ButtonBig from '../ButtonBig';

export default function EndModal() {
  const { styles } = useStyles(stylesPaia);
  const [visible, setVisible] = useState(false);
  const socket = useMatchSocket();
  const [matchData, setMatchData] = useState<Match | null>(null);

  useEffect(() => {
    socket.on('match:end', (data) => {
      setMatchData(data);
      setVisible(true);
    });

    return () => {
      socket.off('match:end');
    };
  }, []);

  const onClose = () => {
    setVisible(false);
    router.back();
  };

  return (
    <Modal transparent={true} animationType="fade" visible={visible} onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Resultado da Partida</Text>
          {matchData && (
            <View style={styles.content}>
              <View style={styles.winnerContainer}>
                <Trophy style={styles.trophyIcon} size={30} />
                <Text style={styles.winnerText}>{matchData.winner.username} Venceu!</Text>
              </View>
              <Text style={styles.vsText}>
                {matchData.player1.username} VS {matchData.player2.username}
              </Text>
              <Text style={styles.dateText}>
                Duração:{' '}
                {(
                  (new Date(matchData?.dateEnd || 0).getTime() - new Date(matchData.dateInit).getTime()) /
                  1000 /
                  60
                ).toFixed(2)}
                m
              </Text>
              <Text style={styles.dateText}>Data: {new Date(matchData.dateInit).toLocaleTimeString()}</Text>
              <ButtonBig style={styles.button} onPress={onClose}>
                Fechar
              </ButtonBig>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
}

const stylesPaia = createStyleSheet(({ colors }) => ({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: colors.body,
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textPri,
    alignSelf: 'center',
    marginVertical: 20,
  },
  content: {
    alignItems: 'center',
    width: '100%',
  },
  winnerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  vsText: {
    fontSize: 18,
    marginBottom: 10,
    color: colors.textPri,
  },
  trophyIcon: {
    color: colors.success,
    marginRight: 10,
  },
  winnerText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: colors.textPri,
  },
  dateText: {
    fontSize: 14,
    marginBottom: 5,
    color: colors.textSec,
  },
  button: {
    width: '80%',
    padding: 10,
    marginVertical: 20,
    marginHorizontal: 5,
    textAlign: 'center',
    backgroundColor: colors.primary,
    borderRadius: 5,
    alignItems: 'center',
    color: colors.textPri,
    fontSize: 18,
  },
}));
