import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/layout/navbar';
import ProductForm from '../../components/product/productforms';
import type { Product, ProductFormData } from '../../types/product';
import { SUCCESS_MESSAGES } from '../../utils/constants';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { addProduct as addProductToRedux } from '../../redux/slices/productsSlice';
import { addProduct as addProductToLocalStorage } from '../../utils/localStorage';

function CreateProduct() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const allProducts = useAppSelector((state) => state.products.allProducts);
  const currentUser = useAppSelector((state) => state.auth.user);

  const handleSaveProduct = (productData: ProductFormData) => {
    if (!currentUser) {
      alert('You must be logged in to create a product');
      navigate('/login');
      return;
    }

    try {
      // Generar ID único basado en los productos existentes
      const newId =
        allProducts.length > 0
          ? Math.max(...allProducts.map((p) => p.id)) + 1
          : 1;

      // Crear nuevo producto con sellerId = email del usuario actual
      const newProduct: Product = {
        ...productData,
        id: newId,
        sellerId: currentUser.email,  // ← CAMBIO: Usar email del usuario
        rating: 0,
        reviewCount: 0,
        createdAt: new Date().toISOString(),
        comments: [],
      };

      // Guardar en Redux
      dispatch(addProductToRedux(newProduct));
      // También guardar en localStorage para compatibilidad
      addProductToLocalStorage(newProduct);

      // Mostrar mensaje de éxito
      alert(SUCCESS_MESSAGES.PRODUCT_CREATED);

      // Navegar de vuelta a la página de productos
      navigate('/myproducts');
    } catch (error) {
      console.error('Error creating product:', error);
      alert('There was an error creating the product. Please try again.');
    }
  };

  const handleCancel = () => {
    navigate('/myproducts');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-blue-600">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-[#FAEFD5] rounded-3xl p-8 min-h-[calc(100vh-200px)]">
          <h2 className="text-3xl font-bold text-[#B68A3A] mb-6">
            Create New Product
          </h2>
          <ProductForm
            onSave={handleSaveProduct}
            onCancel={handleCancel}
            isEditMode={false}
          />
        </div>
      </main>
    </div>
  );
}

export default CreateProduct;

