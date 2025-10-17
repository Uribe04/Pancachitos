import React from "react";

const Banner: React.FC = () => {
  return (
    <section className="relative w-full flex flex-col items-center justify-center bg-gradient-to-r from-[#2971B9] to-[#69ADF1] py-10 sm:py-14 px-4 sm:px-8">
      
      <div className="relative flex flex-col items-center justify-center text-center w-full max-w-5xl">
        
        {/* Imagen */}
        <img
          src="/images/Logo banner.png"
          alt="Banner principal"
          className="w-full max-w-[480px] sm:max-w-[700px] h-auto object-contain"
        />

        <button className="cursor-pointer absolute bottom-[-10px] sm:bottom-[-15px] bg-[#C3A366] hover:bg-[#c5974e] text-white font-semibold px-8 py-3 sm:px-10 sm:py-3 rounded-lg shadow-md transition-all text-sm sm:text-base">
          SHOW MORE
        </button>
      </div>
    </section>
  );
};

export default Banner;







