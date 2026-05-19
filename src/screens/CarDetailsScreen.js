import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { COLORS } from '../constants/theme';
import { CARS } from '../constants/cars';
import CarPlaceholder from '../components/CarPlaceholder';
import { BtnPrimary } from '../components/Btn';
import Screen from '../components/Screen';

export default function CarDetailsScreen({ route, navigation }) {
  const car = CARS.find(c => c.id === route.params.carId);
  if (!car) return null;

  return (
    <Screen>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <CarPlaceholder kind={car.id} style={s.heroImg} />
        <Text style={s.name}>{car.name}</Text>

        <View style={s.ratingRow}>
          <Text style={s.ratingText}>★ {car.rating}</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Reviews', { carId: car.id })}>
            <Text style={s.reviewLink}>Wszystkie opinie</Text>
          </TouchableOpacity>
        </View>

        <Text style={s.specTitle}>Specyfikacja</Text>
        <View style={s.specGrid}>
          <View style={s.specRow}>
            <Text style={s.specK}>Nadwozie</Text>
            <Text style={s.specV}>{car.specs.body}  <Text style={{ color: COLORS.textMute }}>{car.specs.fuel}</Text></Text>
          </View>
          <View style={s.specRow}>
            <Text style={s.specK}>Przebieg</Text>
            <Text style={s.specV}>{car.specs.mileage}</Text>
          </View>
          <View style={s.specRow}>
            <Text style={s.specK}>Moc</Text>
            <Text style={s.specV}>{car.specs.power}</Text>
          </View>
        </View>
      </ScrollView>

      <View style={s.footer}>
        <Text style={s.perDay}>Za dzień</Text>
        <Text style={s.bigPrice}>{car.price} zl</Text>
        <BtnPrimary title="Wybierz" onPress={() => navigation.navigate('ExtraOptions', { carId: car.id })} />
      </View>
    </Screen>
  );
}

const s = StyleSheet.create({
  heroImg: { height: 140, borderRadius: 12, overflow: 'hidden', marginBottom: 12 },
  name: { color: COLORS.text, fontWeight: '800', fontSize: 18 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 4 },
  ratingText: { color: COLORS.star, fontWeight: '800', fontSize: 13 },
  reviewLink: { color: COLORS.textMute, fontSize: 11, fontWeight: '700', textDecorationLine: 'underline' },
  specTitle: { color: COLORS.text, fontWeight: '800', fontSize: 14, marginTop: 14 },
  specGrid: { marginTop: 8, gap: 8 },
  specRow: { flexDirection: 'row', justifyContent: 'space-between' },
  specK: { color: COLORS.textMute, fontWeight: '700', fontSize: 12, textTransform: 'capitalize' },
  specV: { color: COLORS.text, fontWeight: '700', fontSize: 12 },
  footer: { paddingBottom: 4 },
  perDay: { color: COLORS.textDim, fontSize: 12, fontWeight: '700' },
  bigPrice: { color: COLORS.text, fontWeight: '800', fontSize: 24, marginTop: 2, marginBottom: 8 },
});
