import React from 'react';
import { View, Text } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import Avatar from '../Avatar';

interface TopRankProps {
  data?: UserRank;
  position: '1' | '2' | '3';
}

export default function TopRank({ position, data }: TopRankProps) {
  const { styles } = useStyles(stylesPaia);
  const { avatar, username, wins } = data || {};

  return (
    <View style={styles.container}>
      <Avatar url={avatar} size={70} />
      <View style={styles.infoContainer}>
        <Text style={styles.username}>{username}</Text>
      </View>
      <View style={styles.rectangleContainer}>
        <View style={styles.rectangle(position)}>
          <Text style={styles.positionAndWins(false, position === '1')}>{position}º</Text>
          <Text style={styles.positionAndWins(true, position === '1')}>{wins} vitórias</Text>
        </View>
      </View>
    </View>
  );
}

const stylesPaia = createStyleSheet(({ colors }) => ({
  container: {
    flexGrow: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 10, // Adiciona espaço entre o avatar e o nome
  },
  icon: {
    width: 50,
    height: 50,
    marginBottom: 10, // Adiciona espaço entre o ícone e o nome
  },
  infoContainer: {
    alignItems: 'center', // Centraliza o conteúdo horizontalmente
  },
  positionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  username: {
    fontSize: 16,
    color: colors.textPri,
  },
  rectangleContainer: {
    width: '100%',
    alignItems: 'center', // Centraliza o retângulo horizontalmente
    marginTop: 10, // Adiciona espaço entre o conteúdo e o retângulo
  },
  rectangle: (position: '1' | '2' | '3') => ({
    width: '100%',
    height: 100 - 15 * +position, // Altura maior para o primeiro colocado
    backgroundColor: position === '1' ? colors.textPri : colors.secondary,
    justifyContent: 'center', // Centraliza o texto verticalmente
    alignItems: 'center', // Centraliza o texto horizontalmente
    gap: 1, // Adiciona espaço entre os textos
  }),
  positionAndWins: (isWins = false, isFirst = false) => ({
    fontSize: isWins ? 16 : 18, // Aumenta a fonte se não for wins
    color: isFirst ? colors.body : colors.textPri,
    fontWeight: 'bold', // Deixa em destaque se não for wins
  }),
}));
