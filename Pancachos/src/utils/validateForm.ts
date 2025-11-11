// VALIDACIONES PARA PRODUCTOS
interface ValidationResult {
  isValid: boolean;
  error?: string;
}

// Límites de validación
const LIMITS = {
  MAX_TAGS_PER_PRODUCT: 5,
  MAX_IMAGE_SIZE_MB: 5,
  MAX_IMAGE_SIZE_BYTES: 5 * 1024 * 1024,
  MAX_PRODUCT_NAME_LENGTH: 100,
  MAX_DESCRIPTION_LENGTH: 500,
  MIN_PRICE: 0,
  MAX_PRICE: 999999999,
  MIN_STOCK: 0,
  MAX_STOCK: 999999,
};

// Mensajes de validación
const VALIDATION_MESSAGES = {
  REQUIRED_FIELD: 'This field is required',
  INVALID_PRICE: 'Please enter a valid price',
  INVALID_STOCK: 'Please enter a valid stock quantity',
  IMAGE_REQUIRED: 'Product image is required',
  IMAGE_TOO_LARGE: `Image size must be less than ${LIMITS.MAX_IMAGE_SIZE_MB}MB`,
  INVALID_IMAGE_TYPE: 'Please upload a valid image file',
  MAX_TAGS_REACHED: `You can only add up to ${LIMITS.MAX_TAGS_PER_PRODUCT} tags per product`,
  NAME_TOO_LONG: `Product name must be less than ${LIMITS.MAX_PRODUCT_NAME_LENGTH} characters`,
  DESCRIPTION_TOO_LONG: `Description must be less than ${LIMITS.MAX_DESCRIPTION_LENGTH} characters`,
};

// Validar nombre del producto
export const validateProductName = (name: string): ValidationResult => {
  if (!name || name.trim().length === 0) {
    return {
      isValid: false,
      error: VALIDATION_MESSAGES.REQUIRED_FIELD,
    };
  }

  if (name.length > LIMITS.MAX_PRODUCT_NAME_LENGTH) {
    return {
      isValid: false,
      error: VALIDATION_MESSAGES.NAME_TOO_LONG,
    };
  }

  return { isValid: true };
};

// Validar descripción del producto
export const validateDescription = (description: string): ValidationResult => {
  if (description.length > LIMITS.MAX_DESCRIPTION_LENGTH) {
    return {
      isValid: false,
      error: VALIDATION_MESSAGES.DESCRIPTION_TOO_LONG,
    };
  }

  return { isValid: true };
};

// Validar precio
export const validatePrice = (price: string | number): ValidationResult => {
  const numPrice = typeof price === 'string' ? parseFloat(price) : price;

  if (isNaN(numPrice) || numPrice <= LIMITS.MIN_PRICE) {
    return {
      isValid: false,
      error: VALIDATION_MESSAGES.INVALID_PRICE,
    };
  }

  if (numPrice > LIMITS.MAX_PRICE) {
    return {
      isValid: false,
      error: `Price cannot exceed $${LIMITS.MAX_PRICE.toLocaleString()}`,
    };
  }

  return { isValid: true };
};

// Validar stock
export const validateStock = (stock: string | number): ValidationResult => {
  const numStock = typeof stock === 'string' ? parseInt(stock) : stock;

  if (isNaN(numStock) || numStock < LIMITS.MIN_STOCK) {
    return {
      isValid: false,
      error: VALIDATION_MESSAGES.INVALID_STOCK,
    };
  }

  if (numStock > LIMITS.MAX_STOCK) {
    return {
      isValid: false,
      error: `Stock cannot exceed ${LIMITS.MAX_STOCK.toLocaleString()}`,
    };
  }

  return { isValid: true };
};

// Validar imagen
export const validateImage = (image: string): ValidationResult => {
  if (!image || image.trim().length === 0) {
    return {
      isValid: false,
      error: VALIDATION_MESSAGES.IMAGE_REQUIRED,
    };
  }

  return { isValid: true };
};

// Validar archivo de imagen
export const validateImageFile = (file: File): ValidationResult => {
  // Validar tipo de archivo
  if (!file.type.startsWith('image/')) {
    return {
      isValid: false,
      error: VALIDATION_MESSAGES.INVALID_IMAGE_TYPE,
    };
  }

  // Validar tamaño
  if (file.size > LIMITS.MAX_IMAGE_SIZE_BYTES) {
    return {
      isValid: false,
      error: VALIDATION_MESSAGES.IMAGE_TOO_LARGE,
    };
  }

  return { isValid: true };
};

// Validar tags
export const validateTags = (tags: string[]): ValidationResult => {
  if (tags.length > LIMITS.MAX_TAGS_PER_PRODUCT) {
    return {
      isValid: false,
      error: VALIDATION_MESSAGES.MAX_TAGS_REACHED,
    };
  }

  return { isValid: true };
};

// Exportar límites y mensajes para usar en otros componentes
export { LIMITS, VALIDATION_MESSAGES };
interface User {
  email: string;
  password: string;
}



// usuarios predeterminados
const defaultUsers: User[] = [
  { email: "sofiaorejuela@gmail.com", password: "123456" },
  { email: "test@gmail.com", password: "123456" }
];

/**
 * obtiene usuarios del localstorage
 */
export const getUsers = (): User[] => {
  try {
    const storedUsers = localStorage.getItem('pancachitos_users');
    if (!storedUsers) {
      
      localStorage.setItem('pancachitos_users', JSON.stringify(defaultUsers));
      return defaultUsers;
    }
    const parsedUsers = JSON.parse(storedUsers);
    
    const mergedUsers = [...defaultUsers];
    parsedUsers.forEach((user: User) => {
      if (!defaultUsers.some(def => def.email === user.email)) {
        mergedUsers.push(user);
      }
    });
    return mergedUsers;
  } catch {
    return defaultUsers;
  }
};


export const addUser = (email: string, password: string): boolean => {
  try {
    const users = getUsers();
    const exists = users.some(user => user.email.toLowerCase() === email.toLowerCase());
    
    if (exists) return false;
    
    const newUsers = [...users, { email, password }];
    localStorage.setItem('pancachitos_users', JSON.stringify(newUsers));
    return true;
  } catch {
    return false;
  }
};


export const verifyUser = (email: string, password: string): boolean => {
  try {
    const users = getUsers();
    return users.some(user => 
      user.email.toLowerCase() === email.toLowerCase() && 
      user.password === password
    );
  } catch {
    return false;
  }
};


export const emailExists = (email: string): boolean => {
  try {
    const users = getUsers();
    return users.some(user => user.email.toLowerCase() === email.toLowerCase());
  } catch {
    return false;
  }
};
