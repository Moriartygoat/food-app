import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Btn from '../components/Btn';
import { slides } from '../data';
import { C, TOP } from '../theme';

type Props = { onDone: () => void };

export default function OnboardingScreen({ onDone }: Props) {
  const [i, setI] = useState(0);
  const sl = slides[i];
  const last = i === slides.length - 1;

  return (
    <View style={s.container}>
      <View style={s.body}>
        <View style={s.illus}>
          <Text style={{ fontSize: 120 }}>{sl.e}</Text>
        </View>
        <Text style={s.title}>{sl.t}</Text>
        <Text style={s.desc}>{sl.d}</Text>
        <View style={{ flexDirection: 'row', marginTop: 24 }}>
          {slides.map((_, k) => (
            <View key={k} style={[s.dot, k === i && { backgroundColor: C.orange }]} />
          ))}
        </View>
      </View>
      <View style={{ paddingBottom: 32, alignItems: 'center' }}>
        <View style={{ width: '100%' }}>
          <Btn title={last ? 'GET STARTED' : 'NEXT'} onPress={() => (last ? onDone() : setI(i + 1))} />
        </View>
        {!last && (
          <TouchableOpacity onPress={onDone} style={{ marginTop: 16 }}>
            <Text style={{ color: C.text }}>Skip</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.white, paddingTop: TOP, paddingHorizontal: 24 },
  body: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  illus: { width: 280, height: 280, borderRadius: 140, backgroundColor: '#FFF3E8', alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: '800', color: C.navy, marginTop: 40 },
  desc: { textAlign: 'center', color: '#646982', marginTop: 14, lineHeight: 22 },
  dot: { width: 10, height: 10, borderRadius: 5, backgroundColor: C.peach, marginHorizontal: 5 },
});