import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import Header from '../components/Header';
import { C, common } from '../theme';
import { NavProps } from '../types';

type Order = { id: string; kind: string; name: string; price: string; items: number; e: string; date?: string; status?: string };

const ongoingStart: Order[] = [
  { id: '#162432', kind: 'Food', name: 'Pizza Hut', price: '$35.25', items: 3, e: '🍕' },
  { id: '#242432', kind: 'Drink', name: 'McDonald', price: '$40.15', items: 2, e: '🍔' },
  { id: '#240112', kind: 'Drink', name: 'Starbucks', price: '$10.20', items: 1, e: '☕' },
];
const history: Order[] = [
  { id: '#162432', kind: 'Food', name: 'Pizza Hut', price: '$35.25', items: 3, e: '🍕', date: '29 JAN, 12:30', status: 'Completed' },
  { id: '#242432', kind: 'Drink', name: 'McDonald', price: '$40.15', items: 2, e: '🍔', date: '30 JAN, 12:30', status: 'Completed' },
  { id: '#240112', kind: 'Drink', name: 'Starbucks', price: '$10.20', items: 1, e: '☕', date: '30 JAN, 12:30', status: 'Canceled' },
];

const OutBtn = ({ title, filled, onPress }: { title: string; filled?: boolean; onPress: () => void }) => (
  <TouchableOpacity onPress={onPress} style={[s.btn, filled && { backgroundColor: C.orange }]}>
    <Text style={{ color: filled ? C.white : C.orange, fontWeight: '800', fontSize: 12 }}>{title}</Text>
  </TouchableOpacity>
);

export default function MyOrdersScreen({ go, back }: NavProps) {
  const [tab, setTab] = useState<'Ongoing' | 'History'>('Ongoing');
  const [ongoing, setOngoing] = useState(ongoingStart);
  const list = tab === 'Ongoing' ? ongoing : history;

  return (
    <View style={{ flex: 1, backgroundColor: C.white }}>
      <Header title="My Orders" onBack={back} />
      <View style={s.tabs}>
        {(['Ongoing', 'History'] as const).map((t) => (
          <TouchableOpacity key={t} style={[s.tab, tab === t && s.tabActive]} onPress={() => setTab(t)}>
            <Text style={{ color: tab === t ? C.orange : C.grey }}>{t}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView contentContainerStyle={{ padding: 24 }}>
        {list.length === 0 && <Text style={[common.small, { textAlign: 'center', marginTop: 40 }]}>No orders</Text>}
        {list.map((o, k) => (
          <View key={o.id + k} style={{ marginBottom: 22 }}>
            <View style={common.rowBetween}>
              <Text style={{ color: C.text }}>{o.kind}</Text>
              {o.status && (
                <Text style={{ color: o.status === 'Completed' ? '#059C6A' : '#FF0000', fontWeight: '700' }}>{o.status}</Text>
              )}
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
              <View style={s.thumb}>
                <Text style={{ fontSize: 30 }}>{o.e}</Text>
              </View>
              <View style={{ flex: 1, marginLeft: 14 }}>
                <View style={common.rowBetween}>
                  <Text style={{ fontWeight: '800', color: C.text }}>{o.name}</Text>
                  <Text style={[common.small, { textDecorationLine: 'underline' }]}>{o.id}</Text>
                </View>
                <Text style={{ color: C.text, marginTop: 4 }}>
                  {o.price}  <Text style={common.small}>• {o.date ? o.date + ' • ' : ''}{String(o.items).padStart(2, '0')} Items</Text>
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', gap: 14 }}>
              {tab === 'Ongoing' ? (
                <>
                  <OutBtn filled title="Track Order" onPress={() => go('track')} />
                  <OutBtn title="Cancel" onPress={() => setOngoing(ongoing.filter((_, j) => j !== k))} />
                </>
              ) : (
                <>
                  <OutBtn title="Rate" onPress={() => go('reviews')} />
                  <OutBtn filled title="Re-Order" onPress={() => go('foods')} />
                </>
              )}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  tabs: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#EEF0F4', marginHorizontal: 24 },
  tab: { flex: 1, alignItems: 'center', paddingVertical: 12 },
  tabActive: { borderBottomWidth: 2, borderBottomColor: C.orange },
  thumb: { width: 64, height: 64, borderRadius: 12, backgroundColor: '#FFF3E8', alignItems: 'center', justifyContent: 'center' },
  btn: { flex: 1, height: 40, borderRadius: 8, borderWidth: 1, borderColor: C.orange, alignItems: 'center', justifyContent: 'center' },
});