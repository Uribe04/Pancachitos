export interface Product {
  bakery: string;
  id: string;  // Cambié de number a string (UUID de Supabase)
  name: string;
  price: number;
  rating?: number;  // Opcional
  size?: string;  // Opcional
  temperature?: string;  // Opcional
  description?: string;  // Opcional
  image?: string;  // Opcional
  category?: string;  // Opcional
  tags?: string[];  // Opcional
  available: boolean;
  stock: number;
  review_count: number;  // Cambié de reviewCount a snake_case (Supabase)
  seller_id: string;  // Cambié de sellerId a snake_case (Supabase)
  created_at: string;  // Cambié de createdAt a snake_case (Supabase)
  updated_at: string;  // Nuevo: timestamp de actualización
}

export interface Bakery {
  name: string;
  logo: string;
  description?: string;
}

export interface ProductFormData {
  name: string;
  price: number;
  size?: string;
  temperature?: string;
  description?: string;
  image?: string;
  category?: string;
  tags?: string[];
  stock: number;
  seller_id?: string;  // Opcional: se proporciona desde el componente que usa el formulario
  available: boolean;
}

