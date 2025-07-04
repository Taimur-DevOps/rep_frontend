import React from "react";
import RootLayout from "../layout";
import Button from "../components/Button";

const Contact = () => {
  return (
    <>
      <section className="content bg-bgGray">
        <div className="relative">
          <div className="contactBanner">
            <div className="h-[200px] bg-lightBlack opacity-[0.5] w-full"></div>
          </div>
          <div className="lg:container mx-0 lg:px-0 px-5">
            <h1 className="absolute top-[65px] text-4xl leading-[1.5em] font-bold font-nokara text-white">
              Contact Us
            </h1>
          </div>
        </div>

        <main className=" lg:container mx-auto py-20 lg:px-0 px-5">
          <div className=" flex flex-col bg-white rounded-[4px] text-lightBlack lg:px-8 px-5 py-12 lg:max-w-[750px] lg:mx-auto">
            <h2 className="text-4xl font-bold leading-tight font-nokara mb-8">
              Lets talk about everything!
            </h2>

            <form className="w-full">
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
        </main>
      </section>
    </>
  );
};

export default Contact;
