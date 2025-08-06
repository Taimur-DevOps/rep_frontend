import { useEffect, useRef, useState, useCallback } from "react";
import { toast } from "react-toastify";
import { heroService } from "../Services/api";
import Image from "next/image";
import BASE_API_URL from "@/config";
import { RxCross2 } from "react-icons/rx";

const HeroListing = () => {
  const [heroData, setHeroData] = useState([]);
  const [localImages, setLocalImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [heroId, setHeroId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updatePending, setUpdatePending] = useState(false);
  const fileInputRef = useRef(null);

  const hasChanges = newImages.length > 0 || updatePending;

  const resetFileInput = () => {
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const fetchHeroData = useCallback(async () => {
    setLoading(true);
    try {
      const data = await heroService.getAllHeroSections();
      if (data.length) {
        setHeroData(data);
        setHeroId(data[0]._id);
        setLocalImages(data[0].images);
      } else {
        setHeroData([]);
        setHeroId(null);
        setLocalImages([]);
      }
    } catch {
      toast.error("Failed to fetch hero sections");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHeroData();
  }, [fetchHeroData]);

  const handleRemoveImage = async (index) => {
    const imageToDelete = localImages[index];
    if (!heroId || !imageToDelete) return;

    try {
      await heroService.deleteHeroImage(heroId, imageToDelete);
      setLocalImages((prev) => prev.filter((_, i) => i !== index));
      setUpdatePending(true);
      toast.success("Image deleted successfully");
    } catch {
      toast.error("Failed to delete image");
    }
  };

  const handleFileInputChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length) {
      setNewImages((prev) => [...prev, ...files]);
      setUpdatePending(true);
    }
  };

  const handleUpdateImages = async () => {
    try {
      if (heroId) {
        await heroService.updateHeroSection(heroId, {
          images: newImages,
          existingImages: localImages,
        });
        toast.success("Images updated successfully");
      } else {
        const created = await heroService.createHeroSection({ images: newImages });
        toast.success("New hero section created");
        setHeroId(created._id);
      }

      resetFileInput();
      setNewImages([]);
      setUpdatePending(false);
      fetchHeroData();
    } catch {
      toast.error("Update failed");
    }
  };

  const handleClearAll = async () => {
    if (!confirm("Are you sure you want to delete ALL hero section data?")) return;

    try {
      await heroService.clearAllHeroSections();
      toast.success("All hero sections cleared");
      setHeroData([]);
      setLocalImages([]);
      setHeroId(null);
    } catch {
      toast.error("Failed to clear hero sections");
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow">
      <h6 className="text-lg font-semibold mb-4">All Images</h6>

      {/* File Upload */}
      <div className="mb-4">
        <input
          type="file"
          ref={fileInputRef}
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

      {/* Image Gallery */}
      {loading ? (
        <p>Loading...</p>
      ) : localImages.length === 0 ? (
        <p>No images found</p>
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

      {/* Actions */}
      <div className="mt-6 flex justify-end gap-3">
        <button
          onClick={handleUpdateImages}
          disabled={!hasChanges}
          className={`px-4 py-2 rounded text-white ${
            hasChanges
              ? "bg-green-600 hover:bg-green-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Savess
        </button>
        <button
          onClick={handleClearAll}
          className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Clear All
        </button>
      </div>
    </div>
  );
};

export default HeroListing;
