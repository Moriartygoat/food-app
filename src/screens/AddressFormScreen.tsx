import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import Header from '../components/Header';
import Field from '../components/Field';
import Btn from '../components/Btn';
import MapView from '../components/MapView';
import { C, common } from '../theme';
import { Address } from '../types';

type Props = { back: () => void; initial: Address | null; onSave: (a: Address) => void };

const labels: Address['label'][] = ['Home', 'Work', 'Other'];

export default function AddressFormScreen({ back, initial, onSave }: Props) {
  const [text, setText] = useState(initial?.text ?? '');
  const [street, setStreet] = useState(initial?.street ?? '');
  const [post, setPost] = useState(initial?.post ?? '');
  const [apt, setApt] = useState(initial?.apt ?? '');
  const [label, setLabel] = useState<Address['label']>(initial?.label ?? 'Home');
  const [pin, setPin] = useState({ x: 0.5, y: 0.5 });
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const byIp = async () => {
    setLoading(true);
    setMsg('');
    try {
      const r = await fetch('https://ipwho.is/');
      const d = await r.json();
      if (d.success) {
        setText(`${d.city}, ${d.region}, ${d.country}`);
        setPost(d.postal || '');
        setMsg('Found by IP (approximate, city level)');
      } else {
        setMsg('Could not detect location by IP');
      }
    } catch (e: any) {
      setMsg('IP error: ' + (e?.message ?? 'unknown'));
    }
    setLoading(false);
  };

  const byGps = async () => {
    setLoading(true);
    setMsg('');
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setMsg('Location permission denied');
        setLoading(false);
        return;
      }
      const pos = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = pos.coords;
      const res = await Location.reverseGeocodeAsync({ latitude, longitude });
      const a = res[0];
      if (a) {
        setText([a.street, a.city, a.region, a.country].filter(Boolean).join(', '));
        setStreet(a.street || '');
        setPost(a.postalCode || '');
        setMsg('Found by GPS');
      } else {
        setText(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
        setMsg('Found coordinates only');
      }
    } catch (e: any) {
      setMsg('GPS error: ' + (e?.message ?? 'unknown'));
    }
    setLoading(false);
  };

  const save = () =>
    onSave({
      id: initial?.id ?? Date.now(),
      label,
      text: text.trim() || 'No address',
      street,
      post,
      apt,
    });

  return (
    <View style={{ flex: 1, backgroundColor: C.white }}>
      <Header title={initial ? 'Edit Address' : 'Add Address'} onBack={back} />
      <ScrollView contentContainerStyle={{ padding: 24, paddingTop: 8 }} keyboardShouldPersistTaps="handled">
        <MapView pin={pin} onPick={(x, y) => setPin({ x, y })} />
        <Text style={[common.small, { marginTop: 6, textAlign: 'center' }]}>Tap the map to move the pin</Text>

        <View style={{ flexDirection: 'row', gap: 10, marginVertical: 14 }}>
          <TouchableOpacity style={s.detect} onPress={byIp}>
            <Text style={s.detectText}>🌐 By IP</Text>
          </TouchableOpacity>
          <TouchableOpacity style={s.detect} onPress={byGps}>
            <Text style={s.detectText}>📡 My GPS</Text>
          </TouchableOpacity>
        </View>
        {(loading || msg !== '') && (
          <Text style={[common.small, { marginBottom: 12 }]}>{loading ? 'Searching...' : msg}</Text>
        )}

        <Field label="ADDRESS" value={text} onChangeText={setText} placeholder="Your address" />
        <View style={{ flexDirection: 'row', gap: 12 }}>
          <View style={{ flex: 1 }}>
            <Field label="STREET" value={street} onChangeText={setStreet} />
          </View>
          <View style={{ flex: 1 }}>
            <Field label="POST CODE" value={post} onChangeText={setPost} keyboardType="number-pad" />
          </View>
        </View>
        <Field label="APPARTMENT" value={apt} onChangeText={setApt} />

        <Text style={common.label}>LABEL AS</Text>
        <View style={{ flexDirection: 'row', gap: 10, marginBottom: 24 }}>
          {labels.map((l) => (
            <TouchableOpacity key={l} onPress={() => setLabel(l)} style={[s.chip, label === l && { backgroundColor: C.orange, borderColor: C.orange }]}>
              <Text style={{ color: label === l ? C.white : C.text }}>{l}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Btn title="SAVE LOCATION" onPress={save} />
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  detect: { flex: 1, height: 44, borderRadius: 10, borderWidth: 1, borderColor: C.orange, alignItems: 'center', justifyContent: 'center' },
  detectText: { color: C.orange, fontWeight: '700' },
  chip: { borderWidth: 1, borderColor: '#EDEDED', borderRadius: 30, paddingHorizontal: 20, paddingVertical: 10 },
});
