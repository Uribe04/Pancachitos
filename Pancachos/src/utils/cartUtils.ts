
export type CartItem = { id: number; name?: string; price?: number; image?: string; [k: string]: any };

const STORAGE_KEY = "cartItems";
const UPDATE_KEY = "__cart_update_ts";

const CartUpdated = () => {

  try {
    window.dispatchEvent(new Event("cartUpdated"));
  } catch {
   
  }
  // notificar otras pestañas/ventanas via storage
  try {
    localStorage.setItem(UPDATE_KEY, String(Date.now()));
  } catch {
   
  }
};

export const getCart = (): CartItem[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const saveCart = (items: CartItem[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
   
  }
  // centralizar la notificación aquí
  CartUpdated();
};

export const addToCart = (item: CartItem): boolean => {
  const cart = getCart();
  const exists = cart.some((i) => Number(i.id) === Number(item.id));
  if (!exists) {
    const updated = [...cart, item];
    saveCart(updated);
    return true;
  }
  return false;
};

export const removeFromCart = (id: number | string): CartItem[] => {
  const cart = getCart();
  const updated = cart.filter((i) => Number(i.id) !== Number(id));
  // solo guardar y notificar si hubo cambio real
  if (updated.length !== cart.length) {
    saveCart(updated);
  }
  return updated;
};

export const isInCart = (id: number | string): boolean => {
  const cart = getCart();
  return cart.some((i) => Number(i.id) === Number(id));
};

