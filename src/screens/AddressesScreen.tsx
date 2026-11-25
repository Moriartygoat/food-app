import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import Header from '../components/Header';
import Btn from '../components/Btn';
import { C, common } from '../theme';
import { Address } from '../types';

type Props = {
  back: () => void;
  addresses: Address[];
  selectedId: number | null;
  onSelect: (id: number) => void;
  onEdit: (a: Address) => void;
  onDelete: (id: number) => void;
  onAddNew: () => void;
};

const icons = { Home: '🏠', Work: '💼', Other: '📍' };

export default function AddressesScreen({ back, addresses, selectedId, onSelect, onEdit, onDelete, onAddNew }: Props) {
  return (
    <View style={{ flex: 1, backgroundColor: C.white }}>
      <Header title="My Address" onBack={back} />
      <ScrollView contentContainerStyle={{ padding: 24, paddingTop: 8 }}>
        {addresses.length === 0 && (
          <Text style={[common.small, { textAlign: 'center', marginTop: 40 }]}>No addresses yet</Text>
        )}
        {addresses.map((a) => (
          <TouchableOpacity
            key={a.id}
            activeOpacity={0.8}
            onPress={() => onSelect(a.id)}
            style={[s.card, a.id === selectedId && { borderColor: C.orange }]}
          >
            <Text style={{ fontSize: 22, marginRight: 12 }}>{icons[a.label]}</Text>
            <View style={{ flex: 1 }}>
              <Text style={s.label}>{a.label.toUpperCase()}{a.id === selectedId ? '  ✓ delivery' : ''}</Text>
              <Text style={{ color: C.text, marginTop: 2 }}>{a.text}</Text>
            </View>
            <TouchableOpacity onPress={() => onEdit(a)} style={s.act}>
              <Text>✏️</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onDelete(a.id)} style={s.act}>
              <Text>🗑</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={{ padding: 24 }}>
        <Btn title="ADD NEW ADDRESS" onPress={onAddNew} />
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F0F5FA', borderRadius: 16, padding: 16, marginBottom: 14, borderWidth: 1.5, borderColor: 'transparent' },
  label: { fontSize: 12, fontWeight: '800', color: C.text },
  act: { padding: 6, marginLeft: 4 },
});