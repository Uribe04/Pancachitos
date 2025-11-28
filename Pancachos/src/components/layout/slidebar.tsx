// SLIDEBAR / CAROUSEL COMPONENT
// Muestra carruseles de productos desde Supabase

import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Product } from '../../types/product';
import ProductCard from '../product/productcard';
import { useAppSelector } from '../../redux/hooks';

// COMPONENTE DE CARRUSEL INDIVIDUAL
interface BakeryCarouselProps {
  bakeryName: string;
  bakeryLogo: string;
  products: Product[];
}

function BakeryCarousel({ bakeryName, bakeryLogo, products }: BakeryCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;

    const scrollAmount = 280;
    const newPosition =
      direction === 'left'
        ? scrollContainerRef.current.scrollLeft - scrollAmount
        : scrollContainerRef.current.scrollLeft + scrollAmount;

    scrollContainerRef.current.scrollTo({
      left: newPosition,
      behavior: 'smooth',
    });
  };

  // No mostrar el carrusel si no hay productos
  if (products.length === 0) return null;

  return (
    <section className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header con logo de panadería */}
        <div className="flex items-center justify-center mb-12">
          <div className="relative">
            {/* Contenedor del logo sin fondo */}
            <div className="relative h-40 w-40 md:h-48 md:w-48 flex items-center justify-center overflow-hidden">
              <img
                src={bakeryLogo}
                alt={`${bakeryName} logo`}
                className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* Carrusel de productos */}
        <div className="relative flex items-center justify-center">
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 transition-all hover:scale-110"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6 text-gray-500" />
          </button>

          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth px-12 py-4 w-full justify-center"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {products.map((product) => (
              <ProductCard key={product.id} product={product} Click={() => {}} />
            ))}
          </div>

          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 transition-all hover:scale-110"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6 text-gray-800" />
          </button>
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}

// COMPONENTE PRINCIPAL
export default function ProductCarousels({ search = '' }: { search?: string }) {
  const allProducts = useAppSelector((state) => state.products.allProducts);

  // Filtrar productos por búsqueda
  const filteredProducts = allProducts.filter((p) =>
    (p.name || "").toString().toLowerCase().includes(search.toLowerCase())
  );

  // Agrupar productos por categoría para mostrar en diferentes secciones
  const categories = Array.from(new Set(filteredProducts.map((p) => p.category || 'Other')));

  return (
    <div>
      <div className="text-center py-12 px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-[#786033] mb-4">
          {search ? `Search results for "${search}"` : 'Our products!'}
        </h1>
      </div>

      {/* Renderizar un carrusel por cada categoría */}
      {categories.length > 0 ? (
        categories.map((category) => {
          const categoryProducts = filteredProducts.filter((p) => p.category === category);
          return (
            <BakeryCarousel
              key={category}
              bakeryName={category}
              bakeryLogo="/images/IconUser.png"
              products={categoryProducts}
            />
          );
        })
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No products found.</p>
        </div>
      )}
    </div>
  );
}