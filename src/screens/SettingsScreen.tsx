import React, { useState } from 'react';
import { View, Text, ScrollView, Switch, TouchableOpacity, StyleSheet } from 'react-native';
import Header from '../components/Header';
import { C, common } from '../theme';

const langs = ['English', 'Русский', 'Қазақша'];

export default function SettingsScreen({ back }: { back: () => void }) {
  const [push, setPush] = useState(true);
  const [sound, setSound] = useState(true);
  const [offers, setOffers] = useState(false);
  const [location, setLocation] = useState(true);
  const [lang, setLang] = useState('English');

  const rows: [string, boolean, (v: boolean) => void][] = [
    ['🔔 Push notifications', push, setPush],
    ['🔊 Sounds', sound, setSound],
    ['🎁 Offers and discounts', offers, setOffers],
    ['📍 Use my location', location, setLocation],
  ];

  return (
    <View style={{ flex: 1, backgroundColor: C.white }}>
      <Header title="Settings" onBack={back} />
      <ScrollView contentContainerStyle={{ padding: 24, paddingTop: 8 }}>
        <View style={s.card}>
          {rows.map(([t, v, set]) => (
            <View key={t} style={s.row}>
              <Text style={{ flex: 1, color: C.text }}>{t}</Text>
              <Switch value={v} onValueChange={set} trackColor={{ true: C.orange, false: '#D5DAE1' }} thumbColor={C.white} />
            </View>
          ))}
        </View>

        <Text style={[common.label, { marginTop: 8 }]}>LANGUAGE</Text>
        <View style={{ flexDirection: 'row', gap: 10, marginBottom: 24 }}>
          {langs.map((l) => (
            <TouchableOpacity key={l} onPress={() => setLang(l)} style={[s.chip, lang === l && { backgroundColor: C.orange, borderColor: C.orange }]}>
              <Text style={{ color: lang === l ? C.white : C.text }}>{l}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={s.card}>
          <View style={s.row}>
            <Text style={{ flex: 1, color: C.text }}>ℹ️ App version</Text>
            <Text style={common.small}>1.0.0</Text>
          </View>
          <View style={s.row}>
            <Text style={{ flex: 1, color: C.text }}>🍔 Foodup</Text>
            <Text style={common.small}>Fast food delivery</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  card: { backgroundColor: '#F6F8FA', borderRadius: 16, paddingHorizontal: 16, marginBottom: 16 },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14 },
  chip: { borderWidth: 1, borderColor: '#EDEDED', borderRadius: 30, paddingHorizontal: 18, paddingVertical: 10 },
});