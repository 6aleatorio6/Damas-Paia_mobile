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
      <View style={styles.infoContainer}>
        <Avatar url={avatar} size={70} />
        <Text style={styles.username} numberOfLines={1} ellipsizeMode="tail">
          {username || '.............'}
        </Text>
      </View>
      <View style={styles.rectangleContainer}>
        <View style={styles.rectangle(position)}>
          <Text style={styles.position}>{position || 0}º</Text>
          <Text style={styles.wins}>{wins || '0'} vitórias</Text>
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
    gap: 6, // Adiciona espaço entre o avatar e o nome
  },
  positionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  username: {
    textAlign: 'center',
    fontSize: 16,
    width: 80,
    color: colors.textPri,
  },
  rectangleContainer: {
    width: '100%',
    alignItems: 'center', // Centraliza o retângulo horizontalmente
    marginTop: 10, // Adiciona espaço entre o conteúdo e o retângulo
  },
  rectangle: (position: '1' | '2' | '3') => ({
    width: '100%',
    height: 110 - 13 * +position, // Altura maior para o primeiro colocado
    backgroundColor: position === '1' ? colors.primary : colors.secondary,
    justifyContent: 'center', // Centraliza o texto verticalmente
    alignItems: 'center', // Centraliza o texto horizontalmente
    gap: 1, // Adiciona espaço entre os textos
  }),
  position: {
    fontSize: 25, // Tamanho da fonte para a posição
    paddingLeft: 12, // Adiciona espaço à esquerda
    fontWeight: 'bold', // Deixa em destaque
    color: colors.textPri,
  },
  wins: {
    fontSize: 17, // Tamanho da fonte para as vitórias
    color: colors.textPri,
  },
}));
