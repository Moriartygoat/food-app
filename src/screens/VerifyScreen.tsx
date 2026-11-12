import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import AuthShell from '../components/AuthShell';
import Btn from '../components/Btn';
import { C, common } from '../theme';
import { NavProps } from '../types';

export default function VerifyScreen({ back, reset }: NavProps) {
  const [code, setCode] = useState(['', '', '', '']);

  return (
    <AuthShell title="Verification" sub={'We have sent a code to your email\nexample@gmail.com'} onBack={back}>
      <View style={common.rowBetween}>
        <Text style={common.label}>CODE</Text>
        <Text style={common.small}>
          <Text style={{ textDecorationLine: 'underline', fontWeight: '700' }}>Resend</Text> in 50sec
        </Text>
      </View>
      <View style={[common.rowBetween, { marginVertical: 12 }]}>
        {code.map((c, k) => (
          <TextInput
            key={k}
            value={c}
            maxLength={1}
            keyboardType="number-pad"
            onChangeText={(t) => setCode(code.map((x, j) => (j === k ? t : x)))}
            style={s.box}
          />
        ))}
      </View>
      <View style={{ height: 12 }} />
      <Btn title="VERIFY" onPress={() => reset('login')} />
    </AuthShell>
  );
}

const s = StyleSheet.create({
  box: { width: 62, height: 62, borderRadius: 10, backgroundColor: C.input, textAlign: 'center', fontSize: 18, color: C.text },
});