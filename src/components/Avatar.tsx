import React, { useEffect, useMemo, useRef, useState } from 'react';
import { View, Animated } from 'react-native';
import { UserCircle2 } from 'lucide-react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

interface AvatarProps {
  url?: string | null;
  size: number;
}
export default function Avatar({ url, size }: AvatarProps) {
  const { styles, theme } = useStyles(stylesPaia);
  const opacityShow = useRef(new Animated.Value(0)).current;
  const opacityOcult = useRef(new Animated.Value(1)).current;
  const [isFinalized, setIsFinalized] = useState(false);

  const anima = useMemo(() => {
    return Animated.sequence([
      Animated.timing(opacityOcult, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(opacityShow, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
    ]);
  }, []);

  const onloadImage = () => !isFinalized && anima.start(() => setIsFinalized(true));

  useEffect(() => {
    setIsFinalized(false);
    anima.reset();
  }, [url]);

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      {url && (
        <Animated.Image
          onLoad={onloadImage}
          source={{ uri: url }}
          style={[styles.image(size), { opacity: opacityShow }]}
        />
      )}
      <Animated.View style={{ opacity: opacityOcult }}>
        <UserCircle2 size={size} color={theme.colors.textPri} />
      </Animated.View>
    </View>
  );
}

const stylesPaia = createStyleSheet(({ colors }) => ({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  image: (size: number) => ({
    position: 'absolute',
    width: size,
    height: size,
    borderRadius: size / 2,
  }),
}));
