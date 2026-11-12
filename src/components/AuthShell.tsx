import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { C, TOP } from '../theme';

type Props = { title: string; sub: string; onBack?: () => void; children: React.ReactNode };

export default function AuthShell({ title, sub, onBack, children }: Props) {
  return (
    <View style={{ flex: 1, backgroundColor: C.dark }}>
      <View style={{ height: 220, paddingTop: TOP, alignItems: 'center' }}>
        {onBack && (
          <TouchableOpacity onPress={onBack} style={s.back}>
            <Text>‹</Text>
          </TouchableOpacity>
        )}
        <Text style={s.title}>{title}</Text>
        <Text style={s.sub}>{sub}</Text>
      </View>
      <ScrollView style={s.sheet} contentContainerStyle={{ padding: 24 }} keyboardShouldPersistTaps="handled">
        {children}
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  back: { position: 'absolute', left: 24, top: TOP + 6, width: 40, height: 40, borderRadius: 20, backgroundColor: C.white, alignItems: 'center', justifyContent: 'center' },
  title: { color: C.white, fontSize: 30, fontWeight: '700', marginTop: 56 },
  sub: { color: C.white, marginTop: 8, textAlign: 'center', fontSize: 14 },
  sheet: { backgroundColor: C.white, borderTopLeftRadius: 24, borderTopRightRadius: 24 },
});