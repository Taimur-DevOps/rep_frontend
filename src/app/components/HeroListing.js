import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { heroService } from "../Services/api";
import Image from "next/image";
import BASE_API_URL from "@/config";
import { RxCross2 } from "react-icons/rx";

const HeroListing = () => {
  const [heroData, setHeroData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [localImages, setLocalImages] = useState([]);
  const [heroId, setHeroId] = useState(null);
  const [updatePending, setUpdatePending] = useState(false);
  const [newImages, setNewImages] = useState([]);

  // Fetch all hero sections
  const fetchHeroData = async () => {
    setLoading(true);
    try {
      const data = await heroService.getAllHeroSections();
      if (data.length > 0) {
        setHeroId(data[0]._id);
        setLocalImages(data[0].images);
      }
      setHeroData(data);
    } catch (error) {
      toast.error("Failed to fetch hero sections");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHeroData();
  }, []);

  // Handle image removal locally
  const handleRemoveImage = async (index) => {
    if (!heroId) return;
  
    try {
      // Call backend to delete the image
      await heroService.deleteHeroImage(heroId, index);
  
      // Update local state after successful delete
      const updatedImages = localImages.filter((_, i) => i !== index);
      setLocalImages(updatedImages);
      toast.success("Image deleted successfully");
    } catch (error) {
      console.error("Failed to delete image:", error);
      toast.error("Failed to delete image");
    }
  };  

  // ✅ Add this to track new file uploads
  const handleFileInputChange = (e) => {
    const files = Array.from(e.target.files);
    setNewImages((prev) => [...prev, ...files]);
    setUpdatePending(true); // allow update button to appear
  };

  // Handle update (send modified image array to backend)
  const handleUpdateImages = async () => {
    try {
      if (heroId) {
        // Update existing hero section
        await heroService.updateHeroSection(heroId, {
          images: newImages,
          existingImages: localImages,
        });
        toast.success("Images updated successfully");
      } else {
        // No hero section exists — create a new one
        const created = await heroService.createHeroSection({ images: newImages });
        toast.success("New hero section created");
        setHeroId(created._id); // Save new ID
      }
  
      // Refresh UI
      setNewImages([]);
      setUpdatePending(false);
      fetchHeroData();
    } catch (error) {
      toast.error("Update failed");
    }
  };  

  return (
    <div className="p-6 bg-white rounded shadow">
      <div className="flex justify-between items-center mb-4">
        <h6 className="text-lg font-semibold">All Images</h6>
        <button
          onClick={fetchHeroData}
          className="flex items-center gap-2 text-sm px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          Refresh
        </button>
      </div>

      {/* ✅ File Upload Input */}
      <div className="mb-4">
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileInputChange}
          className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
        />
        {newImages.length > 0 && (
          <p className="text-sm text-gray-500 mt-1">
            {newImages.length} new image(s) selected
          </p>
        )}
      </div>

      {/* ✅ Preview Existing Images */}
      {loading ? (
        <p>Loading...</p>
      ) : localImages.length === 0 ? (
        <p>No hero images found.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {localImages.map((img, index) => (
            <div
              key={index}
              className="relative border rounded overflow-hidden shadow-sm"
            >
              <Image
                src={`${BASE_API_URL}${img}`}
                alt={`Hero ${index}`}
                width={300}
                height={300}
                className="w-full h-40 object-cover"
              />
              <button
                onClick={() => handleRemoveImage(index)}
                className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full hover:bg-red-700"
                title="Remove Image"
              >
                <RxCross2 size={14} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* ✅ Update Button if something has changed */}
      {updatePending && newImages.length > 0 &&  (
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleUpdateImages}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Save
          </button>
        </div>
      )}
      <button
  onClick={async () => {
    if (confirm("Are you sure you want to delete ALL hero section data?")) {
      try {
        await heroService.clearAllHeroSections();
        toast.success("All hero sections cleared");
        setHeroData([]);         // Reset frontend state
        setLocalImages([]);
        setHeroId(null);
      } catch (err) {
        toast.error("Failed to clear hero sections");
      }
    }
  }}
  className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
>
  Clear All
</button>

    </div>
  );
};

export default HeroListing;
