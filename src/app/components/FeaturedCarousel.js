'use client';

import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import Image from 'next/image';
import { LuBedDouble } from 'react-icons/lu';
import { PiShowerLight } from 'react-icons/pi';
import { TfiRulerAlt2 } from 'react-icons/tfi';
import api from '../Services/api';
import Link from 'next/link';
import SkeletonCard from './SkeletonCard';


const FeaturedCarousel = () => {
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [loading, setLoading] = useState(true);

 
  const breakpoints = {
    640: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    1024: { 
      slidesPerView: 3,
      spaceBetween: 24,
    },
  };

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await api.get("/properties/featured");
        setFeaturedProperties(res.data);
      } catch (err) {
        console.error("Error fetching featured properties:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <section className="bg-bgGray propertyFeatured">
      <div className="lg:py-24 lg:px-10 px-5 py-16">
        <div className="mb-5 text-center">
          <h3 className="lg:text-4xl text-3xl font-bold font-nokara">Featured Properties</h3>
          <p className="text-base font-thin leading-7 mt-2 lg:px-32">
            Discover the most sought-after homes in DHA Lahore—handpicked for
            their prime location, value, and demand. Every listing is 100% genuine,
            with real photos, verified owners, and accurate prices.
          </p>
        </div>

        {loading ? (
          <SkeletonCard count={3} />
        ) : featuredProperties.length === 0 ? (
          <p>No featured properties available</p>
        ) : (
          <Swiper
            slidesPerView={1} 
            spaceBetween={16}
            breakpoints={breakpoints}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 4500, disableOnInteraction: false }}
            modules={[Navigation, Autoplay, Pagination]}
            className="featureSwiper"
          >
            {featuredProperties.map((property, index) => {
              const { _id, title, price, bedrooms, bathrooms, area, images = [] } =
                property;

              return (
                <SwiperSlide key={_id || index}>
                  <Link href={`/properties/${_id}`}>
                    <div className="rounded-[4px] bg-white shadow-md relative">
                      {/* Inner swiper for property images */}
                      <Swiper
                        pagination
                        modules={[Pagination]}
                        className="subImgsNavigation"
                      >
                        {(images.length ? images : ["/default.jpg"]).map((img, i) => {
                          const imageUrl =
                            typeof img === "string"
                              ? img.startsWith("/") || img.startsWith("http")
                                ? img
                                : `/${img}`
                              : img?.url?.startsWith("/") || img?.url?.startsWith("http")
                              ? img.url
                              : `/${img?.url}`;

                          return (
                            <SwiperSlide key={i}>
                              <Image
                                src={imageUrl}
                                alt={title}
                                width={500}
                                height={300}
                                className="w-full h-[240px] object-cover rounded-t-[4px]"
                              />
                            </SwiperSlide>
                          );
                        })}
                      </Swiper>

                      {/* Property Info */}
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
                              <span>{area} sqft</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="absolute top-[5px] w-full z-[1]">
                        <div className="flex justify-between items-center px-2">
                          <span className="text-xs uppercase bg-lightPeach text-white px-1">
                            Featured
                          </span>
                          <span className="text-xs uppercase bg-[#cbb492] text-white px-1 ml-2">
                            New
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              );
            })}
          </Swiper>
        )}
      </div>
    </section>
  );
};

export default FeaturedCarousel;
