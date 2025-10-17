import React from "react";

const Footer = () => {
  return (
    <footer className="w-full text-white bg-gradient-to-r from-[#2971B9] to-[#69ADF1]">
      {/* Contenedor principal */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-10">
        <div className="flex flex-col lg:flex-row justify-between gap-12">
          {/* IZQUIERDA: Marca + contacto */}
          <div className="flex-1 space-y-6">
            <div className="space-y-3">
              <h3 className="text-2xl font-black">PANCACHITO'S</h3>
              <p className="text-blue-100 text-sm leading-relaxed max-w-xs">
                Bakery distributor in Cali. Quality and freshness guaranteed.
              </p>
            </div>

            {/* Contacto */}
            <div className="flex flex-wrap items-center gap-4">
              {/* Location */}
              <div className="flex items-center gap-2">
                <div className="bg-[#ffffff33] p-1.5 rounded">
                  <svg
                    className="w-4 h-4"
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
                <span className="text-blue-100 text-xs">Cali, Colombia</span>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-2">
                <div className="bg-[#ffffff33] p-1.5 rounded">
                  <svg
                    className="w-4 h-4"
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
                  className="text-blue-100 hover:text-white transition-colors text-xs"
                >
                  +57 123 456 7890
                </a>
              </div>

              {/* Email */}
              <div className="flex items-center gap-2">
                <div className="bg-[#ffffff33] p-1.5 rounded">
                  <svg
                    className="w-4 h-4"
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
                  className="text-blue-100 hover:text-white transition-colors text-xs"
                >
                  pancachitos.bakery@gmail.com
                </a>
              </div>

              {/* Redes sociales */}
              <div className="flex gap-2">
                {["Facebook", "Twitter", "YouTube"].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="bg-[#ffffff33] hover:bg-[#ffffff55] text-white p-1.5 rounded transition-colors"
                    aria-label={social}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <circle cx="12" cy="12" r="10" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* DERECHA: Columnas de navegación */}
          <div className="flex flex-wrap justify-start lg:justify-end gap-12 w-full lg:w-auto">
            {[
              { title: "Navigation", items: ["Home", "Pages", "About Us", "Services"] },
              { title: "Quick Link", items: ["Contact Us", "FAQs", "Booking", "Pages"] },
              { title: "Services", items: ["Home", "Contact", "Blog", "Cart"] },
            ].map((section) => (
              <div key={section.title}>
                <h4 className="text-sm font-bold mb-3">{section.title}</h4>
                <ul className="space-y-2">
                  {section.items.map((item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="text-blue-100 hover:text-white transition-colors text-xs"
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
      <div className="bg-[#C3A366]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 py-4">
          <p className="text-white text-center text-sm">
            © 2025 Pancachito's - All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;