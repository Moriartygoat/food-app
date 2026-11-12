import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { C } from '../theme';

type Props = { title: string; onPress: () => void };

export default function Btn({ title, onPress }: Props) {
  return (
    <TouchableOpacity style={s.btn} onPress={onPress} activeOpacity={0.85}>
      <Text style={s.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const s = StyleSheet.create({
  btn: { backgroundColor: C.orange, height: 62, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  text: { color: C.white, fontWeight: '800', fontSize: 14, letterSpacing: 0.5 },
});