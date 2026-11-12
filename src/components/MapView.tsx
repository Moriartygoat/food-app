import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, LayoutChangeEvent } from 'react-native';

type Props = {
  pin: { x: number; y: number };
  onPick: (x: number, y: number) => void;
  height?: number;
};

export default function MapView({ pin, onPick, height = 220 }: Props) {
  const [size, setSize] = useState({ w: 300, h: height });
  const onLayout = (e: LayoutChangeEvent) =>
    setSize({ w: e.nativeEvent.layout.width, h: e.nativeEvent.layout.height });

  return (
    <Pressable
      style={[s.map, { height }]}
      onLayout={onLayout}
      onPress={(e) => onPick(e.nativeEvent.locationX / size.w, e.nativeEvent.locationY / size.h)}
    >
      <View pointerEvents="none" style={StyleSheet.absoluteFill}>
        <View style={[s.green, { left: '58%', top: '8%', width: 90, height: 70 }]} />
        <View style={[s.green, { left: '8%', top: '62%', width: 70, height: 60 }]} />
        <View style={[s.road, { top: '35%', left: '-10%', width: '130%', height: 14, transform: [{ rotate: '-12deg' }] }]} />
        <View style={[s.road, { top: '72%', left: '-10%', width: '130%', height: 10, transform: [{ rotate: '8deg' }] }]} />
        <View style={[s.road, { left: '30%', top: '-10%', width: 12, height: '130%', transform: [{ rotate: '15deg' }] }]} />
        <Text style={[s.pin, { left: pin.x * size.w - 14, top: pin.y * size.h - 30 }]}>📍</Text>
      </View>
    </Pressable>
  );
}

const s = StyleSheet.create({
  map: { backgroundColor: '#EEF1F4', borderRadius: 16, overflow: 'hidden' },
  green: { position: 'absolute', backgroundColor: '#BFE3B4', borderRadius: 30 },
  road: { position: 'absolute', backgroundColor: '#FFE08A' },
  pin: { position: 'absolute', fontSize: 28 },
});
