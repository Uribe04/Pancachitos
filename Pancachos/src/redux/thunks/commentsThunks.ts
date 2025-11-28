import { createAsyncThunk } from '@reduxjs/toolkit'
import { supabase } from '../../config/supabaseClient'

// Interfaz para Comment
interface Comment {
  id: string
  product_id: string
  user_id: string
  content: string
  rating: number
  created_at: string
}

// Fetch Comments by Product
export const fetchProductComments = createAsyncThunk(
  'comments/fetchByProduct',
  async (productId: string, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .eq('product_id', productId)
        .order('created_at', { ascending: false })

      if (error) {
        return rejectWithValue(error.message)
      }

      return data as Comment[]
    } catch (err) {
      return rejectWithValue('Error al obtener comentarios')
    }
  }
)

// Create Comment
export const createComment = createAsyncThunk(
  'comments/create',
  async (
    {
      productId,
      userId,
      content,
      rating,
    }: { productId: string; userId: string; content: string; rating: number },
    { rejectWithValue }
  ) => {
    try {
      const { data, error } = await supabase
        .from('comments')
        .insert([
          {
            product_id: productId,
            user_id: userId,
            content,
            rating,
            created_at: new Date().toISOString(),
          },
        ])
        .select()
        .single()

      if (error) {
        return rejectWithValue(error.message || 'Error al crear comentario')
      }

      return data as Comment
    } catch (err) {
      return rejectWithValue('Error al crear comentario')
    }
  }
)

// Delete Comment
export const deleteComment = createAsyncThunk(
  'comments/delete',
  async (commentId: string, { rejectWithValue }) => {
    try {
      const { error } = await supabase
        .from('comments')
        .delete()
        .eq('id', commentId)

      if (error) {
        return rejectWithValue(error.message || 'Error al eliminar comentario')
      }

      return commentId
    } catch (err) {
      return rejectWithValue('Error al eliminar comentario')
    }
  }
)

// Update Comment (if needed)
export const updateComment = createAsyncThunk(
  'comments/update',
  async (
    {
      commentId,
      content,
      rating,
    }: { commentId: string; content: string; rating: number },
    { rejectWithValue }
  ) => {
    try {
      const { data, error } = await supabase
        .from('comments')
        .update({ content, rating })
        .eq('id', commentId)
        .select()
        .single()

      if (error) {
        return rejectWithValue(error.message || 'Error al actualizar comentario')
      }

      return data as Comment
    } catch (err) {
      return rejectWithValue('Error al actualizar comentario')
    }
  }
)
