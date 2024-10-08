import React from 'react';
import { View, Text } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { Trophy, Frown } from 'lucide-react-native'; // Importando o ícone Frown
import { calculateDurationInMinutes, stringToDateString } from '@/libs/game/helpers';

interface MatchItemProps {
  item: Match & { youAre: Players };
}

const messageStatusWin = {
  resign: 'por desistência',
  timeout: 'por desconexão',
  checkmate: '',
};

export default function MatchItem({ item }: MatchItemProps) {
  const { styles } = useStyles(stylesPaia);
  const isWin = item.winner === item.youAre;
  const statusMessage = isWin ? 'Vitória' : 'Derrota';
  const reasonMessage = messageStatusWin[item.winnerStatus!];
  const myPlayer = item[item.youAre];
  const opPlayer = item[item.youAre === 'player1' ? 'player2' : 'player1'];

  return (
    <View style={styles.infoContainer(isWin)}>
      <View style={styles.containerTop}>
        <Text style={styles.statusMessage(isWin)}>
          {statusMessage.toUpperCase()}
          <Text style={styles.reasonMessage}>{` ${reasonMessage}`.toUpperCase()}</Text>
        </Text>

        <View style={styles.additionalInfo}>
          <Text style={styles.additionalInfoText}>{stringToDateString(item.dateEnd!)}</Text>
          <Text
            style={styles.additionalInfoText}
          >{`Durou: ${calculateDurationInMinutes(item.dateInit, item.dateEnd!)}`}</Text>
        </View>
      </View>

      <View style={styles.vsContainer}>
        {isWin ? (
          <Trophy color={styles.iconColor(isWin).color} size={20} />
        ) : (
          <Frown color={styles.iconColor(isWin).color} size={20} />
        )}
        <Text style={styles.vsText}>
          <Text style={styles.username(isWin)}>{myPlayer.username}</Text> VS <Text>{opPlayer.username}</Text>
        </Text>
      </View>
    </View>
  );
}

const stylesPaia = createStyleSheet(({ colors }) => ({
  infoContainer: (isWin = false) => ({
    flexDirection: 'column',
    width: '100%',
    backgroundColor: colors.bodyTri,
    borderColor: isWin ? colors.success : colors.danger,
    borderWidth: 1,
    padding: 7,
    marginBottom: 5,
    borderRadius: 5,
  }),
  containerTop: {
    flexDirection: 'row',
    width: '100%',
    position: 'relative',
  },
  statusMessage: (win = false) => ({
    fontSize: 22, // Aumentando o tamanho da fonte
    fontWeight: 'bold',
    marginTop: 4,
    color: win ? colors.success : colors.danger,
  }),
  reasonMessage: {
    fontSize: 11, // Fonte menor para o reasonMessage
  },
  additionalInfo: {
    position: 'absolute',
    end: 0,
  },
  additionalInfoText: {
    fontSize: 12, // Fonte menor para a informação adicional
    color: colors.textSec,
    textAlign: 'right',
  },
  vsContainer: {
    flexDirection: 'row',
    alignItems: 'center', // Centraliza verticalmente
  },
  vsText: {
    fontSize: 20, // Tamanho maior para o VS
    fontWeight: 'bold',
    color: colors.textPri,
    marginBottom: 4,
    marginLeft: 5, // Adiciona espaço entre o ícone e o texto
  },
  username: (win = false) => ({
    textDecorationLine: 'underline',
    textDecorationColor: win ? colors.success : '#FF1F3D',
  }),
  iconColor: (win = false) => ({
    color: win ? colors.success : '#FF1F3D',
  }),
}));
