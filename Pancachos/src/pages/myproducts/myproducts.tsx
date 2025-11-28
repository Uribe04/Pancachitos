import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaEdit, FaStar } from 'react-icons/fa';
import Navbar from "../../components/layout/navbar";
import type { Product } from '../../types/product';
import { displayPrice } from '../../utils/formatPrice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchProductsBySeller } from '../../redux/thunks/productsThunks';

function MyProducts() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.auth.user);
  const sellerProducts = useAppSelector((state) => state.products.sellerProducts);
  const [loading, setLoading] = useState(true);

  // Cargar productos del usuario actual desde Supabase
  useEffect(() => {
    const loadSellerProducts = async () => {
      if (currentUser?.id) {
        setLoading(true);
        try {
          await dispatch(fetchProductsBySeller(currentUser.id) as any);
        } catch (error) {
          console.error('Error loading products:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    loadSellerProducts();
  }, [currentUser?.id, dispatch]);

  const handleCreateNew = () => {
    navigate('/createproduct');
  };

  const handleEditProduct = (productId: string) => {
    navigate(`/editproduct/${productId}`);
  };

  const handleRatingClick = (product: Product) => {
    alert(
      `This product has an average rating of ${(product.rating ?? 0).toFixed(1)} stars based on ${product.review_count ?? 0} customer reviews.`
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-r from-[#2971B9] to-[#69ADF1] pt-4">
        <Navbar />
        <div className="flex items-center justify-center h-[calc(100vh-200px)]">
          <div className="text-white text-2xl">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-r from-[#2971B9] to-[#69ADF1] pt-4">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-[#FAEFD5] rounded-3xl p-8 min-h-[calc(100vh-200px)]">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold text-[#B68A3A]">My products</h1>
            <button
              onClick={handleCreateNew}
              className="bg-[#D7B77C] text-white px-8 py-3 rounded-xl font-medium hover:bg-[#caa44a] transition-colors flex items-center gap-2"
            >
              Create new product <FaPlus />
            </button>
          </div>

          {sellerProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sellerProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                >
                  {/* Imagen del producto */}
                  <div className="relative h-64 bg-gray-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    {/* Badge de rating */}
                    <div
                      onClick={() => handleRatingClick(product)}
                      className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full flex items-center gap-1 cursor-pointer hover:bg-black/80 transition-colors"
                    >
                      <FaStar className="text-yellow-400" />
                      <span className="text-sm font-medium">
                        {(product.rating ?? 0).toFixed(1)}
                      </span>
                    </div>
                    {/* Badge de no disponible */}
                    {!product.available && (
                      <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Unavailable
                      </div>
                    )}
                  </div>

                  {/* Información del producto */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      {/* Mostrar nombre del producto */}
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">
                          {product.name}
                        </h3>
                        {/* Mostrar categoría */}
                        <span className="text-sm text-gray-600 capitalize">
                          {product.category}
                        </span>
                      </div>
                      <button
                        onClick={() => handleEditProduct(product.id)}
                        className="text-blue-500 hover:text-blue-600 p-2 hover:bg-blue-50 rounded-full transition-colors"
                        aria-label="Edit product"
                      >
                        <FaEdit />
                      </button>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="px-3 py-1 bg-white border-2 border-gray-300 rounded-full text-sm text-gray-700">
                        {product.size}
                      </span>
                      <span className="px-3 py-1 bg-white border-2 border-gray-300 rounded-full text-sm text-gray-700">
                        {product.temperature}
                      </span>
                      {(product.tags ?? []).map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-white border-2 border-gray-300 rounded-full text-sm text-gray-700"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Descripción */}
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {product.description}
                    </p>

                    {/* Precio y stock */}
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-gray-900">
                        {displayPrice(product.price)}
                      </span>
                      <span className="text-sm text-gray-500">
                        Stock: {product.stock}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-[#B68A3A] text-xl mb-4">
                You don't have any products yet
              </p>
              <p className="text-[#D7B77C] mb-6">
                Start by creating your first product!
              </p>
              <button
                onClick={handleCreateNew}
                className="bg-[#D7B77C] text-white px-8 py-3 rounded-xl font-medium hover:bg-[#caa44a] transition-colors inline-flex items-center gap-2"
              >
                Create new product <FaPlus />
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default MyProducts;