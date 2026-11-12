import React from 'react';
import { View, Text, TextInput, TextInputProps } from 'react-native';
import { C, common } from '../theme';

type Props = TextInputProps & { label: string };

export default function Field({ label, ...rest }: Props) {
  return (
    <View style={{ marginBottom: 16 }}>
      <Text style={common.label}>{label}</Text>
      <TextInput style={common.input} placeholderTextColor={C.grey} {...rest} />
    </View>
  );
}