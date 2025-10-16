import { useState } from "react";
import { FaBars, FaSearch, FaShoppingCart, FaUser, FaHeart, FaEnvelope } from "react-icons/fa";

function Navbar() {
  const [open, setOpen] = useState(false); // Estado para abrir/cerrar menú

  return (
    <nav className="relative w-full bg-white shadow-md rounded-full flex items-center justify-between px-6 py-2 border border-blue-300">
      {/* Sección izquierda */}
      <div className="flex items-center gap-3 flex-1">
        {/* Ícono menú hamburguesa */}
        <button
          onClick={() => setOpen(!open)}
          className="text-[#B68A3A] text-xl focus:outline-none"
        >
          <FaBars />
        </button>

        {/* Buscador */}
        <div className="flex items-center bg-[#FAEFD5] rounded-full px-3 py-1 w-full max-w-md">
          <FaSearch className="text-[#B68A3A] mr-2" />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent outline-none w-full placeholder:text-[#B68A3A] text-[#B68A3A]"
          />
        </div>
      </div>

      {/* Sección derecha */}
      <div className="flex items-center gap-4 ml-6">
        <FaShoppingCart className="text-[#B68A3A] text-lg" />
        <FaUser className="text-[#B68A3A] text-lg" />
        <button className="bg-[#B68A3A] text-white font-semibold px-4 py-1 rounded-full text-sm hover:bg-[#caa44a] transition">
          MY PRODUCTS
        </button>
      </div>

      {/* Menú desplegable */}
      {open && (
        <div className="absolute top-14 left-0 w-64 bg-[#FAEFD5] rounded-2xl shadow-lg p-4 flex flex-col gap-3 z-50 transition-all">
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
