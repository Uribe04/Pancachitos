// CONSTANTES PARA GESTIÓN DE PRODUCTOS
// Opciones de tamaño
export const SIZE_OPTIONS = ['Small', 'Medium', 'Large', 'Extra Large'];

// Opciones de temperatura
export const TEMPERATURE_OPTIONS = ['Hot', 'Warm', 'Cold', 'Room Temperature'];

// Tags predefinidos (además de size y temperature)
export const PREDEFINED_TAGS = [
  'Sweet',
  'Salty',
  'Fresh',
  'Organic',
  'Gluten-free',
  'Vegan',
  'Sugar-free',
  'Whole-grain',
  'Artisan',
];

// Categorías de productos (si no las tienes ya en categories.ts)
export const PRODUCT_CATEGORIES = [
  'Bread',
  'Pastry',
  'Cookies',
  'Cakes',
  'Pies',
  'Muffins',
  'Donuts',
  'Other',
];

// Mensajes de éxito
export const SUCCESS_MESSAGES = {
  PRODUCT_CREATED: 'Product created successfully!',
  PRODUCT_UPDATED: 'Product updated successfully!',
  PRODUCT_DELETED: 'Product deleted successfully!',
  PRODUCT_UNAVAILABLE: 'Product marked as unavailable',
  PRODUCT_AVAILABLE: 'Product marked as available',
};

// ID del vendedor por defecto (mientras no tengan auth)
export const DEFAULT_SELLER = {
  id: 'seller-1',
  name: 'My Bakery',
  logo: '/images/bakerys/default.png',
};