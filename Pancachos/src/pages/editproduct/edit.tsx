import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../../components/layout/navbar';
import ProductForm from '../../components/product/productforms';
import type { Product, ProductFormData } from '../../types/product';
import { SUCCESS_MESSAGES } from '../../utils/constants';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { updateProduct as updateProductThunk, deleteProduct as deleteProductThunk } from '../../redux/thunks/productsThunks';

function EditProduct() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const currentUser = useAppSelector((state) => state.auth.user);
  const allProducts = useAppSelector((state) => state.products.allProducts);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      navigate('/myproducts');
      return;
    }

    // Buscar producto por UUID en lugar de número
    const foundProduct = allProducts.find((p) => p.id === id);

    if (foundProduct) {
      // Verificar que el usuario es el dueño del producto
      if (foundProduct.seller_id !== currentUser?.id && foundProduct.seller_id !== currentUser?.email) {
        alert('You do not have permission to edit this product');
        navigate('/myproducts');
        return;
      }
      setProduct(foundProduct);
    } else {
      alert('Product not found');
      navigate('/myproducts');
    }

    setLoading(false);
  }, [id, navigate, allProducts, currentUser]);

  const handleUpdateProduct = async (productData: ProductFormData) => {
    if (!product) return;

    try {
      // Preparar solo los campos que se actualizan
      const updates: Partial<Product> = {
        ...productData,
        updated_at: new Date().toISOString(),
      };

      // Usar thunk para actualizar producto en Supabase
      const result = await dispatch(updateProductThunk({ id: product.id, updates }) as any);

      if (result.meta.requestStatus === 'fulfilled') {
        alert(SUCCESS_MESSAGES.PRODUCT_UPDATED);
        navigate('/myproducts');
      } else {
        alert(result.payload || 'There was an error updating the product. Please try again.');
      }
    } catch (error) {
      console.error('Error updating product:', error);
      alert('There was an error updating the product. Please try again.');
    }
  };

  const handleDeleteProduct = async () => {
    if (!product || !product.id) return;

    const confirmDelete = confirm('Are you sure you want to permanently delete this product?');
    if (!confirmDelete) return;

    try {
      // Usar thunk para eliminar producto de Supabase
      const result = await dispatch(deleteProductThunk(product.id) as any);

      if (result.meta.requestStatus === 'fulfilled') {
        alert('✅ Product deleted permanently');
        navigate('/myproducts');
      } else {
        alert(result.payload || 'There was an error deleting the product. Please try again.');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('There was an error deleting the product. Please try again.');
    }
  };

  const handleCancel = () => {
    navigate('/myproducts');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-400 to-blue-600">
        <Navbar />
        <div className="flex items-center justify-center h-[calc(100vh-200px)]">
          <div className="text-white text-2xl">Loading...</div>
        </div>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-400 to-blue-600">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-[#FAEFD5] rounded-3xl p-8 min-h-[calc(100vh-200px)]">
          <h2 className="text-3xl font-bold text-[#B68A3A] mb-6">
            Edit Product
          </h2>
          <ProductForm
            product={product}
            onSave={handleUpdateProduct}
            onCancel={handleCancel}
            onDelete={handleDeleteProduct}
            isEditMode={true}
          />
        </div>
      </main>
    </div>
  );
}

export default EditProduct;