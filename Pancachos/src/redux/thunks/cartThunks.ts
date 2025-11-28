import { createAsyncThunk } from '@reduxjs/toolkit'
import { supabase } from '../../config/supabaseClient'

// Fetch user's cart items
export const fetchCartItems = createAsyncThunk(
  'cart/fetchCartItems',
  async (userId: string, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from('cart_items')
        .select('*')
        .eq('user_id', userId)

      if (error) {
        return rejectWithValue(error.message)
      }

      return data || []
    } catch (err) {
      return rejectWithValue('Error al obtener carrito')
    }
  }
)

// Add item to cart
export const addToCart = createAsyncThunk(
  'cart/addItem',
  async (
    { userId, productId, quantity = 1 }: { userId: string; productId: string; quantity?: number },
    { rejectWithValue }
  ) => {
    try {
      // Verificar si el producto ya está en el carrito
      const { data: existingItem, error: checkError } = await supabase
        .from('cart_items')
        .select('*')
        .eq('user_id', userId)
        .eq('product_id', productId)
        .single()

      if (checkError && checkError.code !== 'PGRST116') {
        return rejectWithValue(checkError.message)
      }

      if (existingItem) {
        // Actualizar cantidad
        const { data, error: updateError } = await supabase
          .from('cart_items')
          .update({ quantity: existingItem.quantity + quantity })
          .eq('user_id', userId)
          .eq('product_id', productId)
          .select()
          .single()

        if (updateError) {
          return rejectWithValue(updateError.message)
        }

        return data
      } else {
        // Crear nuevo item en carrito
        const { data, error: insertError } = await supabase
          .from('cart_items')
          .insert({
            user_id: userId,
            product_id: productId,
            quantity,
          })
          .select()
          .single()

        if (insertError) {
          return rejectWithValue(insertError.message)
        }

        return data
      }
    } catch (err) {
      return rejectWithValue('Error al agregar al carrito')
    }
  }
)

// Remove item from cart
export const removeFromCart = createAsyncThunk(
  'cart/removeItem',
  async ({ userId, cartItemId }: { userId: string; cartItemId: string }, { rejectWithValue }) => {
    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('id', cartItemId)
        .eq('user_id', userId)

      if (error) {
        return rejectWithValue(error.message)
      }

      return cartItemId
    } catch (err) {
      return rejectWithValue('Error al remover del carrito')
    }
  }
)

// Update cart item quantity
export const updateCartItemQuantity = createAsyncThunk(
  'cart/updateQuantity',
  async (
    { userId, cartItemId, quantity }: { userId: string; cartItemId: string; quantity: number },
    { rejectWithValue }
  ) => {
    try {
      if (quantity <= 0) {
        // Si la cantidad es 0 o negativa, eliminar el item
        const { error } = await supabase
          .from('cart_items')
          .delete()
          .eq('id', cartItemId)
          .eq('user_id', userId)

        if (error) {
          return rejectWithValue(error.message)
        }

        return { cartItemId, deleted: true }
      }

      const { data, error } = await supabase
        .from('cart_items')
        .update({ quantity })
        .eq('id', cartItemId)
        .eq('user_id', userId)
        .select()
        .single()

      if (error) {
        return rejectWithValue(error.message)
      }

      return data
    } catch (err) {
      return rejectWithValue('Error al actualizar cantidad')
    }
  }
)

// Clear cart
export const clearCart = createAsyncThunk(
  'cart/clear',
  async (userId: string, { rejectWithValue }) => {
    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', userId)

      if (error) {
        return rejectWithValue(error.message)
      }

      return null
    } catch (err) {
      return rejectWithValue('Error al vaciar carrito')
    }
  }
)