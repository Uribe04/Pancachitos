export interface Product {
  id: number;
  name: string;
  bakery: string;
  bakeryLogo?: string; // 🔴 REEMPLAZAR con tu logo real
  price: number;
  rating: number;
  size: string;
  temperature: string;
  description: string;
  image: string;
  category: string;
}

export interface Bakery {
  name: string;
  logo: string; // 🔴 REEMPLAZAR con tu logo real
  description?: string;
}