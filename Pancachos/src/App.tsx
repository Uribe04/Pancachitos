import './App.css'
import products from "./data/products.json";
import ProductCard from './components/product/productcard';


export default function ProductList() {
  return (
    <div className="flex flex-wrap gap-6 justify-center p-10 bg-gray-100">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
