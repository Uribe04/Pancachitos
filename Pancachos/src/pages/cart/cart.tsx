import { useEffect } from "react";
import { FaTrash, FaShoppingCart, FaPlus, FaMinus } from "react-icons/fa";
import Banner from "../../components/layout/banner";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchCartItems, removeFromCart, updateCartItemQuantity } from "../../redux/thunks/cartThunks";

export default function CartPage() {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.auth.user);
  const cartItems = useAppSelector((state) => state.cart.items);
  const allProducts = useAppSelector((state) => state.products.allProducts);

  // Cargar carrito del usuario actual
  useEffect(() => {
    const loadCart = async () => {
      if (currentUser?.id) {
        try {
          await dispatch(fetchCartItems(currentUser.id) as any);
        } catch (error) {
          console.error('Error loading cart:', error);
        }
      }
    };

    loadCart();
  }, [currentUser?.id, dispatch]);

  const handleRemove = async (cartItemId: string) => {
    if (currentUser?.id) {
      try {
        await dispatch(removeFromCart({ userId: currentUser.id, cartItemId }) as any);
      } catch (error) {
        console.error('Error removing from cart:', error);
      }
    }
  };

  const handleQuantityChange = async (cartItemId: string, newQuantity: number) => {
    if (currentUser?.id) {
      try {
        await dispatch(updateCartItemQuantity({ userId: currentUser.id, cartItemId, quantity: newQuantity }) as any);
      } catch (error) {
        console.error('Error updating quantity:', error);
      }
    }
  };

  // Enriquecer items del carrito con información del producto
  const enrichedItems: any[] = (cartItems as any[]).map((item: any) => ({
    ...item,
    product: allProducts.find((p) => p.id === item.product_id),
  }));

  const total = enrichedItems.reduce((sum, item: any) => {
    const price = item.product?.price || 0;
    return sum + price * item.quantity;
  }, 0);

  return (
    <div className="min-h-screen flex flex-col items-center bg-[#2870B8]">
      {/* Banner (contains the navbar) */}
      <div className="w-full">
        <Banner />
      </div>

      {/* Main content */}
      <main className="w-full bg-[#FBEFD5] flex flex-col items-center gap-10 py-12 -mt-8">
        <div className="w-[95%] max-w-6xl bg-white rounded-2xl p-6 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-[#2870B8] flex items-center gap-3">
              <span className="text-xl text-[#D7B77C]"><FaShoppingCart /></span>
              Shopping cart
            </h2>
          </div>

          {enrichedItems.length === 0 ? (
            <div className="p-6 bg-white rounded-xl shadow-sm border border-[#E8E8E8]">
              <p className="text-gray-600">Your cart is empty.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              <section className="md:col-span-2 p-6 bg-[#F6E6CE] rounded-xl shadow-sm border border-[#E8DCC0]">
                {enrichedItems.map((item: any) => (
                  <div
                    key={String(item.id)}
                    className="flex items-center gap-4 p-4 bg-white rounded-lg border border-[#F1EDE6] mb-4"
                  >
                    <img
                      src={item.product?.image || "/images/products/default.png"}
                      alt={item.product?.name || "Product"}
                      className="w-24 h-24 rounded-md object-cover shadow-sm"
                    />

                    <div className="flex-1">
                      <div className="font-semibold text-[#1F2937]">{item.product?.name}</div>
                      <div className="mt-2 flex items-center gap-2">
                        <span className="px-2 py-0.5 text-xs bg-[#F6ECCD] rounded text-[#8A6B3A]">{item.product?.size}</span>
                        <span className="px-2 py-0.5 text-xs bg-[#F6ECCD] rounded text-[#8A6B3A]">{item.product?.temperature}</span>
                      </div>
                      <div className="mt-3 flex items-center gap-3">
                        <div className="flex items-center gap-2 bg-[#F3F7FB] px-2 py-1 rounded">
                          <button 
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            className="text-sm text-[#2870B8] p-1 rounded bg-white opacity-80 hover:opacity-100"
                          >
                            <FaMinus />
                          </button>
                          <div className="px-3 text-sm font-medium">{item.quantity}</div>
                          <button 
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="text-sm text-[#2870B8] p-1 rounded bg-white opacity-80 hover:opacity-100"
                          >
                            <FaPlus />
                          </button>
                        </div>
                        <div className="text-sm text-gray-500">Price</div>
                        <div className="font-semibold text-[#1F2937]">${Number(item.product?.price || 0).toFixed(2)}</div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="font-semibold">${(Number(item.product?.price || 0) * item.quantity).toFixed(2)}</div>
                      <div className="text-sm text-gray-500">Total</div>
                      <button
                        onClick={() => handleRemove(item.id)}
                        className="mt-3 text-red-500 hover:text-red-600"
                        aria-label={Remove ${item.product?.name}}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                ))}
              </section>

              <aside className="p-6 bg-white rounded-xl border border-[#E8E8E8]">
                <h3 className="text-lg font-semibold text-[#2870B8] mb-4">Order summary</h3>

                <div className="mb-4">
                  <div className="flex items-center justify-between bg-[#FBFBFB] p-3 rounded">
                    <div className="text-sm text-gray-600">Items:</div>
                    <div className="font-semibold">{enrichedItems.length}</div>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="text-sm text-gray-600 block mb-2">Shipping</label>
                  <select className="w-full border border-[#E8E8E8] rounded p-2 text-sm">
                    <option>Standard (2-3 days) - $0</option>
                    <option>Express (1 day) - $5.00</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label className="text-sm text-gray-600 block mb-2">Promo code</label>
                  <div className="flex gap-2">
                    <input className="flex-1 border border-[#E8E8E8] rounded p-2 text-sm" placeholder="Enter your code..." />
                    <button className="bg-[#D7B77C] text-white px-3 rounded">Apply</button>
                  </div>
                </div>

                <div className="border-t border-dashed border-gray-200 pt-4 mt-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-gray-600">Total Cost</div>
                    <div className="text-xl font-semibold text-[#2870B8]">${total.toFixed(2)}</div>
                  </div>

                  <button
                    onClick={() => alert('Pay flow not implemented in this demo.')}
                    className="w-full bg-[#2E9BFF] text-white font-semibold py-2 rounded-lg hover:brightness-95 transition"
                  >
                    Pay
                  </button>
                </div>
              </aside>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}