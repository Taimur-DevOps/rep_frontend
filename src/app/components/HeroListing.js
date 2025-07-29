import { useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import { heroService } from "../Services/api";

const HeroListing = () => {
  const [heroSections, setHeroSections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updateEnabled, setUpdateEnabled] = useState(false);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchAllHeroSections();
  }, []);

  const fetchAllHeroSections = async () => {
    try {
      setLoading(true);
      const data = await heroService.getAllHeroSections();
      setHeroSections(data);
    } catch (err) {
      console.error("Error fetching hero sections", err);
      toast.error("Failed to load hero sections.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteImage = async (sectionId, imageIndex) => {
    try {
      await heroService.deleteHeroImage(sectionId, imageIndex);
      const updatedSections = heroSections.map((section) => {
        if (section._id === sectionId) {
          const newImages = [...section.images];
          newImages.splice(imageIndex, 1);
          return { ...section, images: newImages };
        }
        return section;
      });

      setHeroSections(updatedSections);
      setUpdateEnabled(true);
      toast.success("Image deleted.");
    } catch (err) {
      console.error("Delete failed", err);
      toast.error("Failed to delete image.");
    }
  };

  const handleUpdateAll = async () => {
    try {
      setUpdating(true);
      for (const section of heroSections) {
        await heroService.updateHeroSection(section._id, {
          title: section.title,
          images: section.images.filter((img) => typeof img === "string"),
        });
      }
      setUpdateEnabled(false);
      toast.success("All hero sections updated.");
    } catch (err) {
      console.error("Update failed", err);
      toast.error("Failed to update sections.");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="mt-6 border p-4 rounded bg-white">
      <h2 className="text-lg font-semibold mb-3">Hero Sections</h2>

      {loading ? (
        <p>Loading...</p>
      ) : heroSections.length === 0 ? (
        <p className="text-sm text-gray-500">No hero sections found.</p>
      ) : (
        <>
          {heroSections.map((section) => (
            <div key={section._id} className="mb-8 border-b pb-4">
              <h3 className="font-medium mb-2">{section.title}</h3>
              <div className="flex flex-wrap gap-3">
                {section.images?.map((img, idx) => (
                  <div
                    key={idx}
                    className="relative w-32 h-32 border rounded overflow-hidden"
                  >
                    <Image
                      src={img}
                      alt={`Hero Image ${idx}`}
                      layout="fill"
                      objectFit="cover"
                    />
                    <button
                      onClick={() => handleDeleteImage(section._id, idx)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      title="Remove image"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="mt-6 text-right">
            <button
              onClick={handleUpdateAll}
              disabled={!updateEnabled || updating}
              className={`py-2 px-6 rounded text-white bg-blue-600 ${
                !updateEnabled || updating
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-blue-700"
              }`}
            >
              {updating ? "Updating..." : "Update All"}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default HeroListing;
