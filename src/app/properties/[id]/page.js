'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { CiLocationOn } from 'react-icons/ci';
import { PiCheckCircleLight, PiNotepadLight, PiPoliceCarLight, PiShowerLight } from 'react-icons/pi';
import Gallery from '@/app/components/Gallery';
import Breadcrumb from '@/app/components/Breadcrumb';
import api from '@/app/Services/api';
import { LuBedDouble } from 'react-icons/lu';
import { TfiRulerAlt2 } from 'react-icons/tfi';
import { SlCalender } from 'react-icons/sl';
import { GoTasklist } from "react-icons/go";
import { SlNote } from "react-icons/sl";
import { RxVideo } from "react-icons/rx";


const DetailPage = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('folder');

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await api.get(`/properties/${id}`);

        const fetchedProperty = Array.isArray(res.data?.data)
          ? res.data.data[0]
          : res.data;

        setProperty(fetchedProperty);
      } catch (err) {
        console.error('Error fetching property:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProperty();
  }, [id]);

  // Don't render anything until property is loaded
  if (loading) return <p className='px-24'>Loading...</p>;
  if (!property) return <p>Property not found.</p>;

  // Now it's safe to destructure
  const {
    title,
    price,
    location,
    description,
    bedrooms,
    bathrooms,
    areaSize,
    garage,
    yearBuilt,
    propertyType,
    propertyStatus,
    images,
  } = property;

  return (
    <>
      <Gallery  images={images.map((img) => ({ img }))} />
      <section className="bg-bgGray">
        <div className="lg:container mx-auto py-14">
          <div className="lg:px-0 px-5">
            <Breadcrumb />
            <div className="flex lg:justify-between lg:items-center lg:flex-row flex-col ">
              <h3 className="text-[30px] font-bold font-nokara my-3">{title}</h3>
              <span className="text-[30px] font-bold">${price}</span>
            </div>
            <div className="flex items-center gap-2 lg:mt-0 mt-3">
              <CiLocationOn />
              <span className="text-sm font-normal text-lightGray ">{location}</span>
            </div>
          </div>

          <section className="pt-10">
            <div className="flex bg-white">
              {/* Left tab nav */}
              <div className="tab flex flex-col items-center lg:w-[10%] md:w-[10%] w-[20%]">
                {['folder', 'features', 'details', 'video'].map((tab) => (
                  <div
                    key={tab}
                    className={`tablinks block w-full p-4 text-lg transition duration-300 ${
                      activeTab === tab ? 'bg-gray-300' : 'hover:bg-gray-200'
                    }`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {{
                      folder: <SlNote className="w-6 h-6 mx-auto" />,
                      details: <PiNotepadLight className="w-8 h-8 mx-auto" />,
                      features: <GoTasklist className="w-8 h-8 mx-auto" />,
                      video: <RxVideo className="w-7 h-7 mx-auto" />,
                    }[tab]}
                  </div>
                ))}
              </div>

              {/* Right tab content */}
              <div className="tabcontent lg:w-[95%] md:w-[95%] w-[80%] py-2 lg:px-7 px-5">
                {activeTab === 'folder' && (
                  <div id="folder">
                    <h3 className="text-xl font-bold my-3">Description</h3>
                    <hr className="pb-5" />
                    <p className="text-base font-normal text-lightBlack">{description}</p>
                  </div>
                )}
                {activeTab === 'features' && (
  <div id="features">
    <h3 className="text-xl font-bold my-3">Features</h3>
    <hr className="pb-5" />
    {property.features && property.features.length > 0 ? (
      <ul className="grid lg:grid-cols-3 md:grid-cols-3 gap-5">
        {property.features.map((feature, index) => (
          
          <li key={index} className="flex items-center gap-2">
            <PiCheckCircleLight className="w-5 h-5" />
            {feature}
          </li>
        ))}
      </ul>
    ) : (
      <p className="text-lightGray">No features listed for this property.</p>
    )}
  </div>
)}
                {activeTab === 'details' && (
                  <div id="details">
                    <h3 className="text-xl font-bold my-3">Details</h3>
                    <hr className="pb-5" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <p><strong>Bedrooms:</strong> {bedrooms}</p>
                      <p><strong>Bathrooms:</strong> {bathrooms}</p>
                      <p><strong>Area Size:</strong> {areaSize}</p>
                      <p><strong>Garage:</strong> {garage}</p>
                      <p><strong>Year Built:</strong> {yearBuilt}</p>
                      <p><strong>Type:</strong> {propertyType}</p>
                      <p><strong>Status:</strong> {propertyStatus || 'N/A'}</p>
                    </div>
                  </div>
                )}
                {activeTab === 'video' && <p>Video content...</p>}
              </div>
            </div>
          </section>

          {/*  */}
            {/* overview */}
            <section className="bg-white mt-8 pb-8 px-8">
  <div className="flex justify-between items-center">
    <h3 className="text-xl font-bold lg:mt-5 lg:mb-8 my-5">Overview</h3>
    <p className="text-base font-semibold text-lightGray flex items-center gap-1">
      Property ID:<span className="font-normal"> {property.propertyId || 'N/A'}</span>
    </p>
  </div>
  <hr className="pb-5" />
  <div className="grid grid-cols-2 lg:grid-cols-6 md:grid-cols-3 items-center lg:gap-[3.5rem] gap-5">
    <div className="flex flex-col text-base">
      <span className="font-semibold capitalize">{property.propertyType || 'N/A'}</span>
      <span className="font-normal text-lightGray">Property Type</span>
    </div>
    <div className="flex flex-col text-base">
      <span className="font-semibold flex items-center gap-2">
        <LuBedDouble className="w-[18px] h-[18px]" /> {property.bedrooms}
      </span>
      <span className="font-normal text-lightGray">Bedrooms</span>
    </div>
    <div className="flex flex-col text-base">
      <span className="font-semibold flex items-center gap-2">
        <PiShowerLight className="w-[18px] h-[18px]" /> {property.bathrooms}
      </span>
      <span className="font-normal text-lightGray">Bathrooms</span>
    </div>
    <div className="flex flex-col text-base">
      <span className="font-semibold flex items-center gap-2">
        <PiPoliceCarLight className="w-[18px] h-[18px]" /> {property.garage}
      </span>
      <span className="font-normal text-lightGray">Garage</span>
    </div>
    <div className="flex flex-col text-base">
      <span className="font-semibold flex items-center gap-2">
        <TfiRulerAlt2 className="w-[18px] h-[18px]" /> {property.areaSize.replace("marla", "")}
      </span>
      <span className="font-normal text-lightGray">Marla</span>
    </div>
    <div className="flex flex-col text-base">
      <span className="font-semibold flex items-center gap-2">
        <SlCalender className="w-[18px] h-[18px]" /> {property.yearBuilt}
      </span>
      <span className="font-normal text-lightGray">Year Built</span>
    </div>
  </div>
</section>

        </div>
      </section>
    </>
  );
};

export default DetailPage;
