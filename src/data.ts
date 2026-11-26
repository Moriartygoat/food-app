export const slides = [
  { e: '🍔', t: 'All your favorites', d: 'Get all your loved foods in one once place,\nyou just place the orer we do the rest' },
  { e: '🍕', t: 'All your favorites', d: 'Get all your loved foods in one once place,\nyou just place the orer we do the rest' },
  { e: '🍟', t: 'Order from choosen chef', d: 'Get all your loved foods in one once place,\nyou just place the orer we do the rest' },
  { e: '🛵', t: 'Free delivery offers', d: 'Get all your loved foods in one once place,\nyou just place the orer we do the rest' },
];

export type Food = {
  id: number;
  name: string;
  place: string;
  price: number;
  e: string;
  cat: string;
  kinds?: string[]; // виды блюда
};

const K: Record<string, string[]> = {
  Burger: ['Classic', 'Cheese', 'Double', 'Spicy'],
  Pizza: ['Cheese', 'Pepperoni', 'BBQ Chicken', 'Veggie'],
  'Hot Dog': ['Classic', 'Cheese', 'Chili', 'Corn Dog'],
  Fries: ['Classic', 'Curly', 'Wedges', 'Cheese Fries'],
  Chicken: ['Nuggets', 'Wings', 'Strips', 'Fried Leg'],
  Shawarma: ['Chicken', 'Beef', 'Mix', 'Cheese'],
  Tacos: ['Beef', 'Chicken', 'Veggie', 'Spicy'],
  Sandwich: ['Chicken', 'Ham & Cheese', 'Tuna', 'Veggie'],
  Donut: ['Chocolate', 'Sugar', 'Strawberry', 'Caramel'],
  Drinks: ['Cola', 'Orange', 'Lemonade', 'Iced Tea'],
  Dessert: ['Chocolate', 'Vanilla', 'Strawberry', 'Caramel'],
  Pasta: ['Cheese', 'Creamy', 'Tomato', 'Spicy'],
};

let _id = 0;
const mk = (cat: string, e: string, rows: [string, string, number, string[]?][]): Food[] =>
  rows.map(([name, place, price, kinds]) => ({ id: ++_id, name, place, price, e, cat, kinds: kinds ?? K[cat] }));

