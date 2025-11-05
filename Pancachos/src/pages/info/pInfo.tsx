import ProductCard from "../../components/product/productInfo";
import CommentsSection from "../../components/product/productComment";
import products from '../../data/products.json'


function Info() {
  return (
    <div className="bg-[#FBEFD5] min-h-screen">
        <ProductCard product={products[0]}/>
        <CommentsSection comments={products[0].comments}/>
      
    </div>
  );
}

export default Info;