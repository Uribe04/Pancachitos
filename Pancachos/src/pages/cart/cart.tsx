import { useEffect } from "react";
import { removeFromCart } from "../../utils/cartUtils";
import { FaTrash, FaShoppingCart, FaPlus, FaMinus } from "react-icons/fa";
import Banner from "../../components/layout/banner";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { hydrateCart, removeFromCart as removeFromCartRedux } from "../../redux/slices/cartSlice";

export default function CartPage() {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.cart.items);

  useEffect(() => {
    // Hidratar el carrito desde localStorage al montar el componente
    dispatch(hydrateCart());
  }, [dispatch]);

  const handleRemove = (id: number | string) => {
    // Eliminar tanto de Redux como de localStorage
    dispatch(removeFromCartRedux(id));
    removeFromCart(id); // Para mantener localStorage sincronizado
  };

  const total = items.reduce((s, it) => s + (Number(it.price) || 0), 0);

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

          {items.length === 0 ? (
            <div className="p-6 bg-white rounded-xl shadow-sm border border-[#E8E8E8]">
              <p className="text-gray-600">Your cart is empty.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              <section className="md:col-span-2 p-6 bg-[#F6E6CE] rounded-xl shadow-sm border border-[#E8DCC0]">
                {items.map((it) => (
                  <div
                    key={String(it.id)}
                    className="flex items-center gap-4 p-4 bg-white rounded-lg border border-[#F1EDE6] mb-4"
                  >
                    <img
                      src={it.image || "/images/products/default.png"}
                      alt={it.name}
                      className="w-24 h-24 rounded-md object-cover shadow-sm"
                    />

                    <div className="flex-1">
                      <div className="font-semibold text-[#1F2937]">{it.name}</div>
                      <div className="mt-2 flex items-center gap-2">
                        <span className="px-2 py-0.5 text-xs bg-[#F6ECCD] rounded text-[#8A6B3A]">Size</span>
                        <span className="px-2 py-0.5 text-xs bg-[#F6ECCD] rounded text-[#8A6B3A]">Warm</span>
                      </div>
                      <div className="mt-3 flex items-center gap-3">
                        <div className="flex items-center gap-2 bg-[#F3F7FB] px-2 py-1 rounded">
                          <button className="text-sm text-[#2870B8] p-1 rounded bg-white opacity-80" disabled>
                            <FaMinus />
                          </button>
                          <div className="px-3 text-sm font-medium">1</div>
                          <button className="text-sm text-[#2870B8] p-1 rounded bg-white opacity-80" disabled>
                            <FaPlus />
                          </button>
                        </div>
                        <div className="text-sm text-gray-500">Price</div>
                        <div className="font-semibold text-[#1F2937]">${Number(it.price || 0).toFixed(2)}</div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="font-semibold">${Number(it.price || 0).toFixed(2)}</div>
                      <div className="text-sm text-gray-500">Total</div>
                      <button
                        onClick={() => handleRemove(it.id)}
                        className="mt-3 text-red-500 hover:text-red-600"
                        aria-label={`Remove ${it.name}`}
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
                    <div className="font-semibold">{items.length}</div>
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
