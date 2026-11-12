import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { C, common } from '../theme';

type Props = { onFinish: () => void };

export default function SplashScreen({ onFinish }: Props) {
  useEffect(() => {
    const t = setTimeout(onFinish, 1800);
    return () => clearTimeout(t);
  }, []);

  return (
    <View style={[common.center, { backgroundColor: C.white }]}>
      <Text style={{ fontSize: 56, fontWeight: '900', color: C.navy }}>
        F<Text style={{ color: C.orange }}>oo</Text>d
      </Text>
    </View>
  );
}