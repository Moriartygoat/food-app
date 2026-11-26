import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import Header from '../components/Header';
import Field from '../components/Field';
import Btn from '../components/Btn';
import { C, common } from '../theme';

type Review = { id: number; who: string; stars: number; text: string; time: string };

export default function ReviewsScreen({ back }: { back: () => void }) {
  const [reviews, setReviews] = useState<Review[]>([
    { id: 1, who: 'Aigerim', stars: 5, text: 'Very tasty burger, delivered hot and fast!', time: '2 days ago' },
    { id: 2, who: 'Dias', stars: 4, text: 'Great pizza, a bit late but still good.', time: '5 days ago' },
    { id: 3, who: 'Madina', stars: 5, text: 'Best shawarma in the city. Will order again.', time: '1 week ago' },
  ]);
  const [stars, setStars] = useState(5);
  const [text, setText] = useState('');

  const send = () => {
    if (!text.trim()) return;
    setReviews((p) => [{ id: Date.now(), who: 'You', stars, text: text.trim(), time: 'just now' }, ...p]);
    setText('');
    setStars(5);
  };

  const avg = (reviews.reduce((a, r) => a + r.stars, 0) / reviews.length).toFixed(1);

  return (
    <View style={{ flex: 1, backgroundColor: C.white }}>
      <Header title="User Reviews" onBack={back} />
      <ScrollView contentContainerStyle={{ padding: 24, paddingTop: 8 }} keyboardShouldPersistTaps="handled">
        <View style={s.summary}>
          <Text style={{ fontSize: 36, fontWeight: '800', color: C.text }}>{avg}</Text>
          <Text style={{ color: C.orange, fontSize: 18 }}>{'★'.repeat(Math.round(Number(avg)))}</Text>
          <Text style={common.small}>{reviews.length} reviews</Text>
        </View>

        <Text style={[common.label, { marginTop: 18 }]}>YOUR RATING</Text>
        <View style={{ flexDirection: 'row', marginBottom: 12 }}>
          {[1, 2, 3, 4, 5].map((n) => (
            <TouchableOpacity key={n} onPress={() => setStars(n)}>
              <Text style={{ fontSize: 32, color: n <= stars ? C.orange : '#D5DAE1' }}>★</Text>
            </TouchableOpacity>
          ))}
        </View>
        <Field label="YOUR REVIEW" value={text} onChangeText={setText} placeholder="Write something about your order" />
        <Btn title="SEND REVIEW" onPress={send} />

        <Text style={[common.h2, { marginTop: 24, marginBottom: 12 }]}>All reviews</Text>
        {reviews.map((r) => (
          <View key={r.id} style={s.card}>
            <View style={common.rowBetween}>
              <Text style={{ fontWeight: '800', color: C.text }}>{r.who}</Text>
              <Text style={common.small}>{r.time}</Text>
            </View>
            <Text style={{ color: C.orange, marginVertical: 4 }}>{'★'.repeat(r.stars)}{'☆'.repeat(5 - r.stars)}</Text>
            <Text style={{ color: C.text }}>{r.text}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  summary: { backgroundColor: '#FFF3E8', borderRadius: 20, padding: 20, alignItems: 'center' },
  card: { backgroundColor: '#F6F8FA', borderRadius: 16, padding: 16, marginBottom: 12 },
});