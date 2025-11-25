import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '../../types/product';

interface ProductsState {
  allProducts: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  allProducts: [],
  loading: false,
  error: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // Cargar todos los productos desde localStorage
    hydrateProducts: (state) => {
      const stored = localStorage.getItem('bakery_products');
      if (stored) {
        try {
          state.allProducts = JSON.parse(stored);
        } catch (error) {
          console.error('Error hydrating products:', error);
        }
      }
    },

    // Agregar un nuevo producto
    addProduct: (state, action: PayloadAction<Product>) => {
      state.allProducts.push(action.payload);
      localStorage.setItem('bakery_products', JSON.stringify(state.allProducts));
    },

    // Actualizar un producto existente
    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.allProducts.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.allProducts[index] = action.payload;
        localStorage.setItem('bakery_products', JSON.stringify(state.allProducts));
      }
    },

    // Eliminar un producto
    deleteProduct: (state, action: PayloadAction<number>) => {
      state.allProducts = state.allProducts.filter((p) => p.id !== action.payload);
      localStorage.setItem('bakery_products', JSON.stringify(state.allProducts));
    },

    // Marcar como no disponible
    markProductUnavailable: (state, action: PayloadAction<number>) => {
      const product = state.allProducts.find((p) => p.id === action.payload);
      if (product) {
        product.available = false;
        localStorage.setItem('bakery_products', JSON.stringify(state.allProducts));
      }
    },

    // Marcar como disponible
    markProductAvailable: (state, action: PayloadAction<number>) => {
      const product = state.allProducts.find((p) => p.id === action.payload);
      if (product) {
        product.available = true;
        localStorage.setItem('bakery_products', JSON.stringify(state.allProducts));
      }
    },

    // Set loading state
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    // Set error
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  hydrateProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  markProductUnavailable,
  markProductAvailable,
  setLoading,
  setError,
} = productsSlice.actions;

export default productsSlice.reducer;
