import React from "react";

const Footer = () => {
  return (
    <footer className="w-full text-white bg-gradient-to-r from-[#2971B9] to-[#69ADF1]">
      {/* Contenedor principal */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-4 sm:py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:flex lg:justify-between gap-4 sm:gap-8">
          
          {/* Marca */}
          <div className="space-y-3 sm:space-y-4 text-left">
            <div className="space-y-1 sm:space-y-2">
              <h3 className="text-xl sm:text-2xl font-black">PANCACHITO'S</h3>
              <p className="text-blue-100 text-xs sm:text-sm leading-relaxed max-w-xs">
                Bakery distributor in Cali. Quality and freshness guaranteed.
              </p>
            </div>

            {/* Contacto */}
            <div className="flex flex-col gap-1.5 sm:gap-2">
              
              {/* Location */}
              <div className="flex items-center gap-2">
                <div className="bg-[#ffffff33] p-[3px] rounded">
                  <svg
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <span className="text-blue-100 text-[11px] sm:text-xs">
                  Cali, Colombia
                </span>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-2">
                <div className="bg-[#ffffff33] p-[3px] rounded">
                  <svg
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <a
                  href="tel:+571234567890"
                  className="text-blue-100 hover:text-white transition-colors text-[11px] sm:text-xs"
                >
                  +57 123 456 7890
                </a>
              </div>

              {/* Email */}
              <div className="flex items-center gap-2">
                <div className="bg-[#ffffff33] p-[3px] rounded">
                  <svg
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <a
                  href="mailto:pancachitos.bakery@gmail.com"
                  className="text-blue-100 hover:text-white transition-colors text-[11px] sm:text-xs"
                >
                  pancachitos.bakery@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Navegation */}
          <div className="hidden sm:flex justify-center sm:justify-end gap-8 w-full lg:w-auto text-left">
            {[
              {
                title: "Navigation",
                items: ["Home", "Pages", "About Us", "Services"],
              },
              {
                title: "Quick Links",
                items: ["Contact Us", "FAQs", "Pages"],
              },
            ].map((section) => (
              <div key={section.title}>
                <h4 className="text-xs sm:text-sm font-bold mb-2 sm:mb-2">
                  {section.title}
                </h4>
                <ul className="space-y-1">
                  {section.items.map((item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="text-blue-100 hover:text-white transition-colors text-[11px] sm:text-xs"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Línea inferior */}
      <div className="bg-[#C3A366] mt-3 sm:mt-6">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 py-2 sm:py-3">
          <p className="text-white text-center text-[11px] sm:text-sm">
            © 2025 Pancachito's - All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
