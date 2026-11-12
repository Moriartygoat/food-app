import React from 'react';
import { View } from 'react-native';
import AuthShell from '../components/AuthShell';
import Field from '../components/Field';
import Btn from '../components/Btn';
import { NavProps } from '../types';

export default function SignUpScreen({ back, reset }: NavProps) {
  return (
    <AuthShell title="Sign Up" sub="Please sign up to get started" onBack={back}>
      <Field label="NAME" placeholder="John doe" />
      <Field label="EMAIL" placeholder="example@gmail.com" keyboardType="email-address" autoCapitalize="none" />
      <Field label="PASSWORD" placeholder="• • • • • • • • • •" secureTextEntry />
      <Field label="RE-TYPE PASSWORD" placeholder="• • • • • • • • • •" secureTextEntry />
      <View style={{ height: 8 }} />
      <Btn title="SIGN UP" onPress={() => reset('home')} />
    </AuthShell>
  );
}