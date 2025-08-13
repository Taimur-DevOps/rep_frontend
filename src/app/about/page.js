'use client'

import { useEffect, useState } from "react";
import Image from "next/image";
import { LuFacebook } from "react-icons/lu";
import { PiTiktokLogoThin, PiInstagramLogoLight, PiYoutubeLogoThin } from "react-icons/pi";
import { userService } from "../Services/api";
import BASE_API_URL from "@/config";

const About = () => {
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const data = await userService.getAllUsers();
        setTeamMembers(data);
      } catch (error) {
        console.error("Error fetching team members:", error);
      }
    };

    fetchTeamMembers();
  }, []);

  return (
    <section>
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
        <h3 className="text-4xl font-bold font-nokara">Welcome to Real Estate Partner</h3>
        <div className="flex lg:flex-row flex-col items-center gap-6 text-base font-nokara text-[#54595f] font-normal mt-8">
          <p className="flex flex-col gap-3">
            <span>
              We’re not just another real estate company. We’re your dedicated partner in finding the right home in DHA Lahore—with honesty at the heart of everything we do.
              While most realtors flood online platforms with fake listings just to chase leads, we’re building something better. At Real Estate Partner, Every property you see is 100% real—authentic photos, accurate prices, and verified details. And   <b className="font-bold text-lg text-black"> Every deal we make is directly with the real owner—no middlemen, no false claims. </b>
                Our process is simple but smart. We invite you to our office, where you can explore our full printed catalog, browse live listings on our custom-built website, and let our expert team help you shortlist the best homes for your needs. Once we understand your preferences, we personally guide you through hand-picked property visits—no pressure, no chaos.
                We don’t just deal in property—we build homes, relationships, and trust.
                Real Estate Partner — Real People. Real Listings. Real Homes.
            </span>
          </p>

        </div>
      </main>

      <main className="bg-bgGray">
        <div className="lg:container mx-auto py-20 lg:px-0 px-5">
          <div className="mb-16">
            <h2 className="text-4xl font-bold font-nokara mb-4">Meet Our Team</h2>
            <p className="text-base font-thin leading-7">
              Our dedicated and talented team.
            </p>
          </div>

          <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-7">
            {teamMembers.map((member, index) => (
              <div key={index} className="teamMember1 relative">
                <div>
                    <Image
                      alt={member.name}
                      src={member.images[0]?.url}
                      width={300}
                      height={300}
                      className="object-cover w-full h-[365px]"
                    />
                  <div className="card">
                    <span className="font-semibold">{member.name}</span>
                    <span>{member.role}</span>
                  </div>
                  <div className="shade"></div>
                </div>

                <div className="flex justify-between flex-col lg:gap-0 gap-4 text-base font-nokara font-normal absolute top-0 memberDetail">
                  <div className="flex flex-col gap-3">
                    <span className="font-semibold">{member.name}</span>
                    <span className="-mt-3">{member.role}</span>
                    <span>{member.bio}</span>
                  </div>
                  <div className="flex flex-row gap-1 justify-center">
                    {member.socials?.facebook && (
                      <a href={member.socials.facebook} target="_blank">
                        <LuFacebook className="text-[#506dab] w-7 h-7 icon" />
                      </a>
                    )}
                    {member.socials?.tiktok && (
                      <a href={member.socials.tiktok} target="_blank">
                        <PiTiktokLogoThin className="text-black w-7 h-7 icon" />
                      </a>
                    )}
                    {member.socials?.instagram && (
                      <a href={member.socials.instagram} target="_blank">
                        <PiInstagramLogoLight className="text-[#d62976] w-7 h-7 icon" />
                      </a>
                    )}
                    {member.socials?.youtube && (
                      <a href={member.socials.youtube} target="_blank">
                        <PiYoutubeLogoThin className="text-[#cd201f] w-7 h-7 icon" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </section>
  );
};

export default About;
