import React from "react";
import Button from "./Button";
import Image from "next/image";
import keepintouch from "@/assets/keepintouch.jpg";

const KeepInTouch = () => {
  return (
    <>
      <div className="lg:container mx-auto py-24 lg:px-0 px-7">
        <div className="flex lg:gap-12 md:gap-10 gap-12 lg:flex-row md:flex-row flex-col">
          <div className="flex flex-col gap-5 lg:w-[40%] md:w-[40%] w-full">
            <span className="ml-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                overflow="visible"
                height="15"
                viewBox="0 0 20 16"
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
            <h2 className="text-4xl font-bold font-nokara leading-[1.5em] lg:pr-10">
              Keep In Touch With Our Team
            </h2>
            <div className="w-[120px] h-[120px]">
              <Image alt="keep in touch" src={keepintouch} className="w-full" />
            </div>
          </div>
          <form className="lg:w-[60%] md:w-[60%] w-full">
            <div className="flex flex-col gap-3">
              <div className="flex lg:flex-row md:flex-row flex-col gap-3">
                <input
                  placeholder="First name"
                  type="text"
                  id="firstName"
                  name="firstName"
                  className="block w-full placeholder:text-lightBlack placeholder:font-light border border-gray-300  bg-white px-[10px] py-1 text-sm text-BlackPrimary lg:text-base rounded-[4px]"
                />

                <input
                  placeholder="Last name"
                  type="text"
                  id="lastName"
                  name="lastName"
                  className="block w-full placeholder:text-lightBlack placeholder:font-light border border-gray-300  bg-white px-[10px] py-1 text-sm text-BlackPrimary lg:text-base rounded-[4px]"
                />
              </div>
              <input
                placeholder="Email"
                type="email"
                id="firstName"
                name="firstName"
                className="block w-full placeholder:text-lightBlack placeholder:font-light border border-gray-300  bg-white px-[10px] py-1 text-sm text-BlackPrimary lg:text-base rounded-[4px]"
              />
              <input
                placeholder="Phone"
                type="number"
                id="firstName"
                name="firstName"
                className="block w-full placeholder:text-lightBlack placeholder:font-light border border-gray-300  bg-white px-[10px] py-1 text-sm text-BlackPrimary lg:text-base rounded-[4px]"
              />
              <textarea
                id="message"
                rows="4"
                className="block w-full placeholder:text-lightBlack placeholder:font-light border border-gray-300  bg-white px-[10px] py-1 text-sm text-BlackPrimary lg:text-base rounded-[4px]"
                placeholder="Message"
              ></textarea>
              <Button variant="primary" text="Submit" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default KeepInTouch;
