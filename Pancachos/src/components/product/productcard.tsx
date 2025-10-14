export default function ProductCard() {
  return (
    <div className="bg-gray-200 min-h-screen flex items-center justify-center p-6">
      {/* Tarjeta */}
      <div className="bg-white rounded-2xl shadow-lg w-64 overflow-hidden">
        {/* Imagen */}
        <div className="relative">
          <img
            src="https://images.pexels.com/photos/3892469/pexels-photo-3892469.jpeg"
            alt="Seasoned bread"
            className="w-full h-40 object-cover"
          />
          <div className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
            ★ 3.9
          </div>
          <button className="absolute top-2 right-2 bg-white/80 text-gray-700 rounded-full p-1 hover:bg-white">
            ♡
          </button>
        </div>

        {/* Contenido */}
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-gray-800 text-sm leading-tight">
              Seasoned bread
            </h3>
            <div className="bg-orange-100 border border-orange-300 text-orange-600 font-semibold rounded-full text-xs px-2 py-1">
              Paola
            </div>
          </div>

          {/* Tags */}
          <div className="flex gap-2 mb-3">
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full border">
              Medium
            </span>
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full border">
              Warm
            </span>
          </div>

          {/* Descripción */}
          <p className="text-xs text-gray-500 leading-tight mb-4">
            Soft, spongy, and slightly sweet bread, made with wheat flour, egg,
            and dairy.
          </p>

          {/* Precio y botón */}
          <div className="flex items-center justify-between">
            <span className="font-semibold text-gray-800 text-sm">
              $ 2000 COP
            </span>
            <button className="bg-yellow-400 hover:bg-yellow-500 text-white text-xs font-semibold py-2 px-4 rounded-lg">
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}