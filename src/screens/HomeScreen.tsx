import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import Round from '../components/Round';
import { categories, foods, restaurants } from '../data';
import type { Food } from '../data';
import { C, TOP, common } from '../theme';

type Props = {
  go: (screen: string) => void;
  cartCount: number;
  onFood: (f: Food) => void;
  onAdd: (f: Food) => void;
};

export default function HomeScreen({ go, cartCount, onFood, onAdd }: Props) {
  const [cat, setCat] = useState(0);
  const [offer, setOffer] = useState(true);

  return (
    <View style={{ flex: 1, backgroundColor: C.white }}>
      <ScrollView contentContainerStyle={{ paddingTop: TOP, paddingHorizontal: 24, paddingBottom: 32 }}>
        <View style={common.rowBetween}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Round onPress={() => go('profile')}>≡</Round>
            <View style={{ marginLeft: 12 }}>
              <Text style={{ color: C.orange, fontSize: 11, fontWeight: '800' }}>DELIVER TO</Text>
              <Text style={{ color: C.text }}>Halal Lab office ▾</Text>
            </View>
          </View>
                    <View>
            <Round dark onPress={() => go('cart')}>🛍</Round>
            <View style={s.badge} pointerEvents="none">
              <Text style={{ color: C.white, fontSize: 10 }}>{cartCount}</Text>
            </View>
          </View>
        </View>

        <Text style={{ marginTop: 20, fontSize: 16, color: C.text }}>
          Hey Halal, <Text style={{ fontWeight: '800' }}>Good Afternoon!</Text>
        </Text>

        <TouchableOpacity style={s.search} onPress={() => go('search')}>
          <Text style={{ color: C.grey }}>🔍  Search dishes, restaurants</Text>
        </TouchableOpacity>

        <View style={[common.rowBetween, { marginTop: 24 }]}>
          <Text style={common.h2}>All Categories</Text>
          <TouchableOpacity onPress={() => go('foods')}>
            <Text style={common.small}>See All ›</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginVertical: 14 }}>
          {categories.map((c, k) => (
            <TouchableOpacity
              key={c.n}
              onPress={() => { setCat(k); go('foods'); }}
              style={[s.catCard, k === cat && { borderColor: C.yellow }]}
            >
              <Text style={{ fontSize: 56 }}>{c.e}</Text>
              <Text style={{ fontWeight: '800', marginTop: 8 }}>{c.n}</Text>
              <Text style={common.small}>
                Starting  <Text style={{ color: C.text, fontWeight: '700' }}>${c.p}</Text>
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={common.rowBetween}>
          <Text style={common.h2}>Popular Foods</Text>
          <TouchableOpacity onPress={() => go('foods')}>
            <Text style={common.small}>See All ›</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginVertical: 14 }}>
          {foods.slice(0, 8).map((f) => (
            <TouchableOpacity key={f.id} style={s.foodCard} onPress={() => onFood(f)}>
              <View style={s.foodImg}>
                <Text style={{ fontSize: 48 }}>{f.e}</Text>
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
        </ScrollView>

        <View style={common.rowBetween}>
          <Text style={common.h2}>Open Restaurants</Text>
          <Text style={common.small}>See All ›</Text>
        </View>
        {restaurants.map((r) => (
          <TouchableOpacity key={r.n} onPress={() => go('foods')} style={{ marginTop: 14 }}>
            <View style={s.restImg}>
              <Text style={{ fontSize: 72 }}>{r.e}</Text>
            </View>
            <Text style={{ fontSize: 16, marginTop: 8, color: C.text }}>{r.n}</Text>
            <Text style={[common.small, { marginVertical: 4 }]}>Burger - Chiken - Riche - Wings</Text>
            <View style={{ flexDirection: 'row', gap: 20 }}>
              <Text style={common.meta}>⭐ 4.7</Text>
              <Text style={common.meta}>🚚 Free</Text>
              <Text style={common.meta}>🕒 20 min</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Modal transparent visible={offer} animationType="fade">
        <View style={s.overlay}>
          <View style={s.offer}>
            <TouchableOpacity style={s.close} onPress={() => setOffer(false)}>
              <Text style={{ color: C.orange }}>✕</Text>
            </TouchableOpacity>
            <Text style={s.offerTitle}>Hurry Offers!</Text>
            <Text style={s.offerCode}>#1243CD2</Text>
            <Text style={{ color: C.white, textAlign: 'center' }}>Use the cupon get 25% discount</Text>
            <TouchableOpacity style={s.gotIt} onPress={() => setOffer(false)}>
              <Text style={{ color: C.white, fontWeight: '800' }}>GOT IT</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const s = StyleSheet.create({
  badge: { position: 'absolute', right: -4, top: -4, backgroundColor: C.orange, width: 18, height: 18, borderRadius: 9, alignItems: 'center', justifyContent: 'center' },
  search: { backgroundColor: C.input, height: 52, borderRadius: 10, paddingHorizontal: 16, justifyContent: 'center', marginTop: 16 },
  catCard: { width: 120, backgroundColor: C.white, borderRadius: 20, padding: 14, marginRight: 14, alignItems: 'center', elevation: 4, shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 12, shadowOffset: { width: 0, height: 4 }, borderWidth: 1.5, borderColor: 'transparent' },
  foodCard: { width: 150, backgroundColor: C.white, borderRadius: 20, padding: 12, marginRight: 14, elevation: 4, shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 12, shadowOffset: { width: 0, height: 4 } },
  foodImg: { height: 90, borderRadius: 14, backgroundColor: '#FFF3E8', alignItems: 'center', justifyContent: 'center' },
  plus: { width: 28, height: 28, borderRadius: 14, backgroundColor: C.orange, alignItems: 'center', justifyContent: 'center' },
  restImg: { height: 140, borderRadius: 14, backgroundColor: '#F4EDE4', alignItems: 'center', justifyContent: 'center' },
  overlay: { flex: 1, backgroundColor: 'rgba(24,28,46,0.65)', alignItems: 'center', justifyContent: 'center', padding: 24 },
  offer: { width: '100%', borderRadius: 24, backgroundColor: '#F2A500', padding: 28, alignItems: 'center' },
  close: { position: 'absolute', right: -6, top: -6, width: 34, height: 34, borderRadius: 17, backgroundColor: C.yellow, alignItems: 'center', justifyContent: 'center' },
  offerTitle: { color: C.white, fontSize: 28, fontWeight: '900', marginTop: 8 },
  offerCode: { color: C.white, fontSize: 24, fontWeight: '800', marginVertical: 24 },
  gotIt: { marginTop: 28, width: '100%', height: 52, borderRadius: 8, borderWidth: 1.5, borderColor: C.white, alignItems: 'center', justifyContent: 'center' },
});