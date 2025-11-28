import { createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from '../../config/supabaseClient';
<<<<<<< HEAD
import type { Product } from '../../types/product';

// Fetch user's favorite products IDs (si algún día quieres usarlos)
=======

// Fetch user's favorite products with details
>>>>>>> 06b5708d66775493a9b6455178761de1f30de4f4
export const fetchUserFavorites = createAsyncThunk(
  'favorites/fetchUserFavorites',
  async (userId: string, { rejectWithValue }) => {
    try {
      // Primero obtenemos los IDs favoritos
      const { data: favData, error: favError } = await supabase
        .from('favorites')
        .select('product_id')
        .eq('user_id', userId);

<<<<<<< HEAD
      if (error) {
        console.error('Error fetching favorites:', error);
        return rejectWithValue(error.message);
      }

      return (data || []).map((fav) => fav.product_id);
    } catch (err) {
      console.error('Unexpected error fetching favorites:', err);
=======
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
>>>>>>> 06b5708d66775493a9b6455178761de1f30de4f4
      return rejectWithValue('Error al obtener favoritos');
    }
  }
);

// ✅ Toggle favorite status for a product
// Ahora el thunk recibe también el producto completo y lo devuelve en el payload
export const toggleFavorite = createAsyncThunk(
  'favorites/toggle',
  async (
    {
      userId,
      productId,
      product,
    }: { userId: string; productId: string | number; product: Product },
    { rejectWithValue }
  ) => {
    try {
      // 1. Verificar si YA existe el favorito
      const { data: rows, error: checkError } = await supabase
        .from('favorites')
        .select('id')
        .eq('user_id', userId)
        .eq('product_id', productId)
<<<<<<< HEAD
        .limit(1);

      if (checkError) {
        console.error('Error checking favorite:', checkError);
=======
        .single();

      if (checkError && checkError.code !== 'PGRST116') {
>>>>>>> 06b5708d66775493a9b6455178761de1f30de4f4
        return rejectWithValue(checkError.message);
      }

      const existingFavorite = rows && rows[0];

      if (existingFavorite) {
        // 2. Si existe → eliminar
        const { error: deleteError } = await supabase
          .from('favorites')
          .delete()
          .eq('user_id', userId)
          .eq('product_id', productId);

        if (deleteError) {
<<<<<<< HEAD
          console.error('Error deleting favorite:', deleteError);
          return rejectWithValue(deleteError.message);
        }

        return { productId, action: 'removed' as const, product };
=======
          return rejectWithValue(deleteError.message);
        }

        return { productId, action: 'removed' };
>>>>>>> 06b5708d66775493a9b6455178761de1f30de4f4
      } else {
        // 3. Si NO existe → insertar
        const { error: insertError } = await supabase
          .from('favorites')
          .insert({
            user_id: userId,
            product_id: productId,
          });

        if (insertError) {
<<<<<<< HEAD
          console.error('Error inserting favorite:', insertError);
          return rejectWithValue(insertError.message);
        }

        return { productId, action: 'added' as const, product };
      }
    } catch (err) {
      console.error('Unexpected error in toggleFavorite:', err);
=======
          return rejectWithValue(insertError.message);
        }

        return { productId, action: 'added' };
      }
    } catch (err) {
>>>>>>> 06b5708d66775493a9b6455178761de1f30de4f4
      return rejectWithValue('Error al actualizar favorito');
    }
  }
);

// Add product to favorites (si lo usas en algún lado)
export const addToFavorites = createAsyncThunk(
  'favorites/add',
  async (
    { userId, productId }: { userId: string; productId: string | number },
    { rejectWithValue }
  ) => {
    try {
      const { error } = await supabase
        .from('favorites')
        .insert({
          user_id: userId,
          product_id: productId,
        });

      if (error) {
<<<<<<< HEAD
        console.error('Error adding favorite:', error);
=======
>>>>>>> 06b5708d66775493a9b6455178761de1f30de4f4
        return rejectWithValue(error.message);
      }

      return productId;
    } catch (err) {
<<<<<<< HEAD
      console.error('Unexpected error adding favorite:', err);
=======
>>>>>>> 06b5708d66775493a9b6455178761de1f30de4f4
      return rejectWithValue('Error al agregar a favoritos');
    }
  }
);

// Remove product from favorites (si lo usas en algún lado)
export const removeFromFavorites = createAsyncThunk(
  'favorites/remove',
  async (
    { userId, productId }: { userId: string; productId: string | number },
    { rejectWithValue }
  ) => {
    try {
      const { error } = await supabase
        .from('favorites')
        .delete()
        .eq('user_id', userId)
        .eq('product_id', productId);

      if (error) {
<<<<<<< HEAD
        console.error('Error removing favorite:', error);
=======
>>>>>>> 06b5708d66775493a9b6455178761de1f30de4f4
        return rejectWithValue(error.message);
      }

      return productId;
    } catch (err) {
<<<<<<< HEAD
      console.error('Unexpected error removing favorite:', err);
      return rejectWithValue('Error al remover de favoritos');
    }
  }
);
=======
      return rejectWithValue('Error al remover de favoritos');
    }
  }
);
>>>>>>> 06b5708d66775493a9b6455178761de1f30de4f4
