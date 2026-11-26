import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import Header from '../components/Header';
import { C } from '../theme';

const faqs = [
  { q: 'How long does delivery take?', a: 'Usually 20–40 minutes, depending on the restaurant and the distance to your address.' },
  { q: 'How much does delivery cost?', a: 'Delivery is free on most orders. Some far restaurants may add a small fee.' },
  { q: 'Can I change my delivery address?', a: 'Yes. Open the Cart, press EDIT next to the address and choose another one or add a new one on the map.' },
  { q: 'How can I pay?', a: 'You can pay by card or with cash to the courier. Manage cards in Profile → Payment Method.' },
  { q: 'Can I cancel my order?', a: 'You can cancel while the restaurant has not started cooking. Open My Orders and press Cancel.' },
  { q: 'What if my food arrives cold or wrong?', a: 'Leave a review in User Reviews and tell us what happened. We will fix it or refund you.' },
];

export default function FaqScreen({ back }: { back: () => void }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <View style={{ flex: 1, backgroundColor: C.white }}>
      <Header title="FAQs" onBack={back} />
      <ScrollView contentContainerStyle={{ padding: 24, paddingTop: 8 }}>
        {faqs.map((f, i) => (
          <TouchableOpacity key={f.q} style={s.card} onPress={() => setOpen(open === i ? null : i)} activeOpacity={0.8}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ flex: 1, fontWeight: '800', color: C.text }}>{f.q}</Text>
              <Text style={{ color: C.orange, fontSize: 20 }}>{open === i ? '−' : '+'}</Text>
            </View>
            {open === i && <Text style={{ color: C.grey, marginTop: 10, lineHeight: 20 }}>{f.a}</Text>}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  card: { backgroundColor: '#F6F8FA', borderRadius: 16, padding: 16, marginBottom: 12 },
});