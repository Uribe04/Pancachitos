import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://clqwpxfelouuzhvecqgx.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNscXdweGZlbG91dXpodmVjcWd4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQyNjcxMzEsImV4cCI6MjA3OTg0MzEzMX0.Dgt83ii6JW4XfHfuLP4rs38MdNSy9YaMoOQMRSC2nZ8'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tipos para TypeScript
export interface User {
  id: string
  email: string
  password: string
  user_type: 'client' | 'bakery'
  bakery_name?: string
  profile_image?: string
  created_at: string
  updated_at: string
}

export interface Product {
  id: string
  name: string
  price: number
  rating?: number
  size?: string
  temperature?: string
  description?: string
  image?: string
  category?: string
  tags?: string[]
  available: boolean
  stock: number
  review_count: number
  seller_id: string
  created_at: string
  updated_at: string
}

export interface Comment {
  id: string
  product_id: string
  user_id: string
  content?: string
  rating?: number
  created_at: string
}

export interface CartItem {
  id: string
  user_id: string
  product_id: string
  quantity: number
  created_at: string
  updated_at: string
}

export interface Favorite {
  id: string
  user_id: string
  product_id: string
  created_at: string
}
