import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../constants/theme';
import { EXTRA_OPTION_PRICE } from '../constants/cars';
import { BtnPrimary } from '../components/Btn';
import Screen from '../components/Screen';

const OPTS = ['Dostawa na miescie', 'Fotelik dziecięcy', 'Transport ciężarowy', 'Transport dwumiejscowy'];

export default function ExtraOptionsScreen({ route, navigation }) {
  const { carId } = route.params;
  const [selected, setSelected] = useState({});

  const chosenCount = OPTS.filter(o => selected[o]).length;
  const extrasCost = chosenCount * EXTRA_OPTION_PRICE;

  const handleNext = () => {
    const chosen = OPTS.filter(o => selected[o]);
    navigation.navigate('Summary', {
      carId,
      extras: chosen.length > 0 ? chosen.join(', ') : null,
      extrasCount: chosen.length,
    });
  };

  return (
    <Screen>
      <Text style={s.title}>Opcje dodatkowe</Text>
      <Text style={s.subtitle}>Każda opcja kosztuje {EXTRA_OPTION_PRICE} zł/dzień</Text>

      <View style={{ marginTop: 20, gap: 14 }}>
        {OPTS.map(o => (
          <TouchableOpacity key={o} style={s.row} onPress={() => setSelected(p => ({ ...p, [o]: !p[o] }))}>
            <View style={[s.dot, !selected[o] && s.dotEmpty]} />
            <Text style={s.label}>{o}</Text>
            <Text style={s.price}>+{EXTRA_OPTION_PRICE} zł</Text>
          </TouchableOpacity>
        ))}
      </View>

      {chosenCount > 0 && (
        <Text style={s.totalLine}>Dodatkowe koszty: +{extrasCost} zł/dzień</Text>
      )}

      <View style={{ flex: 1 }} />

      <BtnPrimary title="Dalej" onPress={handleNext} />
      <TouchableOpacity onPress={() => navigation.navigate('Summary', { carId, extras: null, extrasCount: 0 })} style={s.skipBtn}>
        <Text style={s.skipText}>Pomiń</Text>
      </TouchableOpacity>
    </Screen>
  );
}

const s = StyleSheet.create({
  title: { color: COLORS.text, fontWeight: '800', fontSize: 20, textAlign: 'center' },
  subtitle: { color: COLORS.textDim, fontSize: 12, fontWeight: '600', textAlign: 'center', marginTop: 6 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  dot: { width: 16, height: 16, borderRadius: 8, backgroundColor: '#fff' },
  dotEmpty: { backgroundColor: 'transparent', borderWidth: 1.5, borderColor: '#fff' },
  label: { color: COLORS.text, fontWeight: '800', fontSize: 13, flex: 1 },
  price: { color: COLORS.textDim, fontWeight: '700', fontSize: 12 },
  totalLine: { color: COLORS.primary, fontWeight: '800', fontSize: 14, textAlign: 'center', marginTop: 20 },
  skipBtn: { alignItems: 'center', paddingVertical: 10, marginTop: 4 },
  skipText: { color: COLORS.textMute, fontWeight: '700', fontSize: 14 },
});
