import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AuthShell from '../components/AuthShell';
import Field from '../components/Field';
import Btn from '../components/Btn';
import { C, common } from '../theme';
import { NavProps } from '../types';

export default function LoginScreen({ go, reset }: NavProps) {
  const [show, setShow] = useState(false);
  const [remember, setRemember] = useState(false);

  return (
    <AuthShell title="Log In" sub="Please sign in to your existing account">
      <Field label="EMAIL" placeholder="example@gmail.com" keyboardType="email-address" autoCapitalize="none" />
      <Field label="PASSWORD" placeholder="• • • • • • • • • •" secureTextEntry={!show} />
      <TouchableOpacity onPress={() => setShow(!show)} style={{ alignSelf: 'flex-end', marginTop: -10, marginBottom: 8 }}>
        <Text style={common.small}>{show ? 'hide' : 'show'}</Text>
      </TouchableOpacity>

      <View style={common.rowBetween}>
        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => setRemember(!remember)}>
          <View style={[s.check, remember && { backgroundColor: C.orange, borderColor: C.orange }]} />
          <Text style={common.small}> Remember me</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => go('forgot')}>
          <Text style={[common.small, { color: C.orange }]}>Forgot Password</Text>
        </TouchableOpacity>
      </View>

      <View style={{ height: 24 }} />
      <Btn title="LOG IN" onPress={() => reset('home')} />

      <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 24 }}>
        <Text style={common.small}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => go('signup')}>
          <Text style={[common.small, { color: C.orange, fontWeight: '700' }]}>SIGN UP</Text>
        </TouchableOpacity>
      </View>

      <Text style={[common.small, { textAlign: 'center', marginVertical: 12 }]}>Or</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 20 }}>
        {[['f', '#395998'], ['t', '#169CE8'], ['', C.navy]].map(([t, bg], k) => (
          <View key={k} style={[s.social, { backgroundColor: bg }]}>
            <Text style={{ color: C.white, fontWeight: '700' }}>{t}</Text>
          </View>
        ))}
      </View>
    </AuthShell>
  );
}

const s = StyleSheet.create({
  check: { width: 20, height: 20, borderRadius: 4, borderWidth: 1.5, borderColor: '#CBD2E0' },
  social: { width: 52, height: 52, borderRadius: 26, alignItems: 'center', justifyContent: 'center' },
});