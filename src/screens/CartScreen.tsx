import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import Round from '../components/Round';
import Btn from '../components/Btn';
import MapView from '../components/MapView';
import { C, TOP, common } from '../theme';
import { Item } from '../types';

type Props = {
  back: () => void;
  items: Item[];
  setItems: (items: Item[]) => void;
  onPlace: () => void;
  address: string;
  coords: { lat: number; lng: number } | null;
  onEditAddress: () => void;
};

export default function CartScreen({ back, items, setItems, onPlace, address, coords, onEditAddress }: Props) {
  const total = items.reduce((sum, it) => sum + it.price * it.qty, 0);
  const change = (k: number, d: number) =>
    setItems(items.map((it, j) => (j === k ? { ...it, qty: Math.max(1, it.qty + d) } : it)));

  return (
    <View style={{ flex: 1, backgroundColor: C.navy }}>
      <View style={[common.rowBetween, { paddingTop: TOP, paddingHorizontal: 24 }]}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Round onPress={back}>‹</Round>
          <Text style={{ color: C.white, marginLeft: 14 }}>Cart</Text>
        </View>
        <Text style={{ color: C.orange, fontSize: 12, textDecorationLine: 'underline' }}>EDIT ITEMS</Text>
      </View>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 24 }}>
        {items.length === 0 && (
          <Text style={{ color: C.grey, textAlign: 'center', marginTop: 40 }}>Your cart is empty</Text>
        )}
        {items.map((it, k) => (
          <View key={k} style={{ flexDirection: 'row', marginBottom: 24 }}>
            <View style={s.img}>
              <Text style={{ fontSize: 44 }}>{it.e}</Text>
            </View>
            <View style={{ marginLeft: 16, flex: 1 }}>
              <Text style={{ color: C.white }}>{it.name}</Text>
              <Text style={{ color: C.white, fontSize: 20, fontWeight: '800', marginVertical: 4 }}>${it.price * it.qty}</Text>
              <View style={common.rowBetween}>
                <Text style={{ color: C.grey }}>14"</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <TouchableOpacity onPress={() => change(k, -1)} style={s.mini}>
                    <Text style={{ color: C.white }}>−</Text>
                  </TouchableOpacity>
                  <Text style={{ color: C.white, marginHorizontal: 12 }}>{it.qty}</Text>
                  <TouchableOpacity onPress={() => change(k, 1)} style={s.mini}>
                    <Text style={{ color: C.white }}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={s.sheet}>
        <View style={common.rowBetween}>
          <Text style={common.label}>DELIVERY ADDRESS</Text>
          <TouchableOpacity onPress={onEditAddress}>
            <Text style={{ color: C.orange, fontSize: 12 }}>EDIT</Text>
          </TouchableOpacity>
        </View>

        {coords && (
          <View style={{ marginBottom: 10 }}>
            <MapView
              key={`${coords.lat},${coords.lng}`}
              lat={coords.lat}
              lng={coords.lng}
              interactive={false}
              height={130}
            />
          </View>
        )}

        <TouchableOpacity onPress={onEditAddress} style={[common.input, { justifyContent: 'center', marginBottom: 16 }]}>
          <Text numberOfLines={1} style={{ color: address ? C.text : C.grey }}>{address || 'Add delivery address'}</Text>
        </TouchableOpacity>

        <View style={[common.rowBetween, { marginBottom: 16 }]}>
          <Text style={common.label}>
            TOTAL: <Text style={{ color: C.text, fontSize: 28, fontWeight: '800' }}>${total}</Text>
          </Text>
          <Text style={{ color: C.orange, fontSize: 12 }}>Breakdown ›</Text>
        </View>
        <Btn title="PLACE ORDER" onPress={items.length ? onPlace : () => {}} />
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  img: { width: 110, height: 110, borderRadius: 20, backgroundColor: '#2A2E45', alignItems: 'center', justifyContent: 'center' },
  mini: { width: 24, height: 24, borderRadius: 12, backgroundColor: '#3A3F5C', alignItems: 'center', justifyContent: 'center' },
  sheet: { backgroundColor: C.white, borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24 },
});