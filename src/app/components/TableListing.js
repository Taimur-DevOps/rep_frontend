import { useState, useEffect } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import SearchBar from "./SearchBar";

const TableListing = ({ onEdit, onAddNew }) => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState(null);
  const [search, setSearch] = useState("");

  // Fetch properties from backend (single search box)
  const fetchProperties = async (page = 1, searchQuery = "") => {
    try {
      setLoading(true);
      setError(null);

      const query = new URLSearchParams({
        page,
        limit: 10,
        search: searchQuery
      });

      const response = await fetch(
        `http://localhost:5001/api/properties/search/paginated?${query.toString()}`
      );

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();

      if (data.properties) {
        setProperties(data.properties);
        setPagination(data.pagination);
      } else {
        setProperties(Array.isArray(data) ? data : []);
        setPagination(null);
      }
    } catch (err) {
      setError(err.message);
      setProperties([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch when search or page changes
  useEffect(() => {
    fetchProperties(currentPage, search);
  }, [currentPage, search]);

  // Search handler
  const handleSearch = (query) => {
    setSearch(query);
    setCurrentPage(1);
  };

  // Pagination handler
  const handlePageChange = (newPage) => setCurrentPage(newPage);

  // Delete property
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      try {
        const response = await fetch(
          `http://localhost:5001/api/properties/${id}`,
          { method: "DELETE" }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        fetchProperties(currentPage, search);
        alert("Property deleted successfully!");
      } catch (err) {
        console.error("Error deleting property:", err);
        alert("Error deleting property: " + err.message);
      }
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{error}</span>
        <button
          onClick={() => fetchProperties(currentPage, search)}
          className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-sm"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Properties</h2>
        <SearchBar onSearch={handleSearch} />
      </div>

      {properties.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 text-lg">No properties found.</p>
          <button
            onClick={onAddNew}
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add Your First Property
          </button>
        </div>
      ) : (
        <>
          {/* Table */}
          <div className="overflow-x-auto shadow-lg rounded-lg">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fixed Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Featured</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Bedrooms</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Images</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {properties.map((property) => (
                  <tr key={property._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">{property.propertyId || "N/A"}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{property.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{property.location}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{property.price?.toLocaleString() || "N/A"}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{property.fixedPrice?.toLocaleString() || "N/A"}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{property.propertyType}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {property.featured ? (
                        <FaStar className="text-yellow-500" />
                      ) : (
                        <FaRegStar className="text-gray-400" />
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{property.bedrooms}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {property.images?.length > 0 ? (
                        <img src={property.images[0]} alt={property.title} className="w-16 h-16 object-cover rounded" />
                      ) : (
                        <span className="text-gray-400 italic">No Image</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => onEdit(property._id)}
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(property._id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {pagination && pagination.totalPages > 1 && (
            <div className="flex justify-between items-center mt-6">
              <div className="text-sm text-gray-700">
                Showing {(pagination.currentPage - 1) * pagination.limit + 1} to{" "}
                {Math.min(pagination.currentPage * pagination.limit, pagination.totalProperties)} of{" "}
                {pagination.totalProperties} results
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handlePageChange(pagination.currentPage - 1)}
                  disabled={!pagination.hasPrev}
                  className={`px-3 py-2 rounded-md ${
                    pagination.hasPrev
                      ? "bg-blue-500 hover:bg-blue-700 text-white"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  Previous
                </button>
                {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-2 rounded-md ${
                      page === pagination.currentPage
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => handlePageChange(pagination.currentPage + 1)}
                  disabled={!pagination.hasNext}
                  className={`px-3 py-2 rounded-md ${
                    pagination.hasNext
                      ? "bg-blue-500 hover:bg-blue-700 text-white"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TableListing;
