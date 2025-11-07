import ProductCard from "../../components/product/productInfo";
import CommentsSection from "../../components/product/productComment";
import products from "../../data/products.json";
import Navbar from "../../components/layout/navbar";

function Info() {
  return (
    <div className="min-h-screen flex flex-col items-center">
      {/* Sección azul: navbar */}
      <div className="w-full bg-[#2870B8] flex justify-center py-6">
        <Navbar />
      </div>

      {/* Sección principal: producto + comentarios */}
      <div className="w-full bg-[#FBEFD5] flex flex-col items-center gap-10 py-16">
        <ProductCard product={products[0]} />
        <CommentsSection comments={products[0].comments} />
      </div>
    </div>
  );
}

export default Info;

