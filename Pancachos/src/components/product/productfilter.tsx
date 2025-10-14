import React, { useState } from "react";

interface FilterValues {
  category: string;
  ubication: string;
  price: string;
}

const ProductFilter: React.FC = () => {
  const [filters, setFilters] = useState<FilterValues>({
    category: "",
    ubication: "",
    price: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleFilter = () => {
    console.log("Filters applied:", filters);
  };

  return (
    <div className="p-20 bg-[#D1A45F] flex justify-center items-center py-6">
      <div className="flex flex-wrap gap-4 justify-center items-center w-full">
        {/* Category */}
        <select
          name="category"
          value={filters.category}
          onChange={handleChange}
          className="bg-white rounded-lg px-4 py-2 min-w-[150px] outline-none"
        >
          <option value="">Category</option>
          <option value="bread">Bread</option>
          <option value="sweet">Sweet</option>
          <option value="salty">Salty</option>
        </select>

        {/* Ubication */}
        <select
          name="ubication"
          value={filters.ubication}
          onChange={handleChange}
          className="bg-white rounded-lg px-4 py-2 min-w-[150px] outline-none"
        >
          <option value="">Ubication</option>
          <option value="north">North</option>
          <option value="center">Center</option>
          <option value="south">South</option>
        </select>

        {/* Price */}
        <select
          name="price"
          value={filters.price}
          onChange={handleChange}
          className="bg-white rounded-lg px-4 py-2 min-w-[150px] outline-none"
        >
          <option value="">Price</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        {/* Button */}
        <button
          onClick={handleFilter}
          className="bg-[#EAD7A4] hover:bg-[#f0e1b0] text-[#9A7538] font-semibold px-6 py-2 rounded-lg transition-all"
        >
          FILTER
        </button>
      </div>
    </div>
  );
};

export default ProductFilter;
