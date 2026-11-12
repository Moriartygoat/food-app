import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { C } from '../theme';

type Props = { children: React.ReactNode; onPress?: () => void; dark?: boolean };

export default function Round({ children, onPress, dark }: Props) {
  return (
    <TouchableOpacity onPress={onPress} style={[s.round, dark && { backgroundColor: C.navy }]}>
      <Text style={{ color: dark ? C.white : C.text, fontSize: 16 }}>{children}</Text>
    </TouchableOpacity>
  );
}

const s = StyleSheet.create({
  round: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#ECF0F4', alignItems: 'center', justifyContent: 'center' },
});