import React from 'react';
import { View, Text } from 'react-native';
import { Trophy } from 'lucide-react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import Avatar from '../Avatar';

type UserRank = { avatar: string | null; username: string; wins: string };

interface RankItemProps {
  item: UserRank;
  index: number;
}

export default function RankItem(props: RankItemProps) {
  const { styles, theme } = useStyles(stylesPaia);
  const { item, index } = props;

  return (
    <View style={styles.container}>
      <View style={styles.indexContainer}>
        <Text style={styles.index}>{index + 4}°</Text>
      </View>
      <View style={styles.avatarContainer}>
        <Avatar size={50} url={item.avatar} />
        <Text style={styles.username} numberOfLines={1} ellipsizeMode="tail">
          {item.username}
        </Text>
      </View>
      <View style={styles.winsContainer}>
        <Text style={styles.wins}>{item.wins}</Text>
        <Trophy color={theme.colors.warning} />
      </View>
    </View>
  );
}

const stylesPaia = createStyleSheet(({ colors }) => ({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.bodyTri,
    borderColor: colors.textPri,
    borderBottomWidth: 1,
    height: 60,
  },
  indexContainer: {
    height: '100%',
    width: '18%',
    borderColor: colors.textPri,
    borderRightWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  index: {
    fontSize: 25,
    color: colors.textPri,
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
  },
  username: {
    marginLeft: 10,
    fontSize: 19,
    color: colors.textPri,
  },
  winsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 20,
  },
  wins: {
    fontSize: 16,
    color: colors.textPri,
    marginRight: 5,
  },
}));
