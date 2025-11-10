import { useState, useEffect } from "react";
import { addToCart, isInCart, removeFromCart } from "../../utils/cartUtils";
import type { CartItem } from "../../utils/cartUtils";

interface Comment {
  icon: string;
  username: string;
  comment: string;
  rating: number;
}

interface Product {
  id: number;
  name: string;
  bakery: string;
  bakeryLogo: string;
  price: number;
  rating: number;
  size: string;
  temperature: string;
  description: string;
  image: string;
  category: string;
  comments: Comment[];
}

export default function ProductCard({ product }: { product: Product }) {
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    setIsAdded(isInCart(product.id));
  }, [product.id]);

  useEffect(() => {
    const onCartUpdated = () => setIsAdded(isInCart(product.id));
    window.addEventListener("cartUpdated", onCartUpdated);
    window.addEventListener("storage", onCartUpdated);

    return () => {
      window.removeEventListener("cartUpdated", onCartUpdated);
      window.removeEventListener("storage", onCartUpdated);
    };
  }, [product.id]);

  const handleAddToCart = () => {
    const item: CartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    };
    const added = addToCart(item);
    if (added) setIsAdded(true);
  };

  const handleRemoveFromCart = () => {
    removeFromCart(product.id);
    setIsAdded(false);
  };

  return (
    <div className="bg-[#FAF0DC] flex flex-col sm:flex-row items-stretch justify-center rounded-2xl shadow-lg overflow-hidden max-w-4xl mx-auto p-4 sm:p-6">
      {/* Imagen */}
      <img
        src={product.image}
        alt={product.name}
        className="w-full sm:w-1/2 h-64 sm:h-auto object-cover rounded-2xl shadow-md mb-4 sm:mb-0"
      />

      {/* Contenido */}
      <div className="bg-white rounded-2xl shadow-md p-5 sm:p-6 w-full sm:w-[50%] min-h-[330px] flex flex-col justify-between">
        {/* Título y panadería */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-center sm:text-left">
            {product.name}
          </h2>
          <div className="flex items-center justify-center sm:justify-start gap-2 mb-4">
            <img
              src={product.bakeryLogo}
              alt={product.bakery}
              className="w-5 h-5 rounded-full object-cover"
            />
            <p className="text-gray-600 text-sm sm:text-base">
              {product.bakery}
            </p>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap justify-center sm:justify-start gap-2 mb-4">
          <span className="border border-yellow-700 text-yellow-700 px-3 py-1 rounded-md text-sm sm:text-base">
            {product.size}
          </span>
          <span className="border border-yellow-700 text-yellow-700 px-3 py-1 rounded-md text-sm sm:text-base">
            {product.temperature}
          </span>
        </div>

        {/* Descripción */}
        <p className="text-gray-700 mb-6 leading-relaxed text-sm sm:text-base text-center sm:text-left">
          {product.description}
        </p>

        {/* Precio y botones */}
        <div className="flex flex-col sm:flex-row items-center justify-between mt-auto gap-3 sm:gap-0">
          <p className="font-bold text-lg sm:text-xl text-[#4a3b1a]">
            ${product.price.toLocaleString()} COP
          </p>

          {!isAdded ? (
            <button
              onClick={handleAddToCart}
              className="px-6 py-2 rounded-lg font-semibold bg-[#C9A667] text-white hover:bg-[#b59153] transition-all w-full sm:w-auto text-sm sm:text-base"
            >
              Add to cart
            </button>
          ) : (
            <div className="flex flex-col sm:flex-row items-center gap-2">
              <button
                className="px-4 py-2 rounded-lg font-semibold bg-[#7e622e] text-white cursor-not-allowed text-sm sm:text-base w-full sm:w-auto"
                disabled
              >
                Added to cart ✓
              </button>
              <button
                onClick={handleRemoveFromCart}
                className="text-sm text-[#2870B8] hover:underline"
              >
                Remove
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

