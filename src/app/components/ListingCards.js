"use client";
import React from "react";
import { LuBedDouble } from "react-icons/lu";
import { PiShowerLight } from "react-icons/pi";
import { TfiRulerAlt2 } from "react-icons/tfi";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination } from "swiper/modules";

const ListingCards = ({ properties }) => {
  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-[30px]">
      {properties.map((property) => {
        const {
          _id,
          title,
          price,
          bedrooms,
          bathrooms,
          areaSize,
          images = [],
        } = property;

        return (
          <div key={_id}>
            <Link href={`/properties/${_id}`}>
              <div className="rounded-[4px] bg-white shadow-md relative">
                <Swiper pagination={true} modules={[Pagination]} className="subImgsNavigation">
                  {(images.length ? images : ["/default.jpg"]).map((imgUrl, idx) => (
                    <SwiperSlide key={idx}>
                      <Image
                        alt={`property-${_id}-img-${idx}`}
                        src={imgUrl}
                        width={400}
                        height={300}
                        className="w-full h-[250px] object-cover rounded-t-[4px]"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>

                <div className="flex gap-2 flex-col p-5">
                  <h4 className="text-base font-bold">{title}</h4>
                  <div className="flex justify-between items-center">
                    <span className="text-lightPeach text-lg">${price}</span>
                    <div className="flex items-center gap-2 text-iconClr text-sm">
                      <div className="flex items-center gap-1">
                        <LuBedDouble className="w-[18px] h-[18px]" />
                        <span>{bedrooms}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <PiShowerLight className="w-[18px] h-[18px]" />
                        <span>{bathrooms}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <TfiRulerAlt2 className="w-[18px] h-[18px]" />
                        <span>{areaSize}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
};


export default ListingCards;
