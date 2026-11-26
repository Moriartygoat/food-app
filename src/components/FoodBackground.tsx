import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export type Theme = {
  colors: [string, string, string];
  emojis: string[];
  accent: string;
  title: string;
  sub: string;
};

const W = 'rgba(255,255,255,0)';

export const themes: Record<string, Theme> = {
  default: { colors: ['rgba(255,196,64,0.28)', W, 'rgba(255,118,34,0.18)'], emojis: ['🍔', '🍕', '🌭', '🍟', '🍗', '🌯', '🌮', '🥪', '🍩', '🥤'], accent: '#FF7622', title: 'All Foods', sub: 'Everything you love, delivered hot' },
  Burger: { colors: ['rgba(255,170,60,0.30)', W, 'rgba(160,80,20,0.16)'], emojis: ['🍔', '🧀', '🍅', '🥬', '🍟'], accent: '#F08A24', title: 'Juicy Burgers', sub: 'Up to 30% off today' },
  Pizza: { colors: ['rgba(255,99,71,0.28)', W, 'rgba(255,190,70,0.20)'], emojis: ['🍕', '🍅', '🧀', '🌿', '🍄'], accent: '#E5452F', title: 'Hot Pizzas', sub: 'Fresh from the oven in 20 min' },
  'Hot Dog': { colors: ['rgba(255,214,60,0.34)', W, 'rgba(220,70,40,0.14)'], emojis: ['🌭', '🧅', '🍟', '🌶️'], accent: '#E8A80C', title: 'Street Hot Dogs', sub: 'Classic taste, big size' },
  Fries: { colors: ['rgba(255,225,80,0.34)', W, 'rgba(255,140,40,0.14)'], emojis: ['🍟', '🧂', '🥔', '🍅'], accent: '#F2B705', title: 'Crispy Fries', sub: 'Golden and super crunchy' },
  Chicken: { colors: ['rgba(255,160,70,0.30)', W, 'rgba(200,60,30,0.14)'], emojis: ['🍗', '🌶️', '🔥', '🍟'], accent: '#D9701C', title: 'Fried Chicken', sub: 'Spicy wings and crispy buckets' },
  Shawarma: { colors: ['rgba(235,190,120,0.34)', W, 'rgba(120,170,70,0.14)'], emojis: ['🌯', '🥙', '🧅', '🍅'], accent: '#C9822B', title: 'Shawarma', sub: 'Juicy meat, fresh vegetables' },
  Tacos: { colors: ['rgba(120,200,90,0.30)', W, 'rgba(255,200,60,0.18)'], emojis: ['🌮', '🌶️', '🥑', '🌽'], accent: '#3FA34D', title: 'Mexican Tacos', sub: 'Spicy, fresh and colorful' },
  Sandwich: { colors: ['rgba(150,210,90,0.30)', W, 'rgba(255,170,80,0.16)'], emojis: ['🥪', '🥬', '🧀', '🍅'], accent: '#6BA83A', title: 'Sandwiches', sub: 'Fresh bread, tasty filling' },
  Donut: { colors: ['rgba(255,150,200,0.34)', W, 'rgba(170,120,255,0.16)'], emojis: ['🍩', '🍓', '🍫', '✨'], accent: '#E0559C', title: 'Sweet Donuts', sub: 'Buy 5, get 1 free' },
  Drinks: { colors: ['rgba(100,190,255,0.32)', W, 'rgba(120,230,200,0.18)'], emojis: ['🥤', '🧊', '🍋', '🍹'], accent: '#2E8BE6', title: 'Cold Drinks', sub: 'Refresh yourself' },
  Dessert: { colors: ['rgba(200,140,255,0.30)', W, 'rgba(255,150,190,0.18)'], emojis: ['🍰', '🍨', '🍓', '🧁'], accent: '#A24BC9', title: 'Desserts', sub: 'Something sweet after dinner' },
  Pasta: { colors: ['rgba(255,120,80,0.28)', W, 'rgba(255,210,90,0.18)'], emojis: ['🍝', '🍅', '🧀', '🌿'], accent: '#D6452D', title: 'Italian Pasta', sub: 'Made fresh every day' },
};

export const getTheme = (k?: string): Theme => themes[k ?? 'default'] ?? themes.default;

// "rgba(r,g,b,a)" -> тот же цвет, но прозрачность умножена на k
const withAlpha = (rgba: string, k: number) => {
  const m = rgba.match(/rgba\((\d+),(\d+),(\d+),([\d.]+)\)/);
  if (!m) return rgba;
  return `rgba(${m[1]},${m[2]},${m[3]},${(parseFloat(m[4]) * k).toFixed(3)})`;
};

const STRIPS = 28;

export default function FoodBackground({ theme = 'default' }: { theme?: string }) {
  const t = getTheme(theme);
  const cells = Array.from({ length: 48 }, (_, i) => t.emojis[(i * 2 + Math.floor(i / 4)) % t.emojis.length]);

  const strips = Array.from({ length: STRIPS }, (_, i) => {
    const p = i / (STRIPS - 1);
    return p < 0.5 ? withAlpha(t.colors[0], 1 - p * 2) : withAlpha(t.colors[2], (p - 0.5) * 2);
  });

  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      <View style={StyleSheet.absoluteFill}>
        {strips.map((c, i) => (
          <View key={i} style={{ flex: 1, backgroundColor: c }} />
        ))}
      </View>
      <View
        style={[
          StyleSheet.absoluteFill,
          { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', alignContent: 'space-around', opacity: 0.08, overflow: 'hidden' },
        ]}
      >
        {cells.map((e, i) => (
          <Text key={i} style={{ fontSize: 40, margin: 16, transform: [{ rotate: i % 2 ? '-15deg' : '15deg' }] }}>
            {e}
          </Text>
        ))}
      </View>
    </View>
  );
}