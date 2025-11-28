import { createSlice } from '@reduxjs/toolkit';
import {
  fetchUserFavorites,
  toggleFavorite,
  addToFavorites,
  removeFromFavorites,
} from '../thunks/favoritesThunks';
import type { Product } from '../../types/product';

interface FavoritesState {
  favoriteIds: (string | number)[];
  favoriteProducts: Product[];   // 🆕 lista de productos completos
  loading: boolean;
  error: string | null;
}

const initialState: FavoritesState = {
  favoriteIds: [],
  favoriteProducts: [],
  loading: false,
  error: null,
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    clearFavorites: (state) => {
      state.favoriteIds = [];
      state.favoriteProducts = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch user favorites (por ahora solo ids)
    builder
      .addCase(fetchUserFavorites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserFavorites.fulfilled, (state, action) => {
        state.loading = false;
        state.favoriteIds = action.payload as (string | number)[];
        // No llenamos favoriteProducts aquí (se llenan con los toggles)
      })
      .addCase(fetchUserFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Toggle favorite (usa producto completo)
    builder.addCase(toggleFavorite.fulfilled, (state, action: any) => {
      const { productId, action: favAction, product } = action.payload;

      if (favAction === 'added') {
        if (!state.favoriteIds.includes(productId)) {
          state.favoriteIds.push(productId);
        }

        const exists = state.favoriteProducts.some(
          (p) => String(p.id) === String(product.id)
        );
        if (!exists) {
          state.favoriteProducts.push(product);
        }
      } else if (favAction === 'removed') {
        state.favoriteIds = state.favoriteIds.filter(
          (id) => String(id) !== String(productId)
        );
        state.favoriteProducts = state.favoriteProducts.filter(
          (p) => String(p.id) !== String(productId)
        );
      }
    });

    // Add to favorites (solo ids)
    builder.addCase(addToFavorites.fulfilled, (state, action) => {
      if (!state.favoriteIds.includes(action.payload)) {
        state.favoriteIds.push(action.payload);
      }
    });

    // Remove from favorites (solo ids)
    builder.addCase(removeFromFavorites.fulfilled, (state, action) => {
      state.favoriteIds = state.favoriteIds.filter(
        (id) => String(id) !== String(action.payload)
      );
      state.favoriteProducts = state.favoriteProducts.filter(
        (p) => String(p.id) !== String(action.payload)
      );
    });
  },
});

export const { clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
