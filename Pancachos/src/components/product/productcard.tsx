import { useEffect, useState } from 'react';
import type { Product } from "../../types/product";
import { addToCart, isInCart } from "../../utils/cartUtils";
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { addToCart as addToCartRedux } from '../../redux/slices/cartSlice';
import { toggleFavorite } from '../../redux/thunks/favoritesThunks';

interface ProductCardProps {
  product: Product;
  Click: () => void;
}

export default function ProductCard({ product, Click }: ProductCardProps) {
  const dispatch = useAppDispatch();

  const favoriteIds = useAppSelector((state) => state.favorites.favoriteIds);
  const currentUser = useAppSelector((state) => state.auth.user);

  const [added, setAdded] = useState(false);
  const [favorite, setFavorite] = useState(false);

  // Carrito
  useEffect(() => {
    setAdded(isInCart(product.id as any));
  }, [product.id]);

  // Favoritos (sincronizar con Redux)
  useEffect(() => {
    const isFav = favoriteIds.some((id) => String(id) === String(product.id));
    setFavorite(isFav);
  }, [favoriteIds, product.id]);

  const handleAdd = () => {
    const item = {
      id: product.id as any,
      name: product.name,
      price: product.price,
      image: product.image,
    };

    dispatch(addToCartRedux(item));
    addToCart(item);
    setAdded(true);
  };

  const handleFavorite = async () => {
    if (!currentUser?.id) {
      alert('Please log in to add favorites');
      return;
    }

    try {
      const result = await dispatch(
        toggleFavorite({
          userId: currentUser.id,
          productId: product.id as any,
          product, // 🔹 enviamos el producto completo
        })
      ).unwrap();

      console.log('toggleFavorite result:', result);
    } catch (err: any) {
      console.error('Error toggling favorite:', err);
      const message =
        typeof err === 'string'
          ? err
          : err?.message || 'Error updating favorite. Please try again.';
      alert(message);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg w-72 shrink-0 overflow-hidden hover:shadow-xl transition-shadow">
      {/* Imagen del producto */}
      <div className="relative cursor-pointer" onClick={Click}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />

        {/* Rating badge */}
        <div className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
          ★ {product.rating}
        </div>
      </div>

      {/* Contenido de la card */}
      <div className="p-4">
        {/* Título y corazón */}
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-gray-800 text-sm leading-tight">
            {product.name}
          </h3>

          <div className="flex items-center gap-2">
            <button
              className={`rounded-full p-1 transition-colors ${
                favorite ? 'bg-red-100 text-red-500' : 'bg-gray-100 text-gray-400'
              }`}
              onClick={handleFavorite}
            >
              {favorite ? '❤️' : '🤍'}
            </button>
          </div>
        </div>

        {/* Tags */}
        <div className="flex gap-2 mb-3">
          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full border">
            {product.size}
          </span>
          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full border">
            {product.temperature}
          </span>
        </div>

        {/* Descripción */}
        <p className="text-xs text-gray-500 leading-tight mb-4">
          {product.description}
        </p>

        {/* Precio y carrito */}
        <div className="flex items-center justify-between">
          <span className="font-semibold text-gray-800 text-sm">
            $ {product.price.toLocaleString()} COP
          </span>

          <button
            className={`${
              added ? 'bg-[#786033]' : 'bg-[#C3A366] hover:bg-[#786033]'
            } text-white text-xs font-semibold py-2 px-4 rounded-lg transition-colors`}
            onClick={handleAdd}
            disabled={added}
          >
            {added ? 'Added' : 'Add to cart'}
          </button>
        </div>
      </div>
    </div>
  );
}


