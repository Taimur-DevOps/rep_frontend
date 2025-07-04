// Modified HeroTableListing.jsx with improved error handling for images
'use client';
import React, { useState, useEffect } from "react";
import { RiDeleteBin7Line } from "react-icons/ri";
import { propertyService } from "../Services/api";
import { toast } from 'react-hot-toast';

const HeroTableListing = () => {
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [imageErrors, setImageErrors] = useState({});

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      setIsLoading(true);
      const data = await propertyService.getAllProperties();
      setProperties(data);
    } catch (error) {
      toast.error(`Failed to load properties: ${error.message || error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      try {
        await propertyService.deleteProperty(id);
        setProperties(properties.filter(property => property._id !== id));
        toast.success('Property deleted successfully');
      } catch (error) {
        toast.error(`Failed to delete property: ${error.message || error}`);
      }
    }
  };

  // Handle image loading errors
  const handleImageError = (propertyId) => {
    setImageErrors(prev => ({
      ...prev,
      [propertyId]: true
    }));
  };

  if (isLoading) {
    return <div className="text-center p-10">Loading properties...</div>;
  }

  return (
    <div className="relative overflow-x-auto shadow-md rounded-[4px] border border-gray-100 h-full">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 h-full">
        <thead className="text-sm text-gray-700 bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">Title</th>
            <th scope="col" className="px-6 py-3">Price</th>
            <th scope="col" className="px-6 py-3">Beds</th>
            <th scope="col" className="px-6 py-3">Bathroom</th>
            <th scope="col" className="px-6 py-3">Area size</th>
            <th scope="col" className="px-6 py-3">Images</th>
            <th scope="col" className="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {properties.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center py-4">No properties found</td>
            </tr>
          ) : (
            properties.map((property) => (
              <tr key={property._id} className="odd:bg-white even:bg-gray-50 text-gray-900 w-full">
                <th scope="row" className="px-6 font-medium whitespace-nowrap">
                  {property.title}
                </th>
                <td className="px-6">{property.price.toLocaleString()}</td>
                <td className="px-6">{property.bedrooms}</td>
                <td className="px-6">{property.bathrooms}</td>
                <td className="px-6">{property.areaSize}</td>
                <td className="px-6">
                  <div className="w-14 h-12 grid place-content-center">
                    {property.images && property.images.length > 0 && !imageErrors[property._id] ? (
                      <img
                        alt={property.title}
                        src={`http://localhost:5001/uploads/${property.images[0].split('/').pop()}`}
                        className="w-full h-full object-cover"
                        onError={() => handleImageError(property._id)}
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center text-xs">
                        No image
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-6">
                  <button onClick={() => handleDelete(property._id)}>
                    <RiDeleteBin7Line className="h-5 w-5 text-red-500 hover:cursor-pointer" />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default HeroTableListing;