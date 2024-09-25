import { useGetUserMatches } from '@/libs/apiHooks/querys';
import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { ActivityIndicator } from 'react-native';
import { RefreshCw, AlertTriangle } from 'lucide-react-native';
import MatchItem from './MatchItem';

export function UserMatches() {
  const { styles, theme } = useStyles(stylesPaia);
  const { data, isLoading, isError, refetch } = useGetUserMatches({});

  if (isLoading) {
    return (
      <View style={styles.container(true)}>
        <ActivityIndicator size="large" color={theme.colors.warning} />
        <Text style={styles.loadingText}>Carregando partidas...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.container(true)}>
        <View style={styles.errorContainer}>
          <AlertTriangle color={theme.colors.danger} size={24} />
          <Text style={styles.errorText}>Erro ao carregar partidas.</Text>
          <AlertTriangle color={theme.colors.danger} size={24} />
        </View>
        <TouchableOpacity onPress={() => refetch()} style={styles.iconButton}>
          <RefreshCw color={theme.colors.warning} size={30} />
        </TouchableOpacity>
      </View>
    );
  }

  if (!data || data.length === 0) {
    return (
      <View style={styles.container(true)}>
        <Text style={styles.noMatchesText}>
          Ainda não há partidas finalizadas. Comece a jogar e registre suas vitórias!
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container()}>
      <FlatList data={data} renderItem={(i) => <MatchItem key={i.item.uuid} {...i} />} />
    </View>
  );
}

const stylesPaia = createStyleSheet((theme) => ({
  loadingText: {
    marginTop: 10,
    color: theme.colors.textSec,
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  errorText: {
    color: theme.colors.danger,
    marginLeft: 10,
    fontWeight: 'bold',
    fontSize: 16,
    marginHorizontal: 10,
  },
  noMatchesText: {
    color: theme.colors.textPri,
    textAlign: 'center',
  },
  container: (centered = false) => ({
    flex: 0.8,
    marginBottom: '10%',
    backgroundColor: theme.colors.bodySec,
    borderRadius: 20,
    padding: 10,
    overflow: 'hidden',
    justifyContent: centered ? 'center' : undefined,
    alignItems: centered ? 'center' : undefined,
  }),
  iconButton: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
}));
