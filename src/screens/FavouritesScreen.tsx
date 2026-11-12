import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import Header from '../components/Header';
import { foods } from '../data';
import type { Food } from '../data';
import { C, common } from '../theme';

type Props = {
  back: () => void;
  favs: number[];
  onFood: (f: Food) => void;
  onToggle: (id: number) => void;
};

export default function FavouritesScreen({ back, favs, onFood, onToggle }: Props) {
  const list = foods.filter((f) => favs.includes(f.id));

  return (
    <View style={{ flex: 1, backgroundColor: C.white }}>
      <Header title="Favourite" onBack={back} />
      <ScrollView contentContainerStyle={{ padding: 24, paddingTop: 8 }}>
        {list.length === 0 && (
          <View style={{ alignItems: 'center', marginTop: 60 }}>
            <Text style={{ fontSize: 48 }}>🤍</Text>
            <Text style={[common.small, { marginTop: 8, textAlign: 'center' }]}>
              No favourites yet. Open any dish and tap the heart.
            </Text>
          </View>
        )}
        {list.map((f) => (
          <TouchableOpacity key={f.id} style={s.row} onPress={() => onFood(f)}>
            <View style={s.thumb}>
              <Text style={{ fontSize: 36 }}>{f.e}</Text>
            </View>
            <View style={{ flex: 1, marginLeft: 14 }}>
              <Text style={{ fontWeight: '800', color: C.text }}>{f.name}</Text>
              <Text style={common.small}>{f.place}</Text>
              <Text style={{ color: C.text, fontWeight: '800', marginTop: 4 }}>${f.price}</Text>
            </View>
            <TouchableOpacity onPress={() => onToggle(f.id)} style={{ padding: 8 }}>
              <Text style={{ fontSize: 22 }}>❤️</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F6F8FA', borderRadius: 16, padding: 12, marginBottom: 14 },
  thumb: { width: 72, height: 72, borderRadius: 14, backgroundColor: '#FFF3E8', alignItems: 'center', justifyContent: 'center' },
});