"use client";
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import img1 from "@/assets/bnr1.jpg";
import img2 from "@/assets/bnr2.jpg";
import img3 from "@/assets/bnr3.jpg";
import img4 from "@/assets/bnr4.jpg";
import Image from "next/image";
import { LuBedDouble } from "react-icons/lu";
import { PiShowerLight } from "react-icons/pi";
import { TfiRulerAlt2 } from "react-icons/tfi";
import Button from "./Button";
import { propertyService } from "../Services/api";
import { toast } from 'react-hot-toast';

// Static banner images
const staticBanner = [
  { img: img1 },
  { img: img2 },
  { img: img3 },
  { img: img4 },
];

const Banner = () => {
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [bannerItems, setBannerItems] = useState([...staticBanner]);
  const [imageErrors, setImageErrors] = useState({});

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      setIsLoading(true);
      const data = await propertyService.getAllProperties();
      setProperties(data);
      
      // Combine static banners with property data
      if (data && data.length > 0) {
        const combinedBannerItems = [...staticBanner];
        
        // Add the properties to the banner items
        data.forEach(property => {
          if (property.images && property.images.length > 0) {
            combinedBannerItems.push({
              img: null, // We'll use the property image URL directly
              propertyImage: `http://localhost:5001/uploads/${property.images[0].split('/').pop()}`,
              property: property
            });
          }
        });
        
        setBannerItems(combinedBannerItems);
      }
    } catch (error) {
      toast.error(`Failed to load properties: ${error.message || error}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle image errors
  const handleImageError = (index) => {
    setImageErrors(prev => ({
      ...prev,
      [index]: true
    }));
  };

  const breakpoints = {
    767: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    1024: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
  };

  if (isLoading) {
    return <div className="text-center p-10">Loading properties...</div>;
  }

  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={16}
        breakpoints={breakpoints}
        navigation
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 10500,
          disableOnInteraction: false,
        }}
        modules={[Navigation, Autoplay]}
        className="mySwiper"
      >
        {bannerItems.map((item, index) => {
          const { img, propertyImage, property } = item;
          
          // Determine if this is a property item or a static banner item
          const isPropertyItem = !!property;
          const hasImageError = imageErrors[index];
          
          return (
            <SwiperSlide key={index}>
              <div className="h-[600px] flex justify-center items-center relative">
                {/* Handle both static images and property images */}
                {img ? (
                  <Image
                    alt="hero section slider"
                    src={img}
                    className="w-full lg:h-auto object-cover h-[600px]"
                  />
                ) : (
                  !hasImageError ? (
                    <img
                      alt={property?.title || "Property image"}
                      src={propertyImage}
                      className="w-full lg:h-auto object-cover h-[600px]"
                      onError={() => handleImageError(index)}
                    />
                  ) : (
                    <div className="w-full h-[600px] bg-gray-200 flex items-center justify-center">
                      <p>Image not available</p>
                    </div>
                  )
                )}
                
                <div className="absolute lg:left-[12%] md:left-[12%] lg:w-[500px] lg:h-[170px] md:w-[375px] w-[300px] md:h-auto bg-gray-50 text-black py-6 px-[30px] rounded-[4px]">
                  <div className="flex lg:justify-between lg:items-baseline lg:flex-row md:flex-col lg:gap-0 md:gap-2 flex-col gap-3">
                    <div className="flex flex-col gap-1">
                      <span className="text-base font-semibold">
                        {isPropertyItem ? property.title : "Luxury apartment bay view"}
                      </span>
                      <span className="text-xs font-light">
                        {isPropertyItem ? property.location : "4599 N Lois Ave, Tampa, FL 33614, USA"}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-base font-semibold">
                        {isPropertyItem ? 
                          `$${property.price.toLocaleString()}.00` : 
                          "$97,000.00"}
                      </span>
                      <span>
                        {isPropertyItem ? 
                          `$${Math.round(property.price / property.areaSize).toLocaleString()}/sq ft` : 
                          "$6,350.00/sq ft"}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-iconClr text-sm mt-3">
                    <div className="flex items-center gap-1">
                      <span>
                        <LuBedDouble className="w-[18px] h-[18px]" />
                      </span>
                      <span>{isPropertyItem ? property.bedrooms : 4}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>
                        <PiShowerLight className="w-[18px] h-[18px]" />
                      </span>
                      <span>{isPropertyItem ? property.bathrooms : 2}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>
                        <TfiRulerAlt2 className="w-[18px] h-[18px]" />
                      </span>
                      <span>{isPropertyItem ? property.areaSize : 3410}</span>
                    </div>
                  </div>
                  <p className="text-xs font-light uppercase mt-2">
                    {isPropertyItem ? property.propertyType || "Property" : "Apartment"}
                  </p>
                  <div className="flex justify-end mr-[-30px] mb-[-24px] lg:mb-0">
                    <Button text="Details" variant="primary" />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};

export default Banner;