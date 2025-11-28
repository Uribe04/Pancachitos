import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import productsReducer from './slices/productsSlice';
import cartReducer from './slices/cartSlice';
import favoritesReducer from './slices/favoritesSlice';
import commentsReducer from './slices/commentsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    cart: cartReducer,
    favorites: favoritesReducer,
    comments: commentsReducer,
  },
});


// Tipos para usar en toda la aplicación
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
