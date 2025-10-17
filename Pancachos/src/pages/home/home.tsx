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
        <ProductCard product={product}/>
        <Footer/>

    </>
  )
}

export default Home;
