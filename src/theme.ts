import { Platform, StatusBar, StyleSheet } from 'react-native';

export const C = {
  orange: '#FF7622',
  dark: '#121223',
  navy: '#181C2E',
  input: '#F0F5FA',
  grey: '#A0A5BA',
  text: '#32343E',
  peach: '#FFE1CE',
  yellow: '#FFD27C',
  white: '#FFFFFF',
};

export const TOP = Platform.OS === 'android' ? (StatusBar.currentHeight ?? 24) : 48;

export const common = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  label: { fontSize: 13, color: C.text, marginBottom: 8 },
  input: { backgroundColor: C.input, height: 62, borderRadius: 10, paddingHorizontal: 20, fontSize: 14, color: C.text },
  small: { fontSize: 13, color: C.grey },
  h2: { fontSize: 16, color: C.text },
  meta: { fontSize: 13, fontWeight: '700', color: C.text },
});