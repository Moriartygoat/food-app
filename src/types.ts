export type Item = { name: string; price: number; qty: number; e: string };

export type NavProps = {
  go: (screen: string) => void;
  back: () => void;
  reset: (screen: string) => void;
};