import { useEffect, useState } from 'react';
import type { Product } from "../../types/product";
import { addToCart, isInCart } from "../../utils/cartUtils";
import { addFavorite, removeFavorite, isFavorite } from "../../utils/localStorage";

interface ProductCardProps {
  product: Product;
  Click: () => void;
}

export default function ProductCard({ product, Click }: ProductCardProps) {
  const [added, setAdded] = useState(false);
  const [favorite, setFavorite] = useState(false);

  // sincronizar estado inicial y escuchar cambios globales del carrito y favoritos
  useEffect(() => {
    setAdded(isInCart(product.id));
    setFavorite(isFavorite(product.id));

    const onCartUpdated = () => {
      setAdded(isInCart(product.id));
    };

    const onFavoriteUpdated = () => {
      setFavorite(isFavorite(product.id));
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
  }, [product.id]);

  const handleAdd = () => {
    const item = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    };
    const ok = addToCart(item);
    if (ok) setAdded(true);
  };

  const handleFavorite = () => {
    if (favorite) {
      removeFavorite(product.id);
      setFavorite(false);
    } else {
      addFavorite(product.id);
      setFavorite(true);
    }
    window.dispatchEvent(new Event("favoriteUpdated"));
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
            {/* Logo de panadería */}
            {product.bakeryLogo ? (
              <img
                src={product.bakeryLogo}
                alt={product.bakery}
                className="h-6 object-contain"
              />
            ) : (
              <div className="bg-[#C3A366] border-[#786033] text-gray-100 font-semibold rounded-full text-xs px-2 py-1">
                {product.bakery}
              </div>
            )}

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

