import ProductCard from "../../components/product/productInfo";
import CommentsSection from "../../components/product/productComment";
import products from "../../data/products.json";
import Navbar from "../../components/layout/navbar";
import { useLocation } from "react-router-dom";


function Info() {
  const location = useLocation()

  console.log(location.state);

  const finditem = products.find((product) => product.id === location.state);

if (!finditem) {
  console.error("Producto no encontrado");
  return null; // o puedes redirigir, mostrar error, etc.
}
  
  return (
    <div className="min-h-screen flex flex-col items-center">
      {/* Sección azul: navbar */}
      <div className="w-full bg-[#2870B8] flex justify-center py-6">
        <Navbar />
      </div>

      {/* Sección principal: producto + comentarios */}
      <div className="w-full bg-[#FBEFD5] flex flex-col items-center gap-10 py-16">
        <ProductCard product={finditem} />
        <CommentsSection comments={finditem?.comments || []} />
      </div>
    </div>
  );
}

export default Info;

