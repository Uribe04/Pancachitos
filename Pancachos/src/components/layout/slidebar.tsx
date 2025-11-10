// SLIDEBAR / CAROUSEL COMPONENT
// Muestra carruseles separados por panadería

import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import productsData from '../../data/products.json';
import type { Product } from '../../types/product';
import ProductCard from '../product/productcard';

// CONFIGURACIÓN DE PANADERÍAS
const BAKERIES = [
  {
    name: 'Xocolata',
    logo: '/images/bakerys/xocolata.png',
  },
  {
    name: 'Paola',
    logo: '/images/bakerys/paola.png',
  },
  {
    name: 'Pandeli',
    logo: '/images/bakerys/pandeli.png',
  },
  {
    name: 'Aser Pan',
    logo: '/images/bakerys/aser.png',
  }
];

// COMPONENTE DE CARRUSEL INDIVIDUAL
interface BakeryCarouselProps {
  bakeryName: string;
  bakeryLogo: string;
  products: Product[];
}

function BakeryCarousel({ bakeryName, bakeryLogo, products }: BakeryCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Función para hacer scroll 
  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;

    const scrollAmount = 280; // Ancho de card (264px) + gap (16px)
    const newPosition =
      direction === 'left'
        ? scrollContainerRef.current.scrollLeft - scrollAmount
        : scrollContainerRef.current.scrollLeft + scrollAmount;

    scrollContainerRef.current.scrollTo({
      left: newPosition,
      behavior: 'smooth',
    });
  };

  // Función para navegar a seemoreproducts
  const handleSeeMore = () => {
    navigate('/seemoreproducts');
  };

  function handleclick (id:Number){
    navigate(`/product/${id}` , {state: id})
    console.log("chi");
    
  }

  return (
    <section className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header con logo y nombre de panadería */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <img
            src={bakeryLogo}
            alt={bakeryName}
            className="h-15 md:h-19 object-contain"
          />
        </div>

        {/* Carrusel de productos */}
        <div className="relative">
          {/* Botón izquierdo */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 transition-all hover:scale-110"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6 text-gray-500" />
          </button>

          {/* Container de cards */}
          <div
            ref={scrollContainerRef}
            className="flex gap-8 overflow-x-auto scrollbar-hide scroll-smooth px-8"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {products.map((product) => (
              <ProductCard key={product.id} product={product} Click={() => handleclick(product.id)} />
            ))}
          </div>

          {/* Botón derecho */}
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 transition-all hover:scale-110"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6 text-gray-800" />
          </button>
        </div>

        {/* Botón "Ver más" */}
        <div className="text-center mt-8">
          <button
            className="bg-[#C3A366] hover:bg-[#786033] text-white font-semibold py-3 px-8 rounded-lg transition-colors"
            onClick={handleSeeMore}
          >
            See more products from {bakeryName} →
          </button>
        </div>
      </div>

      {/* CSS para ocultar scrollbar */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}

// COMPONENTE PRINCIPAL
export default function ProductCarousels() {
  const products = productsData as Product[];

  return (
    <div>
      <div className="text-center py-12 px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-[#786033] mb-4">
          Our bakeries!
        </h1>
      </div>

      {/* Renderiza un carrusel por cada panadería */}
      {BAKERIES.map((bakery) => {
        const bakeryProducts = products.filter(
          (product) => product.bakery === bakery.name
        );

        if (bakeryProducts.length === 0) return null;

        return (
          <BakeryCarousel
            key={bakery.name}
            bakeryName={bakery.name}
            bakeryLogo={bakery.logo}
            products={bakeryProducts}
          />
        );
      })}
    </div>
  );
}
