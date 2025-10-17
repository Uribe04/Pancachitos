import Banner from "../../components/layout/banner";
import ProductCard from "../../components/product/productcard";
import ProductFilter from "../../components/product/productfilter";
import Footer from "../../components/footer/footer";

function Home() {


  return (
    <>
     <Banner/>
        <ProductFilter/>
        <ProductCard product={{
              id: 0,
              name: "",
              rating: 0,
              tags: [],
              description: "",
              price: 0,
              image: "",
              brand: ""
          }}/>
        <Footer/>

    </>
  )
}

export default Home;
