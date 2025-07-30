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
        <div className="w-3/5">
          <HeroListing />
        </div>
      </main>
      {/* <h1 className="text-2xl font-semibold font-nokara mb-2">Team details</h1>
      <main className="flex flex-row gap-7 mb-7">
        <div className="w-2/6 shadow-md h-full">
          <TeamForm />
        </div>
        <div className="w-2/3 shadow-md h-full">
          <TeamList />
        </div>
      </main> */}
    </>
  );
};

export default Settings;
