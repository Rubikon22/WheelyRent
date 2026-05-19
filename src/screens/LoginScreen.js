import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { COLORS } from '../constants/theme';
import WheelyLogo from '../components/WheelyLogo';
import { BtnPrimary } from '../components/Btn';
import Screen from '../components/Screen';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Screen>
      <ScrollView contentContainerStyle={s.scroll} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <View style={s.top}>
          <WheelyLogo size={70} />
          <Text style={s.brand}>WheelyRent</Text>
        </View>

        <Text style={s.title}>Zaloguj się</Text>

        <View style={s.form}>
          <TextInput style={s.input} placeholder="Email" placeholderTextColor={COLORS.textMute} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
          <TextInput style={s.input} placeholder="Hasło" placeholderTextColor={COLORS.textMute} value={password} onChangeText={setPassword} secureTextEntry />
        </View>

        <BtnPrimary title="Zaloguj się" onPress={() => navigation.replace('Main')} style={{ marginTop: 18 }} />

        <TouchableOpacity onPress={() => navigation.navigate('Register')} style={{ marginTop: 10, alignSelf: 'center' }}>
          <Text style={s.link}>
            Nie masz konta? <Text style={{ color: '#fff' }}>Zarejestruj się</Text>
          </Text>
        </TouchableOpacity>

        <View style={s.socials}>
          {['G', 'f', ''].map((l, i) => (
            <View key={i} style={s.socialBtn}>
              <Text style={[s.socialText, { color: i === 0 ? '#4285f4' : i === 1 ? '#1877f2' : '#000' }]}>
                {i === 0 ? 'G' : i === 1 ? 'f' : '\u{F8FF}'}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </Screen>
  );
}

const s = StyleSheet.create({
  scroll: { alignItems: 'center', paddingTop: 20, paddingBottom: 30 },
  top: { alignItems: 'center' },
  brand: { color: COLORS.text, fontWeight: '800', fontSize: 18, marginTop: 4 },
  title: { color: COLORS.text, fontWeight: '800', fontSize: 20, marginTop: 30, textAlign: 'center' },
  form: { width: '100%', marginTop: 22, gap: 10 },
  input: {
    backgroundColor: COLORS.bgCard,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    padding: 12,
    paddingHorizontal: 14,
    color: COLORS.text,
    fontSize: 14,
    fontWeight: '600',
  },
  link: { color: COLORS.textMute, fontSize: 12, fontWeight: '600' },
  socials: { flexDirection: 'row', gap: 14, marginTop: 22 },
  socialBtn: {
    width: 36, height: 36, borderRadius: 18, backgroundColor: '#fff',
    alignItems: 'center', justifyContent: 'center',
  },
  socialText: { fontWeight: '800', fontSize: 16 },
});
