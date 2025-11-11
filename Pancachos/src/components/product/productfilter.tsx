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
  "appearance-none bg-white text-[#8A6B2F] font-medium rounded-lg px-3 py-2 shadow-sm w-full sm:w-auto min-w-[110px] outline-none cursor-pointer border border-[#e6d3a3] hover:shadow-md transition relative pr-8 text-sm";


  return (
    <div className="bg-linear-to-r from-[#D7B77C] to-[#EBD6A3] flex justify-center items-center py-4 px-4 sm:px-4 relative z-0">

      <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-4 justify-center items-center w-full max-w-5xl">

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
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-[#B58E44] w-3 h-3 pointer-events-none" />
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
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-[#B58E44] w-3 h-3 pointer-events-none" />
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
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-[#B58E44] w-3 h-3 pointer-events-none" />
        </div>

        {/* Button */}
        <button
          onClick={handleFilter}
          className="bg-[#FBEFD5] hover:bg-[#f9ecc0] text-[#B58E44] cursor-pointer font-semibold w-full sm:w-auto px-4 py-2 rounded-lg border border-[#e6d3a3] shadow-sm hover:shadow-md transition text-sm"
        >
          FILTER
        </button>
      </div>
    </div>
  );
};

export default ProductFilter;
