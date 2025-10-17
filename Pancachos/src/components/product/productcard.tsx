//Componente reutilizable

import type { Product } from '../../types/product';
import { useState } from 'react';


interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const [added, setAdded] = useState(false);
  const [favorite, setFavorite] = useState(false);
  return (
    <div className="bg-white rounded-2xl shadow-lg w-64 flex-shrink-0 overflow-hidden hover:shadow-xl transition-shadow">
      {/* Imagen del producto */}
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-40 object-cover"
        />
        
        {/* Rating badge*/}
        <div className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
          ★ {product.rating}
        </div>
        
        {/* Botón favorito*/}
        <button
          className={`absolute top-2 right-2 rounded-full p-1 transition-colors ${
            favorite ? 'bg-blue-100' : 'bg-blue/80'
          }`}
          onClick={() => setFavorite(!favorite)}
        >
          {favorite ? '💙' : '🤍'}
        </button>
      </div>

      {/* Contenido de la card */}
      <div className="p-4">
        {/* Título y logo de panadería */}
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-gray-800 text-sm leading-tight">
            {product.name}
          </h3>
          
          {/* Logo de panadería - 🔴 Reemplaza bakeryLogo en products.json */}
          {product.bakeryLogo ? (
            <img 
              src={product.bakeryLogo} 
              alt={product.bakery}
              className="h-6 object-contain"
            />
          ) : (
            <div className="bg-[#C3A366] border-[#786033] text-gray-100 font-semibold rounded-full text-xs px-2 py-1">
              {product.bakery}
            </div>
          )}
        </div>

        {/* Tags de tamaño y temperatura - 🎨 Personaliza estilos aquí */}
        <div className="flex gap-2 mb-3">
          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full border">
            {product.size}
          </span>
          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full border">
            {product.temperature}
          </span>
        </div>

        {/* Descripción del producto */}
        <p className="text-xs text-gray-500 leading-tight mb-4">
          {product.description}
        </p>

        {/* Precio y botón de compra */}
        <div className="flex items-center justify-between">
          <span className="font-semibold text-gray-800 text-sm">
            $ {product.price.toLocaleString()} COP
          </span>
          
          {/* Botón Add to cart*/}
          <button
            className={`${
              added ? 'bg-[#786033]' : 'bg-[#C3A366] hover:bg-[#786033]'
          }  text-white text-xs font-semibold py-2 px-4 rounded-lg transition-colors`}
              onClick={() => setAdded(true)}
              disabled={added}
          >
            {added ? 'added' : 'Add to cart'}
          </button>

        </div>
      </div>
    </div>
  );
}