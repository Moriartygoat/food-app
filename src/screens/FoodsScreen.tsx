import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import Round from '../components/Round';
import { categories, foods, restaurants } from '../data';
import type { Food } from '../data';
import { C, TOP, common } from '../theme';

type Props = {
  back: () => void;
  go: (screen: string) => void;
  onFood: (f: Food) => void;
  onAdd: (f: Food) => void;
};

export default function FoodsScreen({ back, go, onFood, onAdd }: Props) {
  const [cat, setCat] = useState('All');
  const list = cat === 'All' ? foods : foods.filter((f) => f.cat === cat);

  return (
    <View style={{ flex: 1, backgroundColor: C.white }}>
      <ScrollView contentContainerStyle={{ paddingTop: TOP, paddingHorizontal: 24, paddingBottom: 32 }}>
        <View style={common.rowBetween}>
          <Round onPress={back}>‹</Round>
          <View style={s.pill}>
            <Text style={s.pillText}>{cat.toUpperCase()} ▾</Text>
          </View>
          <Round dark onPress={() => go('search')}>🔍</Round>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 18 }}>
          {['All', ...categories.map((c) => c.n)].map((n) => (
            <TouchableOpacity key={n} onPress={() => setCat(n)} style={[s.chip, cat === n && { backgroundColor: C.orange, borderColor: C.orange }]}>
              <Text style={{ color: cat === n ? C.white : C.text }}>{n}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={[common.h2, { marginTop: 22, marginBottom: 14 }]}>
          Popular {cat === 'All' ? 'Foods' : cat + 's'}
        </Text>
        <View style={s.grid}>
          {list.map((f) => (
            <TouchableOpacity key={f.id} style={s.card} onPress={() => onFood(f)}>
              <View style={s.cardImg}>
                <Text style={{ fontSize: 56 }}>{f.e}</Text>
              </View>
              <Text style={{ fontWeight: '800', color: C.text, marginTop: 8 }} numberOfLines={1}>{f.name}</Text>
              <Text style={common.small} numberOfLines={1}>{f.place}</Text>
              <View style={[common.rowBetween, { marginTop: 8 }]}>
                <Text style={{ fontSize: 16, fontWeight: '800', color: C.text }}>${f.price}</Text>
                <TouchableOpacity style={s.plus} onPress={() => onAdd(f)}>
                  <Text style={{ color: C.white, fontWeight: '800' }}>+</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={[common.h2, { marginTop: 24, marginBottom: 6 }]}>Open Restaurants</Text>
        {restaurants.map((r) => (
          <View key={r.n} style={{ marginTop: 14 }}>
            <View style={s.restImg}>
              <Text style={{ fontSize: 60 }}>{r.e}</Text>
            </View>
            <Text style={{ fontSize: 16, marginTop: 8, color: C.text }}>{r.n}</Text>
            <Text style={[common.small, { marginTop: 2 }]}>⭐ 4.7   🚚 Free   🕒 20 min</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  pill: { borderWidth: 1, borderColor: '#EDEDED', borderRadius: 30, paddingHorizontal: 16, paddingVertical: 8 },
  pillText: { color: C.orange, fontSize: 12, fontWeight: '800' },
  chip: { borderWidth: 1, borderColor: '#EDEDED', borderRadius: 30, paddingHorizontal: 18, paddingVertical: 10, marginRight: 10 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  card: { width: '48%', backgroundColor: C.white, borderRadius: 20, padding: 12, marginBottom: 16, elevation: 4, shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 12, shadowOffset: { width: 0, height: 4 } },
  cardImg: { height: 100, borderRadius: 14, backgroundColor: '#FFF3E8', alignItems: 'center', justifyContent: 'center' },
  plus: { width: 28, height: 28, borderRadius: 14, backgroundColor: C.orange, alignItems: 'center', justifyContent: 'center' },
  restImg: { height: 130, borderRadius: 14, backgroundColor: '#F4EDE4', alignItems: 'center', justifyContent: 'center' },
});