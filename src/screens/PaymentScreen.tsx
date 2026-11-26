import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import Header from '../components/Header';
import Field from '../components/Field';
import Btn from '../components/Btn';
import { C, common } from '../theme';

type Method = { id: number; icon: string; title: string; sub: string };

export default function PaymentScreen({ back }: { back: () => void }) {
  const [methods, setMethods] = useState<Method[]>([
    { id: 1, icon: '💵', title: 'Cash', sub: 'Pay the courier when food arrives' },
    { id: 2, icon: '💳', title: 'Visa •••• 4242', sub: 'Expires 12/28' },
    { id: 3, icon: '💳', title: 'Mastercard •••• 1881', sub: 'Expires 09/27' },
  ]);
  const [selected, setSelected] = useState(1);
  const [adding, setAdding] = useState(false);
  const [num, setNum] = useState('');
  const [exp, setExp] = useState('');
  const [name, setName] = useState('');

  const addCard = () => {
    const digits = num.replace(/\D/g, '');
    if (digits.length < 4) return;
    const id = Date.now();
    setMethods((p) => [...p, { id, icon: '💳', title: `Card •••• ${digits.slice(-4)}`, sub: `${name || 'Card holder'}${exp ? ' · ' + exp : ''}` }]);
    setSelected(id);
    setNum(''); setExp(''); setName('');
    setAdding(false);
  };

  return (
    <View style={{ flex: 1, backgroundColor: C.white }}>
      <Header title="Payment Method" onBack={adding ? () => setAdding(false) : back} />
      <ScrollView contentContainerStyle={{ padding: 24, paddingTop: 8 }} keyboardShouldPersistTaps="handled">
        {!adding ? (
          <>
            {methods.map((m) => (
              <TouchableOpacity
                key={m.id}
                onPress={() => setSelected(m.id)}
                style={[s.card, m.id === selected && { borderColor: C.orange }]}
              >
                <Text style={{ fontSize: 28, marginRight: 14 }}>{m.icon}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontWeight: '800', color: C.text }}>{m.title}</Text>
                  <Text style={common.small}>{m.sub}</Text>
                </View>
                <View style={[s.radio, m.id === selected && { backgroundColor: C.orange, borderColor: C.orange }]}>
                  {m.id === selected && <Text style={{ color: C.white, fontSize: 12 }}>✓</Text>}
                </View>
              </TouchableOpacity>
            ))}
            <View style={{ height: 10 }} />
            <Btn title="ADD NEW CARD" onPress={() => setAdding(true)} />
          </>
        ) : (
          <>
            <Field label="CARD NUMBER" value={num} onChangeText={setNum} keyboardType="number-pad" placeholder="0000 0000 0000 0000" />
            <Field label="CARD HOLDER" value={name} onChangeText={setName} placeholder="Name Surname" />
            <Field label="EXPIRY (MM/YY)" value={exp} onChangeText={setExp} placeholder="12/28" />
            <Btn title="SAVE CARD" onPress={addCard} />
          </>
        )}
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F0F5FA', borderRadius: 16, padding: 16, marginBottom: 14, borderWidth: 1.5, borderColor: 'transparent' },
  radio: { width: 24, height: 24, borderRadius: 12, borderWidth: 1.5, borderColor: '#CBD2DB', alignItems: 'center', justifyContent: 'center' },
});