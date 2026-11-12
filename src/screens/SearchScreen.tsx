import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import Round from '../components/Round';
import { foods, restaurants } from '../data';
import type { Food } from '../data';
import { C, TOP, common } from '../theme';

type Props = { back: () => void; go: (screen: string) => void; onFood: (f: Food) => void };

export default function SearchScreen({ back, go, onFood }: Props) {
  const [q, setQ] = useState('');
  const found = restaurants.filter((r) => r.n.toLowerCase().includes(q.toLowerCase()));
  const foodFound = q ? foods.filter((f) => f.name.toLowerCase().includes(q.toLowerCase())) : [];
  const popular = foods.filter((f) => f.cat === 'Pizza').slice(0, 2);

  return (
    <View style={{ flex: 1, backgroundColor: C.white }}>
      <ScrollView contentContainerStyle={{ paddingTop: TOP, paddingHorizontal: 24, paddingBottom: 32 }} keyboardShouldPersistTaps="handled">
        <View style={common.rowBetween}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Round onPress={back}>‹</Round>
            <Text style={{ color: C.text, marginLeft: 14 }}>Search</Text>
          </View>
          <Round dark onPress={() => go('cart')}>🛍</Round>
        </View>

        <View style={s.search}>
          <Text style={{ color: C.grey }}>🔍  </Text>
          <TextInput
            value={q}
            onChangeText={setQ}
            placeholder="Search dishes, restaurants"
            placeholderTextColor={C.grey}
            style={{ flex: 1, color: C.text }}
          />
          {q.length > 0 && (
            <TouchableOpacity onPress={() => setQ('')}>
              <Text style={{ color: C.grey }}>✕</Text>
            </TouchableOpacity>
          )}
        </View>

        <Text style={[common.h2, { marginTop: 22 }]}>Recent Keywords</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 12 }}>
          {['Burger', 'Sandwich', 'Pizza', 'Pasta'].map((k) => (
            <TouchableOpacity key={k} onPress={() => setQ(k)} style={s.chip}>
              <Text style={{ color: C.text }}>{k}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {foodFound.length > 0 && (
          <>
            <Text style={[common.h2, { marginTop: 22, marginBottom: 6 }]}>Dishes</Text>
            {foodFound.map((f) => (
              <TouchableOpacity key={f.id} style={s.row} onPress={() => onFood(f)}>
                <View style={s.thumb}>
                  <Text style={{ fontSize: 22 }}>{f.e}</Text>
                </View>
                <View style={{ marginLeft: 12 }}>
                  <Text style={{ color: C.text }}>{f.name}</Text>
                  <Text style={common.small}>{f.place} · ${f.price}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </>
        )}

        <Text style={[common.h2, { marginTop: 22, marginBottom: 6 }]}>Suggested Restaurants</Text>
        {found.map((r) => (
          <View key={r.n} style={s.row}>
            <View style={s.thumb}>
              <Text style={{ fontSize: 22 }}>{r.e}</Text>
            </View>
            <View style={{ marginLeft: 12 }}>
              <Text style={{ color: C.text }}>{r.n}</Text>
              <Text style={common.small}>⭐ 4.7</Text>
            </View>
          </View>
        ))}

        <Text style={[common.h2, { marginTop: 22, marginBottom: 12 }]}>Popular Fast Food</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          {popular.map((f) => (
            <TouchableOpacity key={f.id} style={s.card} onPress={() => onFood(f)}>
              <Text style={{ fontSize: 60 }}>{f.e}</Text>
              <Text style={{ fontWeight: '800', color: C.text, marginTop: 8 }} numberOfLines={1}>{f.name}</Text>
              <Text style={common.small} numberOfLines={1}>{f.place}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  search: { flexDirection: 'row', alignItems: 'center', backgroundColor: C.input, height: 52, borderRadius: 10, paddingHorizontal: 16, marginTop: 18 },
  chip: { borderWidth: 1, borderColor: '#EDEDED', borderRadius: 30, paddingHorizontal: 18, paddingVertical: 10, marginRight: 10 },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#F2F2F2' },
  thumb: { width: 48, height: 48, borderRadius: 10, backgroundColor: '#FFF3E8', alignItems: 'center', justifyContent: 'center' },
  card: { width: '48%', backgroundColor: C.white, borderRadius: 20, padding: 14, alignItems: 'center', elevation: 4, shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 12, shadowOffset: { width: 0, height: 4 } },
});