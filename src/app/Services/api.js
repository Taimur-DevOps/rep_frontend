// services/api.js
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Property APIs
export const propertyService = {
  getPaginatedProperties: async (page = 1, limit = 10) => {
    try {
      const response = await fetch(
        `/api/properties/paginated?page=${page}&limit=${limit}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching paginated properties:", error);
      throw error;
    }
  },

  // New method for paginated search
  searchPropertiesPaginated: async (searchParams, page = 1, limit = 10) => {
    try {
      const queryParams = new URLSearchParams({
        ...searchParams,
        page: page.toString(),
        limit: limit.toString(),
      });

      const response = await fetch(
        `/api/properties/search/paginated?${queryParams}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error searching paginated properties:", error);
      throw error;
    }
  },

  // Get all properties
  getAllProperties: async () => {
    try {
      const response = await api.get("/properties");
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get featured properties
  getFeaturedProperties: async () => {
    try {
      const response = await api.get("/properties/featured");
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get property by ID
  getPropertyById: async (id) => {
    try {
      const response = await api.get(`/properties/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Create property
  createProperty: async (propertyData) => {
    try {
      // Create FormData for file uploads
      const formData = new FormData();

      // Add all text fields to formData
      Object.keys(propertyData).forEach((key) => {
        if (key === "images") {
          // Skip images here, we'll handle them separately
          return;
        } else if (key === "features" && Array.isArray(propertyData[key])) {
          // Handle features array
          formData.append("features", JSON.stringify(propertyData[key]));
        } else {
          formData.append(key, propertyData[key]);
        }
      });

      // Add images to formData
      if (propertyData.images && propertyData.images.length > 0) {
        propertyData.images.forEach((image) => {
          formData.append("images", image);
        });
      }

      const response = await api.post("/properties", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update property
  updateProperty: async (id, propertyData) => {
    try {
      // Create FormData for file uploads
      const formData = new FormData();

      // Add all text fields to formData
      Object.keys(propertyData).forEach((key) => {
        if (key === "images") {
          // Skip images here, we'll handle them separately
          return;
        } else if (key === "features" && Array.isArray(propertyData[key])) {
          // Handle features array
          formData.append("features", JSON.stringify(propertyData[key]));
        } else {
          formData.append(key, propertyData[key]);
        }
      });

      // Add images to formData
      if (propertyData.images && propertyData.images.length > 0) {
        propertyData.images.forEach((image) => {
          if (image instanceof File) {
            formData.append("images", image);
          }
        });
      }

      const response = await api.put(`/properties/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Delete property
  deleteProperty: async (id) => {
    try {
      const response = await api.delete(`/properties/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Delete property image
  deletePropertyImage: async (propertyId, imageIndex) => {
    try {
      const response = await api.delete(
        `/properties/${propertyId}/images/${imageIndex}`
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Search properties
  searchProperties: async (params) => {
    try {
      const response = await api.get("/properties/search", { params });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

// User APIs
export const userService = {
  // Get all users
  getAllUsers: async () => {
    try {
      const response = await api.get("/users");
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get user by ID
  getUserById: async (id) => {
    try {
      const response = await api.get(`/users/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Create user
  createUser: async (userData) => {
    try {
      // Create FormData for file uploads
      const formData = new FormData();

      // Add all text fields to formData
      Object.keys(userData).forEach((key) => {
        if (key === "images") {
          // Skip images here, we'll handle them separately
          return;
        } else {
          formData.append(key, userData[key]);
        }
      });

      // Add images to formData
      if (userData.images && userData.images.length > 0) {
        userData.images.forEach((image) => {
          formData.append("images", image);
        });
      }

      const response = await api.post("/users", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update user
  updateUser: async (id, userData) => {
    try {
      // Create FormData for file uploads
      const formData = new FormData();

      // Add all text fields to formData
      Object.keys(userData).forEach((key) => {
        if (key === "images") {
          // Skip images here, we'll handle them separately
          return;
        } else {
          formData.append(key, userData[key]);
        }
      });

      // Add images to formData
      if (userData.images && userData.images.length > 0) {
        userData.images.forEach((image) => {
          if (image instanceof File) {
            formData.append("images", image);
          }
        });
      }

      const response = await api.put(`/users/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Delete user
  deleteUser: async (id) => {
    try {
      const response = await api.delete(`/users/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Delete user image
  deleteUserImage: async (userId, imageIndex) => {
    try {
      const response = await api.delete(
        `/users/${userId}/images/${imageIndex}`
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

// For backward compatibility
export const propertyAPI = propertyService;
export const userAPI = userService;

export default api;
