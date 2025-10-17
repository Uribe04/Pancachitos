import Banner from "../../components/layout/banner";
import ProductCard from "../../components/product/productcard";
import ProductFilter from "../../components/product/productfilter";
import Footer from "../../components/footer/footer";
import product from '../../data/products.json'
function Home() {


  return (
    <>
     <Banner/>
        <ProductFilter/>
        <div>
        {product.map((item) => (
            <ProductCard key={item.id} product={item}/>
        ))}
        <Footer/>
        </div>

    </>
  )
}

export default Home;
