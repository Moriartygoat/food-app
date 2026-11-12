import React from 'react';
import AuthShell from '../components/AuthShell';
import Field from '../components/Field';
import Btn from '../components/Btn';
import { NavProps } from '../types';

export default function ForgotScreen({ back, go }: NavProps) {
  return (
    <AuthShell title="Forgot Password" sub="Please sign in to your existing account" onBack={back}>
      <Field label="EMAIL" placeholder="example@gmail.com" keyboardType="email-address" autoCapitalize="none" />
      <Btn title="SEND CODE" onPress={() => go('verify')} />
    </AuthShell>
  );
}