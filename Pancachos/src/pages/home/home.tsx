import Banner from "../../components/layout/banner"; 
import ProductFilter from "../../components/product/productfilter";
import Footer from "../../components/footer/footer";
import ProductCarousels from "../../components/layout/slidebar";

function Home() {
  return (
    <div className="bg-[#FBEFD5] min-h-screen">
      <Banner />
      <ProductFilter />
      <ProductCarousels />
      <Footer />
    </div>
  );
}

export default Home;
