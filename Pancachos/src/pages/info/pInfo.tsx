import ProductCard from "../../components/product/productInfo";
import CommentsSection from "../../components/product/productComment";
import products from "../../data/products.json";
import Navbar from "../../components/layout/navbar";
import { useLocation } from "react-router-dom";
import { getProductById } from "../../utils/localStorage";
import type { Product } from "../../types/product";

function Info() {
  const location = useLocation();
  const { id, isUserProduct } = location.state as { id: number; isUserProduct?: boolean } || { id: null, isUserProduct: false };

  let findItem: Product | null = null;

  if (isUserProduct) {
    // Si es producto del usuario, buscar en localStorage
    findItem = getProductById(Number(id));
  } else {
    // Si es producto del JSON, buscar en products.json
    const foundInJson = (products as Product[]).find((product) => product.id === id);
    if (foundInJson) {
      findItem = foundInJson;
    }
  }

  // Si no encuentra en la primera búsqueda, intentar en la otra fuente
  if (!findItem) {
    if (isUserProduct) {
      // Si no está en localStorage, intentar en JSON
      const foundInJson = (products as Product[]).find((product) => product.id === id);
      if (foundInJson) {
        findItem = foundInJson;
      }
    } else {
      // Si no está en JSON, intentar en localStorage
      findItem = getProductById(Number(id));
    }
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
        <CommentsSection 
          comments={findItem.comments} 
          productId={findItem.id} 
        />
      </div>
    </div>
  );
}

export default Info;

