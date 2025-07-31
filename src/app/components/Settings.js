import React from "react";
import HeroFormAdmin from "./HeroFormAdmin";
import HeroListing from "./HeroListing";

const Settings = () => {

  return (
    <>
      <h1 className="text-2xl font-semibold font-nokara mb-2">
        Hero section 
      </h1>
      <main className=" flex flex-row gap-7 mb-7">
        {/* <div className="w-2/5">
          <HeroFormAdmin />
        </div> */}
        <div className="w-full">
          <HeroListing />
        </div>
      </main>
    </>
  );
};

export default Settings;
