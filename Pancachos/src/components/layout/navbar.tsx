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
  FaSearch,
} from "react-icons/fa";

export default function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const handleNavigation = (path: string) => {
    navigate(path);
    setOpen(false);
  };

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
      setQuery("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <nav className="relative w-[95%] bg-white rounded-4xl shadow-md flex items-center px-4 md:px-6 py-3 border border-[#E8E8E8] max-w-6xl mx-auto mt-6">
      {/* Left: home y barra de búsqueda */}
      <div className="flex items-center gap-4 w-full">
        <button
          type="button"
          onClick={() => handleNavigation("/")}
          aria-label="Home"
          className="text-[#2870B8] text-3xl p-1 rounded-md hover:bg-[#FAEFD5] transition"
        >
          <FaHome />
        </button>

        {/* Search bar (tirada a la izquierda) */}
        <div className="flex items-center w-full max-w-md">
          <label className="sr-only">Search products</label>
          <div className="relative w-full">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Search products..."
              className="w-full border border-[#E8E8E8] rounded-full px-4 py-2 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-[#D7B77C]"
            />
            <button
              type="button"
              onClick={handleSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8A8A8A] hover:text-[#2870B8] transition"
              aria-label="Search"
            >
              <FaSearch />
            </button>
          </div>
        </div>
      </div>

      {/* Right buttons */}
      <div className="flex items-center gap-3 relative ml-4">
        <button
          type="button"
          onClick={() => handleNavigation("/cart")}
          className="text-[#D7B77C] text-xl p-2 rounded-md hover:bg-[#FAEFD5] transition"
          aria-label="Cart"
        >
          <FaShoppingCart />
        </button>

        {/* Hamburger */}
        <button
          type="button"
          onClick={() => setOpen((s) => !s)}
          className="text-[#2870B8] text-xl p-2 rounded-md hover:bg-[#FAEFD5] transition"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>

        {/* Dropdown menu */}
        {open && (
          <div className="absolute right-0 top-full mt-3 bg-white rounded-2xl shadow-lg z-50 p-3 border border-[#E8E8E8] w-56">
            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={() => handleNavigation("/myproducts")}
                className="w-full text-left px-3 py-2 rounded-md text-[#2870B8] hover:bg-[#EAF6FF] transition flex items-center gap-3"
              >
                <FaBox /> My products
              </button>

              <button
                type="button"
                onClick={() => handleNavigation("/favourites")}
                className="w-full text-left px-3 py-2 rounded-md text-[#2870B8] hover:bg-[#EAF6FF] transition flex items-center gap-3"
              >
                <FaHeart /> My favorites
              </button>

              <button
                type="button"
                onClick={() => handleNavigation("/profile")}
                className="w-full text-left px-3 py-2 rounded-md text-[#2870B8] hover:bg-[#EAF6FF] transition flex items-center gap-3"
              >
                <FaUser /> Profile
              </button>

              <button
                type="button"
                onClick={() => handleNavigation("/login")}
                className="mt-2 w-full px-3 py-2 rounded-md text-red-500 hover:bg-[#ffefef] transition bg-[#FFF6F6]"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

