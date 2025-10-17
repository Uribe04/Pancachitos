// ============================================
// SLIDEBAR / CAROUSEL COMPONENT
// Muestra carruseles separados por panadería
// ============================================

import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from '../product/productcard';
// 🔴 IMPORTANTE: Ajusta la ruta según tu estructura de carpetas
import productsData from '../../data/products.json';
import type { Product } from '../../types/product';

// ============================================
// CONFIGURACIÓN DE PANADERÍAS
// 🔴 REEMPLAZAR logos con tus imágenes reales
// ============================================
const BAKERIES = [
  {
    name: 'Xocolata',
    logo: 'https://via.placeholder.com/120x60/8B4513/FFFFFF?text=XOCOLATA',
    // 🎨 Personaliza colores de fondo aquí
    bgColor: 'bg-[#F5E6D3]'
  },
  {
    name: 'Paola',
    logo: 'https://via.placeholder.com/120x60/FF6B35/FFFFFF?text=PAOLA',
    bgColor: 'bg-[#FFF5F0]'
  },
  {
    name: 'Pandeli',
    logo: 'https://via.placeholder.com/120x60/D4A574/FFFFFF?text=PANDELI',
    bgColor: 'bg-[#FFF8E7]'
  },
  {
    name: 'Aser Pan',
    logo: 'https://via.placeholder.com/120x60/2C3E50/FFFFFF?text=ASER+PAN',
    bgColor: 'bg-[#F0F4F8]'
  }
];

// ============================================
// COMPONENTE DE CARRUSEL INDIVIDUAL
// ============================================
interface BakeryCarouselProps {
  bakeryName: string;
  bakeryLogo: string;
  products: Product[];
  bgColor: string;
}

function BakeryCarousel({ bakeryName, bakeryLogo, products, bgColor }: BakeryCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Función para hacer scroll - 🎨 Ajusta scrollAmount para cambiar velocidad
  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    
    const scrollAmount = 280; // Ancho de card (264px) + gap (16px)
    const newPosition = direction === 'left' 
      ? scrollContainerRef.current.scrollLeft - scrollAmount
      : scrollContainerRef.current.scrollLeft + scrollAmount;
    
    scrollContainerRef.current.scrollTo({
      left: newPosition,
      behavior: 'smooth'
    });
  };

  return (
    <section className={`${bgColor} py-12 px-4`}>
      <div className="max-w-7xl mx-auto">
        {/* Header con logo y nombre de panadería */}
        <div className="flex items-center justify-center gap-4 mb-8">
          {/* Logo de panadería - 🔴 REEMPLAZAR en el array BAKERIES */}
          <img 
            src={bakeryLogo} 
            alt={bakeryName}
            className="h-12 md:h-16 object-contain"
          />
        </div>

        {/* Carrusel de productos */}
        <div className="relative">
          {/* Botón izquierdo - 🎨 Personaliza estilos aquí */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 transition-all hover:scale-110"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6 text-gray-800" />
          </button>

          {/* Container de cards - 📱 Responsive: scroll horizontal en mobile */}
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth px-12"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Botón derecho - 🎨 Personaliza estilos aquí */}
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 transition-all hover:scale-110"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6 text-gray-800" />
          </button>
        </div>

        {/* Botón "Ver más" - 💡 Aquí puedes agregar navegación a página de la panadería */}
        <div className="text-center mt-8">
          <button 
            className="bg-[#C3A366] hover:bg-[#786033] text-white font-semibold py-3 px-8 rounded-lg transition-colors"
            onClick={() => console.log('Ver más de:', bakeryName)}
          >
            Ver más productos de {bakeryName} →
          </button>
        </div>
      </div>

      {/* CSS para ocultar scrollbar - No modificar */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}

// ============================================
// COMPONENTE PRINCIPAL
// ============================================
export default function ProductCarousels() {
  const products = productsData as Product[];

  return (
    <div className="bg-[#F5E6D3]">
      {/* Header principal - 🎨 Personaliza título y descripción */}
      <div className="text-center py-12 px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Nuestras Panaderías
        </h1>
        <p className="text-lg text-gray-600">
          Productos frescos y deliciosos de las mejores panaderías
        </p>
      </div>

      {/* Renderiza un carrusel por cada panadería */}
      {BAKERIES.map((bakery) => {
        // Filtra productos de esta panadería
        const bakeryProducts = products.filter(
          (product) => product.bakery === bakery.name
        );

        // Solo renderiza si hay productos
        if (bakeryProducts.length === 0) return null;

        return (
          <BakeryCarousel
            key={bakery.name}
            bakeryName={bakery.name}
            bakeryLogo={bakery.logo}
            products={bakeryProducts}
            bgColor={bakery.bgColor}
          />
        );
      })}
    </div>
  );
}

// ============================================
// 📝 NOTAS IMPORTANTES:
// ============================================
// 1. 🔴 REEMPLAZAR logos en el array BAKERIES (líneas 17-38)
// 2. 🔴 REEMPLAZAR bakeryLogo en products.json
// 3. 🎨 Personalizar colores en bgColor de cada panadería
// 4. 💡 Agregar funcionalidad a botones "Ver más" (línea 112)
// 5. 📱 El carrusel es responsive automáticamente
// 6. 🎯 Ajustar scrollAmount (línea 57) para cambiar velocidad