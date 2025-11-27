/**
 * Utilidad para convertir datos entre formato antiguo (localStorage) y nuevo (Supabase)
 * Esta es una capa de transición mientras migramos completamente a Supabase
 */

export interface OldUser {
  email: string;
  password: string;
  type: "client" | "bakery";
  bakeryName?: string;
  profileImage?: string;
}

export interface OldProduct {
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
  comments: any[];
}

/**
 * Convierte usuario del formato antiguo al nuevo (snake_case de Supabase)
 */
export function convertUserToSupabase(oldUser: Partial<OldUser>): any {
  return {
    email: oldUser.email,
    password: oldUser.password,
    user_type: oldUser.type,
    bakery_name: oldUser.bakeryName,
    profile_image: oldUser.profileImage,
  };
}

/**
 * Convierte usuario del formato nuevo de Supabase al antiguo (para compatibilidad)
 */
export function convertUserFromSupabase(newUser: any): OldUser {
  return {
    email: newUser.email,
    password: newUser.password,
    type: newUser.user_type,
    bakeryName: newUser.bakery_name,
    profileImage: newUser.profile_image,
  };
}

/**
 * Convierte producto del formato antiguo al nuevo (snake_case de Supabase)
 */
export function convertProductToSupabase(oldProduct: Partial<OldProduct>): any {
  return {
    name: oldProduct.name,
    price: oldProduct.price,
    rating: oldProduct.rating,
    size: oldProduct.size,
    temperature: oldProduct.temperature,
    description: oldProduct.description,
    image: oldProduct.image,
    category: oldProduct.category,
    seller_id: oldProduct.sellerId,
    tags: oldProduct.tags,
    available: oldProduct.available,
    stock: oldProduct.stock,
    review_count: oldProduct.reviewCount || 0,
  };
}

/**
 * Convierte producto del formato nuevo de Supabase al antiguo (para compatibilidad)
 */
export function convertProductFromSupabase(newProduct: any): OldProduct {
  return {
    id: newProduct.id as unknown as number, // UUID convertido a number (temporal)
    name: newProduct.name,
    bakery: "", // Este campo no existe en Supabase
    bakeryLogo: "", // Este campo no existe en Supabase
    price: newProduct.price,
    rating: newProduct.rating || 0,
    size: newProduct.size || "",
    temperature: newProduct.temperature || "",
    description: newProduct.description || "",
    image: newProduct.image || "",
    category: newProduct.category || "",
    sellerId: newProduct.seller_id || "",
    tags: newProduct.tags || [],
    available: newProduct.available,
    stock: newProduct.stock,
    reviewCount: newProduct.review_count || 0,
    createdAt: newProduct.created_at || "",
    comments: [],
  };
}
