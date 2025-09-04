"use client";
import React, { useEffect, useState } from "react";
import Filters from "../components/Filters";
import ListingCards from "../components/ListingCards";
import Pagination from "../components/Pagination";
import Breadcrumb from "../components/Breadcrumb";
import SkeletonCard from "../components/SkeletonCard";
import { propertyService } from "../Services/api";
import { useSearchParams } from "next/navigation";

const PropertiesPage = () => {
  const [loading, setLoading] = useState(false);
  const [properties, setProperties] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchFilters, setSearchFilters] = useState(null);

  const limit = 12;
  const searchParams = useSearchParams();
  const category = searchParams.get("category"); // /properties?category=apartment
  const phase = searchParams.get("phase");       // /properties?phase=phase1

  // Set initial filter from URL on mount
  useEffect(() => {
    if (category) {
      setSearchFilters({ propertyType: category });
      setCurrentPage(1);
    } else if (phase) {
      setSearchFilters({ phase });
      setCurrentPage(1);
    } else {
      setSearchFilters(null);
    }
  }, [category, phase]);

  // Fetch whenever page or filters change
  useEffect(() => {
    if (category || phase || searchFilters) {
      fetchSearchProperties(
        searchFilters ||
          (category ? { propertyType: category } : { phase }),
        currentPage
      );
    } else {
      fetchPaginatedProperties(currentPage);
    }
  }, [currentPage, searchFilters, category, phase]);

  // Fetch all properties
  const fetchPaginatedProperties = async (page = 1) => {
    setLoading(true);
    try {
      const response = await propertyService.getPaginatedProperties(page, limit);
      setProperties(response.properties || []);
      setTotalPages(response.pagination?.totalPages || 1);
    } catch (error) {
      console.error("Failed to fetch properties:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch filtered properties
  const fetchSearchProperties = async (filters, page = 1) => {
    if (!filters) return;
    setLoading(true);
    try {
      const response = await propertyService.searchPropertiesPaginated(
        filters,
        page,
        limit
      );
      setProperties(response.properties || []);
      setTotalPages(response.pagination?.totalPages || 1);
    } catch (error) {
      console.error("Failed to search properties:", error);
    } finally {
      setLoading(false);
    }
  };

  // Trigger search from filters UI
  const handleSearch = (filters) => {
    setSearchFilters(filters);
    setCurrentPage(1);
  };

  return (
    <>
      <Filters onSearch={handleSearch} />
      <section className="bg-bgGray">
        <div className="lg:py-12 lg:px-10 px-5 py-16">
          <Breadcrumb />
          <h3 className="text-4xl font-bold font-nokara mb-[30px] mt-3">
            Properties
          </h3>
          {loading ? (
            <SkeletonCard />
          ) : properties.length === 0 ? (
            <p className="text-center text-gray-600 text-lg py-10">
              There are no properties to display.
            </p>
          ) : (
            <>
              <ListingCards properties={properties} />
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                hasPrev={currentPage > 1}
                hasNext={currentPage < totalPages}
                onPageChange={(page) => setCurrentPage(page)}
                onPrevPage={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                onNextPage={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              />
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default PropertiesPage;