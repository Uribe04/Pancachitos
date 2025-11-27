import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { CartItem } from '../../utils/cartUtils';

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Cargar carrito desde localStorage
    hydrateCart: (state) => {
      const stored = localStorage.getItem('cartItems');
      if (stored) {
        try {
          state.items = JSON.parse(stored);
        } catch (error) {
          console.error('Error hydrating cart:', error);
        }
      }
    },

    // Agregar item al carrito
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const exists = state.items.some((i) => Number(i.id) === Number(action.payload.id));
      if (!exists) {
        state.items.push(action.payload);
        localStorage.setItem('cartItems', JSON.stringify(state.items));
        // Disparar evento para sincronización
        window.dispatchEvent(new Event('cartUpdated'));
      }
    },

    // Eliminar item del carrito
    removeFromCart: (state, action: PayloadAction<number | string>) => {
      state.items = state.items.filter((i) => Number(i.id) !== Number(action.payload));
      localStorage.setItem('cartItems', JSON.stringify(state.items));
      window.dispatchEvent(new Event('cartUpdated'));
    },

    // Limpiar carrito
    clearCart: (state) => {
      state.items = [];
      localStorage.setItem('cartItems', JSON.stringify(state.items));
      window.dispatchEvent(new Event('cartUpdated'));
    },

    // Limpiar carrito al cambiar de usuario (logout)
    resetCartOnLogout: (state) => {
      state.items = [];
      localStorage.removeItem('cartItems');
    },

    // Actualizar cantidad de un item
    updateItemQuantity: (state, action: PayloadAction<{ id: number | string; quantity: number }>) => {
      const item = state.items.find((i) => Number(i.id) === Number(action.payload.id));
      if (item && action.payload.quantity > 0) {
        item.quantity = action.payload.quantity;
        localStorage.setItem('cartItems', JSON.stringify(state.items));
        window.dispatchEvent(new Event('cartUpdated'));
      }
    },
  },
});

export const { hydrateCart, addToCart, removeFromCart, clearCart, updateItemQuantity, resetCartOnLogout } = cartSlice.actions;
export default cartSlice.reducer;
