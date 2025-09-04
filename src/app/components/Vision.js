import React from "react";
import srvcIcon1 from "@/assets/serviceIcon1.webp";
import srvcIcon2 from "@/assets/serviceIcon2.webp";
import srvcIcon3 from "@/assets/serviceIcon3.webp";
import srvcIcon4 from "@/assets/serviceIcon4.webp";
import srvcIcon5 from "@/assets/serviceIcon5.webp";
import srvcIcon6 from "@/assets/serviceIcon6.png";
import Button from "./Button";
import Image from "next/image";



const Vision = () => {
    return (
        <>
            <section className="bg-bgGray">
                <div className="lg:container mx-auto py-24 lg:px-0 px-4">
                    <div className="mb-20">
                        <h2 className="text-4xl font-bold font-nokara mb-6">
                        Vision Statement
                        </h2>
                        <p className="text-4xl font-thin ">
                        To bring honesty, transparency, and innovation to real estate by providing genuine listings, personalized service, and cutting-edge technology for every homebuyer in DHA Lahore.
                        </p>
                    </div>

                </div>
            </section>
        </>
    );
};

export default Vision;
