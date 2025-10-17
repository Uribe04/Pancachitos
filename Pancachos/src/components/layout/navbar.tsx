import { useState } from "react";
import {
  FaBars,
  FaSearch,
  FaShoppingCart,
  FaUser,
  FaHeart,
  FaEnvelope,
} from "react-icons/fa";

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="relative w-full bg-white rounded-[2rem] shadow-md flex items-center justify-between px-8 py-4 border border-[#E8E8E8] max-w-7xl mx-auto mt-6">
      {/* Sección izquierda */}
      <div className="flex items-center gap-4 flex-1">
        {/* Botón menú */}
        <button
          onClick={() => setOpen(!open)}
          className="text-[#B68A3A] text-2xl focus:outline-none hover:scale-110 transition-transform"
        >
          <FaBars />
        </button>

        {/* Barra de búsqueda */}
        <div className="flex items-center bg-[#FAEFD5] rounded-full px-4 py-2 w-full max-w-md shadow-inner">
          <FaSearch className="text-[#B68A3A] mr-2" />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent outline-none w-full placeholder:text-[#B68A3A] text-[#B68A3A] text-base"
          />
        </div>
      </div>

      {/* Sección derecha */}
      <div className="flex items-center gap-6 ml-8">
        <FaShoppingCart className="text-[#B68A3A] text-xl cursor-pointer transition-all hover:text-[#d4b15b] hover:scale-110" />
        <FaUser className="text-[#B68A3A] text-xl cursor-pointer transition-all hover:text-[#d4b15b] hover:scale-110" />
        <button className="bg-[#B68A3A] text-white font-semibold px-5 py-2 rounded-full text-sm hover:bg-[#caa44a] transition">
          MY PRODUCTS
        </button>
      </div>

      {/* Menú desplegable */}
      {open && (
        <div className="absolute top-20 left-0 w-64 bg-[#FAEFD5] rounded-2xl shadow-lg p-4 flex flex-col gap-3 z-50 transition-all">
          <button className="bg-white rounded-xl py-3 px-4 text-left text-[#B68A3A] font-semibold flex items-center justify-between hover:bg-[#f8e9c5] transition">
            Home
          </button>
          <button className="bg-white rounded-xl py-3 px-4 text-left text-[#B68A3A] font-semibold flex items-center justify-between hover:bg-[#f8e9c5] transition">
            My messages <FaEnvelope />
          </button>
          <button className="bg-white rounded-xl py-3 px-4 text-left text-[#B68A3A] font-semibold flex items-center justify-between hover:bg-[#f8e9c5] transition">
            Profile <FaUser />
          </button>
          <button className="bg-white rounded-xl py-3 px-4 text-left text-[#B68A3A] font-semibold flex items-center justify-between hover:bg-[#f8e9c5] transition">
            My favorites <FaHeart />
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;

