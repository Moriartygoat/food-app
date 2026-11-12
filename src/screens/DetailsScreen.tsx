import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import Round from '../components/Round';
import Btn from '../components/Btn';
import { C, TOP, common } from '../theme';
import { Item } from '../types';
import type { Food } from '../data';

type Props = {
  back: () => void;
  onAdd: (item: Item) => void;
  food: Food;
  fav: boolean;
  onFav: () => void;
};

export default function DetailsScreen({ back, onAdd, food, fav, onFav }: Props) {
  const [size, setSize] = useState(14);
  const [qty, setQty] = useState(1);
  const unit = size === 10 ? Math.round(food.price * 0.75) : size === 14 ? food.price : Math.round(food.price * 1.25);

  return (
    <View style={{ flex: 1, backgroundColor: C.white }}>
      <ScrollView contentContainerStyle={{ paddingTop: TOP, paddingHorizontal: 24, paddingBottom: 160 }}>
        <View style={common.rowBetween}>
          <Round onPress={back}>‹</Round>
          <Text style={{ color: C.text }}>Details</Text>
          <Round onPress={onFav}>{fav ? '❤️' : '🤍'}</Round>
        </View>

        <View style={s.img}>
          <Text style={{ fontSize: 110 }}>{food.e}</Text>
        </View>
        <View style={s.chip}>
          <Text style={common.small}>🔴 {food.place}</Text>
        </View>
        <Text style={s.title}>{food.name}</Text>
        <Text style={[common.small, { marginVertical: 8 }]}>
          Fresh and tasty, prepared by our chef and delivered hot to your door.
        </Text>
        <View style={{ flexDirection: 'row', gap: 20 }}>
          <Text style={common.meta}>⭐ 4.7</Text>
          <Text style={common.meta}>🚚 Free</Text>
          <Text style={common.meta}>🕒 20 min</Text>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 18 }}>
          <Text style={[common.label, { marginBottom: 0, marginRight: 14 }]}>SIZE:</Text>
          {[10, 14, 16].map((z) => (
            <TouchableOpacity key={z} onPress={() => setSize(z)} style={[s.size, size === z && { backgroundColor: C.orange }]}>
              <Text style={{ color: size === z ? C.white : C.text }}>{z}"</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={[common.label, { marginTop: 18 }]}>INGREDIENTS</Text>
        <View style={{ flexDirection: 'row', gap: 12 }}>
          {['🧂', '🍗', '🧅', '🧄', '🌶'].map((e) => (
            <View key={e} style={s.ingr}>
              <Text>{e}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={s.bottomBar}>
        <View style={common.rowBetween}>
          <Text style={{ fontSize: 28, fontWeight: '800', color: C.text }}>${unit * qty}</Text>
          <View style={s.qty}>
            <TouchableOpacity onPress={() => setQty(Math.max(1, qty - 1))}>
              <Text style={s.qtyBtn}>−</Text>
            </TouchableOpacity>
            <Text style={{ color: C.white, marginHorizontal: 14, fontWeight: '700' }}>{qty}</Text>
            <TouchableOpacity onPress={() => setQty(qty + 1)}>
              <Text style={s.qtyBtn}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ height: 14 }} />
        <Btn title="ADD TO CART" onPress={() => onAdd({ name: food.name, price: unit, qty, e: food.e })} />
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  img: { height: 200, borderRadius: 24, backgroundColor: C.yellow, marginTop: 20, alignItems: 'center', justifyContent: 'center' },
  chip: { alignSelf: 'flex-start', borderWidth: 1, borderColor: '#EDEDED', borderRadius: 30, paddingHorizontal: 14, paddingVertical: 8, marginTop: 16 },
  title: { fontSize: 20, fontWeight: '800', marginTop: 14, color: C.text },
  size: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#F0F5FA', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  ingr: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#FFF1E8', alignItems: 'center', justifyContent: 'center' },
  bottomBar: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: C.white, padding: 24, borderTopLeftRadius: 24, borderTopRightRadius: 24, elevation: 12 },
  qty: { flexDirection: 'row', alignItems: 'center', backgroundColor: C.navy, borderRadius: 30, paddingHorizontal: 14, height: 48 },
  qtyBtn: { color: C.white, fontSize: 20, paddingHorizontal: 6 },
});