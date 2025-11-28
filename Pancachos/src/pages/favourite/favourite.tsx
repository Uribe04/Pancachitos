import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/footer/footer";
import Navbar from "../../components/layout/navbar";
import ProductCard from "../../components/product/productcard";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchProducts } from "../../redux/thunks/productsThunks";

function Favourite() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const currentUser = useAppSelector((state) => state.auth.user);
  const favoriteProducts = useAppSelector(
    (state) => state.favorites.favoriteProducts
  );
  const allProducts = useAppSelector((state) => state.products.allProducts);

  // Cargar productos si aún no están (por si quieres usar info adicional)
  useEffect(() => {
    if (!allProducts.length) {
      dispatch(fetchProducts() as any);
    }
  }, [allProducts.length, dispatch]);

  console.log("favoriteProducts in page:", favoriteProducts);

  if (!currentUser) {
    return (
      <div className="bg-linear-to-r from-[#2971B9] to-[#69ADF1] min-h-screen w-full flex flex-col items-center px-4 py-6 md:py-8">
        <div className="w-full max-w-6xl mb-6 md:mb-8">
          <Navbar />
        </div>
        <div className="w-full max-w-6xl bg-[#F4DFB3] rounded-4xl shadow-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-[#786033] mb-4">
            Please log in to view your favorites
          </h2>
          <button
            onClick={() => navigate("/login")}
            className="bg-[#C3A366] hover:bg-[#786033] text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Go to Login
          </button>
        </div>
        <div className="w-full mt-6 md:mt-8">
          <Footer />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-linear-to-r from-[#2971B9] to-[#69ADF1] min-h-screen w-full flex flex-col items-center px-4 py-6 md:py-8">
      {/* NAVBAR */}
      <div className="w-full max-w-6xl mb-6 md:mb-8">
        <Navbar />
      </div>

      {/* CONTENEDOR BEIGE */}
      <div className="w-full max-w-6xl bg-[#F4DFB3] rounded-4xl shadow-2xl p-4 md:p-8 min-h-[400px]">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#786033] mb-4 md:mb-6 flex items-center gap-2">
          ❤️ My Favorites
        </h1>

        {favoriteProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg mb-4">No favorites yet.</p>
            <p className="text-gray-500 text-sm mb-6">
              Click the heart icon on products to add them to your favorites!
            </p>
            <button
              onClick={() => navigate("/")}
              className="bg-[#C3A366] hover:bg-[#786033] text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Browse Products
            </button>
          </div>
        ) : (
          <div className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide py-2">
            {favoriteProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                Click={() => navigate(`/info/${product.id}`)}
              />
            ))}
          </div>
        )}

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

      {/* FOOTER */}
      <div className="w-full mt-6 md:mt-8">
        <Footer />
      </div>
    </div>
  );
}

export default Favourite;
