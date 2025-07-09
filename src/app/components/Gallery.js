"use client";
import React from "react";
import Image from "next/image";
import { SlPicture } from "react-icons/sl";
import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Pagination } from "swiper/modules";


export default function Gallery({images=[]}) {
 
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  
  return (
    <section>
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs, Pagination]}
        pagination={{ clickable: true }}
        className="mySwiper galleryNavigation"
      >
        {images.map((item, index) => {
          const img = typeof item === "string" ? item : item.img;
          return (
            <SwiperSlide key={index}>
              <div className="lg:h-[600px] h-[380px] flex justify-center items-center">
                <Image
                  alt="property image"
                  src={img}
                  className="w-full object-cover lg:h-[600px] h-full"
                  width={1200}
                  height={600}
                />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={0}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper lg:!flex flex-wrap !hidden"
      >
        {images.map((item, index) => {
          const img = typeof item === "string" ? item : item.img;
          return (
            <SwiperSlide key={index} className="lg:!w-1/6 md:!w-1/4 !w-[40%] lg:!h-44 !h-36">
              <Image
                alt="thumbnail"
                src={img}
                className="w-full h-full object-cover opacity-60 hover:opacity-100"
                width={300}
                height={200}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
}


 //   const breakpoints = {
  //     767: {
  //       slidesPerView: 1,
  //       spaceBetween: 20,
  //     },
  //     1024: {
  //       slidesPerView: 3,
  //       slidesPerGroup: 1,
  //       centeredSlides: false,
  //       loop: true,
  //       slideToClickedSlide: true,
  //       spaceBetween: 1,
  //     },
  //   };
{
  /* <div className="gallery">
  // <SlPicture className="w-4 h-4" /> //{" "}
  <span className="text-sm font-light">1/5</span>
  //{" "}
</div>; */
}
