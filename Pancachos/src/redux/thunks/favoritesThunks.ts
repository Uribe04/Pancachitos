import { createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from '../../config/supabaseClient';

// Fetch user's favorite products with details
export const fetchUserFavorites = createAsyncThunk(
  'favorites/fetchUserFavorites',
  async (userId: string, { rejectWithValue }) => {
    try {
      // Primero obtenemos los IDs favoritos
      const { data: favData, error: favError } = await supabase
        .from('favorites')
        .select('product_id')
        .eq('user_id', userId);

      if (favError) {
        return rejectWithValue(favError.message);
      }

      const favoriteIds = (favData || []).map((fav) => fav.product_id);

      if (favoriteIds.length === 0) return [];

      // Ahora obtenemos los detalles de los productos favoritos
      const { data: productsData, error: prodError } = await supabase
        .from('products')
        .select('*')
        .in('id', favoriteIds);

      if (prodError) {
        return rejectWithValue(prodError.message);
      }

      return productsData || [];
    } catch (err) {
      return rejectWithValue('Error al obtener favoritos');
    }
  }
);

// Toggle favorite status for a product
export const toggleFavorite = createAsyncThunk(
  'favorites/toggle',
  async ({ userId, productId }: { userId: string; productId: string }, { rejectWithValue }) => {
    try {
      // Verificar si el producto ya está en favoritos
      const { data: existingFavorite, error: checkError } = await supabase
        .from('favorites')
        .select('id')
        .eq('user_id', userId)
        .eq('product_id', productId)
        .single();

      if (checkError && checkError.code !== 'PGRST116') {
        return rejectWithValue(checkError.message);
      }

      if (existingFavorite) {
        // Remover de favoritos
        const { error: deleteError } = await supabase
          .from('favorites')
          .delete()
          .eq('user_id', userId)
          .eq('product_id', productId);

        if (deleteError) {
          return rejectWithValue(deleteError.message);
        }

        return { productId, action: 'removed' };
      } else {
        // Agregar a favoritos
        const { error: insertError } = await supabase
          .from('favorites')
          .insert({
            user_id: userId,
            product_id: productId,
          });

        if (insertError) {
          return rejectWithValue(insertError.message);
        }

        return { productId, action: 'added' };
      }
    } catch (err) {
      return rejectWithValue('Error al actualizar favorito');
    }
  }
);

// Add product to favorites
export const addToFavorites = createAsyncThunk(
  'favorites/add',
  async ({ userId, productId }: { userId: string; productId: string }, { rejectWithValue }) => {
    try {
      const { error } = await supabase
        .from('favorites')
        .insert({
          user_id: userId,
          product_id: productId,
        });

      if (error) {
        return rejectWithValue(error.message);
      }

      return productId;
    } catch (err) {
      return rejectWithValue('Error al agregar a favoritos');
    }
  }
);

// Remove product from favorites
export const removeFromFavorites = createAsyncThunk(
  'favorites/remove',
  async ({ userId, productId }: { userId: string; productId: string }, { rejectWithValue }) => {
    try {
      const { error } = await supabase
        .from('favorites')
        .delete()
        .eq('user_id', userId)
        .eq('product_id', productId);

      if (error) {
        return rejectWithValue(error.message);
      }

      return productId;
    } catch (err) {
      return rejectWithValue('Error al remover de favoritos');
    }
  }
);