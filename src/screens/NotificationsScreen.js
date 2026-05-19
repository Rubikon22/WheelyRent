import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../constants/theme';
import { BtnPrimary } from '../components/Btn';
import Screen from '../components/Screen';

const ROWS = [
  { t: 'Promocje', s: 'Otrzymuj oferty specjalne' },
  { t: 'Aktualności', s: 'Informacje o nowościach' },
  { t: 'Transakcje', s: 'Potwierdzenia zakupu' },
];

export default function NotificationsScreen({ navigation }) {
  const [toggled, setToggled] = useState({});

  return (
    <Screen>
      <Text style={st.title}>Wiadomości</Text>

      <View style={{ marginTop: 18, gap: 12 }}>
        {ROWS.map(r => (
          <TouchableOpacity
            key={r.t}
            style={st.card}
            activeOpacity={0.8}
            onPress={() => setToggled(p => ({ ...p, [r.t]: !p[r.t] }))}
          >
            <View style={{ flex: 1 }}>
              <Text style={st.cardTitle}>{r.t}</Text>
              <Text style={st.cardSub}>{r.s}</Text>
            </View>
            <View style={[st.dot, !toggled[r.t] && st.dotEmpty]} />
          </TouchableOpacity>
        ))}
      </View>

      <View style={{ flex: 1 }} />
      <BtnPrimary title="Wstecz" onPress={() => navigation.goBack()} />
    </Screen>
  );
}

const st = StyleSheet.create({
  title: { color: COLORS.text, fontWeight: '800', fontSize: 20, textAlign: 'center' },
  card: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: COLORS.bgCard, borderWidth: 1, borderColor: COLORS.border, borderRadius: 12, padding: 12,
  },
  cardTitle: { color: COLORS.text, fontWeight: '800', fontSize: 13 },
  cardSub: { color: COLORS.textDim, fontSize: 11, fontWeight: '600', marginTop: 2 },
  dot: { width: 16, height: 16, borderRadius: 8, backgroundColor: '#fff' },
  dotEmpty: { backgroundColor: 'transparent', borderWidth: 1.5, borderColor: '#fff' },
});