export const foods: Food[] = [
  ...mk('Burger', '🍔', [
    ['Burger Bistro', 'Rose Garden', 40],
    ["Smokin' Burger", 'Cafenio Restaurant', 60],
    ['Buffalo Burgers', 'Kaji Firm Kitchen', 75],
    ['Bullseye Burger', 'Kabab Restaurant', 94],
    ['Double Cheese Burger', 'Street Food Hub', 55],
    ['Chicken Burger', 'Spicy Restaurant', 42],
    ['Mushroom Swiss Burger', 'Rose Garden', 58],
  ]),
  ...mk('Pizza', '🍕', [
    ['Pizza Calzone European', 'Uttora Coffe House', 32],
    ['Buffalo Pizza', 'Cafenio Coffee Club', 45],
    ['Margherita', 'Pansi Restaurant', 38],
    ['Pepperoni Feast', 'Pansi Restaurant', 48],
    ['Four Cheese', 'Rose Garden', 52],
    ['BBQ Chicken Pizza', 'Street Food Hub', 50],
    ['Veggie Garden', 'Cafenio Restaurant', 36],
  ]),
  ...mk('Hot Dog', '🌭', [
    ['Classic Hot Dog', 'Rose Garden', 18],
    ['Chicago Dog', 'Spicy Restaurant', 22],
    ['Jumbo Dog', 'Street Food Hub', 26],
    ['Cheese Dog', 'Rose Garden', 24],
    ['Chili Dog', 'Spicy Restaurant', 25],
    ['Corn Dog', 'Uttora Coffe House', 16],
    ['Bacon Dog', 'Kabab Restaurant', 28],
  ]),
  ...mk('Fries', '🍟', [
    ['Golden Fries', 'Street Food Hub', 12],
    ['Loaded Fries', 'Rose Garden', 16],
    ['Potato Box', 'Kabab Restaurant', 14],
    ['Curly Fries', 'Rose Garden', 13],
    ['Cheese Fries', 'Pansi Restaurant', 17],
    ['Sweet Potato Fries', 'Cafenio Restaurant', 15],
    ['Fries Combo', 'Street Food Hub', 20],
  ]),
  ...mk('Chicken', '🍗', [
    ['Crispy Chicken Bucket', 'Spicy Restaurant', 48],
    ['Hot Wings', 'Cafenio Restaurant', 34],
    ['Chicken Nuggets', 'Street Food Hub', 28],
    ['Chicken Strips', 'Kabab Restaurant', 32],
    ['Fried Chicken Leg', 'Rose Garden', 30],
    ['Spicy Popcorn Chicken', 'Pansi Restaurant', 29],
    ['Chicken Box', 'Street Food Hub', 44],
  ]),
  ...mk('Shawarma', '🌯', [
    ['Chicken Shawarma', 'Kabab Restaurant', 22],
    ['Big Shawarma', 'Spicy Restaurant', 30],
    ['Doner Wrap', 'Street Food Hub', 26],
    ['Beef Shawarma', 'Kabab Restaurant', 28],
    ['Cheese Shawarma', 'Rose Garden', 27],
    ['Mix Shawarma', 'Pansi Restaurant', 32],
    ['Mini Shawarma', 'Cafenio Restaurant', 18],
  ]),
  ...mk('Tacos', '🌮', [
    ['Beef Tacos', 'Pansi Restaurant', 24],
    ['Mexican Tacos', 'Cafenio Restaurant', 20],
    ['Taco Combo', 'Street Food Hub', 32],
    ['Chicken Tacos', 'Spicy Restaurant', 22],
    ['Veggie Tacos', 'Rose Garden', 19],
    ['Spicy Tacos', 'Kabab Restaurant', 23],
    ['Burrito', 'Pansi Restaurant', 29],
  ]),
  ...mk('Sandwich', '🥪', [
    ['Club Sandwich', 'Cafenio Restaurant', 24],
    ['Chicken Sandwich', 'Kabab Restaurant', 26],
    ['Sub Sandwich', 'Rose Garden', 28],
    ['Tuna Sandwich', 'Rose Garden', 25],
    ['Ham & Cheese', 'Kabab Restaurant', 22],
    ['Veggie Sandwich', 'Pansi Restaurant', 21],
    ['Grilled Cheese', 'Uttora Coffe House', 19],
  ]),
  ...mk('Donut', '🍩', [
    ['Glazed Donut', 'Uttora Coffe House', 8],
    ['Donut Box (6)', 'Uttora Coffe House', 35],
    ['Chocolate Donut', 'Rose Garden', 9],
    ['Strawberry Donut', 'Cafenio Restaurant', 9],
    ['Caramel Donut', 'Pansi Restaurant', 10],
    ['Mini Donuts', 'Street Food Hub', 14],
    ['Filled Donut', 'Kabab Restaurant', 11],
  ]),
  ...mk('Drinks', '🥤', [
    ['Cola', 'Street Food Hub', 6],
    ['Milkshake', 'Rose Garden', 14, ['Vanilla', 'Chocolate', 'Strawberry', 'Banana']],
    ['Fresh Lemonade', 'Pansi Restaurant', 10],
    ['Iced Tea', 'Rose Garden', 8],
    ['Orange Juice', 'Uttora Coffe House', 9],
    ['Cold Coffee', 'Uttora Coffe House', 12, ['Latte', 'Mocha', 'Caramel', 'Vanilla']],
    ['Mint Lemonade', 'Cafenio Restaurant', 11],
  ]),
  ...mk('Dessert', '🍰', [
    ['Chocolate Cake', 'Uttora Coffe House', 15],
    ['Ice Cream', 'Rose Garden', 12],
    ['Cheesecake', 'Pansi Restaurant', 18],
    ['Brownie', 'Uttora Coffe House', 14],
    ['Tiramisu', 'Cafenio Restaurant', 20],
    ['Cupcake', 'Rose Garden', 9],
    ['Waffles', 'Street Food Hub', 16],
  ]),
  ...mk('Pasta', '🍝', [
    ['Carbonara', 'Pansi Restaurant', 30],
    ['Spaghetti Bolognese', 'Tasty Treat Gallery', 28],
    ['Mac & Cheese', 'Street Food Hub', 26],
    ['Penne Arrabbiata', 'Pansi Restaurant', 27],
    ['Alfredo', 'Tasty Treat Gallery', 32],
    ['Lasagna', 'Pansi Restaurant', 34],
    ['Pesto Pasta', 'Rose Garden', 29],
  ]),
];

const meta: [string, string][] = [
  ['Burger', '🍔'], ['Pizza', '🍕'], ['Hot Dog', '🌭'], ['Fries', '🍟'],
  ['Chicken', '🍗'], ['Shawarma', '🌯'], ['Tacos', '🌮'], ['Sandwich', '🥪'],
  ['Donut', '🍩'], ['Drinks', '🥤'], ['Dessert', '🍰'], ['Pasta', '🍝'],
];

export const categories = meta.map(([n, e]) => ({
  n,
  e,
  p: Math.min(...foods.filter((f) => f.cat === n).map((f) => f.price)),
}));

export const restaurants = [
  { n: 'Rose Garden Restaurant', e: '🍔' },
  { n: 'Street Food Hub', e: '🌭' },
  { n: 'Spicy Restaurant', e: '🍗' },
  { n: 'Kabab Restaurant', e: '🌯' },
  { n: 'Uttora Coffee House', e: '🍩' },
  { n: 'Pansi Restaurant', e: '🍕' },
];