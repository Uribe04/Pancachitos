import { useLocation } from "react-router-dom";
import type { ComponentType } from "react";
import Banner from "../../components/layout/banner";
import ProductFilter from "../../components/product/productfilter";
import Footer from "../../components/footer/footer";
import ProductCarousels from "../../components/layout/slidebar";
import ProductInfo from "../../components/product/productInfo";
import products from "../../data/products.json";

const ProductCarouselsTyped = ProductCarousels as ComponentType<{ search: string }>;

function Home() {
  const location = useLocation();
  const q = new URLSearchParams(location.search).get("search") || "";
  const qNorm = q.toLowerCase().trim();

  // filtrar productos por nombre
  const filtered = (products as any[]).filter((p) =>
    (p.name || "").toString().toLowerCase().includes(qNorm)
  );

  return (
    <div className="bg-[#FBEFD5] min-h-screen">
      <Banner />
      <ProductFilter />

      {/* Si hay una búsqueda y solo 1 producto coincide, mostrar su info en la misma página */}
      {q && filtered.length === 1 ? (
        <div className="px-6 py-8 w-full">
          <ProductInfo product={filtered[0]} />
        </div>
      ) : (
        // En cualquier otro caso mostrar los carruseles (filtrados por query)
        <ProductCarouselsTyped search={q} />
      )}

      <Footer />
    </div>
  );
}

export default Home;
