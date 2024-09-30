import React from 'react';
import { View } from 'react-native';
import { UserCircle2 } from 'lucide-react-native';
import { Image } from 'expo-image';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

interface AvatarProps {
  url?: string | null;
  size: number;
}

export default function Avatar({ url, size }: AvatarProps) {
  const { styles, theme } = useStyles(stylesPaia);

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      {url ? (
        <Image source={{ uri: url }} style={styles.image(size)} />
      ) : (
        <UserCircle2 size={size} color={theme.colors.textPri} />
      )}
    </View>
  );
}

const stylesPaia = createStyleSheet(() => ({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: (size: number) => ({
    width: size,
    height: size,
    borderRadius: size / 2,
  }),
}));
