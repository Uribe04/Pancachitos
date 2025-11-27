export interface User {
  id?: string;  // UUID de Supabase (opcional en creación)
  email: string;
  password: string;
  user_type: "client" | "bakery";  // Cambié de type a user_type (snake_case Supabase)
  bakery_name?: string;  // Cambié de bakeryName a snake_case
  profile_image?: string;  // Cambié de profileImage a snake_case
  created_at?: string;  // Nuevo: timestamp de creación
  updated_at?: string;  // Nuevo: timestamp de actualización
}