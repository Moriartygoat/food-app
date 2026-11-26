import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Header from '../components/Header';
import MapView from '../components/MapView';
import { C, common } from '../theme';

type Props = { back: () => void; address: string; coords: { lat: number; lng: number } | null };

const steps = [
  { e: '📝', t: 'Order placed', d: 'We got your order' },
  { e: '👨‍🍳', t: 'Preparing', d: 'The chef is cooking your food' },
  { e: '🛵', t: 'On the way', d: 'Courier is going to your address' },
  { e: '🏠', t: 'Delivered', d: 'Enjoy your meal!' },
];

export default function TrackScreen({ back, address, coords }: Props) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setStep((p) => (p < steps.length - 1 ? p + 1 : p)), 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: C.white }}>
      <Header title="Track Order" onBack={back} />
      <ScrollView contentContainerStyle={{ padding: 24, paddingTop: 8 }}>
        {coords && <MapView lat={coords.lat} lng={coords.lng} interactive={false} height={190} />}
        <Text style={[common.small, { marginVertical: 8 }]} numberOfLines={2}>📍 {address || 'Delivery address'}</Text>

        <View style={s.eta}>
          <Text style={{ fontSize: 30 }}>{steps[step].e}</Text>
          <View style={{ marginLeft: 14, flex: 1 }}>
            <Text style={{ fontWeight: '800', color: C.text }}>{steps[step].t}</Text>
            <Text style={common.small}>{step === steps.length - 1 ? 'Arrived' : `Estimated ${(steps.length - 1 - step) * 7} min`}</Text>
          </View>
        </View>

        {steps.map((st, i) => (
          <View key={st.t} style={{ flexDirection: 'row', marginTop: 18 }}>
            <View style={{ alignItems: 'center', marginRight: 14 }}>
              <View style={[s.dot, i <= step && { backgroundColor: C.orange, borderColor: C.orange }]}>
                {i <= step && <Text style={{ color: C.white, fontSize: 11 }}>✓</Text>}
              </View>
              {i < steps.length - 1 && <View style={[s.line, i < step && { backgroundColor: C.orange }]} />}
            </View>
            <View style={{ flex: 1, opacity: i <= step ? 1 : 0.45 }}>
              <Text style={{ fontWeight: '800', color: C.text }}>{st.e}  {st.t}</Text>
              <Text style={common.small}>{st.d}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  eta: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF3E8', borderRadius: 16, padding: 16, marginTop: 8 },
  dot: { width: 24, height: 24, borderRadius: 12, borderWidth: 2, borderColor: '#CBD2DB', alignItems: 'center', justifyContent: 'center' },
  line: { width: 2, flex: 1, minHeight: 30, backgroundColor: '#E1E5EA', marginTop: 4 },
});