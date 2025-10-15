import React from "react";

const Banner: React.FC = () => {
  return (
    <section className="relative w-full bg-[#5277FF] flex flex-col items-center overflow-hidden py-12">
      {/* CONTENIDO PRINCIPAL */}
      <div className="flex flex-col items-center justify-center w-full">
        {/* Imagen desde /public */}
        <img
          src="/images/Logo banner.png"  // 👈 la imagen debe estar en public/images/
          alt="Banner principal"
          className="w-full max-w-[800px] h-auto object-contain"
        />

        {/* Botón debajo */}
        <button className="mt-6 bg-[#D1A45F] hover:bg-[#c5974e] text-white font-semibold px-8 py-3 rounded-lg shadow-md transition-all">
          SHOW MORE
        </button>
      </div>
    </section>
  );
};

export default Banner;




