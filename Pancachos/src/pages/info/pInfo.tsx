import ProductCard from "../../components/product/productInfo";
import CommentsSection from "../../components/product/productComment";
import products from "../../data/products.json";
import Navbar from "../../components/layout/navbar";
import { useLocation } from "react-router-dom";

function Info() {
  const location = useLocation();
  const productId = location.state;

  const findItem = products.find((product) => product.id === productId);

  if (!findItem) {
    console.error("Producto no encontrado");
    return null;
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

