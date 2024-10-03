/* eslint-disable @typescript-eslint/no-var-requires */
import { Audio } from 'expo-av';
import { useEffect, useRef } from 'react';

export const useSoundsFromGame = () => {
  const sounds = useRef<Partial<Record<'capture', Audio.Sound>>>({}).current;

  // Carrega os sons se eles não estiverem carregados
  const loadSoundsIfUndefined = async () => {
    if (sounds.capture?._loaded) return;

    sounds.capture = (await Audio.Sound.createAsync(require('@/assets/pou-comendo.mp3'))).sound;
    // sounds.movement = (await Audio.Sound.createAsync(require('@/assets/nha-pou.mp3'))).sound;
  };

  // Limpa os sons quando o componente for desmontado
  useEffect(() => {
    loadSoundsIfUndefined();

    return () => {
      // sounds.movement?.unloadAsync();
      sounds.capture?.unloadAsync();
    };
  }, []);

  // Retorna a função que toca o som
  return async (playSound: 'capture') => {
    await loadSoundsIfUndefined();

    return sounds[playSound]!.replayAsync();
  };
};
