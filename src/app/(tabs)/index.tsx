import React from 'react';
import { View, FlatList } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { useGetRanking } from '@/libs/apiHooks/querys';
import TopRank from '@/components/rank/TopRank';
import RankItem from '@/components/rank/RankItem';

export default function Ranking() {
  const { styles } = useStyles(stylesheet);
  const { data = [] } = useGetRanking({});

  return (
    <View style={styles.container}>
      <View style={styles.trophiesContainer}>
        <TopRank position="2" data={data[1]} />
        <TopRank position="1" data={data[0]} />
        <TopRank position="3" data={data[2]} />
      </View>
      <View style={styles.line} />
      <FlatList data={data.slice(3)} renderItem={(i) => <RankItem {...i} />} style={styles.list} />
    </View>
  );
}

const stylesheet = createStyleSheet(({ colors }) => ({
  container: {
    flex: 1,
    width: '90%',
    marginHorizontal: 'auto',
    marginTop: 20,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  trophiesContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  line: {
    width: '100%',
    height: 5,
    backgroundColor: colors.textSec,
  },
  list: {
    flex: 1,
    width: '100%',
    backgroundColor: colors.bodySec,
  },
}));
