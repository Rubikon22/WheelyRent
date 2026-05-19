import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { COLORS } from '../constants/theme';
import { CARS, EXTRA_OPTION_PRICE } from '../constants/cars';
import CarPlaceholder from '../components/CarPlaceholder';
import { BtnPrimary } from '../components/Btn';
import Screen from '../components/Screen';

export default function SummaryScreen({ route, navigation }) {
  const car = CARS.find(c => c.id === route.params.carId);
  if (!car) return null;

  const extras = route.params.extras || '—';
  const extrasCount = route.params.extrasCount || 0;
  const [days, setDays] = useState(1);

  const carCost = car.price * days;
  const extrasCost = extrasCount * EXTRA_OPTION_PRICE * days;
  const total = carCost + extrasCost;

  return (
    <Screen>
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        <Text style={s.title}>Podsumowanie zamówienia</Text>
        <CarPlaceholder kind={car.id} style={s.heroImg} />

        <View style={s.details}>
          <Text style={s.line}>Samochód: {car.short}</Text>
          <Text style={s.line}>Cena: {car.price} zł/dzień</Text>
          <Text style={s.line}>Miasto: Warszawa</Text>
          <Text style={s.line}>Opcje dodatkowe: <Text style={{ color: COLORS.textDim }}>{extras}</Text></Text>
          {extrasCount > 0 && (
            <Text style={s.lineSmall}>{extrasCount} × {EXTRA_OPTION_PRICE} zł/dzień = +{extrasCount * EXTRA_OPTION_PRICE} zł/dzień</Text>
          )}
        </View>

        <Text style={s.daysLabel}>Czas wynajmu (dni)</Text>
        <View style={s.daysRow}>
          <TouchableOpacity style={s.daysBtn} onPress={() => setDays(d => Math.max(1, d - 1))}>
            <Text style={s.daysBtnText}>−</Text>
          </TouchableOpacity>
          <View style={s.daysDisplay}>
            <Text style={s.daysValue}>{days}</Text>
          </View>
          <TouchableOpacity style={s.daysBtn} onPress={() => setDays(d => Math.min(30, d + 1))}>
            <Text style={s.daysBtnText}>+</Text>
          </TouchableOpacity>
        </View>
        <View style={s.daysQuick}>
          {[1, 3, 7, 14, 30].map(d => (
            <TouchableOpacity key={d} style={[s.quickBtn, days === d && s.quickBtnActive]} onPress={() => setDays(d)}>
              <Text style={[s.quickText, days === d && s.quickTextActive]}>{d}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={s.breakdown}>
          <View style={s.breakdownRow}>
            <Text style={s.breakdownLabel}>Samochód ({days} dni)</Text>
            <Text style={s.breakdownVal}>{carCost} zł</Text>
          </View>
          {extrasCount > 0 && (
            <View style={s.breakdownRow}>
              <Text style={s.breakdownLabel}>Opcje dodatkowe ({days} dni)</Text>
              <Text style={s.breakdownVal}>{extrasCost} zł</Text>
            </View>
          )}
          <View style={s.divider} />
          <View style={s.breakdownRow}>
            <Text style={s.totalLabel}>Summa</Text>
            <Text style={s.totalVal}>{total} zł</Text>
          </View>
        </View>
      </ScrollView>

      <BtnPrimary title="Zapłać" onPress={() => navigation.navigate('Payment')} style={{ marginBottom: 4 }} />
    </Screen>
  );
}

const s = StyleSheet.create({
  title: { color: COLORS.text, fontWeight: '800', fontSize: 20, textAlign: 'center' },
  heroImg: { height: 110, borderRadius: 12, overflow: 'hidden', marginTop: 12 },
  details: { marginTop: 12, gap: 7 },
  line: { color: COLORS.text, fontWeight: '700', fontSize: 13 },
  lineSmall: { color: COLORS.textMute, fontWeight: '600', fontSize: 11, marginLeft: 4 },

  daysLabel: { color: COLORS.text, fontWeight: '800', fontSize: 14, marginTop: 20 },
  daysRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 16, marginTop: 10 },
  daysBtn: {
    width: 40, height: 40, borderRadius: 20, backgroundColor: COLORS.bgCard,
    borderWidth: 1, borderColor: COLORS.border, alignItems: 'center', justifyContent: 'center',
  },
  daysBtnText: { color: COLORS.text, fontSize: 22, fontWeight: '700', lineHeight: 24 },
  daysDisplay: {
    width: 60, height: 40, borderRadius: 10, backgroundColor: COLORS.bgCard,
    borderWidth: 1, borderColor: COLORS.primary, alignItems: 'center', justifyContent: 'center',
  },
  daysValue: { color: COLORS.text, fontSize: 20, fontWeight: '800' },
  daysQuick: { flexDirection: 'row', justifyContent: 'center', gap: 8, marginTop: 10 },
  quickBtn: {
    paddingVertical: 6, paddingHorizontal: 14, borderRadius: 14,
    backgroundColor: COLORS.bgCard, borderWidth: 1, borderColor: COLORS.border,
  },
  quickBtnActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  quickText: { color: COLORS.textDim, fontWeight: '700', fontSize: 12 },
  quickTextActive: { color: '#fff' },

  breakdown: {
    marginTop: 20, backgroundColor: COLORS.bgCard, borderRadius: 12,
    borderWidth: 1, borderColor: COLORS.border, padding: 14, gap: 8,
  },
  breakdownRow: { flexDirection: 'row', justifyContent: 'space-between' },
  breakdownLabel: { color: COLORS.textDim, fontWeight: '600', fontSize: 13 },
  breakdownVal: { color: COLORS.text, fontWeight: '700', fontSize: 13 },
  divider: { height: 1, backgroundColor: COLORS.border, marginVertical: 4 },
  totalLabel: { color: COLORS.text, fontWeight: '800', fontSize: 15 },
  totalVal: { color: COLORS.primary, fontWeight: '800', fontSize: 18 },
});
