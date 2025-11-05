import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
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
    <nav className="relative w-[95%] bg-white rounded-[2rem] shadow-md flex items-center justify-between px-6 py-3 border border-[#E8E8E8] max-w-6xl mx-auto mt-6">
      {/* Sección izquierda */}
      <div className="flex items-center gap-3 flex-1">
        {/* Botón menú */}
        <button
          onClick={() => setOpen(!open)}
          className="text-[#D7B77C] text-2xl focus:outline-none hover:scale-110 transition-transform cursor-pointer"
        >
          <FaBars />
        </button>

        {/* Barra de búsqueda */}
        <div className="flex items-center bg-[#FAEFD5] rounded-full px-4 py-2 w-full max-w-md shadow-inner">
          <FaSearch className="text-[#B68A3A] mr-2 cursor-pointer" />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent outline-none w-full placeholder:text-[#B68A3A] text-[#B68A3A] text-base"
          />
        </div>
      </div>

      {/* Sección derecha */}
      <div className="flex items-center gap-4 ml-4">
        <FaShoppingCart className="text-[#D7B77C] text-xl cursor-pointer transition-all hover:text-[#B68A3A] hover:scale-110" />
        <NavLink to="/profile">
        <FaUser className="text-[#D7B77C] text-xl cursor-pointer transition-all hover:text-[#B68A3A] hover:scale-110" />
        </NavLink>
        <button className="hidden sm:block bg-[#D7B77C] text-white cursor-pointer font-semibold px-4 py-2 rounded-full text-xs md:text-sm hover:bg-[#caa44a] transition">
          MY PRODUCTS
        </button>
      </div>

      {/* Menú desplegable */}
      {open && (
        <div className="absolute top-16 left-0 w-full sm:w-64 bg-[#FAEFD5] rounded-2xl shadow-lg p-4 flex flex-col gap-3 z-50 transition-all">
          {/* Link a Home */}
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className="bg-white rounded-xl py-3 px-4 text-left text-[#B68A3A] font-semibold flex items-center justify-between hover:bg-[#fffcf5] transition"
          >
            Home
          </Link>

          {/* Los siguientes se pueden activar cuando tengas las páginas */}
          <button className="bg-white rounded-xl py-3 px-4 text-left text-[#B68A3A] font-semibold flex items-center justify-between hover:bg-[#fffcf5] transition">
            My messages <FaEnvelope />
          </button>

          <NavLink to="/profile" className="bg-white rounded-xl py-3 px-4 text-left text-[#B68A3A] font-semibold flex items-center justify-between hover:bg-[#fffcf5] transition">
          
            Profile <FaUser />
         
          </NavLink>

          <button className="bg-white rounded-xl py-3 px-4 text-left text-[#B68A3A] font-semibold flex items-center justify-between hover:bg-[#fffcf5] transition">
            My favorites <FaHeart />
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
