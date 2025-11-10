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
  sellerId: string;
  tags: string[];
  available: boolean;
  stock: number;
  reviewCount: number;
  createdAt: string;
  comments: []
}

export interface Bakery {
  name: string;
  logo: string;
  description?: string;
}

export interface ProductFormData {
  name: string;
  bakery: string;
  bakeryLogo: string;
  price: number;
  size: string;
  temperature: string;
  description: string;
  image: string;
  category: string;
  tags: string[];
  stock: number;
  sellerId: string;
  available: boolean;
}

