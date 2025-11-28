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
  
  const [added, setAdded] = useState(false);
  const [favorite, setFavorite] = useState(false);

  // sincronizar estado inicial y escuchar cambios globales del carrito y favoritos
  useEffect(() => {
    setAdded(isInCart(product.id));
    setFavorite(favoriteIds.includes(product.id));

    const onCartUpdated = () => {
      setAdded(isInCart(product.id));
    };

    const onFavoriteUpdated = () => {
      setFavorite(favoriteIds.includes(product.id));
    };

    window.addEventListener("cartUpdated", onCartUpdated);
    window.addEventListener("favoriteUpdated", onFavoriteUpdated);
    window.addEventListener("storage", onCartUpdated as EventListener);
    window.addEventListener("storage", onFavoriteUpdated as EventListener);

    return () => {
      window.removeEventListener("cartUpdated", onCartUpdated);
      window.removeEventListener("favoriteUpdated", onFavoriteUpdated);
      window.removeEventListener("storage", onCartUpdated as EventListener);
      window.removeEventListener("storage", onFavoriteUpdated as EventListener);
    };
  }, [product.id, favoriteIds]);

  const handleAdd = () => {
    const item = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    };
    // Agregar a Redux
    dispatch(addToCartRedux(item));
    // También agregar a localStorage para compatibilidad
    addToCart(item);
    setAdded(true);
  };

  const handleFavorite = async () => {
    const currentUser = useAppSelector((state) => state.auth.user);
    
    if (!currentUser?.id) {
      alert('Please log in to add favorites');
      return;
    }
    
    try {
      await dispatch(toggleFavorite({ productId: product.id, userId: currentUser.id, product }) as any);
      setFavorite(!favorite);
      window.dispatchEvent(new Event("favoriteUpdated"));
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg w-72 shrink-0 overflow-hidden hover:shadow-xl transition-shadow">
      {/* Imagen del producto */}
      <div className="relative cursor-pointer" onClick={() => Click()}>
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
        {/* Título, logo y corazón */}
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-gray-800 text-sm leading-tight">
            {product.name}
          </h3>

          <div className="flex items-center gap-2">
            {/* Logo de panadería - Comentado por ahora, se implementará con relación a users */}

            {/* Botón favorito */}
            <button
              className={`rounded-full p-1 transition-colors ${
                favorite ? 'bg-blue-100 text-blue-500' : 'text-gray-700'
              }`}
              onClick={handleFavorite}
            >
              {favorite ? '💙' : '🤍'}
            </button>
          </div>
        </div>

        {/* Tags de tamaño y temperatura */}
        <div className="flex gap-2 mb-3">
          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full border">
            {product.size}
          </span>
          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full border">
            {product.temperature}
          </span>
        </div>

        {/* Descripción del producto */}
        <p className="text-xs text-gray-500 leading-tight mb-4">
          {product.description}
        </p>

        {/* Precio y botón de compra */}
        <div className="flex items-center justify-between">
          <span className="font-semibold text-gray-800 text-sm">
            $ {product.price.toLocaleString()} COP
          </span>

          {/* Botón Add to cart */}
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

