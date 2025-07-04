import React from "react";
import Button from "./Button";
import Image from "next/image";
import phase1 from "@/assets/phase1.jpg";
import phase2 from "@/assets/phase2.jpg";
import phase3 from "@/assets/phase3.jpg";
import phase4 from "@/assets/phase4.jpg";
import { PiPlayLight } from "react-icons/pi";

const Categories = () => {
  return (
    <>
      <div className="lg:container mx-auto py-24 lg:px-0 px-7">
        <div className="flex gap-[3.7rem] lg:flex-row  flex-col">
          <div className="flex flex-col gap-5 lg:w-[37%]">
            <span className="ml-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                overflow="visible"
                height="15"
                // viewBox="0 0 20 16"
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
            <h2 className="text-4xl font-bold font-nokara leading-[1.5em]">
              Explore New Lifestyles
            </h2>
            <p className="text-base font-thin leading-7 mb-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Vestibulum at fermentum felis. Phasellus eget vehicula sem.
            </p>
            <div>
              <Button text="Discover" variant="primary" />
            </div>
          </div>
          <div className="lg:w-[63%]">
            <div className="flex lg:flex-row md:flex-row flex-col gap-10">
              <div className="1st-column relative flex flex-col gap-10 lg:w-1/2">
                <div className="h-[220px] rounded-[4px] cursor-pointer phases">
                  {" "}
                  <Image
                    alt="phase1"
                    src={phase1}
                    className="rounded-[4px] w-full h-full"
                  />
                  <div className="bgshade absolute top-0 rounded-[4px] w-full h-[220px] bg-black opacity-[0.3]"></div>
                  <div className="absolute top-0 rounded-[4px] w-full h-[220px] text-white flex justify-between flex-col p-8">
                    <div className=" flex flex-col">
                      <span className="text-xs">13 Properties</span>
                      <span className="text-xl">Apartment</span>
                    </div>
                    <span className="text-xs uppercase flex justify-between items-center">
                      More Details <PiPlayLight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
                <div className="h-[280px] rounded-[4px] cursor-pointer phases">
                  {" "}
                  <Image
                    alt="phase2"
                    src={phase2}
                    className="rounded-[4px]  w-full h-full"
                  />
                  <div className="bgshade absolute bottom-0 rounded-[4px] h-[280px] w-full bg-black opacity-[0.3]"></div>
                  <div className="absolute bottom-0 rounded-[4px] h-[280px] w-full text-white flex justify-between flex-col p-8">
                    <div className=" flex flex-col">
                      <span className="text-xs">13 Properties</span>
                      <span className="text-xl">Famile Home</span>
                    </div>
                    <span className="text-xs uppercase flex justify-between items-center">
                      More Details <PiPlayLight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </div>
              <div className="2nd-column relative flex flex-col gap-10 lg:w-1/2">
                <div className="h-[280px] rounded-[4px] cursor-pointer phases">
                  {" "}
                  <Image
                    alt="phase2"
                    src={phase3}
                    className="rounded-[4px]  w-full h-full"
                  />
                  <div className="bgshade absolute top-0 rounded-[4px] h-[280px] w-full bg-black opacity-[0.3]"></div>
                  <div className="absolute top-0 rounded-[4px] h-[280px] w-full text-white flex justify-between flex-col p-8">
                    <div className=" flex flex-col">
                      <span className="text-xs">13 Properties</span>
                      <span className="text-xl">Loft</span>
                    </div>
                    <span className="text-xs uppercase flex justify-between items-center">
                      More Details <PiPlayLight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
                <div className="h-[220px] rounded-[4px] cursor-pointer phases">
                  {" "}
                  <Image
                    alt="phase1"
                    src={phase4}
                    className="rounded-[4px] w-full h-full"
                  />
                  <div className="bgshade absolute bottom-0 rounded-[4px] w-full h-[220px]  bg-black opacity-[0.3]"></div>
                  <div className="absolute bottom-0 rounded-[4px] w-full h-[220px] text-white flex justify-between flex-col p-8">
                    <div className=" flex flex-col">
                      <span className="text-xs">13 Properties</span>
                      <span className="text-xl">Villa</span>
                    </div>
                    <span className="text-xs uppercase flex justify-between items-center">
                      More Details <PiPlayLight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Categories;
