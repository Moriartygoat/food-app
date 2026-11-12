export const slides = [
  { e: '🧑‍📱', t: 'All your favorites', d: 'Get all your loved foods in one once place,\nyou just place the orer we do the rest' },
  { e: '🍕', t: 'All your favorites', d: 'Get all your loved foods in one once place,\nyou just place the orer we do the rest' },
  { e: '👨‍🍳', t: 'Order from choosen chef', d: 'Get all your loved foods in one once place,\nyou just place the orer we do the rest' },
  { e: '🛵', t: 'Free delivery offers', d: 'Get all your loved foods in one once place,\nyou just place the orer we do the rest' },
];

export const categories = [
  { n: 'Pizza', p: 70, e: '🍕' },
  { n: 'Burger', p: 50, e: '🍔' },
  { n: 'Hot Dog', p: 30, e: '🌭' },
  { n: 'Pasta', p: 40, e: '🍝' },
  { n: 'Sandwich', p: 35, e: '🥪' },
  { n: 'Sushi', p: 60, e: '🍣' },
  { n: 'Salad', p: 25, e: '🥗' },
  { n: 'Dessert', p: 20, e: '🍰' },
];

export type Food = { id: number; name: string; place: string; price: number; e: string; cat: string };

export const foods: Food[] = [
  { id: 1, name: 'Burger Bistro', place: 'Rose Garden', price: 40, e: '🍔', cat: 'Burger' },
  { id: 2, name: "Smokin' Burger", place: 'Cafenio Restaurant', price: 60, e: '🍔', cat: 'Burger' },
  { id: 3, name: 'Buffalo Burgers', place: 'Kaji Firm Kitchen', price: 75, e: '🍔', cat: 'Burger' },
  { id: 4, name: 'Bullseye Burger', place: 'Kabab Restaurant', price: 94, e: '🍔', cat: 'Burger' },
  { id: 5, name: 'Pizza Calzone European', place: 'Uttora Coffe House', price: 32, e: '🍕', cat: 'Pizza' },
  { id: 6, name: 'Buffalo Pizza', place: 'Cafenio Coffee Club', price: 45, e: '🍕', cat: 'Pizza' },
  { id: 7, name: 'Margherita', place: 'Pansi Restaurant', price: 38, e: '🍕', cat: 'Pizza' },
  { id: 8, name: 'Classic Hot Dog', place: 'Rose Garden', price: 18, e: '🌭', cat: 'Hot Dog' },
  { id: 9, name: 'Chicago Dog', place: 'Spicy Restaurant', price: 22, e: '🌭', cat: 'Hot Dog' },
  { id: 10, name: 'Carbonara', place: 'Pansi Restaurant', price: 30, e: '🍝', cat: 'Pasta' },
  { id: 11, name: 'Spaghetti Bolognese', place: 'Tasty Treat Gallery', price: 28, e: '🍝', cat: 'Pasta' },
  { id: 12, name: 'Club Sandwich', place: 'Cafenio Restaurant', price: 24, e: '🥪', cat: 'Sandwich' },
  { id: 13, name: 'Chicken Sandwich', place: 'Kabab Restaurant', price: 26, e: '🥪', cat: 'Sandwich' },
  { id: 14, name: 'Sushi Set', place: 'Spicy Restaurant', price: 55, e: '🍣', cat: 'Sushi' },
  { id: 15, name: 'Greek Salad', place: 'Tasty Treat Gallery', price: 20, e: '🥗', cat: 'Salad' },
  { id: 16, name: 'Chocolate Cake', place: 'Uttora Coffe House', price: 15, e: '🍰', cat: 'Dessert' },
];

export const restaurants = [
  { n: 'Rose Garden Restaurant', e: '🥗' },
  { n: 'Tasty Treat Gallery', e: '🍲' },
  { n: 'Spicy Restaurant', e: '🍛' },
  { n: 'Uttora Coffee House', e: '☕' },
  { n: 'Pansi Restaurant', e: '🍜' },
];