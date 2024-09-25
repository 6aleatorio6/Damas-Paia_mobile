import React from 'react';
import { View, Text } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { Trophy, Frown } from 'lucide-react-native'; // Importando o ícone Frown

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
  const isIWin = item.winner === item.youAre;
  const statusMessage = isIWin ? 'Vitória' : 'Derrota';
  const reasonMessage = messageStatusWin[item.winnerStatus!];
  const myPlayer = item[item.youAre];
  const opPlayer = item[item.youAre === 'player1' ? 'player2' : 'player1'];
  const dataInit = new Date(item.dateInit).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
  const duration = Math.floor(
    (new Date(item.dateEnd!).getTime() - new Date(item.dateInit).getTime()) / 60000,
  );

  return (
    <View style={styles.infoContainer}>
      <View style={styles.containerTop}>
        <Text style={styles.statusMessage(isIWin)}>
          {statusMessage.toUpperCase()}
          <Text style={styles.reasonMessage}>{` ${reasonMessage}`.toUpperCase()}</Text>
        </Text>

        <View style={styles.additionalInfo}>
          <Text style={styles.additionalInfoText}>{`${dataInit}`}</Text>
          <Text style={styles.additionalInfoText}>{`Durou: ${duration}m`}</Text>
        </View>
      </View>

      <View style={styles.vsContainer}>
        {isIWin ? (
          <Trophy color={styles.iconColor(isIWin).color} size={20} />
        ) : (
          <Frown color={styles.iconColor(isIWin).color} size={20} />
        )}
        <Text style={styles.vsText}>
          <Text style={styles.username(isIWin)}>{myPlayer.username}</Text> VS <Text>{opPlayer.username}</Text>
        </Text>
      </View>
    </View>
  );
}

const stylesPaia = createStyleSheet(({ colors }) => ({
  infoContainer: {
    flexDirection: 'column',
    width: '100%',
    backgroundColor: colors.secondary,
    borderColor: colors.primary,
    borderWidth: 2,
    padding: 7,
    marginBottom: 5,
    borderRadius: 5,
  },
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
    textDecorationColor: win ? colors.success : colors.danger,
  }),
  iconColor: (win = false) => ({
    color: win ? colors.success : colors.danger,
  }),
}));
