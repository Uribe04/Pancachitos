


interface Comment {
  icon: string;
  username: string;
  comment: string;
  rating: number;
}

interface Product {
  id: number;
  name: string;
  bakery: string;
  bakeryLogo: string;
  price: number;
  rating: number;
  size: string;
  temperature: string;
  description: string;
  image: string;
  category: string;
  comments: Comment[];
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="bg-[#FAF0DC] flex flex-col sm:flex-row items-stretch justify-center rounded-2xl shadow-lg overflow-hidden max-w-4xl mx-auto p-4">

      {/* Imagen del producto */}
      <img
        src={product.image}
        alt={product.name}
        className="w-full sm:w-1/2 h-auto object-cover rounded-2xl shadow-md"
      />

      {/* Información del producto */}
      <div className="bg-white rounded-2xl shadow-md p-6 w-full sm:w-[50%] min-h-[330px] flex flex-col justify-between">



        {/* Título y panadería */}
        <div>
          <h2 className="text-3xl font-bold mb-2">{product.name}</h2>
          <div className="flex items-center gap-2 mb-4">
            <img
              src={product.bakeryLogo}
              alt={product.bakery}
              className="w-5 h-5 rounded-full object-cover"
            />
            <p className="text-gray-600 text-sm">{product.bakery}</p>
          </div>
        </div>

        {/* Opciones de tamaño y temperatura */}
        <div className="flex gap-3 mb-4">
          <span className="border border-yellow-700 text-yellow-700 px-3 py-1 rounded-md">
            {product.size}
          </span>
          <span className="border border-yellow-700 text-yellow-700 px-3 py-1 rounded-md">
            {product.temperature}
          </span>
        </div>

        {/* Descripción */}
        <p className="text-gray-700 mb-6 leading-relaxed">{product.description}</p>

        {/* Precio y botón */}
        <div className="flex justify-between items-center mt-auto">
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

