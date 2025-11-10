// ...existing code...
import { useEffect, useState } from "react";
import { addToCart, isInCart, removeFromCart} from "../../redux/cartUtils";
import type { CartItem } from "../../redux/cartUtils";

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

  // escuchar actualizaciones globales del carrito
  useEffect(() => {
    const onCartUpdated = () => {
      setIsAdded(isInCart(product.id));
    };

    
    window.addEventListener("cartUpdated", onCartUpdated);
    // evento storage para cambios en otras pestañas o ventanas
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
    if (added) {
      // actualizar UI localmente; cartUtils ya notifica al resto de la app y a otras pestañas
      setIsAdded(true);
    }
  };

  const handleRemoveFromCart = () => {
    removeFromCart(product.id);
    // actualizar UI localmente; cartUtils ya notifica al resto de la app y a otras pestañas
    setIsAdded(false);
  };

  return (
    <div className="bg-[#FAF0DC] flex flex-col sm:flex-row items-stretch justify-center rounded-2xl shadow-lg overflow-hidden max-w-4xl mx-auto p-4">
      <img src={product.image} alt={product.name} className="w-full sm:w-1/2 h-auto object-cover rounded-2xl shadow-md" />

      <div className="bg-white rounded-2xl shadow-md p-6 w-full sm:w-[50%] min-h-[330px] flex flex-col justify-between">
        <div>
          <h2 className="text-3xl font-bold mb-2">{product.name}</h2>
          <div className="flex items-center gap-2 mb-4">
            <img src={product.bakeryLogo} alt={product.bakery} className="w-5 h-5 rounded-full object-cover" />
            <p className="text-gray-600 text-sm">{product.bakery}</p>
          </div>
        </div>

        <div className="flex gap-3 mb-4">
          <span className="border border-yellow-700 text-yellow-700 px-3 py-1 rounded-md">{product.size}</span>
          <span className="border border-yellow-700 text-yellow-700 px-3 py-1 rounded-md">{product.temperature}</span>
        </div>

        <p className="text-gray-700 mb-6 leading-relaxed">{product.description}</p>

        <div className="flex justify-between items-center mt-auto">
          <p className="font-bold text-lg">${product.price.toLocaleString()} COP</p>

          {!isAdded ? (
            <button
              onClick={handleAddToCart}
              className="px-6 py-2 rounded-lg font-semibold bg-[#C9A667] text-white hover:bg-[#b59153] transition-all"
            >
              Add to cart
            </button>
          ) : (
            <div className="flex items-center gap-3">
              <button
                className="px-4 py-2 rounded-lg font-semibold bg-[#7e622e] text-white cursor-not-allowed"
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

