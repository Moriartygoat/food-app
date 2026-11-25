import React, { useState } from 'react';
import { View, Text, StatusBar } from 'react-native';

import SplashScreen from './src/screens/SplashScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import ForgotScreen from './src/screens/ForgotScreen';
import VerifyScreen from './src/screens/VerifyScreen';
import HomeScreen from './src/screens/HomeScreen';
import FoodsScreen from './src/screens/FoodsScreen';
import SearchScreen from './src/screens/SearchScreen';
import DetailsScreen from './src/screens/DetailsScreen';
import CartScreen from './src/screens/CartScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import PersonalInfoScreen from './src/screens/PersonalInfoScreen';
import MyOrdersScreen from './src/screens/MyOrdersScreen';
import SuccessScreen from './src/screens/SuccessScreen';
import AddressesScreen from './src/screens/AddressesScreen';
import AddressFormScreen from './src/screens/AddressFormScreen';
import FavouritesScreen from './src/screens/FavouritesScreen';
import NotificationsScreen from './src/screens/NotificationsScreen';
import Header from './src/components/Header';
import { foods } from './src/data';
import type { Food } from './src/data';
import { Item, Address } from './src/types';
import { C, common } from './src/theme';

const DARK_SCREENS = ['login', 'signup', 'forgot', 'verify', 'cart'];

export default function App() {
  const [stack, setStack] = useState<string[]>(['splash']);
  const [selected, setSelected] = useState<Food>(foods[0]);
  const [toast, setToast] = useState('');
  const [favs, setFavs] = useState<number[]>([]);
  const [editing, setEditing] = useState<Address | null>(null);
  const [selectedAddr, setSelectedAddr] = useState<number | null>(1);
  const [addresses, setAddresses] = useState<Address[]>([
    { id: 1, label: 'Home', text: 'Абай даңғылы 10, Алматы', street: 'Абай даңғылы 10', post: '050000', apt: '', lat: 43.2389, lng: 76.8897 },
    { id: 2, label: 'Work', text: 'Достық даңғылы 100, Алматы', street: 'Достық даңғылы 100', post: '050010', apt: '', lat: 43.2381, lng: 76.9566 },
  ]);
  const [items, setItems] = useState<Item[]>([
    { name: 'Pizza Calzone European', price: 32, qty: 2, e: '🍕' },
    { name: 'Pizza Calzone European', price: 32, qty: 1, e: '🍕' },
  ]);

  const screen = stack[stack.length - 1];
  const go = (n: string) => setStack([...stack, n]);
  const back = () => setStack(stack.length > 1 ? stack.slice(0, -1) : stack);
  const reset = (n: string) => setStack([n]);
  const nav = { go, back, reset };
  const openFood = (f: Food) => { setSelected(f); go('details'); };
  const cartCount = items.reduce((sum, it) => sum + it.qty, 0);

  const toggleFav = (id: number) =>
    setFavs((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  const saveAddress = (a: Address) => {
    setAddresses((p) => (p.some((x) => x.id === a.id) ? p.map((x) => (x.id === a.id ? a : x)) : [...p, a]));
    setSelectedAddr(a.id);
    back();
  };

  const addItem = (it: Item) =>
    setItems((prev) => {
      const k = prev.findIndex((p) => p.name === it.name && p.price === it.price);
      if (k === -1) return [...prev, it];
      return prev.map((p, j) => (j === k ? { ...p, qty: p.qty + it.qty } : p));
    });

  const addFood = (f: Food) => {
    addItem({ name: f.name, price: f.price, qty: 1, e: f.e });
    setToast(f.name + ' added to cart');
    setTimeout(() => setToast(''), 1500);
  };

  const placeOrder = () => {
    setItems([]);
    go('success');
  };

  const deliveryAddr = addresses.find((x) => x.id === selectedAddr) ?? null;

  let view: React.ReactNode = null;
  switch (screen) {
    case 'splash': view = <SplashScreen onFinish={() => reset('onboarding')} />; break;
    case 'onboarding': view = <OnboardingScreen onDone={() => reset('login')} />; break;
    case 'login': view = <LoginScreen {...nav} />; break;
    case 'signup': view = <SignUpScreen {...nav} />; break;
    case 'forgot': view = <ForgotScreen {...nav} />; break;
    case 'verify': view = <VerifyScreen {...nav} />; break;
    case 'home': view = <HomeScreen go={go} cartCount={cartCount} onFood={openFood} onAdd={addFood} />; break;
    case 'foods': view = <FoodsScreen back={back} go={go} onFood={openFood} onAdd={addFood} />; break;
    case 'search': view = <SearchScreen back={back} go={go} onFood={openFood} />; break;
    case 'details':
      view = (
        <DetailsScreen
          back={back}
          food={selected}
          fav={favs.includes(selected.id)}
          onFav={() => toggleFav(selected.id)}
          onAdd={(it) => { addItem(it); go('cart'); }}
        />
      );
      break;
    case 'cart':
      view = (
        <CartScreen
          back={back}
          items={items}
          setItems={setItems}
          onPlace={placeOrder}
          address={deliveryAddr?.text ?? ''}
          coords={deliveryAddr && deliveryAddr.lat != null && deliveryAddr.lng != null ? { lat: deliveryAddr.lat, lng: deliveryAddr.lng } : null}
          onEditAddress={() => go('addresses')}
        />
      );
      break;
    case 'profile': view = <ProfileScreen {...nav} />; break;
    case 'personal': view = <PersonalInfoScreen back={back} />; break;
    case 'orders': view = <MyOrdersScreen {...nav} />; break;
    case 'success':
      view = <SuccessScreen onTrack={() => setStack(['home', 'orders'])} onHome={() => reset('home')} />;
      break;
    case 'addresses':
      view = (
        <AddressesScreen
          back={back}
          addresses={addresses}
          selectedId={selectedAddr}
          onSelect={setSelectedAddr}
          onEdit={(a) => { setEditing(a); go('addressForm'); }}
          onAddNew={() => { setEditing(null); go('addressForm'); }}
          onDelete={(id) => setAddresses((p) => p.filter((x) => x.id !== id))}
        />
      );
      break;
    case 'addressForm': view = <AddressFormScreen back={back} initial={editing} onSave={saveAddress} />; break;
    case 'favourites': view = <FavouritesScreen back={back} favs={favs} onFood={openFood} onToggle={toggleFav} />; break;
    case 'notifications': view = <NotificationsScreen back={back} />; break;
    default:
      view = (
        <View style={{ flex: 1, backgroundColor: C.white }}>
          <Header title={screen} onBack={back} />
          <View style={common.center}>
            <Text style={{ fontSize: 48 }}>🚧</Text>
            <Text style={common.small}>This screen is coming soon</Text>
          </View>
        </View>
      );
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle={DARK_SCREENS.includes(screen) ? 'light-content' : 'dark-content'} />
      {view}
      {toast !== '' && (
        <View style={{ position: 'absolute', bottom: 40, alignSelf: 'center', backgroundColor: C.navy, paddingHorizontal: 20, paddingVertical: 12, borderRadius: 24 }}>
          <Text style={{ color: C.white }}>{toast}</Text>
        </View>
      )}
    </View>
  );
}