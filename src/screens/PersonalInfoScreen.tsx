import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Header from '../components/Header';
import Field from '../components/Field';
import Btn from '../components/Btn';
import { C, common } from '../theme';

type Props = { back: () => void };

export default function PersonalInfoScreen({ back }: Props) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState('Vishal Khadok');
  const [email, setEmail] = useState('hello@halallab.co');
  const [phone, setPhone] = useState('408-841-0926');
  const [bio, setBio] = useState('I love fast food');

  const rows = [
    ['👤', 'FULL NAME', name],
    ['✉️', 'EMAIL', email],
    ['📞', 'PHONE NUMBER', phone],
  ];

  return (
    <View style={{ flex: 1, backgroundColor: C.white }}>
      <Header
        title={editing ? 'Edit Profile' : 'Personal Info'}
        onBack={editing ? () => setEditing(false) : back}
        right={
          !editing ? (
            <TouchableOpacity onPress={() => setEditing(true)}>
              <Text style={s.edit}>EDIT</Text>
            </TouchableOpacity>
          ) : undefined
        }
      />
      <ScrollView contentContainerStyle={{ padding: 24 }} keyboardShouldPersistTaps="handled">
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: editing ? 'center' : 'flex-start', marginBottom: 24 }}>
          <View style={s.avatar}>
            <Text style={{ fontSize: 44 }}>🧑</Text>
          </View>
          {!editing && (
            <View style={{ marginLeft: 20 }}>
              <Text style={s.name}>{name}</Text>
              <Text style={common.small}>{bio}</Text>
            </View>
          )}
        </View>

        {!editing ? (
          <View style={s.card}>
            {rows.map(([i, l, v]) => (
              <View key={l} style={s.row}>
                <Text style={{ fontSize: 20 }}>{i}</Text>
                <View style={{ marginLeft: 14 }}>
                  <Text style={s.label}>{l}</Text>
                  <Text style={{ color: C.text }}>{v}</Text>
                </View>
              </View>
            ))}
          </View>
        ) : (
          <>
            <Field label="FULL NAME" value={name} onChangeText={setName} />
            <Field label="EMAIL" value={email} onChangeText={setEmail} autoCapitalize="none" />
            <Field label="PHONE NUMBER" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
            <Text style={common.label}>BIO</Text>
            <TextInput
              value={bio}
              onChangeText={setBio}
              multiline
              style={[common.input, { height: 100, paddingTop: 16, textAlignVertical: 'top', marginBottom: 24 }]}
            />
            <Btn title="SAVE" onPress={() => setEditing(false)} />
          </>
        )}
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  edit: { color: C.orange, fontSize: 13, textDecorationLine: 'underline' },
  avatar: { width: 90, height: 90, borderRadius: 45, backgroundColor: C.peach, alignItems: 'center', justifyContent: 'center' },
  name: { fontSize: 20, fontWeight: '800', color: C.text, marginBottom: 4 },
  card: { backgroundColor: '#F6F8FA', borderRadius: 16, padding: 16 },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10 },
  label: { fontSize: 11, color: C.grey, marginBottom: 2 },
});