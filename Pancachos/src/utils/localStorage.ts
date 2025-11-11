import type { Product } from '../types/product';

// ============================================
// GESTIÓN DE USUARIOS
// ============================================

export interface User {
  email: string;
  password: string;
  type: 'client' | 'bakery';
  bakeryName?: string;
}

//  NUEVA key para usuarios 
const USERS_KEY = 'bakery_users';

// Obtener todos los usuarios
export const getAllUsers = (): User[] => {
  return getFromLocalStorage<User[]>(USERS_KEY) || [];
};

// Guardar todos los usuarios
export const saveAllUsers = (users: User[]): void => {
  saveToLocalStorage(USERS_KEY, users);
};

// Verificar si ya existe un usuario con ese email
export const emailExists = (email: string): boolean => {
  const users = getAllUsers();
  return users.some((u) => u.email.toLowerCase() === email.toLowerCase());
};

// Verificar si ya existe una panadería con ese nombre
export const bakeryNameExists = (bakeryName: string): boolean => {
  const users = getAllUsers();
  return users.some(
    (u) =>
      u.type === 'bakery' &&
      u.bakeryName?.toLowerCase() === bakeryName.toLowerCase()
  );
};

// Agregar un nuevo usuario (evita duplicados)
export const addUser = (
  email: string,
  password: string,
  type: 'client' | 'bakery',
  bakeryName?: string
): boolean => {
  const users = getAllUsers();

  if (emailExists(email)) {
    alert(' Este correo ya está registrado. Intenta con otro.');
    return false;
  }

  if (type === 'bakery' && bakeryName && bakeryNameExists(bakeryName)) {
    alert(' Esta panadería ya está registrada.');
    return false;
  }

  const newUser: User = { email, password, type, bakeryName };
  users.push(newUser);
  saveAllUsers(users);

  alert(' Cuenta creada correctamente');
  console.log('Usuario agregado:', newUser);
  return true;
};

// Buscar un usuario por credenciales
export const getUserByCredentials = (
  email: string,
  password: string
): User | null => {
  const users = getAllUsers();
  return (
    users.find(
      (u) =>
        u.email.toLowerCase() === email.toLowerCase() &&
        u.password === password
    ) || null
  );
};

// Mostrar en consola todos los usuarios (solo debug)
export const debugShowUsers = (): void => {
  console.log(' Usuarios registrados:', getAllUsers());
};



// Nombre de las keys en localStorage
export const STORAGE_KEYS = {
  PRODUCTS: 'bakery_products',
  USER: 'bakery_user',
  CART: 'bakery_cart',
  FAVORITES: 'bakery_favorites',
};

// Función genérica para guardar en localStorage
export const saveToLocalStorage = <T>(key: string, data: T): void => {
  try {
    const serializedData = JSON.stringify(data);
    localStorage.setItem(key, serializedData);
  } catch (error) {
    console.error(`Error saving to localStorage (${key}):`, error);
  }
};

// Función genérica para leer de localStorage
export const getFromLocalStorage = <T>(key: string): T | null => {
  try {
    const serializedData = localStorage.getItem(key);
    if (serializedData === null) {
      return null;
    }
    return JSON.parse(serializedData) as T;
  } catch (error) {
    console.error(`Error reading from localStorage (${key}):`, error);
    return null;
  }
};

// Función para eliminar datos de localStorage
export const removeFromLocalStorage = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing from localStorage (${key}):`, error);
  }
};

// ============================================
// FUNCIONES ESPECÍFICAS PARA PRODUCTOS
// ============================================

// Obtener todos los productos
export const getAllProducts = (): Product[] => {
  return getFromLocalStorage<Product[]>(STORAGE_KEYS.PRODUCTS) || [];
};

// Guardar todos los productos
export const saveAllProducts = (products: Product[]): void => {
  saveToLocalStorage(STORAGE_KEYS.PRODUCTS, products);
};

// Obtener un producto por ID
export const getProductById = (id: number): Product | null => {
  const products = getAllProducts();
  return products.find((p) => p.id === id) || null;
};

// Obtener productos de un vendedor específico
export const getProductsBySeller = (sellerId: string): Product[] => {
  const products = getAllProducts();
  return products.filter((p) => p.sellerId === sellerId);
};

// Agregar un nuevo producto
export const addProduct = (product: Product): void => {
  const products = getAllProducts();
  products.push(product);
  saveAllProducts(products);
};

// Actualizar un producto existente
export const updateProduct = (updatedProduct: Product): boolean => {
  const products = getAllProducts();
  const index = products.findIndex((p) => p.id === updatedProduct.id);
  
  if (index !== -1) {
    products[index] = updatedProduct;
    saveAllProducts(products);
    return true;
  }
  
  return false;
};

// Eliminar un producto (eliminación real)
export const deleteProduct = (id: number): boolean => {
  const products = getAllProducts();
  const filteredProducts = products.filter((p) => p.id !== id);
  
  if (filteredProducts.length < products.length) {
    saveAllProducts(filteredProducts);
    return true;
  }
  
  return false;
};

// Marcar un producto como no disponible
export const markProductAsUnavailable = (id: number): boolean => {
  const products = getAllProducts();
  const product = products.find((p) => p.id === id);
  
  if (product) {
    product.available = false;
    saveAllProducts(products);
    return true;
  }
  
  return false;
};

// Marcar un producto como disponible
export const markProductAsAvailable = (id: number): boolean => {
  const products = getAllProducts();
  const product = products.find((p) => p.id === id);
  
  if (product) {
    product.available = true;
    saveAllProducts(products);
    return true;
  }
  
  return false;
};
