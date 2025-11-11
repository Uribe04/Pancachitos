import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../../components/layout/navbar';
import ProductForm from '../../components/product/productforms';
import type { Product, ProductFormData } from '../../types/product';
import {
  getProductById,
  updateProduct,
  markProductAsUnavailable,
  deleteProduct,
} from '../../utils/localStorage';
import { SUCCESS_MESSAGES } from '../../utils/constants';

function EditProduct() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      navigate('/myproducts');
      return;
    }

    const productId = parseInt(id);
    const foundProduct = getProductById(productId);

    if (foundProduct) {
      setProduct(foundProduct);
    } else {
      alert('Product not found');
      navigate('/myproducts');
    }

    setLoading(false);
  }, [id, navigate]);

  const handleUpdateProduct = (productData: ProductFormData) => {
    if (!product) return;

    try {
      const updatedProduct: Product = {
        ...product,
        ...productData,
        rating: product.rating,
        reviewCount: product.reviewCount,
        createdAt: product.createdAt,
      };

      const success = updateProduct(updatedProduct);

      if (success) {
        alert(SUCCESS_MESSAGES.PRODUCT_UPDATED);
        navigate('/myproducts');
      } else {
        alert('Error updating product');
      }
    } catch (error) {
      console.error('Error updating product:', error);
      alert('There was an error updating the product. Please try again.');
    }
  };

  const handleMarkUnavailable = (productId: number) => {
    const confirmAction = confirm(
      'Are you sure you want to mark this product as unavailable? This will hide it from customers but preserve its reviews and history.'
    );

    if (confirmAction) {
      try {
        const success = markProductAsUnavailable(productId);

        if (success) {
          alert(SUCCESS_MESSAGES.PRODUCT_UNAVAILABLE);
          navigate('/myproducts');
        } else {
          alert('Error marking product as unavailable');
        }
      } catch (error) {
        console.error('Error marking product as unavailable:', error);
        alert('There was an error. Please try again.');
      }
    }
  };

  // ✅ NUEVO: Función para eliminar permanentemente
  const handleDeleteProduct = (productId: number) => {
    try {
      const success = deleteProduct(productId);

      if (success) {
        alert('✅ Product deleted permanently');
        navigate('/myproducts');
      } else {
        alert('Error deleting product');
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
      <div className="min-h-screen bg-gradient-to-br from-blue-400 to-blue-600">
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
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-blue-600">
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
            onMarkUnavailable={handleMarkUnavailable}
            onDelete={handleDeleteProduct} // ✅ NUEVO: Pasar función de eliminar
            isEditMode={true}
          />
        </div>
      </main>
    </div>
  );
}

export default EditProduct;