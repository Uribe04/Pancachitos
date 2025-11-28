import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/layout/navbar';
import ProductForm from '../../components/product/productforms';
import type { ProductFormData } from '../../types/product';
import { SUCCESS_MESSAGES } from '../../utils/constants';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { createProduct } from '../../redux/thunks/productsThunks';

function CreateProduct() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.auth.user);

  const handleSaveProduct = async (productData: ProductFormData) => {
    if (!currentUser) {
      alert('You must be logged in to create a product');
      navigate('/login');
      return;
    }

    try {
      // Preparar datos del producto con seller_id del usuario actual
      const newProductData = {
        ...productData,
        seller_id: currentUser.id || currentUser.email,  // Usar ID de Supabase
        rating: 0,
        review_count: 0,
      };

      // Usar thunk para crear producto en Supabase
      const result = await dispatch(createProduct(newProductData) as any);

      if (result.meta.requestStatus === 'fulfilled') {
        // Producto creado exitosamente
        alert(SUCCESS_MESSAGES.PRODUCT_CREATED);
        navigate('/myproducts');
      } else {
        // Error al crear producto
        alert(result.payload || 'There was an error creating the product. Please try again.');
      }
    } catch (error) {
      console.error('Error creating product:', error);
      alert('There was an error creating the product. Please try again.');
    }
  };

  const handleCancel = () => {
    navigate('/myproducts');
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-400 to-blue-600">
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