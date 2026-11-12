import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import Header from '../components/Header';
import { C, common } from '../theme';
import { NavProps } from '../types';

const groups = [
  [
    { i: '👤', t: 'Personal Info', to: 'personal' },
    { i: '🗺', t: 'Addresses', to: 'addresses' },
  ],
  [
    { i: '📦', t: 'My Orders', to: 'orders' },
    { i: '🛒', t: 'Cart', to: 'cart' },
    { i: '💜', t: 'Favourite', to: 'foods' },
    { i: '🔔', t: 'Notifications', to: 'notifications' },
    { i: '💳', t: 'Payment Method', to: 'payment' },
  ],
  [
    { i: '❓', t: 'FAQs', to: 'faqs' },
    { i: '⭐', t: 'User Reviews', to: 'reviews' },
    { i: '⚙️', t: 'Settings', to: 'settings' },
  ],
  [{ i: '🚪', t: 'Log Out', to: 'login' }],
];

export default function ProfileScreen({ go, back, reset }: NavProps) {
  return (
    <View style={{ flex: 1, backgroundColor: C.white }}>
      <Header title="Profile" onBack={back} />
      <ScrollView contentContainerStyle={{ padding: 24, paddingTop: 8 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 24 }}>
          <View style={s.avatar}>
            <Text style={{ fontSize: 44 }}>🧑</Text>
          </View>
          <View style={{ marginLeft: 20 }}>
            <Text style={s.name}>Vishal Khadok</Text>
            <Text style={common.small}>I love fast food</Text>
          </View>
        </View>

        {groups.map((g, k) => (
          <View key={k} style={s.card}>
            {g.map((r) => (
              <TouchableOpacity
                key={r.t}
                style={s.row}
                onPress={() => (r.to === 'login' ? reset('login') : go(r.to))}
              >
                <Text style={{ fontSize: 18, width: 32 }}>{r.i}</Text>
                <Text style={{ flex: 1, color: C.text }}>{r.t}</Text>
                <Text style={{ color: C.grey, fontSize: 18 }}>›</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  avatar: { width: 90, height: 90, borderRadius: 45, backgroundColor: C.peach, alignItems: 'center', justifyContent: 'center' },
  name: { fontSize: 20, fontWeight: '800', color: C.text, marginBottom: 4 },
  card: { backgroundColor: '#F6F8FA', borderRadius: 16, paddingHorizontal: 16, marginBottom: 16 },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 16 },
});