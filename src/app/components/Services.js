import React from "react";
import srvcIcon1 from "@/assets/serviceIcon1.webp";
import srvcIcon2 from "@/assets/serviceIcon2.webp";
import srvcIcon3 from "@/assets/serviceIcon3.webp";
import srvcIcon4 from "@/assets/serviceIcon4.webp";
import srvcIcon5 from "@/assets/serviceIcon5.webp";
import srvcIcon6 from "@/assets/serviceIcon6.png";
import Button from "./Button";
import Image from "next/image";

const services = [
  {
    icon: srvcIcon1,
    title: "Enable Radius Search Functionality",
    desc: "Search properties by their proximity to you in kilometers or miles on all search pages",
    btn: "Read more",
  },
  {
    icon: srvcIcon2,
    title: "Complete Search Filters",
    desc: "Allow your clients to fine-tune their search results and focus on the details that matter the most",
    btn: "Read more",
  },
  {
    icon: srvcIcon3,
    title: "Advanced Search Options Panel",
    desc: "Customize your search layout easily with a complete and advanced search option panel",
    btn: "Read more",
  },
  {
    icon: srvcIcon4,
    title: "Property Settings",
    desc: "Create property listings with all the features you’d expect: area size, price range, amenities and more",
    btn: "Read more",
  },
  {
    icon: srvcIcon5,
    title: "Compare Properties",
    desc: "Let your users compare different properties based on their features and parameters",
    btn: "Read more",
  },
  {
    icon: srvcIcon6,
    title: "Agent Contact Forms",
    desc: "Help your agents make sales by placing an easy-to-use contact form in the header of each listing",
    btn: "Read more",
  },
];

const Services = () => {
  return (
    <>
      <section className="bg-bgGray">
        <div className="lg:container mx-auto py-24 lg:px-0 px-3">
          <div className="mb-20">
            <h2 className="text-4xl font-bold font-nokara mb-6">
              Services We Provide
            </h2>
            <p className="text-base font-thin leading-7">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Vestibulum at fermentum felis. Phasellus eget vehicula sem. Duis
              malesuada sapien nec quam gravida accumsan. Nam vel quam in turpis
              ultrices consectetur ut nec orci. Integer nec laoreet diam, et
              rhoncus metus. Cras nunc ipsum, aliquam sit amet orci a, pharetra
              ultricies sem
            </p>
          </div>
          <div className="grid lg:grid-cols-3 grid-cols-1 md:grid-cols-2 gap-9">
            {services.map((item, index) => {
              const { icon, title, desc, btn } = item;
              return (
                <div key={index} className="flex gap-4 items-start">
                  <div className="pt-1">
                    <Image
                      alt="icons"
                      src={icon}
                      className="w-[90px] h-[40px]"
                    />
                  </div>
                  <div className="content">
                    <h3 className="text-xl font-semibold mb-3">{title}</h3>
                    <p className="text-lightGray text-base font-normal">
                      {desc}
                    </p>
                    <div className="mt-2">
                      <Button
                        variant="primary"
                        text={btn}
                        className="bg-transparent text-lightPeach !px-0"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
