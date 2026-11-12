import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Btn from '../components/Btn';
import { C, common } from '../theme';

type Props = { onTrack: () => void; onHome: () => void };

export default function SuccessScreen({ onTrack, onHome }: Props) {
  return (
    <View style={[common.center, { backgroundColor: C.white, padding: 24 }]}>
      <Text style={{ fontSize: 96 }}>🎉</Text>
      <Text style={s.title}>Congratulations!</Text>
      <Text style={s.desc}>You successfully maked a payment,{'\n'}enjoy our service!</Text>
      <View style={{ width: '100%', marginTop: 40 }}>
        <Btn title="TRACK ORDER" onPress={onTrack} />
      </View>
      <TouchableOpacity onPress={onHome} style={{ marginTop: 16 }}>
        <Text style={{ color: C.text }}>Back to home</Text>
      </TouchableOpacity>
    </View>
  );
}

const s = StyleSheet.create({
  title: { fontSize: 24, fontWeight: '800', color: C.navy, marginTop: 24 },
  desc: { textAlign: 'center', color: '#646982', marginTop: 12, lineHeight: 22 },
});