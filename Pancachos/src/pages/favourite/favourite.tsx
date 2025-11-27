import { useEffect, useState } from "react";
import Footer from "../../components/footer/footer";
import Navbar from "../../components/layout/navbar";
import ProductCard from "../../components/product/productcard";
import type { Product } from "../../types/product";
import { useAppSelector } from "../../redux/hooks";

function Favourite() {
  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([]);
  const products = useAppSelector((state) => state.products.allProducts);
  const favoriteIds = useAppSelector((state) => state.favorites.favoriteIds);

  useEffect(() => {
    const updateFavorites = () => {
      const filtered = products.filter((p) => favoriteIds.includes(p.id));
      setFavoriteProducts(filtered);
    };

    updateFavorites();
    window.addEventListener("favoriteUpdated", updateFavorites);

    return () => {
      window.removeEventListener("favoriteUpdated", updateFavorites);
    };
  }, [favoriteIds]);

  return (
    <div className="bg-linear-to-r from-[#2971B9] to-[#69ADF1] min-h-screen w-full flex flex-col items-center px-4 py-6 md:py-8">
      {/* NAVBAR ARRIBA */}
      <div className="w-full max-w-6xl mb-6 md:mb-8">
        <Navbar />
      </div>

      {/* CONTENEDOR BEIGE */}
      <div className="w-full max-w-6xl bg-[#F4DFB3] rounded-4xl shadow-2xl p-4 md:p-8">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#786033] mb-4 md:mb-6 flex items-center gap-2">
          Favorites
        </h1>

        {/* LISTA DE TARJETAS (SCROLL HORIZONTAL COMO EN LA MAQUETA) */}
        {favoriteProducts.length === 0 ? (
          <p className="text-center text-gray-600 text-sm md:text-base">No favorites yet. Mark some products as favorites!</p>
        ) : (
          <div className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide py-2">
            {favoriteProducts.map((product) => (
              <ProductCard key={product.id} product={product} Click={() => {}} />
            ))}
          </div>
        )}

        {/* Ocultar scrollbar en navegadores comunes */}
        <style>{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-hide {
            -ms-overflow-style: none;  
            scrollbar-width: none;     
          }
        `}</style>
      </div>

      {/* FOOTER (opcional) */}
      <div className="w-full mt-6 md:mt-8">
        <Footer />
      </div>
    </div>
  );
}

export default Favourite;
