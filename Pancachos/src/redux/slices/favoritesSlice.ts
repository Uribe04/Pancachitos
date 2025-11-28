import { createSlice } from '@reduxjs/toolkit';
import { fetchUserFavorites, toggleFavorite, addToFavorites, removeFromFavorites } from "../thunks/favoritesThunks";

interface FavoritesState {
  favoriteIds: string[];
  loading: boolean;
  error: string | null;
}

const initialState: FavoritesState = {
  favoriteIds: [],
  loading: false,
  error: null,
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    // Limpiar favoritos
    clearFavorites: (state) => {
      state.favoriteIds = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch user favorites
    builder
      .addCase(fetchUserFavorites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserFavorites.fulfilled, (state, action) => {
        state.loading = false;
        state.favoriteIds = action.payload;
      })
      .addCase(fetchUserFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Toggle favorite
    builder
      .addCase(toggleFavorite.fulfilled, (state, action: any) => {
        if (action.payload.action === 'added') {
          if (!state.favoriteIds.includes(action.payload.productId)) {
            state.favoriteIds.push(action.payload.productId);
          }
        } else if (action.payload.action === 'removed') {
          state.favoriteIds = state.favoriteIds.filter((id) => id !== action.payload.productId);
        }
      });

    // Add to favorites
    builder
      .addCase(addToFavorites.fulfilled, (state, action) => {
        if (!state.favoriteIds.includes(action.payload)) {
          state.favoriteIds.push(action.payload);
        }
      });

    // Remove from favorites
    builder
      .addCase(removeFromFavorites.fulfilled, (state, action) => {
        state.favoriteIds = state.favoriteIds.filter((id) => id !== action.payload);
      });
  },
});

export const { clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;