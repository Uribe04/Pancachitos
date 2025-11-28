import { useEffect, useState, useCallback } from 'react';
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

  // Sync estado inicial
  useEffect(() => {
    setAdded(isInCart(product.id));
    setFavorite(favoriteIds.includes(product.id));
  }, [product.id, favoriteIds]);


  // ➤ ADD TO CART
  const handleAdd = useCallback(() => {
    const item = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    };

    dispatch(addToCartRedux(item));
    addToCart(item);
    setAdded(true);
    window.dispatchEvent(new Event("cartUpdated"));
  }, [dispatch, product]);


  // ➤ FAVORITOS → ya SIN HOOK adentro!
  const handleFavorite = useCallback(async () => {
    if (!currentUser?.id) {
      alert("Please log in to add favorites");
      return;
    }

    try {
      await dispatch(toggleFavorite({ productId: product.id, userId: currentUser.id }) as any);
      setFavorite((prev) => !prev); // cambio inmediato
      window.dispatchEvent(new Event("favoriteUpdated"));
    } catch (error) {
      console.error(error);
      alert('Error al agregar a favoritos');
    }
  }, [dispatch, currentUser?.id, product.id]);

  return (
    <div className="bg-white rounded-2xl shadow-lg w-72 shrink-0 overflow-hidden hover:shadow-xl transition-shadow">

      <div className="relative cursor-pointer" onClick={() => Click()}>
        <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
        <div className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
          ★ {product.rating}
        </div>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-gray-800 text-sm leading-tight">
            {product.name}
          </h3>

          <button
            onClick={handleFavorite}
            className={`rounded-full p-1 transition-colors ${
              favorite ? 'bg-blue-100 text-blue-500' : 'text-gray-700'
            }`}
          >
            {favorite ? '💙' : '🤍'}
          </button>
        </div>

        <p className="text-xs text-gray-500 leading-tight mb-4">{product.description}</p>

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


