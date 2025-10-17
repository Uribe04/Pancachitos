
type Product = {
  id: number;
  name: string;
  rating: number;
  tags: string[];
  description: string;
  price: number;
  image: string;
  brand: string;
};

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="bg-white rounded-xl shadow-md w-72 overflow-hidden hover:shadow-lg transition">
      {/* Imagen del producto */}
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-44 object-cover"
        />

        {/* Rating */}
        <div className="absolute top-2 left-2 bg-black/70 text-white text-sm px-2 py-1 rounded-full flex items-center gap-1">
          ⭐ {product.rating}
        </div>

        {/* Corazón */}
        <button className="absolute top-2 right-2 bg-white/70 rounded-full p-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M21 8.25c0-2.485-2.015-4.5-4.5-4.5a4.48 4.48 0 0 0-3.364 1.514A4.48 4.48 0 0 0 9.772 3.75C7.287 3.75 5.25 5.765 5.25 8.25c0 5.25 6.75 9 6.75 9s6.75-3.75 6.75-9Z"
            />
          </svg>
        </button>
      </div>

      {/* Info del producto */}
      <div className="p-4 space-y-2">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold">{product.name}</h3>
          <img
            src={product.brand}
            alt="brand"
            className="w-16 h-auto object-contain"
          />
        </div>

        <div className="flex gap-2">
          {product.tags.map((tag, i) => (
            <span
              key={i}
              className="text-sm border border-yellow-800 px-3 py-1 rounded-full text-gray-700"
            >
              {tag}
            </span>
          ))}
        </div>

        <p className="text-gray-500 text-sm">{product.description}</p>

        <div className="flex justify-between items-center pt-2">
          <p className="text-black font-semibold text-md">
            ${product.price} COP
          </p>
          <button className="bg-[#C8A46B] hover:bg-[#b4915f] text-white text-sm font-semibold py-2 px-4 rounded-lg">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}

