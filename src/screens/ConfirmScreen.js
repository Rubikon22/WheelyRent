import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants/theme';
import { BtnPrimary } from '../components/Btn';
import Screen from '../components/Screen';

function ConfirmLayout({ navigation, success }) {
  return (
    <Screen style={s.center}>
      <Text style={s.title}>Potwierdzenie{'\n'}rezerwacji</Text>

      <Text style={s.msg}>
        {success
          ? 'Rezerwacja na wynajem samochodu\nzostała pomyślnie potwierdzona.'
          : 'Nie udało się dokonać rezerwacji.\nWypróbuj inną metodę płatności!'}
      </Text>

      <Text style={s.msg}>
        Jeżeli masz problem, skontaktuj się z{'\n'}nami!{'\n'}Telefon: +48 123 456 789
      </Text>

      <View style={{ flex: 1 }} />

      <BtnPrimary title="Home" onPress={() => navigation.popToTop()} style={{ marginBottom: 6, alignSelf: 'stretch' }} />
    </Screen>
  );
}

export function ConfirmSuccessScreen({ navigation }) {
  return <ConfirmLayout navigation={navigation} success />;
}

export function ConfirmFailScreen({ navigation }) {
  return <ConfirmLayout navigation={navigation} success={false} />;
}

const s = StyleSheet.create({
  center: { alignItems: 'center', paddingTop: 80 },
  title: { color: COLORS.text, fontWeight: '800', fontSize: 22, textAlign: 'center', lineHeight: 26 },
  msg: { color: COLORS.text, fontWeight: '700', fontSize: 13, textAlign: 'center', marginTop: 30, lineHeight: 19 },
});
