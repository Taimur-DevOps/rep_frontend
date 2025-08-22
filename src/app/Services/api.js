// services/api.js
import BASE_API_URL from "@/config";
import axios from "axios";

const api = axios.create({
  baseURL: BASE_API_URL + "/api",
});

// Property APIs
export const propertyService = {
  getPaginatedProperties: async (page = 1, limit = 10) => {
    const response = await api.get(`/properties/paginated`, {
      params: { page, limit },
    });
    return response.data;
  },

  searchPropertiesPaginated: async (searchParams, page = 1, limit = 10) => {
    const response = await api.get(`/properties/search/paginated`, {
      params: { ...searchParams, page, limit },
    });
    return response.data;
  },

  getAllProperties: async () => {
    const response = await api.get("/properties");
    return response.data;
  },

  getFeaturedProperties: async () => {
    const response = await api.get("/properties/featured");
    return response.data;
  },

  getPropertyById: async (id) => {
    const response = await api.get(`/properties/${id}`);
    return response.data;
  },

  createProperty: async (propertyData) => {
    const formData = new FormData();

    // Append all fields
    Object.keys(propertyData).forEach((key) => {
      if (key === "images") return;
      if (key === "features" && Array.isArray(propertyData[key])) {
        formData.append("features", JSON.stringify(propertyData[key]));
      } else {
        formData.append(key, propertyData[key]);
      }
    });

    // Append images
    if (propertyData.images?.length) {
      propertyData.images.forEach((image) => {
        formData.append("images", image);
      });
    }

    const response = await api.post("/properties", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  updateProperty: async (id, propertyData) => {
    const formData = new FormData();

    Object.keys(propertyData).forEach((key) => {
      if (key === "images") return;
      if (key === "features" && Array.isArray(propertyData[key])) {
        formData.append("features", JSON.stringify(propertyData[key]));
      } else {
        formData.append(key, propertyData[key]);
      }
    });

    if (propertyData.images?.length) {
      propertyData.images.forEach((image) => {
        if (image instanceof File) {
          formData.append("images", image);
        }
      });
    }

    const response = await api.put(`/properties/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  deleteProperty: async (id) => {
    const response = await api.delete(`/properties/${id}`);
    return response.data;
  },

  deletePropertyImage: async (propertyId, imageIndex) => {
    const response = await api.delete(`/properties/${propertyId}/images/${imageIndex}`);
    return response.data;
  },

  getPropertiesByType: async () => {
    const response = await api.get("/properties/types");
    return response.data;
  },
  
  getPropertiesByPhase: async () => {
    const response = await api.get("/properties/phases");
    return response.data;
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

  // Get paginated users
  getUsersPaginated: async (page = 1, limit = 10) => {
    try {
      const response = await api.get(`/users/paginated?page=${page}&limit=${limit}`);
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
      const formData = new FormData();

      // Append text fields (skills converted to JSON string if array)
      Object.keys(userData).forEach((key) => {
        if (key !== "images") {
          if (key === "skills" && Array.isArray(userData[key])) {
            formData.append(key, JSON.stringify(userData[key]));
          } else {
            formData.append(key, userData[key]);
          }
        }
      });

      // Append images
      if (userData.images?.length) {
        userData.images.forEach((image) => {
          formData.append("images", image);
        });
      }

      const response = await api.post("/users", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update user
  updateUser: async (id, userData) => {
    try {
      const formData = new FormData();

      // Append text fields (skills converted to JSON string if array)
      Object.keys(userData).forEach((key) => {
        if (key !== "images") {
          if (key === "skills" && Array.isArray(userData[key])) {
            formData.append(key, JSON.stringify(userData[key]));
          } else {
            formData.append(key, userData[key]);
          }
        }
      });

      // Append only new image files (skip existing URLs)
      if (userData.images?.length) {
        userData.images.forEach((image) => {
          if (image instanceof File) {
            formData.append("images", image);
          }
        });
      }

      const response = await api.put(`/users/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
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

  // Delete specific user image
  deleteUserImage: async (userId, imageIndex) => {
    try {
      const response = await api.delete(`/users/${userId}/images/${imageIndex}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Search users
  searchUsers: async (queryParams) => {
    try {
      const query = new URLSearchParams(queryParams).toString();
      const response = await api.get(`/users/search?${query}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

// Hero Section APIs 
export const heroService = {
  // ✅ Get all hero sections
  getAllHeroSections: async () => {
    try {
      const response = await api.get("/hero-section");
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // ✅ Create a new hero section (images only)
  createHeroSection: async (heroData) => {
    try {
      const formData = new FormData();

      if (heroData.images && heroData.images.length > 0) {
        heroData.images.forEach((image) => {
          formData.append("images", image);
        });
      }

      const response = await api.post("/hero-section", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // ✅ Update hero section images
  updateHeroSection: async (id, heroData) => {
    try {
      const formData = new FormData();

      // New uploaded images
      if (heroData.images && heroData.images.length > 0) {
        heroData.images.forEach((image) => {
          formData.append("images", image);
        });
      }

      // Preserved existing images
      if (heroData.existingImages && heroData.existingImages.length > 0) {
        formData.append(
          "existingImages",
          JSON.stringify(heroData.existingImages)
        );
      }

      const response = await api.put(`/hero-section/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // ✅ Delete a specific image from a section (Cloudinary version)
  deleteHeroImage: async (sectionId, imageUrl) => {
    try {
      const response = await api.patch("/hero-section/remove-image", {
        sectionId,
        imageUrl, // full Cloudinary URL now
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // ✅ Delete all hero sections
  clearAllHeroSections: async () => {
    try {
      const response = await api.delete("/hero-section");
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};

// For backward compatibility
export const propertyAPI = propertyService;
export const userAPI = userService;
export const HeroAPI = heroService;

export default api;
