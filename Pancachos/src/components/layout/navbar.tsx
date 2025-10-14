import { FaBars, FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";

function Navbar() {
  return (
    <nav className="w-full bg-white shadow-md rounded-full flex items-center justify-between px-6 py-2 border border-blue-300">
      {/* Sección izquierda */}
      <div className="flex items-center gap-3 flex-1">
        <FaBars className="text-[#B68A3A] text-xl" />
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
    </nav>
  );
}

export default Navbar;