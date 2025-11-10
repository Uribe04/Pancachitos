import Footer from "../../components/footer/footer";
import Navbar from "../../components/layout/navbar";
import ProductCard from "../../components/product/productcard";
import productsData from "../../data/products.json";
import type { Product } from "../../types/product";

function Favourite() {
  const products = productsData as Product[];

  // Aquí podrías filtrar solo favoritos si luego les pones una propiedad en el JSON.
  // Por ahora usamos todos o, si quieres, los mejor calificados:
  const favouriteProducts = products.filter((p) => p.rating >= 4.5);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-sky-500 to-blue-600 flex flex-col items-center">
      {/* NAVBAR ARRIBA */}
      <div className="w-full max-w-6xl mb-8">
        <Navbar />
      </div>

      {/* CONTENEDOR BEIGE */}
      <div className="w-full max-w-6xl bg-[#F4DFB3] rounded-[32px] shadow-2xl p-8">
        <h1 className="text-3xl md:text-4xl font-bold text-[#786033] mb-6 flex items-center gap-2">
          Favorites
        </h1>

        {/* LISTA DE TARJETAS (SCROLL HORIZONTAL COMO EN LA MAQUETA) */}
        <div className="flex gap-6 overflow-x-auto scrollbar-hide py-2">
          {favouriteProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

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
      <div className="w-full mt-8">
        <Footer />
      </div>
    </div>
  );
}

export default Favourite;
