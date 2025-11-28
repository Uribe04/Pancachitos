import { createAsyncThunk } from '@reduxjs/toolkit'
import { supabase } from '../../config/supabaseClient'
import type { Product } from '../../types/product'

// Fetch All Products
export const fetchProducts = createAsyncThunk(
  'products/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        return rejectWithValue(error.message)
      }

      return data as Product[]
    } catch (err) {
      return rejectWithValue('Error al obtener productos')
    }
  }
)

// Fetch Products by Seller
export const fetchProductsBySeller = createAsyncThunk(
  'products/fetchBySeller',
  async (sellerId: string, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('seller_id', sellerId)
        .order('created_at', { ascending: false })

      if (error) {
        return rejectWithValue(error.message)
      }

      return data as Product[]
    } catch (err) {
      return rejectWithValue('Error al obtener productos del vendedor')
    }
  }
)

// Create Product
export const createProduct = createAsyncThunk(
  'products/create',
  async (productData: Partial<Product>, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from('products')
        .insert([productData])
        .select()
        .single()

      if (error) {
        return rejectWithValue(error.message || 'Error al crear producto')
      }

      return data as Product
    } catch (err) {
      return rejectWithValue('Error al crear producto')
    }
  }
)

// Update Product
export const updateProduct = createAsyncThunk(
  'products/update',
  async ({ id, updates }: { id: string; updates: Partial<Product> }, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from('products')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (error) {
        return rejectWithValue(error.message || 'Error al actualizar producto')
      }

      return data as Product
    } catch (err) {
      return rejectWithValue('Error al actualizar producto')
    }
  }
)

// Delete Product
export const deleteProduct = createAsyncThunk(
  'products/delete',
  async (id: string, { rejectWithValue }) => {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id)

      if (error) {
        return rejectWithValue(error.message || 'Error al eliminar producto')
      }

      return id
    } catch (err) {
      return rejectWithValue('Error al eliminar producto')
    }
  }
)

// Toggle Product Availability
export const toggleProductAvailability = createAsyncThunk(
  'products/toggleAvailability',
  async ({ id, available }: { id: string; available: boolean }, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from('products')
        .update({ available })
        .eq('id', id)
        .select()
        .single()

      if (error) {
        return rejectWithValue(error.message)
      }

      return data as Product
    } catch (err) {
      return rejectWithValue('Error al cambiar disponibilidad')
    }
  }
)

// Update Product Stock
export const updateProductStock = createAsyncThunk(
  'products/updateStock',
  async ({ id, stock }: { id: string; stock: number }, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from('products')
        .update({ stock })
        .eq('id', id)
        .select()
        .single()

      if (error) {
        return rejectWithValue(error.message)
      }

      return data as Product
    } catch (err) {
      return rejectWithValue('Error al actualizar stock')
    }
  }
)


