import React from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import { AiOutlineMail } from "react-icons/ai";
import { RiContactsBook3Line } from "react-icons/ri";
import { LuFacebook } from "react-icons/lu";
import { PiInstagramLogoLight } from "react-icons/pi";
import { PiTiktokLogoThin } from "react-icons/pi";
import { PiYoutubeLogoThin } from "react-icons/pi";

const Footer = () => {
  return (
    <>
      <section>
        <div className="bg-bg ">
          <div className="lg:container mx-auto py-24 lg:px-0 px-5">
            <div className="flex lg:gap-[50px] md:gap-[30px] gap-7 lg:flex-row md:flex-row flex-col">
              <div className="lg:w-[50%] md:w-[45%] text-white lg:pr-20">
                {" "}
                <a
                  href="/"
                  className="flex items-center space-x-3 rtl:space-x-reverse"
                >
                  <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                  REP
                  </span>
                </a>
                <p className="text-white text-sm leading-[25px] font-light py-5">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Vestibulum at fermentum felis. Phasellus eget vehicula sem.
                  Duis malesuada sapien nec quam gravida accumsan.
                </p>
                <div>Read more</div>
              </div>
              <div className="lg:w-[25%] md:w-[25%]">
                <h5 className="text-lg text-white mb-6 ml-1">Discover</h5>
                <ul className="flex flex-col gap-4">
                  <li className="flex gap-2 items-center text-white text-sm">
                    <MdOutlineKeyboardArrowRight className="w-6 h-6" />{" "}
                    <span>Apartment</span>
                  </li>
                  <li className="flex gap-2 items-center text-white text-sm">
                    <MdOutlineKeyboardArrowRight className="w-6 h-6" />{" "}
                    <span>Family Home</span>
                  </li>
                  <li className="flex gap-2 items-center text-white text-sm">
                    <MdOutlineKeyboardArrowRight className="w-6 h-6" />{" "}
                    <span>Loft</span>
                  </li>
                  <li className="flex gap-2 items-center text-white text-sm">
                    <MdOutlineKeyboardArrowRight className="w-6 h-6" />{" "}
                    <span>Villa</span>
                  </li>
                </ul>
              </div>
              <div className="lg:w-[25%] md:w-[30%]">
                <h5 className="text-lg text-white mb-6">Contact Us</h5>
                <ul className="flex flex-col gap-2">
                  <li className="flex gap-2 items-center text-white text-sm font-light leading-[25px]">
                    {" "}
                    <CiLocationOn /> 8728 Harbor Dr, Miami Beach FL
                  </li>
                  <li className="flex gap-2 items-center text-white text-sm font-light leading-[25px]">
                    {" "}
                    <RiContactsBook3Line /> 598 394 2304
                  </li>
                  <li className="flex gap-2 items-center text-white text-sm font-light leading-[25px]">
                    {" "}
                    <AiOutlineMail /> REP@email.com
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#2c3c47] py-16">
          <div className="flex flex-row gap-3 justify-center">
            <span className="border border-white rounded-[50px] flex justify-center items-center w-[50px] h-[50px] cursor-pointer footerIcons">
              <LuFacebook className="text-white w-[14px] h-[14px] icon" />
            </span>
            <span className="border border-white rounded-[50px] flex justify-center items-center w-[50px] h-[50px] cursor-pointer footerIcons">
              <PiTiktokLogoThin className="text-white w-[14px] h-[14px] icon" />
            </span>
            <span className="border border-white rounded-[50px] flex justify-center items-center w-[50px] h-[50px] cursor-pointer footerIcons">
              <PiInstagramLogoLight className="text-white w-[14px] h-[14px] icon" />
            </span>
            <span className="border border-white rounded-[50px] flex justify-center items-center w-[50px] h-[50px] cursor-pointer footerIcons">
              <PiYoutubeLogoThin className="text-white w-[14px] h-[14px] icon" />
            </span>
          </div>
          <div className="text-center text-sm leading-[25px] text-white font-light mt-5">
            © REP - All rights reserved
          </div>
        </div>
      </section>
    </>
  );
};

export default Footer;
