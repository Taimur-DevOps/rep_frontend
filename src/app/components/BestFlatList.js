"use client"
import React, { useState } from "react";
// import Slider from "react-slick";
import Title from "./Title";
import BestFlatItem from "./BestFlatItem";

const BestFlatList = () => {
    const [title] = useState({
        text: "Featured Homes",
        description: "Lorem ipsum dolor sit ame",
    });

    const settings = {
        infinite: true,
        speed: 1500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoPlay: true,
        arrows: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: false,
                },
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: false,
                },
            },
        ],
    };

    return (
        <section className="section-best-estate">
            <div className="mx-auto px-4">
                <div className="">
                    <div className="w-full">
                         <Title title={title.text} description={title.description} />
                        {/* <Slider {...settings}> */}
                            <BestFlatItem flatState="For Rent" />
                      
                        {/* </Slider>  */}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BestFlatList;