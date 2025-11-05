import React from "react";


interface Product {
  id: number;
  name: string;
  bakery: string;
  bakeryLogo: string;
  price: number;
  size: string;
  temperature: string;
  description: string;
  image: string;
  category: string;
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="bg-[#FAF0DC] flex flex-col items-center justify-center rounded-2xl shadow-lg overflow-hidden max-w-4xl mx-auto p-4">
      {/* Imagen del producto */}
      <img
        src={product.image}
        alt={product.name}
        className="w-full sm:w-3/4 object-cover rounded-2xl shadow-md mb-6"
      />

      {/* Información del producto */}
      <div className="bg-white rounded-2xl shadow-md p-6 w-full sm:w-3/4">
        <div className="flex justify-between items-center mb-4">
          {/* Nombre y panadería */}
          <div>
            <h2 className="text-3xl font-bold">{product.name}</h2>
            <div className="flex items-center gap-2 mt-1">
              <img
                src={product.bakeryLogo}
                alt={product.bakery}
                className="w-6 h-6 rounded-full object-cover"
              />
              <p className="text-gray-700 text-sm">{product.bakery}</p>
            </div>
          </div>
        </div>

        {/* Etiquetas */}
        <div className="flex gap-3 mb-4">
          <span className="border border-yellow-700 text-yellow-700 px-3 py-1 rounded-md">
            {product.size}
          </span>
          <span className="border border-yellow-700 text-yellow-700 px-3 py-1 rounded-md">
            {product.temperature}
          </span>
        </div>

        {/* Descripción */}
        <p className="text-gray-700 mb-6">{product.description}</p>

        {/* Precio y botón */}
        <div className="flex justify-between items-center">
          <p className="font-bold text-lg">
            ${product.price.toLocaleString()} COP
          </p>
          <button className="bg-[#C9A667] text-white font-semibold px-6 py-2 rounded-lg hover:bg-[#b59153] transition-all">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}

