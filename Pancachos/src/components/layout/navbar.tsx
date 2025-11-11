import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaShoppingCart,
  FaUser,
  FaHeart,
  FaBox,
  FaHome,
  FaBars,
  FaTimes,
} from "react-icons/fa";

export default function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleNavigation = (path: string) => {
    navigate(path);
    setOpen(false);
  };

  return (
    <nav className="relative w-[95%] bg-white rounded-4xl shadow-md flex items-center justify-between px-4 md:px-6 py-3 border border-[#E8E8E8] max-w-6xl mx-auto mt-6">
      {/* Left: home icon */}
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => handleNavigation("/")}
          aria-label="Home"
          className="text-[#2870B8] text-3xl p-1 rounded-md hover:bg-[#FAEFD5] transition"
        >
          <FaHome />
        </button>
      </div>

      {/* Center: botones principales (ocultos en pantallas pequeñas) */}
      <div className="hidden md:flex items-center gap-4">

        <button
          type="button"
          onClick={() => handleNavigation("/myproducts")}
          className="text-[#2870B8] font-semibold px-3 py-2 rounded-lg hover:bg-[#FAEFD5] transition flex items-center gap-2"
        >
          <FaBox /> My products
        </button>

        <button
          type="button"
          onClick={() => handleNavigation("/favourites")}
          className="text-[#2870B8] font-semibold px-3 py-2 rounded-lg hover:bg-[#FAEFD5] transition flex items-center gap-2"
        >
          <FaHeart /> My favorites
        </button>

        <button
          type="button"
          onClick={() => handleNavigation("/profile")}
          className="text-[#2870B8] font-semibold px-3 py-2 rounded-lg hover:bg-[#FAEFD5] transition flex items-center gap-2"
        >
          <FaUser /> Profile
        </button>
      </div>

      {/* Right: acciones secundarias */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => handleNavigation("/cart")}
          className="text-[#D7B77C] text-xl p-2 rounded-md hover:bg-[#FAEFD5] transition"
          aria-label="Cart"
        >
          <FaShoppingCart />
        </button>

        <button
          type="button"
          onClick={() => handleNavigation("/login")}
          className="hidden sm:inline-block bg-[#D7B77C] text-white font-semibold px-4 py-2 rounded-full text-xs md:text-sm hover:bg-[#caa44a] transition"
        >
          Logout
        </button>

        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={() => setOpen((s) => !s)}
          className="md:hidden text-[#2870B8] text-xl p-2 rounded-md hover:bg-[#FAEFD5] transition"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile menu: grid dos columnas en responsive */}
      {open && (
        <div className="absolute top-full left-4 right-4 mt-3 bg-white rounded-2xl shadow-lg z-50 p-3 border border-[#E8E8E8] md:hidden">
          {/* Grid 2x2 para los cuatro botones principales */}
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleNavigation("/myproducts")}
              className="w-full px-3 py-3 rounded-md text-[#2870B8] hover:bg-[#EAF6FF] transition flex items-center justify-center gap-2 bg-[#FAEFD5]"
            >
              <FaBox /> My products
            </button>

            <button
              type="button"
              onClick={() => handleNavigation("/favourites")}
              className="w-full px-3 py-3 rounded-md text-[#2870B8] hover:bg-[#EAF6FF] transition flex items-center justify-center gap-2 bg-[#FAEFD5]"
            >
              <FaHeart /> My favorites
            </button>

            <button
              type="button"
              onClick={() => handleNavigation("/profile")}
              className="w-full px-3 py-3 rounded-md text-[#2870B8] hover:bg-[#EAF6FF] transition flex items-center justify-center gap-2 bg-[#FAEFD5]"
            >
              <FaUser /> Profile
            </button>
          </div>

          {/* Logout ocupa toda la fila inferior separada */}
          <button
            type="button"
            onClick={() => handleNavigation("/select")}
            className="mt-3 w-full px-3 py-3 rounded-md text-red-500 hover:bg-[#ffefef] transition bg-[#FFF6F6]"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}


