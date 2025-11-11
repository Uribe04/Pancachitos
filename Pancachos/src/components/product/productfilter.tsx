import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FilterValues {
  size: string;
  temperature: string;
  price: string;
}

const ProductFilter: React.FC = () => {
  const [filters, setFilters] = useState<FilterValues>({
    size: "",
    temperature: "",
    price: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleFilter = () => {
    console.log("Filters applied:", filters);
  };

  const selectBase =
  "appearance-none bg-white text-[#8A6B2F] font-medium rounded-2xl px-5 py-3 shadow-sm w-full sm:w-auto min-w-[140px] outline-none cursor-pointer border border-[#e6d3a3] hover:shadow-md transition relative pr-8";


  return (
    <div className="bg-linear-to-r from-[#D7B77C] to-[#EBD6A3] flex justify-center items-center py-8 px-6 sm:px-4">

      <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-6 justify-center items-center w-full max-w-5xl">

        {/* Category */}
        <div className="relative w-full sm:w-auto">
          <select
            name="size"
            value={filters.size}
            onChange={handleChange}
            className={selectBase}
          >
            <option value="">Size</option>
            <option value="bread">Small</option>
            <option value="sweet">Medium</option>
            <option value="salty">Large</option>
          </select>
          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-[#B58E44] w-4 h-4 pointer-events-none" />
        </div>

        {/* Category */}
        <div className="relative w-full sm:w-auto">
          <select
            name="temperature"
            value={filters.temperature}
            onChange={handleChange}
            className={selectBase}
          >
            <option value="">Temperature</option>
            <option value="bread">Small</option>
            <option value="sweet">Medium</option>
            <option value="salty">Large</option>
          </select>
          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-[#B58E44] w-4 h-4 pointer-events-none" />
        </div>


        {/* Price */}
        <div className="relative w-full sm:w-auto">
          <select
            name="price"
            value={filters.price}
            onChange={handleChange}
            className={selectBase}
          >
            <option value="">Price</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-[#B58E44] w-4 h-4 pointer-events-none" />
        </div>

        {/* Button */}
        <button
          onClick={handleFilter}
          className="bg-[#FBEFD5] hover:bg-[#f9ecc0] text-[#B58E44] cursor-pointer font-semibold w-full sm:w-auto px-6 py-2 rounded-xl border border-[#e6d3a3] shadow-sm hover:shadow-md transition"
        >
          FILTER
        </button>
      </div>
    </div>
  );
};

export default ProductFilter;
