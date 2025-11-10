export interface Product {
  id: number;
  name: string;
  bakery: string;
  bakeryLogo: string;
  price: number;
  rating: number;
  size: string;
  temperature: string;
  description: string;
  image: string;
  category: string;
  comments: []
}

export interface Bakery {
  name: string;
  logo: string;
  description?: string;
}