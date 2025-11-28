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
import { supabase } from '../../config/supabaseClient';

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
  },
];

// ---------- COMPONENTE DE CARRUSEL INDIVIDUAL ----------

interface BakeryCarouselProps {
  bakeryName: string;
  bakeryLogo: string;
  products: Product[];
  isUserProducts?: boolean;
}

function BakeryCarousel({
  bakeryName,
  bakeryLogo,
  products,
  isUserProducts = false,
}: BakeryCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Si productos viene como undefined / null o vacío, no pintar nada
  if (!products || products.length === 0) return null;

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

  return (
    <section className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header con logo de panadería */}
        <div className="flex items-center justify-center mb-12">
          <div className="relative h-40 w-40 md:h-48 md:w-48 flex items-center justify-center overflow-hidden">
            <img
              src={bakeryLogo}
              alt={`${bakeryName} logo`}
              className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
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
                Click={() =>
                  navigate(`/product/${product.id}`, {
                    state: { id: product.id, isUserProduct: isUserProducts },
                  })
                }
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

// ---------- FUNCIÓN AUXILIAR PARA FILTROS ----------

function applyFilters(
  list: Product[],
  filterSize: string,
  filterTemp: string,
  filterPrice: string
): Product[] {
  return list.filter((p) => {
    if (filterSize && p.size !== filterSize) return false;
    if (filterTemp && p.temperature !== filterTemp) return false;
    if (filterPrice) {
      if (filterPrice === 'low' && p.price > 2000) return false;
      if (filterPrice === 'medium' && (p.price < 2001 || p.price > 5000))
        return false;
      if (filterPrice === 'high' && p.price <= 5000) return false;
    }
    return true;
  });
}

// ---------- COMPONENTE PRINCIPAL ----------

export default function ProductCarousels() {
  // Productos base desde el JSON
  const productsFromJson = productsData as unknown as Product[];

  // Filtros desde query params
  const params = new URLSearchParams(window.location.search);
  const filterSize = params.get('size') || '';
  const filterTemp = params.get('temperature') || '';
  const filterPrice = params.get('price') || '';

  // Estado para productos propios (localStorage)
  const [myProducts, setMyProducts] = useState<Product[]>([]);

  // Estado para productos desde Supabase
  const [remoteProducts, setRemoteProducts] = useState<Product[]>([]);

  // Cargar productos propios desde localStorage
  useEffect(() => {
    const loadMyProducts = () => {
      const allProducts = getAllProducts();
      let availableMyProducts = allProducts.filter(
        (p: Product) => p.seller_id === DEFAULT_SELLER.id && p.available
      );

      availableMyProducts = applyFilters(
        availableMyProducts,
        filterSize,
        filterTemp,
        filterPrice
      );

      setMyProducts(availableMyProducts);
    };

    loadMyProducts();

    // Escuchar cambios en localStorage
    window.addEventListener('storage', loadMyProducts);
    return () => window.removeEventListener('storage', loadMyProducts);
  }, [filterSize, filterTemp, filterPrice]);

  // Cargar productos desde Supabase
  useEffect(() => {
    const getData = async () => {
      const { data, error } = await supabase.from('products').select('*');

      if (error) {
        console.error('Error fetching data from Supabase:', error);
      } else {
        setRemoteProducts((data || []) as Product[]);
      }
    };

    getData();
  }, []);

  // Combinar productos del JSON + Supabase
  const allProducts: Product[] = [...productsFromJson, ...remoteProducts];

  return (
    <div>
      <div className="text-center py-12 px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-[#786033] mb-4">
          Our bakeries!
        </h1>
      </div>

      {/* Carrusel de "My bakery" (si hay productos propios) */}
      {myProducts.length > 0 && (
        <BakeryCarousel
          bakeryName={DEFAULT_SELLER.name}
          bakeryLogo={DEFAULT_SELLER.logo}
          products={myProducts}
          isUserProducts={true}
        />
      )}

      {/* Renderiza un carrusel por cada panadería usando allProducts filtrados */}
      {BAKERIES.map((bakery) => {
        let bakeryProducts = allProducts.filter(
          (product) => product.bakery === bakery.name
        );

        bakeryProducts = applyFilters(
          bakeryProducts,
          filterSize,
          filterTemp,
          filterPrice
        );

        return (
          <BakeryCarousel
            key={bakery.name}
            bakeryName={bakery.name}
            bakeryLogo={bakery.logo}
            products={remoteProducts}
          />
        );
      })}
    </div>
  );
}
