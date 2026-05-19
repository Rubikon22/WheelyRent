import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { COLORS } from '../constants/theme';
import { BtnPrimary } from '../components/Btn';
import Screen from '../components/Screen';

const MARKERS = [
  { lat: 52.2350, lng: 21.0000, title: 'Ford Mustang, 2024 — 350zł/dzień' },
  { lat: 52.2220, lng: 21.0180, title: 'Audi Q5 Sportback, 2021 — 230zł/dzień' },
  { lat: 52.2380, lng: 21.0250, title: 'Suzuki Ertiga XL7, 2020 — 180zł/dzień' },
  { lat: 52.2270, lng: 20.9950, title: 'BMW 320i, 2023 — 290zł/dzień' },
  { lat: 52.2190, lng: 21.0300, title: 'Toyota Corolla, 2022 — 200zł/dzień' },
  { lat: 52.2410, lng: 21.0080, title: 'Mercedes C200, 2023 — 320zł/dzień' },
  { lat: 52.2150, lng: 21.0050, title: 'Volkswagen Golf, 2021 — 170zł/dzień' },
];

const mapHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
  <style>
    * { margin: 0; padding: 0; }
    #map { width: 100vw; height: 100vh; }
  </style>
</head>
<body>
  <div id="map"></div>
  <script>
    var map = L.map('map', { zoomControl: false }).setView([52.2297, 21.0122], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap'
    }).addTo(map);

    var icon = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
    });

    var markers = ${JSON.stringify(MARKERS)};
    markers.forEach(function(m) {
      L.marker([m.lat, m.lng], { icon: icon }).addTo(map).bindPopup(m.title);
    });
  </script>
</body>
</html>
`;

export default function MapScreen({ navigation }) {
  return (
    <Screen>
      <Text style={s.title}>Zobacz auta obok ciebie</Text>

      <View style={s.mapWrap}>
        <WebView
          source={{ html: mapHtml }}
          style={{ flex: 1 }}
          javaScriptEnabled
          domStorageEnabled
          originWhitelist={['*']}
          scrollEnabled={false}
        />
      </View>

      <BtnPrimary title="Home" onPress={() => navigation.navigate('HomeTab')} style={{ marginTop: 14 }} />
    </Screen>
  );
}

const s = StyleSheet.create({
  title: { color: COLORS.text, fontWeight: '800', fontSize: 22, textAlign: 'center' },
  mapWrap: {
    flex: 1, marginTop: 22, borderRadius: 12, overflow: 'hidden',
    borderWidth: 1, borderColor: COLORS.border,
  },
});
