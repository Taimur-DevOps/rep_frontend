"use client";

import React, { useState } from "react";
import Button from "./Button";
import { CiSearch } from "react-icons/ci";
import { RxReset } from "react-icons/rx";

const Filters = ({ onSearch }) => {
  const [filters, setFilters] = useState({
    location: "",
    propertyType: "",
    bedrooms: "",
    bathrooms: "",
    minPrice: "",
    maxPrice: "",
  });

  const handleChange = (e) => {
    let { name, value } = e.target;
  
    if (name === "minPrice" && value < 0) {
      value = Math.abs(value); // turn -1 into 1 instantly
    }
  
    setFilters({
      ...filters,
      [name]: value,
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(filters);
    }
  };

  return (
    <form
    onSubmit={handleSubmit}
    className="lg:container mx-auto py-7 lg:px-0 px-5"
  >
    <div className="flex flex-col gap-4">
      {/* Search Bar */}
      <div className="grid grid-cols-12 gap-2 items-center">
        
        {/* Location (wider) */}
        <label className="col-span-12 md:col-span-3 flex items-center gap-2 border border-gray-300 rounded-md py-2 px-3 bg-white">
          <input
            type="text"
            name="location"
            value={filters.location}
            onChange={handleChange}
            placeholder="Enter location..."
            className="w-full outline-none bg-transparent text-gray-700 placeholder-gray-500"
          />
        </label>
  
        {/* Property Type (wider than others) */}
        <div className="col-span-12 md:col-span-2 border border-gray-300 rounded-md bg-white">
          <select
            name="propertyType"
            value={filters.propertyType}
            onChange={handleChange}
            className="w-full outline-none bg-transparent text-gray-700 py-2 px-3"
          >
            <option value="">Property Type</option>
            <option value="House">House</option>
            <option value="Apartment">Apartment</option>
            <option value="Villa">Villa</option>
            <option value="Loft">Loft</option>
            <option value="Farmhouse">Farmhouse</option>
            <option value="commercial">Commercial</option>
          </select>
        </div>
  
        {/* Beds */}
        <div className="col-span-6 md:col-span-1 border border-gray-300 rounded-md py-2 px-3 bg-white">
          <input
            type="number"
            name="bedrooms"
            value={filters.bedrooms}
            onChange={handleChange}
            placeholder="Beds"
            className="w-full outline-none bg-transparent text-gray-700"
          />
        </div>
  
        {/* Baths */}
        <div className="col-span-6 md:col-span-1 border border-gray-300 rounded-md py-2 px-3 bg-white">
          <input
            type="number"
            name="bathrooms"
            value={filters.bathrooms}
            onChange={handleChange}
            placeholder="Baths"
            className="w-full outline-none bg-transparent text-gray-700"
          />
        </div>
  
        {/* Min Price */}
        <div className="col-span-6 md:col-span-2 border border-gray-300 rounded-md py-2 px-3 bg-white">
          <input
            type="number"
            name="minPrice"
            value={filters.minPrice}
            onChange={handleChange}
            placeholder="Min Price"
            className="w-full outline-none bg-transparent text-gray-700"
          />
        </div>
  
        {/* Max Price */}
        <div className="col-span-6 md:col-span-2 border border-gray-300 rounded-md py-2 px-3 bg-white">
          <input
            type="number"
            name="maxPrice"
            value={filters.maxPrice}
            onChange={handleChange}
            placeholder="Max Price"
            className="w-full outline-none bg-transparent text-gray-700"
          />
        </div>
  
        {/* Action Buttons */}
        <div className="hidden md:flex col-span-12 md:col-span-1 gap-2 justify-end">
          {/* Search Button */}
          <button
            type="submit"
            className="flex items-center justify-center w-12 h-11 rounded-md bg-lightPeach text-white hover:bg-hoverBtn"
          >
            <CiSearch className="w-6 h-6" />
          </button>
  
          {/* Reset Button */}
          <button
            type="button"
            className="flex items-center justify-center w-12 h-11 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300"
            onClick={() => {
              setFilters({
                location: "",
                propertyType: "",
                bedrooms: "",
                bathrooms: "",
                minPrice: "",
                maxPrice: "",
              });
              if (onSearch) onSearch({});
            }}
          >
            <RxReset className="w-6 h-6" />
          </button>
        </div>
      </div>
  
      {/* Mobile Search Button */}
      <div className="md:hidden block w-full">
        <Button
          type="submit"
          text="Search"
          variant="primary"
          className="w-full bg-lightPeach text-white hover:bg-hoverBtn"
        />
      </div>
    </div>
  </form>  
  );
};

export default Filters;
//   <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3">

// const [selectedLocation, setSelectedLocation] = useState("");
// const [selectedPropertyType, setSelectedPropertyType] = useState("");
// const [selectedBedrooms, setSelectedBedrooms] = useState("");
// const [selectedBathrooms, setSelectedBathrooms] = useState("");

// // Example Usage:
// <FilterDropdown
//   label="Location"
//   options={["All Cities", "Fort Lauderdale", "Fort Myers", "Miami", "Tampa"]}
//   selectedValue={selectedLocation}
//   onChange={setSelectedLocation}
// />