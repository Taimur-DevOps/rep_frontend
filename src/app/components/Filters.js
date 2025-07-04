"use client";

import React from "react";
import Button from "./Button";
import { CiSearch } from "react-icons/ci";
import FilterDropdown from "./FilterDropdown";

const Filters = () => {
  return (
    <form className="lg:container mx-auto py-7 lg:px-0 px-5">
      <div className="flex flex-col gap-4">
        {/* Search Bar */}
        <div className="flex flex-col lg:flex-row md:flex-row gap-2 lg:items-center">
          <label className="lg:w-[60%] w-full flex items-center gap-2 border border-gray-300 rounded-md py-2 px-3 bg-white">
            <CiSearch className="text-gray-500" />
            <input
              type="text"
              placeholder="Enter Keyword (e.g. city, area)..."
              className="w-full outline-none bg-transparent text-gray-700 placeholder-gray-500"
            />
          </label>
          <div className="lg:w-[20%] w-full">
            <FilterDropdown label="Location" options={["New York", "Los Angeles", "Chicago"]} />
          </div>
          <div className="lg:w-[20%] w-full">
            <Button text="Search" variant="primary" className="w-full" />
          </div>
        </div>

        {/* Filter Fields */}
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3">
          <FilterDropdown label="Property Type" options={["House", "Apartment", "Condo", "Villa", "Commercial"]} />
          <FilterDropdown label="Bedrooms" options={["1", "2", "3", "4+"]} />
          <FilterDropdown label="Bathrooms" options={["1", "2", "3", "4+"]} />
          <FilterDropdown label="Basement" options={["Yes", "No"]} />
        </div>

        {/* Price and Area Filters */}
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3">
          <FilterDropdown label="Swimming Pool" options={["Yes", "No"]} />
          {/* <div className="border border-gray-300 rounded-md py-2 px-3 bg-white">
            <label className="text-gray-600 text-sm">Min Price</label>
            <input
              type="number"
              placeholder="0"
              className="w-full outline-none bg-transparent text-gray-700"
            />
          </div>
          <div className="border border-gray-300 rounded-md py-2 px-3 bg-white">
            <label className="text-gray-600 text-sm">Max Price</label>
            <input
              type="number"
              placeholder="500,000"
              className="w-full outline-none bg-transparent text-gray-700"
            />
          </div> */}
          <FilterDropdown label="Area Size (sq ft)" options={["500", "1000", "2000", "5000+"]} />
        </div>

        {/* Search Button for Mobile */}
        <div className="lg:hidden block w-full">
          <Button text="Search" variant="primary" className="w-full" />
        </div>
      </div>
    </form>
  );
};

export default Filters;





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