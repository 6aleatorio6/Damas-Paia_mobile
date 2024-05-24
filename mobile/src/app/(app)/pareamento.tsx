import ButtonForm from '@/components/ButtonForm';
import React from 'react';
import { View, Alert } from 'react-native';

export default function Pareamento() {
  const handleButtonPress = () => {
    Alert.alert('Paia');
  };

  return (
    <View>
      <ButtonForm onPress={handleButtonPress} className="nativeWind">
        Click me
      </ButtonForm>
    </View>
  );
}
