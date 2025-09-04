
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

const PhaseTest = () => {
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
    <div className="lg:py-24 lg:px-10 px-5 py-16">
      <div className="text-center">
        <h2 className="text-4xl font-bold font-nokara leading-[1.5em]">
          Discover DHA Phases
        </h2>
        <p className="text-base font-thin leading-7 lg:mb-4 pt-3 pb-8">
          Explore DHA phases and discover available properties across different communities.
        </p>
      </div>
  
      {/* grid layout */}

      <div className="flex lg:flex-row md:flex-row flex-col gap-6">
          {Array.from({ length: Math.ceil(phases.length / 2) }).map((_, colIndex) => {
            const colItems = phases.slice(colIndex * 2, colIndex * 2 + 2);
            const isLastCol = colIndex === Math.ceil(phases.length / 2) - 1;

            return (
              <div key={colIndex} className="flex flex-col gap-6 lg:w-1/3">
                {colItems.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => handlePhaseClick(item?.phase)}
                    className={`relative rounded-[6px] cursor-pointer 
                      ${isLastCol && colItems.length === 1 ? "h-[500px]" : "h-[240px]"}`}
                  >
                    <Image
                      alt={item?.phase}
                      src={phaseImageMap[item?.phase] || phase1}
                      className="rounded-[6px] w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 rounded-[6px]"></div>
                    <div className="absolute inset-0 text-white flex justify-between flex-col p-6">
                      <div className="flex flex-col">
                        <span className="text-xs">{item?.count} Properties</span>
                        <span className="text-xl font-semibold">
                          {formatPhaseLabel(item?.phase)}
                        </span>
                      </div>
                      <span className="text-xs uppercase flex justify-between items-center">
                        More Details <PiPlayLight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
    </div>
  );
  


};

export default PhaseTest;