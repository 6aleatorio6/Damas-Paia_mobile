import { useGetUserMatches } from '@/libs/apiHooks/querys';
import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { ActivityIndicator } from 'react-native';
import { RefreshCw } from 'lucide-react-native';
import MatchItem from './MatchItem';

export function UserMatches() {
  const { styles } = useStyles(stylesPaia);
  const { data, isLoading, isError, refetch } = useGetUserMatches({});

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.errorText}>Erro ao carregar partidas.</Text>
        <TouchableOpacity onPress={() => refetch()} style={styles.iconButton}>
          <RefreshCw color="#000" size={24} />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.flatList}>
      <FlatList data={data} renderItem={(i) => <MatchItem {...i} />} keyExtractor={(item) => item.uuid} />
    </View>
  );
}

const stylesPaia = createStyleSheet((theme) => ({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: theme.colors.danger,
  },
  flatList: {
    flex: 0.8,
    marginBottom: '10%',
    backgroundColor: theme.colors.bodySec,
    borderRadius: 20, // Adicione bordas arredondadas
    padding: 10,
    overflow: 'hidden',
  },
  iconButton: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
}));
