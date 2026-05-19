import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants/theme';
import WheelyLogo from '../components/WheelyLogo';
import Screen from '../components/Screen';

export default function WelcomeScreen({ navigation }) {
  useEffect(() => {
    const t = setTimeout(() => navigation.replace('Login'), 2500);
    return () => clearTimeout(t);
  }, [navigation]);

  return (
    <Screen style={s.center}>
      <WheelyLogo size={150} />
      <Text style={s.brand}>WheelyRent</Text>
    </Screen>
  );
}

const s = StyleSheet.create({
  center: { alignItems: 'center', justifyContent: 'center' },
  brand: { color: COLORS.text, fontWeight: '800', fontSize: 22, marginTop: 26 },
});
