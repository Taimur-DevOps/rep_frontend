import React from "react";
import Image from "next/image";
import member1 from "@/assets/member1.jpg";
import member2 from "@/assets/member2.jpg";
import member3 from "@/assets/member3.jpg";
import member4 from "@/assets/member4.jpg";
import { LuFacebook } from "react-icons/lu";
import { PiInstagramLogoLight } from "react-icons/pi";
import { PiTiktokLogoThin } from "react-icons/pi";
import { PiYoutubeLogoThin } from "react-icons/pi";

const About = () => {
  return (
    <>
      <section className="">
        <div className="relative">
          <div className="contactBanner">
            <div className="h-[200px] bg-lightBlack opacity-[0.5] w-full"></div>
          </div>
          <div className="lg:container mx-0 lg:px-0 px-5">
            <h1 className="absolute top-[65px] text-4xl leading-[1.5em] font-bold font-nokara text-white">
              About Us
            </h1>
          </div>
        </div>
        <main className="lg:container mx-auto py-24 lg:px-0 px-5">
          <h3 className="text-4xl font-bold font-nokara">
            Your Vision Unrestricted
          </h3>
          <div className="flex lg:flex-row flex-col items-center gap-6 text-base font-nokara text-[#54595f] font-normal mt-8">
            <p className="flex flex-col gap-3">
              <span>
                {" "}
                REP is a premium WordPress theme for real estate agents and
                agencies where modern aesthetics are combined with a tasteful
                simplicity and where the ease of use is achieved without
                compromise in your ability to customize the design.
              </span>
              <span>
                {" "}
                Whether you are a real estate agent looking to build a website
                for your company or a web developer seeking a perfect WordPress
                theme for your next project, you are certain to appreciate the
                numerous features and benefits that our theme provides.
              </span>
            </p>
            <p className="-mt-5 flex flex-col gap-3">
              <span>
                {" "}
                REP is also a WordPress-based property management system which
                allows you to own and maintain a real estate marketplace,
                coordinate your agents, accept submissions and offer membership
                packages.
              </span>
              <span>
                {" "}
                Unlike many other real estate themes which confine you to a
                handful of predefined layouts, REP offers a limitless array of
                possibilities to structure and style your content. All of the
                customization options are logically organized in your WordPress
                admin panel and thorough customization in the provided
                documentation.
              </span>
            </p>
          </div>
        </main>
        <main className="bg-bgGray">
          <div className="lg:container mx-auto py-20 lg:px-0 px-5">
            <div className="mb-16">
              <h2 className="text-4xl font-bold font-nokara mb-4">
                Meet Our Team
              </h2>
              <p className="text-base font-thin leading-7">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>
            <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-7 ">
              <div className="teamMember1 relative">
                <div>
                  <Image alt="member1" src={member1} />
                  <div className="card">
                    <span className="font-semibold"> Kathleen Grant </span>
                    <span>Funder </span>
                  </div>
                  <div className="shade"></div>
                </div>
                <div className="flex justify-between flex-col lg:gap-0 gap-4 text-base font-nokara font-normal absolute top-0 memberDetail">
                  <div className="flex flex-col gap-3">
                    {" "}
                    <span className="font-semibold"> Kathleen Grant </span>
                    <span className="-mt-3">Funder </span>
                    <span>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      In malesuada, odio sit amet pharetra vehicula, sapien leo
                      egestas magna, vitae auctor diam magna cursus arcu.
                    </span>
                  </div>
                  <div className="flex flex-row gap-1 justify-center">
                    <span className="">
                      <LuFacebook className="text-[#506dab] w-7 h-7 icon" />
                    </span>
                    <span className="">
                      <PiTiktokLogoThin className="text-black w-7 h-7 icon" />
                    </span>
                    <span className="">
                      <PiInstagramLogoLight className="text-[#d62976] w-7 h-7 icon" />
                    </span>
                    <span className="">
                      <PiYoutubeLogoThin className="text-[#cd201f] w-7 h-7 icon" />
                    </span>
                  </div>
                </div>
              </div>
              <div className="teamMember1 relative">
                <div>
                  <Image alt="member1" src={member2} />
                  <div className="card">
                    <span className="font-semibold"> Kathleen Grant </span>
                    <span>Funder </span>
                  </div>
                  <div className="shade"></div>
                </div>
                <div className="flex flex-col justify-between lg:gap-0 gap-4 text-base font-nokara font-normal absolute top-0 memberDetail">
                  <div className="flex flex-col gap-3">
                    <span className="font-semibold"> Kathleen Grant </span>
                    <span className="-mt-3">Funder </span>
                    <span>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      In malesuada, odio sit amet pharetra vehicula, sapien leo
                      egestas magna, vitae auctor diam magna cursus arcu.
                    </span>
                  </div>
                  <div className="flex flex-row gap-1 justify-center">
                    <span className="">
                      <LuFacebook className="text-[#506dab] w-7 h-7 icon" />
                    </span>
                    <span className="">
                      <PiTiktokLogoThin className="text-black w-7 h-7 icon" />
                    </span>
                    <span className="">
                      <PiInstagramLogoLight className="text-[#d62976] w-7 h-7 icon" />
                    </span>
                    <span className="">
                      <PiYoutubeLogoThin className="text-[#cd201f] w-7 h-7 icon" />
                    </span>
                  </div>
                </div>
              </div>
              <div className="teamMember1 relative">
                <div>
                  <Image alt="member1" src={member3} />
                  <div className="card">
                    <span className="font-semibold"> Kathleen Grant </span>
                    <span>Funder </span>
                  </div>
                  <div className="shade"></div>
                </div>
                <div className="flex flex-col justify-between lg:gap-0 gap-4 text-base font-nokara font-normal absolute top-0 memberDetail">
                  <div className="flex flex-col gap-3">
                    <span className="font-semibold"> Kathleen Grant </span>
                    <span className="-mt-3">Funder </span>
                    <span>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      In malesuada, odio sit amet pharetra vehicula, sapien leo
                      egestas magna, vitae auctor diam magna cursus arcu.
                    </span>
                  </div>
                  <div className="flex flex-row gap-1 justify-center">
                    <span className="">
                      <LuFacebook className="text-[#506dab] w-7 h-7 icon" />
                    </span>
                    <span className="">
                      <PiTiktokLogoThin className="text-black w-7 h-7 icon" />
                    </span>
                    <span className="">
                      <PiInstagramLogoLight className="text-[#d62976] w-7 h-7 icon" />
                    </span>
                    <span className="">
                      <PiYoutubeLogoThin className="text-[#cd201f] w-7 h-7 icon" />
                    </span>
                  </div>
                </div>
              </div>
              <div className="teamMember1 relative">
                <div>
                  <Image alt="member1" src={member4} />
                  <div className="card">
                    <span className="font-semibold"> Kathleen Grant </span>
                    <span>Funder </span>
                  </div>
                  <div className="shade"></div>
                </div>
                <div className="flex flex-col justify-between lg:gap-0 gap-4 text-base font-nokara font-normal absolute top-0 memberDetail">
                  <div className="flex flex-col gap-3 ">
                    <span className="font-semibold"> Kathleen Grant </span>
                    <span className="-mt-3">Funder </span>
                    <span>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      In malesuada, odio sit amet pharetra vehicula, sapien leo
                      egestas magna, vitae auctor diam magna cursus arcu.
                    </span>
                  </div>
                  <div className="flex flex-row gap-1 justify-center">
                    <span className="">
                      <LuFacebook className="text-[#506dab] w-7 h-7 icon" />
                    </span>
                    <span className="">
                      <PiTiktokLogoThin className="text-black w-7 h-7 icon" />
                    </span>
                    <span className="">
                      <PiInstagramLogoLight className="text-[#d62976] w-7 h-7 icon" />
                    </span>
                    <span className="">
                      <PiYoutubeLogoThin className="text-[#cd201f] w-7 h-7 icon" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};

export default About;
