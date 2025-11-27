import Navbar from "./navbar";

const Banner = () => {
  return (
    <div className="relative w-full h-75 sm:h-[700px] flex items-center justify-center bg-gradient-to-r from-[#2971B9] to-[#69ADF1] overflow-hidden">
       <div className="absolute top-0 left-0 w-full flex justify-center py-4 z-20">
        <Navbar />
      </div>

      {/* Contenedor principal */}
      <div className="relative w-full h-full  px-4 sm:px-8">

       
        <div className="absolute bottom-0 lg:right-35 sm:w-[85%] md:w-[75%] lg:w-[70%] h-auto object-contain">
          <img
            src="/images/Banner.png"
            alt="Banner principal"
            className="w-full h-auto object-contain"
          />
        </div>

      </div>
    </div>
  );
};

export default Banner;










