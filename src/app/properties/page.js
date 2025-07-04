"use client";
import React, { useEffect, useState } from "react";
import Banner from "../components/Banner";
import Filters from "../components/Filters";
import ListingCards from "../components/ListingCards";
import Pagination from "../components/Pagination";
import Breadcrumb from "../components/Breadcrumb";
import SkeletonCard from "../components/SkeletonCard";
import api from "../Services/api";

const properties = () => {
  const [loading, setLoading] = useState(false);
  const [properties, setProperties] = useState([]);

  // Load this effect on mount
  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {
        const response = await api.get("/properties"); // or use getAllProperties()
        console.log(response.data); // debug log
        setProperties(response.data);
      } catch (error) {
        console.error("Failed to fetch properties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  return (
    <>
      <Banner />
      <Filters />
      <section className="bg-bgGray">
        <div className="container mx-auto py-12 lg:px-0 px-7">
          <Breadcrumb />
          <h3 className=" text-4xl font-bold font-nokara mb-[30px] mt-3">
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

export default properties;
