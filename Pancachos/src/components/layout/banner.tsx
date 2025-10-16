import React from "react";

const Banner: React.FC = () => {
  return (
    <section className="relative w-full flex flex-col items-center justify-center py-10 bg-gradient-to-r from-[#2971B9] to-[#69ADF1]">
      
      <div className="flex flex-col items-center justify-center w-full">
        
        <img
          src="/images/Logo banner.png"  
          alt="Banner principal"
          className="w-full max-w-[700px] h-auto object-contain"
        />

        {/* Botón debajo */}
        <button className="mt-1 bg-[#D1A45F] hover:bg-[#c5974e] text-white font-semibold px-8 py-3 rounded-lg shadow-md transition-all">
          SHOW MORE
        </button>
      </div>
    </section>
  );
};

export default Banner;




