import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { COLORS } from '../constants/theme';
import { BtnPrimary } from '../components/Btn';
import Screen from '../components/Screen';

export default function RegisterScreen({ navigation }) {
  const [agreed, setAgreed] = useState(false);

  return (
    <Screen>
      <ScrollView contentContainerStyle={s.scroll} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <Text style={s.brand}>WheelyRent</Text>
        <Text style={s.title}>Załóż konto</Text>

        <View style={s.form}>
          <TextInput style={s.input} placeholder="Imię i nazwisko" placeholderTextColor={COLORS.textMute} />
          <TextInput style={s.input} placeholder="Email" placeholderTextColor={COLORS.textMute} keyboardType="email-address" autoCapitalize="none" />
          <TextInput style={s.input} placeholder="Numer telefonu" placeholderTextColor={COLORS.textMute} keyboardType="phone-pad" />
          <TextInput style={s.input} placeholder="Hasło" placeholderTextColor={COLORS.textMute} secureTextEntry />
        </View>

        <TouchableOpacity style={s.checkRow} onPress={() => setAgreed(!agreed)}>
          <View style={[s.dot, !agreed && s.dotEmpty]} />
          <Text style={s.checkText}>Akceptuję warunki i politykę{'\n'}prywatności</Text>
        </TouchableOpacity>

        <BtnPrimary title="Zarejestruj się" onPress={() => navigation.replace('Main')} style={{ marginTop: 22 }} />
      </ScrollView>
    </Screen>
  );
}

const s = StyleSheet.create({
  scroll: { alignItems: 'center', paddingTop: 20, paddingBottom: 30 },
  brand: { color: COLORS.text, fontWeight: '800', fontSize: 19 },
  title: { color: COLORS.text, fontWeight: '800', fontSize: 20, marginTop: 22 },
  form: { width: '100%', marginTop: 18, gap: 9 },
  input: {
    backgroundColor: COLORS.bgCard, borderWidth: 1, borderColor: COLORS.border, borderRadius: 10,
    padding: 12, paddingHorizontal: 14, color: COLORS.text, fontSize: 14, fontWeight: '600',
  },
  checkRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, marginTop: 18, alignSelf: 'flex-start' },
  dot: { width: 16, height: 16, borderRadius: 8, backgroundColor: '#fff', marginTop: 2 },
  dotEmpty: { backgroundColor: 'transparent', borderWidth: 1.5, borderColor: '#fff' },
  checkText: { color: COLORS.text, fontSize: 13, fontWeight: '700', lineHeight: 18 },
});
