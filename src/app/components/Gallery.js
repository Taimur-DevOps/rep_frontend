"use client";
import React from "react";
import Image from "next/image";
import img1 from "@/assets/bnr1.jpg";
import img2 from "@/assets/bnr2.jpg";
import img3 from "@/assets/bnr3.jpg";
import img4 from "@/assets/bnr4.jpg";
import { SlPicture } from "react-icons/sl";
import { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Pagination } from "swiper/modules";
const gallery = [
  {
    img: img1,
  },
  {
    img: img2,
  },
  {
    img: img3,
  },
  {
    img: img4,
  },
  {
    img: img1,
  },
  {
    img: img2,
  },
  {
    img: img3,
  },
  {
    img: img4,
  },
];

export default function Gallery() {
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
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <>
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
          pagination={{
            clickable: true,
          }}
          className="mySwiper galleryNavigation"
        >
          {gallery.map((item, index) => {
            const { img } = item;
            return (
              <>
                <SwiperSlide key={index}>
                  <div className="lg:h-[600px] h-[380px] flex justify-center items-center">
                    <Image
                      alt="hero section slider"
                      src={img}
                      className="w-full object-cover  lg:h-[600px] h-full"
                    />
                  </div>
                </SwiperSlide>
              </>
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
          className="mySwiper  lg:!flex flex-wrap  !hidden"
        >
          {gallery.map((item, index) => {
            const { img } = item;
            return (
              <>
                <SwiperSlide
                  key={index}
                  className="lg:!w-1/6 md:!w-1/4 !w-[40%] lg:!h-44 !h-36"
                >
                  <Image
                    alt="hero section slider"
                    src={img}
                    className="w-full h-full object-cover opacity-60 hover:opacity-100"
                  />
                </SwiperSlide>
              </>
            );
          })}
        </Swiper>
      </section>
    </>
  );
}

{
  /* <div className="gallery">
  // <SlPicture className="w-4 h-4" /> //{" "}
  <span className="text-sm font-light">1/5</span>
  //{" "}
</div>; */
}
