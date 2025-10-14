import React from "react";


const Banner: React.FC = () => {
  return (
    <section className="relative w-full min-h-screen bg-[#5277FF] flex flex-col items-center overflow-hidden">
      {/* NAVBAR */}
      <div className="w-full absolute top-0 left-0 z-20">
        
      </div>

      {/* CONTENIDO PRINCIPAL */}
      <div className="flex flex-col items-center justify-center w-full h-full mt-20">
        {/* Imagen desde /public */}
        <img
          src="/public/images/Logo banner.png" // 👈 tu imagen va aquí (ruta desde public/)
          alt="Banner principal"
          className="w-full max-w-[800px] h-auto object-contain"
        />

        {/* Botón debajo */}
        <button className="mt-8 bg-[#D1A45F] hover:bg-[#c5974e] text-white font-semibold px-8 py-3 rounded-lg shadow-md transition-all">
          SHOW MORE
        </button>
      </div>
    </section>
  );
};

export default Banner;



