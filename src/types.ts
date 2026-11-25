export type Item = { name: string; price: number; qty: number; e: string };

export type NavProps = {
  go: (screen: string) => void;
  back: () => void;
  reset: (screen: string) => void;
};
export type Address = {
  id: number;
  label: 'Home' | 'Work' | 'Other';
  text: string;
  street: string;
  post: string;
  apt: string;
  lat?: number;
  lng?: number;
};