// SLIDEBAR / CAROUSEL COMPONENT
// Muestra carruseles separados por panadería + productos propios

import { useRef, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import productsData from '../../data/products.json';
import type { Product } from '../../types/product';
import ProductCard from '../product/productcard';
import { getAllProducts } from '../../utils/localStorage'; 
import { DEFAULT_SELLER } from '../../utils/constants'; 

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
  isUserProducts?: boolean;
}

function BakeryCarousel({ bakeryName, bakeryLogo, products, isUserProducts = false }: BakeryCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

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

  function handleclick(id: number) {
    navigate(`/product/${id}`, { state: { id, isUserProduct: isUserProducts } });
  }

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
                    <ProductCard
                    key={product.id}
                    product={product}
                    Click={() => navigate(`/product/${product.id}`, { state: { id: product.id, isUserProduct: isUserProducts } })}
                    />
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
export default function ProductCarousels() {
  // cast via unknown first to avoid TS complaining about structural differences
  const products = productsData as unknown as Product[];
  // read filters from URL
  const params = new URLSearchParams(window.location.search);
  const filterSize = params.get('size') || '';
  const filterTemp = params.get('temperature') || '';
  const filterPrice = params.get('price') || '';
  
  //Estado para productos propios
  const [myProducts, setMyProducts] = useState<Product[]>([]);

  // Cargar productos propios del localStorage
  useEffect(() => {
    const loadMyProducts = () => {
      const allProducts = getAllProducts();
      // Filtrar solo productos disponibles del vendedor
      let availableMyProducts = allProducts.filter(
        (p) => p.seller_id === DEFAULT_SELLER.id && p.available
      );

      // apply filters
      availableMyProducts = availableMyProducts.filter((p) => {
        if (filterSize && p.size !== filterSize) return false;
        if (filterTemp && p.temperature !== filterTemp) return false;
        if (filterPrice) {
          if (filterPrice === 'low' && p.price > 2000) return false;
          if (filterPrice === 'medium' && (p.price < 2001 || p.price > 5000)) return false;
          if (filterPrice === 'high' && p.price <= 5000) return false;
        }
        return true;
      });
      setMyProducts(availableMyProducts);
    };

    loadMyProducts();

    // Escuchar cambios en localStorage
    window.addEventListener('storage', loadMyProducts);
    return () => window.removeEventListener('storage', loadMyProducts);
  }, []);

  return (
    <div>
      <div className="text-center py-12 px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-[#786033] mb-4">
          Our bakeries!
        </h1>
      </div>

      {/* Carrusel de "My bakery" (si hay productos) */}
      {myProducts.length > 0 && (
        <BakeryCarousel
          bakeryName={DEFAULT_SELLER.name}
          bakeryLogo={DEFAULT_SELLER.logo}
          products={myProducts}
          isUserProducts={true}
        />
      )}

      {/* Renderiza un carrusel por cada panadería */}
      {BAKERIES.map((bakery) => {
        let bakeryProducts = products.filter(
          (product) => product.bakery === bakery.name
        );

        // apply filters from URL
        bakeryProducts = bakeryProducts.filter((p) => {
          if (filterSize && p.size !== filterSize) return false;
          if (filterTemp && p.temperature !== filterTemp) return false;
          if (filterPrice) {
            if (filterPrice === 'low' && p.price > 2000) return false;
            if (filterPrice === 'medium' && (p.price < 2001 || p.price > 5000)) return false;
            if (filterPrice === 'high' && p.price <= 5000) return false;
          }
          return true;
        });

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