import { useState, useEffect } from 'react';
import { FaUpload, FaEdit, FaTimes, FaPlus } from 'react-icons/fa';
import type { Product, ProductFormData } from '../../types/product';
import {
  validateProductName,
  validatePrice,
  validateImage,
  validateImageFile,
  validateTags,
} from '../../utils/validateForm';
import {
  SIZE_OPTIONS,
  TEMPERATURE_OPTIONS,
  PREDEFINED_TAGS,
  PRODUCT_CATEGORIES,
} from '../../utils/constants';

interface ProductFormProps {
  product?: Product | null;
  onSave: (product: ProductFormData) => void;
  onCancel: () => void;
  onDelete?: (productId: string) => void;
  isEditMode?: boolean;
}

function ProductForm({
  product,
  onSave,
  onCancel,
  onDelete,
  isEditMode = false,
}: ProductFormProps) {
  const [name, setName] = useState(product?.name || '');
  const [description, setDescription] = useState(product?.description || '');
  const [price, setPrice] = useState(product?.price?.toString() || '');
  const [image, setImage] = useState(product?.image || '');
  const [category, setCategory] = useState(product?.category || '');
  const [size, setSize] = useState(product?.size || '');
  const [temperature, setTemperature] = useState(product?.temperature || '');
  const [stock, setStock] = useState(product?.stock?.toString() || '1');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [tags, setTags] = useState<string[]>(product?.tags || []);
  const [newTag, setNewTag] = useState('');
  const [showTagInput, setShowTagInput] = useState(false);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setDescription(product.description || '');
      setPrice(product.price.toString());
      setImage(product.image || '');
      setCategory(product.category || '');
      setSize(product.size || '');
      setTemperature(product.temperature || '');
      setStock(product.stock.toString());
      setTags(product.tags || []);
    }
  }, [product]);

  const handleAddTag = (tagName: string) => {
    const validation = validateTags([...tags, tagName]);
    if (!validation.isValid) {
      alert(validation.error);
      return;
    }
    if (tagName.trim() && !tags.includes(tagName.trim())) {
      setTags([...tags, tagName.trim()]);
      setNewTag('');
      setShowTagInput(false);
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validation = validateImageFile(file);
      if (!validation.isValid) {
        setErrors({ ...errors, image: validation.error || '' });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        const newErrors = { ...errors };
        delete newErrors.image;
        setErrors(newErrors);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    const nameValidation = validateProductName(name);
    if (!nameValidation.isValid) {
      newErrors.name = nameValidation.error || '';
    }

    const priceValidation = validatePrice(price);
    if (!priceValidation.isValid) {
      newErrors.price = priceValidation.error || '';
    }

    const imageValidation = validateImage(image);
    if (!imageValidation.isValid) {
      newErrors.image = imageValidation.error || '';
    }

    if (!category) {
      newErrors.category = 'Category is required';
    }

    if (!size) {
      newErrors.size = 'Size is required';
    }

    if (!temperature) {
      newErrors.temperature = 'Temperature is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) {
      alert('Please fill in all required fields before saving');
      return;
    }

    const productData: ProductFormData = {
      name: name.trim(),
      description: description.trim(),
      price: parseFloat(price),
      image,
      category,
      size,
      temperature,
      tags,
      stock: parseInt(stock) || 1,
      available: true,
    };

    onSave(productData);
  };

  const isFormValid =
    name.trim() &&
    price &&
    parseFloat(price) > 0 &&
    image &&
    category &&
    size &&
    temperature;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Sección izquierda: Imagen */}
      <div className="bg-gray-200 rounded-3xl flex items-center justify-center min-h-[500px] relative overflow-hidden">
        {image ? (
          <>
            <img src={image} alt="Product preview" className="w-full h-full object-cover" />
            <label className="absolute bottom-4 right-4 bg-white p-3 rounded-full cursor-pointer hover:bg-gray-100 transition-colors shadow-lg">
              <FaEdit className="text-gray-700" />
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </label>
          </>
        ) : (
          <label className="cursor-pointer flex flex-col items-center gap-4 text-gray-500 hover:text-gray-700 transition-colors">
            <FaUpload className="text-6xl" />
            <span className="text-xl font-medium">Upload image</span>
            <span className="text-sm text-red-500">Required *</span>
            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
          </label>
        )}
        {errors.image && (
          <div className="absolute bottom-4 left-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg text-sm">
            {errors.image}
          </div>
        )}
      </div>

      {/* Sección derecha: Formulario */}
      <div className="bg-white rounded-3xl p-8 shadow-lg space-y-6">
        {/* Título */}
        <div>
          <div className="flex items-center gap-3 mb-2">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Product name"
              className="text-4xl font-bold bg-transparent border-none outline-none flex-1 text-gray-900"
            />
            <FaEdit className="text-blue-400" />
          </div>
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg outline-none focus:border-amber-600"
          >
            <option value="">Select category</option>
            {PRODUCT_CATEGORIES.map((cat) => (
              <option key={cat} value={cat.toLowerCase()}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Size y Temperature */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Size <span className="text-red-500">*</span>
            </label>
            <select
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg outline-none focus:border-amber-600"
            >
              <option value="">Select size</option>
              {SIZE_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Temperature <span className="text-red-500">*</span>
            </label>
            <select
              value={temperature}
              onChange={(e) => setTemperature(e.target.value)}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg outline-none focus:border-amber-600"
            >
              <option value="">Select temp</option>
              {TEMPERATURE_OPTIONS.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        </div>

        {/* Tags personalizados */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Additional Tags (optional)
          </label>
          <div className="flex flex-wrap gap-2 mb-3">
            {tags.map((tag, index) => (
              <div
                key={index}
                className="px-4 py-2 bg-amber-100 border-2 border-amber-300 rounded-full text-sm text-gray-700 flex items-center gap-2"
              >
                {tag}
                <button
                  onClick={() => handleRemoveTag(tag)}
                  className="text-gray-500 hover:text-red-500"
                >
                  <FaTimes className="text-xs" />
                </button>
              </div>
            ))}

            {tags.length < 5 && !showTagInput && (
              <button
                onClick={() => setShowTagInput(true)}
                className="px-4 py-2 bg-[#D7B77C] text-white rounded-full text-sm font-medium hover:bg-[#caa44a] transition-colors flex items-center gap-1"
              >
                Add tag <FaPlus className="text-xs" />
              </button>
            )}
          </div>

          {showTagInput && (
            <div className="space-y-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleAddTag(newTag);
                    }
                  }}
                  placeholder="Enter custom tag"
                  className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg outline-none focus:border-amber-600"
                />
                <button
                  onClick={() => handleAddTag(newTag)}
                  className="px-4 py-2 bg-[#D7B77C] text-white rounded-lg hover:bg-[#caa44a] transition-colors"
                >
                  Add
                </button>
                <button
                  onClick={() => {
                    setShowTagInput(false);
                    setNewTag('');
                  }}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="text-sm text-gray-600">Quick add:</span>
                {PREDEFINED_TAGS.filter((tag) => !tags.includes(tag)).map((tag) => (
                  <button
                    key={tag}
                    onClick={() => handleAddTag(tag)}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {tags.length >= 5 && (
            <p className="text-sm text-gray-500 mt-2">Maximum of 5 tags reached</p>
          )}
        </div>

        {/* Descripción */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add a description..."
            rows={4}
            className="w-full text-gray-700 px-4 py-2 border-2 border-gray-300 rounded-lg outline-none focus:border-amber-600 resize-none"
          />
        </div>

        {/* Precio y Stock */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold text-gray-900">$</span>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0"
                className="text-2xl font-bold bg-transparent border-b-2 border-gray-300 outline-none flex-1 text-gray-900"
              />
              <span className="text-xl text-gray-600">COP</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
            <input
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              min="0"
              className="w-32 text-lg bg-gray-100 px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-amber-600"
            />
          </div>
        </div>

        {/* Botón de guardar */}
        <button
          onClick={handleSave}
          disabled={!isFormValid}
          className={`w-full py-4 rounded-xl font-medium text-lg transition-colors ${
            isFormValid
              ? 'bg-[#D7B77C] text-white hover:bg-[#caa44a]'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Save changes
        </button>

        {/* Botones adicionales para modo edición */}
        {isEditMode && product && (
          <div className="space-y-3">
            <div className="flex gap-4">
              <button
                onClick={onCancel}
                className="flex-1 py-3 rounded-xl font-medium bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
            
            {/* Botón de eliminar permanentemente */}
            <button
              onClick={() => {
                if (window.confirm('WARNING: This will permanently delete this product. This action cannot be undone. Are you sure?')) {
                  onDelete?.(product.id);
                }
              }}
              className="w-full py-3 rounded-xl font-medium bg-red-500 text-white hover:bg-red-600 transition-colors"
            >
            Delete Permanently
            </button>
          </div>
        )}

        {!isFormValid && (
          <p className="text-red-500 text-sm text-center">
            * Name, price, image, category, size, and temperature are required
          </p>
        )}
      </div>
    </div>
  );
}

export default ProductForm;