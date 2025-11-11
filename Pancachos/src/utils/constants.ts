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

// Información del vendedor por defecto (tu panadería)
export const DEFAULT_SELLER = {
  id: 'my_bakery',
  name: 'My bakery',
  logo: 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 200 200%22%3E%3Crect fill=%22%23D7B77C%22 width=%22200%22 height=%22200%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 font-family=%22Arial, sans-serif%22 font-size=%2224%22 font-weight=%22bold%22 fill=%22%23fff%22%3EMY%3C/text%3E%3Ctext x=%2250%25%22 y=%2265%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 font-family=%22Arial, sans-serif%22 font-size=%2220%22 fill=%22%23fff%22%3EBAKERY%3C/text%3E%3C/svg%3E',
};