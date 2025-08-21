"use client";
import React, { useEffect, useState } from "react";
import Filters from "../components/Filters";
import ListingCards from "../components/ListingCards";
import Pagination from "../components/Pagination";
import Breadcrumb from "../components/Breadcrumb";
import SkeletonCard from "../components/SkeletonCard";
import { propertyService } from "../Services/api";

const PropertiesPage = () => {
  const [loading, setLoading] = useState(false);
  const [properties, setProperties] = useState([]);

  // Fetch all properties on mount
  useEffect(() => {
    fetchAllProperties();
  }, []);

  const fetchAllProperties = async () => {
    setLoading(true);
    try {
      const response = await propertyService.getAllProperties();
      setProperties(response);
    } catch (error) {
      console.error("Failed to fetch properties:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch filtered properties
  const handleSearch = async (filters) => {
    setLoading(true);
    try {
      const response = await propertyService.searchProperties(filters);
      setProperties(response);
    } catch (error) {
      console.error("Failed to search properties:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Filters onSearch={handleSearch} />
      <section className="bg-bgGray">
        <div className="container mx-auto py-12 lg:px-0 px-7">
          <Breadcrumb />
          <h3 className="text-4xl font-bold font-nokara mb-[30px] mt-3">
            Properties
          </h3>
          {loading ? (
            <SkeletonCard />
          ) : (
            <>
            <ListingCards properties={properties} />
            <Pagination />
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default PropertiesPage;