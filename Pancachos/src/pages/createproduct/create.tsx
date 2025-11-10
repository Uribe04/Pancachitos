import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/layout/navbar';
import ProductForm from '../../components/product/productforms';
import type { Product, ProductFormData } from '../../types/product';
import { addProduct, getAllProducts } from '../../utils/localStorage';
import { SUCCESS_MESSAGES } from '../../utils/constants';

function CreateProduct() {
  const navigate = useNavigate();

  const handleSaveProduct = (productData: ProductFormData) => {
    try {
      // Generar ID único basado en los productos existentes
      const existingProducts = getAllProducts();
      const newId =
        existingProducts.length > 0
          ? Math.max(...existingProducts.map((p) => p.id)) + 1
          : 1;

      // Crear nuevo producto
      const newProduct: Product = {
        ...productData,
        id: newId,
        rating: 0,
        reviewCount: 0,
        createdAt: new Date().toISOString(),
      };

      // Guardar en localStorage
      addProduct(newProduct);

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

