import { useMatchSocket } from '@/libs/apiHooks/socketIo/MatchCtx';
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Modal, Animated, Easing } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

const AlertError = () => {
  const { styles } = useStyles(stylesPaia);
  const socket = useMatchSocket();
  const translateY = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(1)).current;
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    socket.on('error', (error) => {
      setError(error.message);
    });

    return () => {
      socket.off('error');
    };
  }, []);

  useEffect(() => {
    if (error) {
      const animation = Animated.parallel([
        Animated.timing(translateY, {
          toValue: -40,
          duration: 700,
          easing: Easing.in(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 700,
          easing: Easing.in(Easing.quad),
          useNativeDriver: true,
        }),
      ]);

      animation.start(() => {
        setError(null);
        translateY.setValue(0);
        opacity.setValue(1);
      });
    }
  }, [error]);

  return (
    <Modal transparent={true} animationType="none" visible={!!error} onRequestClose={() => {}}>
      <View style={styles.centeredView}>
        <Animated.View style={[styles.modalView, { transform: [{ translateY }], opacity }]}>
          <Text style={styles.modalText}>{error?.toUpperCase()}</Text>
        </Animated.View>
      </View>
    </Modal>
  );
};

const stylesPaia = createStyleSheet(({ colors }) => ({
  centeredView: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    paddingVertical: 5,
    paddingHorizontal: 80,
    backgroundColor: colors.danger, // Using colors from the theme
    borderRadius: 5,
    alignItems: 'center',
  },
  modalText: {
    textAlign: 'center',
    color: colors.textPri, // Using colors from the theme
    fontSize: 18, // Increased font size
    fontWeight: 'bold', // Bold font weight
  },
}));

export default AlertError;
