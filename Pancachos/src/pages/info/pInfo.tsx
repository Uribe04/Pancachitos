import ProductCard from "../../components/product/productInfo";
import CommentsSection from "../../components/product/productComment";
import Navbar from "../../components/layout/navbar";
import { useLocation } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import type { Product } from "../../types/product";

function Info() {
  const location = useLocation();
  const { id } = location.state as { id: string } || { id: null };
  
  const allProducts = useAppSelector((state) => state.products.allProducts);

  let findItem: Product | null = null;

  if (id) {
    findItem = allProducts.find((product) => product.id === id) || null;
  }

  if (!findItem) {
    console.error("Producto no encontrado");
    return (
      <div className="min-h-screen flex flex-col items-center">
        <div className="w-full bg-[#2870B8] flex justify-center py-6">
          <Navbar />
        </div>
        <div className="w-full bg-[#FBEFD5] flex flex-col items-center justify-center gap-10 py-16 min-h-[60vh]">
          <h1 className="text-3xl font-bold text-[#B68A3A]">Producto no encontrado</h1>
          <p className="text-gray-600">El producto que buscas no existe o ha sido eliminado.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col items-center">
      {/* Sección azul: navbar */}
      <div className="w-full bg-[#2870B8] flex justify-center py-6">
        <Navbar />
      </div>

      {/* Sección principal: producto + comentarios */}
      <div className="w-full bg-[#FBEFD5] flex flex-col items-center gap-10 py-16">
        <ProductCard product={findItem} />
        <CommentsSection productId={findItem.id} />
      </div>
    </div>
  );
}

export default Info;

