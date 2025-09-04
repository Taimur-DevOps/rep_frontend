"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";  
import { propertyService } from "../Services/api";
import React from "react";
import Button from "./Button";
import Image from "next/image";
import phase1 from "@/assets/phase1.jpg";
import phase2 from "@/assets/phase2.jpg";
import phase3 from "@/assets/phase3.jpg";
import phase4 from "@/assets/phase4.jpg";
import { PiPlayLight } from "react-icons/pi";

const imageMap = {
  apartment: phase1,
  house: phase2,
  loft: phase3,
  villa: phase4,
};

const Categories = () => {
  const [types, setTypes] = useState([]);
  const router = useRouter(); 

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const data = await propertyService.getPropertiesByType();
        setTypes(data);
      } catch (err) {
        console.error("Error fetching property types:", err);
      }
    };
    fetchTypes();
  }, []);

  const handleCategoryClick = (type) => {
    router.push(`/properties?category=${type.toLowerCase()}`); 
    // redirects with query param
  };

  return (
    <div className="lg:py-24 lg:px-10 px-5 py-16">
      <div className="flex gap-[3.7rem] lg:flex-row flex-col">
        {/* left block */}
        <div className="flex flex-col gap-5 lg:w-[37%] justify-center">
          <span className="ml-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              overflow="visible"
              height="15"
              fill="#fa8f8d"
              stroke="#fa8f8d"
              strokeWidth="1"
              strokeLinecap="square"
              strokeMiterlimit="10"
            >
              <g transform="translate(-12.000000, 0)">
                <path d="M28,0L10,18" />
                <path d="M18,0L0,18" />
                <path d="M48,0L30,18" />
                <path d="M38,0L20,18" />
              </g>
            </svg>
          </span>
          <h2 className="lg:text-4xl text-3xl font-bold font-nokara leading-[1.5em]">
            Explore New Lifestyles
          </h2>
          <p className="text-base font-thin leading-7 mb-2">
            From chic city apartments to sprawling farmhouses, family homes, and prime plots—discover properties that match your lifestyle, dreams, and investment goals.
          </p>
          <div>
            <Button text="Discover" variant="primary" />
          </div>
        </div>

        {/* right grid */}
        <div className="lg:w-[63%]">
          <div className="flex lg:flex-row md:flex-row flex-col gap-10">
            {/* first column */}
            <div className="flex flex-col gap-10 lg:w-1/2">
              {types.slice(0, 2).map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleCategoryClick(item?.type)} 
                  className={`relative rounded-[4px] cursor-pointer ${
                    index === 0 ? "h-[220px]" : "h-[280px]"
                  }`}
                >
                  <Image
                    alt={item?.type}
                    src={imageMap[item?.type?.toLowerCase()] || phase1}
                    className="rounded-[4px] w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black opacity-[0.3] rounded-[4px]"></div>
                  <div className="absolute inset-0 text-white flex justify-between flex-col p-8">
                    <div className="flex flex-col">
                      <span className="text-xs">{item?.count} Properties</span>
                      <span className="text-xl capitalize">{item?.type}</span>
                    </div>
                    <span className="text-xs uppercase flex justify-between items-center">
                      More Details <PiPlayLight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* second column */}
            <div className="flex flex-col gap-10 lg:w-1/2">
              {types.slice(2, 4).map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleCategoryClick(item?.type)} 
                  className={`relative rounded-[4px] cursor-pointer ${
                    index === 0 ? "h-[280px]" : "h-[220px]"
                  }`}
                >
                  <Image
                    alt={item?.type}
                    src={imageMap[item?.type?.toLowerCase()] || phase1}
                    className="rounded-[4px] w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black opacity-[0.3] rounded-[4px]"></div>
                  <div className="absolute inset-0 text-white flex justify-between flex-col p-8">
                    <div className="flex flex-col">
                      <span className="text-xs">{item?.count} Properties</span>
                      <span className="text-xl capitalize">{item?.type}</span>
                    </div>
                    <span className="text-xs uppercase flex justify-between items-center">
                      More Details <PiPlayLight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
