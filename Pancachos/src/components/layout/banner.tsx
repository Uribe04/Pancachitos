import React from "react";

const Banner = () => {
  return (
    <div className="relative w-full h-60 sm:h-[520px] flex items-center justify-center bg-gradient-to-r from-[#2971B9] to-[#69ADF1] overflow-hidden">
      
      {/* Contenedor principal */}
      <div className="relative w-full h-full  px-4 sm:px-8">

       
        <div className="absolute bottom-0 lg:right-35 sm:w-[85%] md:w-[75%] lg:w-[70%] h-auto object-contain">
          <img
            src="/images/Banner.png"
            alt="Banner principal"
            className="w-full h-auto object-contain"
          />
        </div>

        {/* Botón responsive */}
        <button
          className="absolute left-[25%] transform -translate-x-1/2 
                     bottom-6 sm:bottom-8 md:bottom-10 lg:bottom-15
                     bg-[#C3A366] hover:bg-[#c5974e] 
                     text-white font-semibold px-6 py-2 sm:px-8 sm:py-3 md:px-10 md:py-4 rounded-lg shadow-lg transition-all text-sm sm:text-base md:text-lg"
        >
          SHOW MORE
        </button>
      </div>
    </div>
  );
};

export default Banner;










