import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { hydrateProducts } from '../../redux/slices/productsSlice';
import Navbar from '../../components/layout/navbar';
import Footer from '../../components/footer/footer';
import ProductCard from '../../components/product/productcard';
import ProductInfo from '../../components/product/productInfo';
import type { Product } from '../../types/product';

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const allProducts = useAppSelector((state) => state.products.allProducts);
  
  const query = searchParams.get('q') || '';

  // Hidratar productos cuando la página carga
  useEffect(() => {
    dispatch(hydrateProducts());
  }, [dispatch]);

  // Filtrar productos por nombre (case-insensitive)
  const results = allProducts.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleProductClick = (productId: number) => {
    navigate(`/product/${productId}`, { state: { id: productId, isUserProduct: false } });
  };

  return (
    <div className="bg-[#FBEFD5] min-h-screen flex flex-col">
      {/* Navbar solo - integrada en el fondo */}
      <div className="w-full flex justify-center py-4">
        <Navbar />
      </div>

      {/* Main content */}
      <main className="flex-1 w-full">
        {/* Si solo 1 producto coincide, mostrar su info completa */}
        {results.length === 1 ? (
          <div className="px-6 py-8 w-full max-w-7xl mx-auto">
            <ProductInfo product={results[0]} />
          </div>
        ) : results.length === 0 ? (
          <div className="max-w-7xl mx-auto px-4 py-12">
            <h2 className="text-3xl font-bold text-[#2870B8] mb-4">
              Search Results for "<span className="text-[#D7B77C]">{query}</span>"
            </h2>
            <div className="bg-white rounded-2xl p-12 text-center shadow-md">
              <p className="text-gray-600 text-lg">No products found matching your search.</p>
              <button
                onClick={() => navigate('/')}
                className="mt-4 bg-[#2870B8] text-white px-6 py-2 rounded-full hover:brightness-90 transition"
              >
                Back to Home
              </button>
            </div>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto px-4 py-12">
            <h2 className="text-3xl font-bold text-[#2870B8] mb-6">
              Search Results for "<span className="text-[#D7B77C]">{query}</span>"
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {results.map((product: Product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  Click={() => handleProductClick(Number(product.id))}
                />
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}