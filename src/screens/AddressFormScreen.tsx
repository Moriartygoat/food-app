import React, { useEffect, useState } from 'react';
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
const DEFAULT = { lat: 43.238949, lng: 76.889709 }; // Алматы

export default function AddressFormScreen({ back, initial, onSave }: Props) {
  const [text, setText] = useState(initial?.text ?? '');
  const [street, setStreet] = useState(initial?.street ?? '');
  const [post, setPost] = useState(initial?.post ?? '');
  const [apt, setApt] = useState(initial?.apt ?? '');
  const [label, setLabel] = useState<Address['label']>(initial?.label ?? 'Home');
  const [pin, setPin] = useState({ lat: initial?.lat ?? DEFAULT.lat, lng: initial?.lng ?? DEFAULT.lng });
  const [mapKey, setMapKey] = useState(0);
  const [ip, setIp] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  // координаты -> адрес (OpenStreetMap Nominatim, без ключа)
  const reverse = async (lat: number, lng: number) => {
    setLoading(true);
    setMsg('');
    try {
      const r = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&addressdetails=1&lat=${lat}&lon=${lng}`,
        { headers: { 'Accept-Language': 'ru,en' } }
      );
      const d = await r.json();
      const a = d.address || {};
      const line = [a.road || a.pedestrian || a.suburb || '', a.house_number].filter(Boolean).join(' ');
      const city = a.city || a.town || a.village || a.county || '';
      setStreet(line);
      setPost(a.postcode || '');
      setText(d.display_name || [line, city, a.state, a.country].filter(Boolean).join(', '));
      setMsg('Address found on map');
    } catch (e: any) {
      setMsg('Could not get address: ' + (e?.message ?? 'unknown'));
    }
    setLoading(false);
  };

  const onPick = (lat: number, lng: number) => {
    setPin({ lat, lng });
    reverse(lat, lng);
  };

  const byIp = async () => {
    setLoading(true);
    setMsg('');
    try {
      let lat: number | null = null;
      let lng: number | null = null;
      let place = '';
      let postal = '';
      let ipAddr = '';
      try {
        const d = await (await fetch('https://ipwho.is/')).json();
        if (d.success) {
          lat = d.latitude; lng = d.longitude; ipAddr = d.ip || '';
          place = [d.city, d.region, d.country].filter(Boolean).join(', ');
          postal = d.postal || '';
        }
      } catch {}
      if (lat == null) {
        const d = await (await fetch('https://ipapi.co/json/')).json();
        if (d.latitude) {
          lat = d.latitude; lng = d.longitude; ipAddr = d.ip || '';
          place = [d.city, d.region, d.country_name].filter(Boolean).join(', ');
          postal = d.postal || '';
        }
      }
      if (lat == null || lng == null) {
        setMsg('Could not detect location by IP');
      } else {
        setIp(ipAddr);
        setPin({ lat, lng });
        setMapKey((k) => k + 1); // пересоздать карту уже на новой точке
        setText(place);
        setPost(postal);
        setMsg('Found by IP (approximate, city level). Tap the map to be exact');
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
      setPin({ lat: latitude, lng: longitude });
      setMapKey((k) => k + 1);
      await reverse(latitude, longitude);
      return;
    } catch (e: any) {
      setMsg('GPS error: ' + (e?.message ?? 'unknown'));
    }
    setLoading(false);
  };

  // новый адрес: сразу определяем место по IP и показываем на карте
  useEffect(() => {
    if (!initial) byIp();
  }, []);

  const save = () =>
    onSave({
      id: initial?.id ?? Date.now(),
      label,
      text: text.trim() || 'No address',
      street,
      post,
      apt,
      lat: pin.lat,
      lng: pin.lng,
    });

  return (
    <View style={{ flex: 1, backgroundColor: C.white }}>
      <Header title={initial ? 'Edit Address' : 'Add Address'} onBack={back} />
      <ScrollView contentContainerStyle={{ padding: 24, paddingTop: 8 }} keyboardShouldPersistTaps="handled">
        <Text style={[common.meta, { marginBottom: 8 }]}>
          🌐 Your IP: {ip || (loading ? 'detecting...' : 'unknown')}
        </Text>

        <MapView key={mapKey} lat={pin.lat} lng={pin.lng} onPick={onPick} />
        <Text style={[common.small, { marginTop: 6, textAlign: 'center' }]}>Tap the map to set delivery point</Text>

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
        <Field label="APARTMENT" value={apt} onChangeText={setApt} />

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