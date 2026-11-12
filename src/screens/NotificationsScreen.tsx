import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import Header from '../components/Header';
import { C, common } from '../theme';

type Props = { back: () => void };
type Tab = 'Notifications' | 'Messages';

const tabs: Tab[] = ['Notifications', 'Messages'];

const notes = [
  { who: 'Tonbir Ahmed', text: 'Placed a new order', time: '20 min ago', e: '🍔' },
  { who: 'Salim Smith', text: 'left a 5 star review', time: '20 min ago', e: '🍕' },
  { who: 'Royal Bengol', text: 'agreed to cancel', time: '20 min ago', e: '🍝' },
  { who: 'Pabel Vuiya', text: 'Placed a new order', time: '20 min ago', e: '🌭' },
];
const messages = [
  { who: 'Royal Parvej', text: 'Sounds awesome!', time: '19:37', unread: 1 },
  { who: 'Cameron Williamson', text: 'Ok, just hurry up little bit...', time: '19:37', unread: 1 },
  { who: 'Ralph Edwards', text: 'Thanks dude.', time: '19:37', unread: 0 },
  { who: 'Cody Fisher', text: 'How is going...?', time: '19:37', unread: 0 },
  { who: 'Eleanor Pena', text: 'Thanks for the awesome food man...', time: '19:37', unread: 0 },
];

export default function NotificationsScreen({ back }: Props) {
  const [tab, setTab] = useState<Tab>('Notifications');
  const isNotes = tab === 'Notifications';

  const count = (t: Tab) => (t === 'Notifications' ? notes.length : messages.length);

  return (
    <View style={{ flex: 1, backgroundColor: C.white }}>
      <Header title={tab} onBack={back} />
      <View style={s.tabs}>
        {tabs.map((t) => (
          <TouchableOpacity key={t} style={[s.tab, tab === t && s.tabActive]} onPress={() => setTab(t)}>
            <Text style={{ color: tab === t ? C.orange : C.grey }}>{`${t} (${count(t)})`}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView contentContainerStyle={{ padding: 24 }}>
        {isNotes
          ? notes.map((n, k) => (
              <View key={k} style={s.row}>
                <View style={s.avatar}>
                  <Text style={{ fontSize: 22 }}>🧑</Text>
                </View>
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text style={{ color: C.text }}>
                    <Text style={{ fontWeight: '800' }}>{n.who} </Text>
                    {n.text}
                  </Text>
                  <Text style={common.small}>{n.time}</Text>
                </View>
                <View style={s.thumb}>
                  <Text style={{ fontSize: 24 }}>{n.e}</Text>
                </View>
              </View>
            ))
          : messages.map((m, k) => (
              <View key={k} style={s.row}>
                <View style={s.avatar}>
                  <Text style={{ fontSize: 22 }}>🧑</Text>
                </View>
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text style={{ fontWeight: '800', color: C.text }}>{m.who}</Text>
                  <Text style={common.small}>{m.text}</Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={common.small}>{m.time}</Text>
                  {m.unread > 0 && (
                    <View style={s.badge}>
                      <Text style={{ color: C.white, fontSize: 10 }}>{m.unread}</Text>
                    </View>
                  )}
                </View>
              </View>
            ))}
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  tabs: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#EEF0F4', marginHorizontal: 24 },
  tab: { flex: 1, alignItems: 'center', paddingVertical: 12 },
  tabActive: { borderBottomWidth: 2, borderBottomColor: C.orange },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#F2F2F2' },
  avatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: C.peach, alignItems: 'center', justifyContent: 'center' },
  thumb: { width: 44, height: 44, borderRadius: 10, backgroundColor: '#FFF3E8', alignItems: 'center', justifyContent: 'center' },
  badge: { marginTop: 4, backgroundColor: C.orange, minWidth: 18, height: 18, borderRadius: 9, alignItems: 'center', justifyContent: 'center' },
});