"use client";
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import Button from "./Button";
import { heroService } from "../Services/api";
import { toast } from "react-hot-toast";

const Banner = () => {
  const [bannerImages, setBannerImages] = useState([]);
  const [imageErrors, setImageErrors] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchHeroBanners();
  }, []);

  const fetchHeroBanners = async () => {
    try {
      setIsLoading(true);
      const heroData = await heroService.getAllHeroSections();

      // Directly use Cloudinary URLs stored in DB
      const images = heroData
        .filter((item) => Array.isArray(item.images) && item.images.length > 0)
        .flatMap((item) => item.images);

      if (!images.length) {
        toast.error("No hero banner images found.");
      }

      setBannerImages(images);
    } catch (error) {
      toast.error(`Failed to load hero images: ${error.message || error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageError = (index) => {
    setImageErrors((prev) => ({ ...prev, [index]: true }));
  };

  const breakpoints = {
    767: { slidesPerView: 1, spaceBetween: 20 },
    1024: { slidesPerView: 1, spaceBetween: 20 },
  };

  if (isLoading) {
    return <div className="text-center p-10">Loading banners...</div>;
  }

  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={16}
      breakpoints={breakpoints}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 10500, disableOnInteraction: false }}
      modules={[Navigation, Autoplay]}
      className="mySwiper"
    >
      {bannerImages.map((imgUrl, index) => {
        const hasImageError = imageErrors[index];

        return (
          <SwiperSlide key={index}>
            <div className="h-[600px] flex justify-center items-center relative">
              {!hasImageError ? (
                <img
                  src={imgUrl}
                  alt={`Hero banner ${index + 1}`}
                  className="w-full lg:h-auto object-cover h-[600px]"
                  onError={() => handleImageError(index)}
                />
              ) : (
                <div className="w-full h-[600px] bg-gray-200 flex items-center justify-center">
                  <p>Image not available</p>
                </div>
              )}
              {/* Optional overlay info */}
              {/* <div className="absolute lg:left-[12%] md:left-[12%] lg:w-[500px] lg:h-[170px] md:w-[375px] w-[300px] md:h-auto bg-gray-50 text-black py-6 px-[30px] rounded-[4px]">
                <div className="flex flex-col gap-1">
                  <span className="text-base font-semibold">Welcome</span>
                  <span className="text-xs font-light">Discover your dream home</span>
                </div>
                <p className="text-xs font-light uppercase mt-2">Hero Section</p>
                <div className="flex justify-end mr-[-30px] mb-[-24px] lg:mb-0">
                  <Button text="Explore" variant="primary" />
                </div>
              </div> */}
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default Banner;