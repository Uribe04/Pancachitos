import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { fetchProducts, fetchProductsBySeller, createProduct as createProductThunk, updateProduct as updateProductThunk, deleteProduct as deleteProductThunk, toggleProductAvailability, updateProductStock } from '../thunks/productsThunks';
import type { Product } from '../../types/product';

interface ProductsState {
  allProducts: Product[];
  sellerProducts: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  allProducts: [],
  sellerProducts: [],
  loading: false,
  error: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // Cargar todos los productos desde localStorage (fallback)
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

    // Agregar un nuevo producto (mantener para compatibilidad)
    addProduct: (state, action: PayloadAction<Product>) => {
      state.allProducts.push(action.payload);
      localStorage.setItem('bakery_products', JSON.stringify(state.allProducts));
    },

    // Eliminar un producto (mantener para compatibilidad)
    deleteProductLocal: (state, action: PayloadAction<string>) => {
      state.allProducts = state.allProducts.filter((p) => p.id !== action.payload);
      localStorage.setItem('bakery_products', JSON.stringify(state.allProducts));
    },

    // Marcar como no disponible (mantener para compatibilidad)
    markProductUnavailable: (state, action: PayloadAction<string>) => {
      const product = state.allProducts.find((p) => p.id === action.payload);
      if (product) {
        product.available = false;
        localStorage.setItem('bakery_products', JSON.stringify(state.allProducts));
      }
    },

    // Marcar como disponible (mantener para compatibilidad)
    markProductAvailable: (state, action: PayloadAction<string>) => {
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
  extraReducers: (builder) => {
    // Fetch All Products
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.allProducts = action.payload;
        state.error = null;
        localStorage.setItem('bakery_products', JSON.stringify(action.payload));
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Fetch Products by Seller
    builder
      .addCase(fetchProductsBySeller.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsBySeller.fulfilled, (state, action) => {
        state.loading = false;
        state.sellerProducts = action.payload;
        state.error = null;
      })
      .addCase(fetchProductsBySeller.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Create Product
    builder
      .addCase(createProductThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProductThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.allProducts.unshift(action.payload);
        state.sellerProducts.unshift(action.payload);
        state.error = null;
        localStorage.setItem('bakery_products', JSON.stringify(state.allProducts));
      })
      .addCase(createProductThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Update Product
    builder
      .addCase(updateProductThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProductThunk.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.allProducts.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) {
          state.allProducts[index] = action.payload;
        }
        const sellerIndex = state.sellerProducts.findIndex((p) => p.id === action.payload.id);
        if (sellerIndex !== -1) {
          state.sellerProducts[sellerIndex] = action.payload;
        }
        state.error = null;
        localStorage.setItem('bakery_products', JSON.stringify(state.allProducts));
      })
      .addCase(updateProductThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Delete Product
    builder
      .addCase(deleteProductThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProductThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.allProducts = state.allProducts.filter((p) => p.id !== action.payload);
        state.sellerProducts = state.sellerProducts.filter((p) => p.id !== action.payload);
        state.error = null;
        localStorage.setItem('bakery_products', JSON.stringify(state.allProducts));
      })
      .addCase(deleteProductThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Toggle Product Availability
    builder
      .addCase(toggleProductAvailability.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleProductAvailability.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.allProducts.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) {
          state.allProducts[index] = action.payload;
        }
        const sellerIndex = state.sellerProducts.findIndex((p) => p.id === action.payload.id);
        if (sellerIndex !== -1) {
          state.sellerProducts[sellerIndex] = action.payload;
        }
        state.error = null;
        localStorage.setItem('bakery_products', JSON.stringify(state.allProducts));
      })
      .addCase(toggleProductAvailability.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Update Product Stock
    builder
      .addCase(updateProductStock.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProductStock.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.allProducts.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) {
          state.allProducts[index] = action.payload;
        }
        const sellerIndex = state.sellerProducts.findIndex((p) => p.id === action.payload.id);
        if (sellerIndex !== -1) {
          state.sellerProducts[sellerIndex] = action.payload;
        }
        state.error = null;
        localStorage.setItem('bakery_products', JSON.stringify(state.allProducts));
      })
      .addCase(updateProductStock.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  hydrateProducts,
  addProduct,
  deleteProductLocal,
  markProductUnavailable,
  markProductAvailable,
  setLoading,
  setError,
} = productsSlice.actions;

export default productsSlice.reducer;
