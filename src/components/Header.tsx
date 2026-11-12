import React from 'react';
import { View, Text } from 'react-native';
import Round from './Round';
import { C, TOP, common } from '../theme';

type Props = { title: string; onBack: () => void; right?: React.ReactNode };

export default function Header({ title, onBack, right }: Props) {
  return (
    <View style={[common.rowBetween, { paddingTop: TOP, paddingHorizontal: 24, paddingBottom: 12 }]}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Round onPress={onBack}>‹</Round>
        <Text style={{ color: C.text, marginLeft: 14 }}>{title}</Text>
      </View>
      {right}
    </View>
  );
}