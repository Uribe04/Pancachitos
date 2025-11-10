// UTILIDADES PARA FORMATO DE PRECIOS
/**
 * Formatea un número como precio en pesos colombianos
 */
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

/**
 * Formatea un número con separadores de miles sin símbolo de moneda
 */
export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('es-CO').format(num);
};

/**
 * Convierte un string a número y lo formatea como precio
 */
export const parseToPriceString = (value: string): string => {
  const numValue = parseFloat(value);
  if (isNaN(numValue)) return '';
  return formatNumber(numValue);
};

/**
 * Formatea precio para mostrar en la UI (sin decimales)
 */
export const displayPrice = (price: number): string => {
  return `$ ${formatNumber(price)} COP`;
};