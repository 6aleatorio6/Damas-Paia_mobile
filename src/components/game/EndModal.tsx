import React, { useEffect, useState } from 'react';
import { Modal, View, Text } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { useMatchSocket } from '@/libs/apiHooks/socketIo/MatchCtx';
import { router } from 'expo-router';
import { Trophy, Frown, Clock, Calendar } from 'lucide-react-native'; // Import the Clock and Calendar icons
import ButtonBig from '../ButtonBig';
import { queryClientPaia } from '@/libs/apiHooks/reactQuery/queryContext';
import { calculateDurationInMinutes, stringToDateString } from '@/libs/game/helpers';

export default function EndModal() {
  const { styles } = useStyles(stylesPaia);
  const [visible, setVisible] = useState(false);
  const socket = useMatchSocket();
  const [matchData, setMatchData] = useState<Match | null>(null);

  const isUserWinner = matchData && matchData.winner === socket.data.myPlayer;

  useEffect(() => {
    socket.on('match:finish', (data) => {
      queryClientPaia.invalidateQueries({ queryKey: ['userMatches'] });
      queryClientPaia.invalidateQueries({ queryKey: ['ranking'] });
      setMatchData(data);
      setVisible(true);
    });

    return () => {
      socket.off('match:finish');
    };
  }, []);

  const onClose = () => {
    setVisible(false);
    router.back();
  };

  return (
    <Modal transparent={true} animationType="fade" visible={visible} onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer(!!isUserWinner)}>
          {matchData && (
            <>
              <View style={styles.winnerContainer}>
                {isUserWinner ? (
                  <>
                    <Trophy style={styles.statusIcon(true)} size={55} />
                    <Text style={styles.statusText(true)}>VOCÊ GANHOU!</Text>
                  </>
                ) : (
                  <>
                    <Frown style={styles.statusIcon()} size={55} />
                    <Text style={styles.statusText()}>VOCÊ PERDEU!</Text>
                  </>
                )}
              </View>
              <View style={styles.vsContainer}>
                <Text style={styles.vsText}>{matchData.player1.username}</Text>
                <Text style={styles.vsText}>VS</Text>
                <Text style={styles.vsText}>{matchData.player2.username}</Text>
              </View>
              <View style={styles.rowContainer}>
                <View style={styles.iconTextContainer}>
                  <Clock style={styles.infoIcon} size={20} />
                  <Text style={styles.dateText}>
                    {calculateDurationInMinutes(matchData.dateInit, matchData.dateEnd!)}
                  </Text>
                </View>
                <View style={styles.iconTextContainer}>
                  <Calendar style={styles.infoIcon} size={20} />
                  <Text style={styles.dateText}>{stringToDateString(matchData.dateEnd!)}</Text>
                </View>
              </View>
              <ButtonBig style={styles.button} onPress={onClose}>
                Fechar
              </ButtonBig>
            </>
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
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalContainer: (isWin: boolean) => ({
    width: '80%',
    backgroundColor: colors.body,
    borderColor: isWin ? colors.success : colors.danger,
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: '5%',
  }),
  winnerContainer: {
    width: '100%',
    flexDirection: 'column', // Change to column
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 10,
  },
  vsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  vsText: {
    textAlign: 'center',
    fontSize: 25,
    color: colors.textPri,
    fontWeight: 'bold',
  },
  rowContainer: {
    width: '100%',
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoIcon: {
    marginRight: 5,
    color: colors.textSec,
  },
  dateText: {
    fontSize: 14,
    color: colors.textSec,
  },
  statusIcon: (isWin = false) => ({
    color: isWin ? colors.success : colors.danger,
    marginRight: 10,
  }),
  statusText: (isWin = false) => ({
    fontSize: 30,
    fontWeight: 'bold',
    color: isWin ? colors.success : colors.danger,
  }),
  button: {
    width: '100%',
    padding: 10,
    marginTop: 20,
    textAlign: 'center',
    backgroundColor: colors.primary,
    borderRadius: 5,
    alignItems: 'center',
    color: colors.textPri,
    fontSize: 18,
  },
}));
