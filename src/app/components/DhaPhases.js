
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { PiPlayLight } from "react-icons/pi";
import { propertyService } from "../Services/api";
import phase1 from "@/assets/phase1.jpg";
import phase2 from "@/assets/phase2.jpg";
import phase3 from "@/assets/phase3.jpg";
import phase4 from "@/assets/phase4.jpg";
import phase5 from "@/assets/phase1.jpg";
import phase6 from "@/assets/phase2.jpg";
import phase7 from "@/assets/phase3.jpg";
import phase8 from "@/assets/phase4.jpg";
import phase9 from "@/assets/phase4.jpg";
import Button from "./Button";


// map phases to images
const phaseImageMap = {
  phase1: phase1,
  phase2: phase2,
  phase3: phase3,
  phase4: phase4,
  phase5: phase5,
  phase6: phase6,
  phase7: phase7,
  phase8: phase8,
  phase9: phase9,
};

const DhaPhases = () => {
  const [phases, setPhases] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchPhases = async () => {
      try {
        const data = await propertyService.getPropertiesByPhase();
        const sortedData = data.sort((a, b) => {
          const numA = parseInt(a.phase.replace("phase", ""), 10);
          const numB = parseInt(b.phase.replace("phase", ""), 10);
          return numA - numB;
        });
  
        setPhases(sortedData);
      } catch (err) {
        console.error("Error fetching phases:", err);
      }
    };
    fetchPhases();
  }, []);  

  // display phases name 
  const formatPhaseLabel = (phaseKey) => {
    if (!phaseKey) return "Unknown";
    return phaseKey.replace("phase", "Phase ");
  };

  const handlePhaseClick = (phase) => {
    router.push(`/properties?phase=${phase}`);
  };  

  return (
    <div className="py-24 lg:px-40 px-7">
      <div className="flex gap-7 lg:flex-row flex-col">
        {/* left block */}
        <div className="flex flex-col gap-5 lg:w-3/12">
          <span className="ml-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              overflow="visible"
              height="15"
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
          <h2 className="text-4xl font-bold font-nokara leading-[1.5em]">
            Discover DHA Phases
          </h2>
          <p className="text-base font-thin leading-7 lg:mb-2">
            Explore DHA phases and discover available properties across different communities.
          </p>
          <div>
            <Button text="Discover" variant="primary" />
          </div>
        </div>

        {/* right grid */}
        <div className="lg:w-9/12">
          <div className="flex lg:flex-row md:flex-row flex-col gap-10">
            {/* first column */}
            <div className="flex flex-col gap-10 lg:w-1/3">
              {phases.slice(0, 2).map((item, index) => (
                <div
                  key={index}
                  onClick={() => handlePhaseClick(item.phase)}
                  className={`relative rounded-[4px] cursor-pointer ${
                    index === 0 ? "h-[180px]" : "h-[240px]"
                  }`}
                >
                 <Image
                    alt={item?.phase}
                    src={phaseImageMap[item?.phase] || phase1}
                    className="rounded-[4px] w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black opacity-[0.3] rounded-[4px]"></div>
                  <div className="absolute inset-0 text-white flex justify-between flex-col p-8">
                    <div className="flex flex-col">
                      <span className="text-xs">{item?.count} Properties</span>
                      <span className="text-xl">{formatPhaseLabel(item?.phase)}</span>
                    </div>
                    <span className="text-xs uppercase flex justify-between items-center">
                      More Details <PiPlayLight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* second column */}
            <div className="flex flex-col gap-10 lg:w-1/3">
              {phases.slice(2, 4).map((item, index) => (
                <div
                  key={index}
                  onClick={() => handlePhaseClick(item?.phase)}
                  className={`relative rounded-[4px] cursor-pointer ${
                    index === 0 ? "h-[240px]" : "h-[180px]"
                  }`}
                >
                  <Image
                      alt={item?.phase}
                      src={phaseImageMap[item?.phase] || phase1}
                      className="rounded-[4px] w-full h-full object-cover"
                    />
                  <div className="absolute inset-0 bg-black opacity-[0.3] rounded-[4px]"></div>
                  <div className="absolute inset-0 text-white flex justify-between flex-col p-8">
                    <div className="flex flex-col">
                      <span className="text-xs">{item?.count} Properties</span>
                      <span className="text-xl">{formatPhaseLabel(item?.phase)}</span>
                    </div>
                    <span className="text-xs uppercase flex justify-between items-center">
                      More Details <PiPlayLight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* third column */}
            <div className="flex flex-col gap-10 lg:w-1/3">
              {phases.slice(4, 6).map((item, index) => (
                <div
                  key={index}
                  onClick={() => handlePhaseClick(item.phase)}
                  className={`relative rounded-[4px] cursor-pointer ${
                    index === 0 ? "h-[180px]" : "h-[240px]"
                  }`}
                >
                  <Image
                    alt={item?.phase}
                    src={phaseImageMap[item?.phase] || phase1}
                    className="rounded-[4px] w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black opacity-[0.3] rounded-[4px]"></div>
                  <div className="absolute inset-0 text-white flex justify-between flex-col p-8">
                    <div className="flex flex-col">
                      <span className="text-xs">{item?.count} Properties</span>
                      <span className="text-xl">{formatPhaseLabel(item?.phase)}</span>
                    </div>
                    <span className="text-xs uppercase flex justify-between items-center">
                      More Details <PiPlayLight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DhaPhases;
