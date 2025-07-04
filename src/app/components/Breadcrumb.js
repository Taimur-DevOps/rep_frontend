import React from "react";
import { BsHouse } from "react-icons/bs";

const Breadcrumb = () => {
  return (
    <nav className="flex">
      <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
        <li className="inline-flex items-center">
          <a
            href="#"
            className="inline-flex gap-2 items-center text-sm font-light hover:text-[#6c757d] text-lightPeach"
          >
            <BsHouse className="w-5 h-5" />
            Home
          </a>
        </li>
        <li>
          <div className="flex items-center">
            <svg
              className="rtl:rotate-180 w-3 h-3 text-[#6c757d] mx-1"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              // viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
            <a
              href="#"
              className="ms-1 text-sm font-light hover:text-[#6c757d] text-lightPeach md:ms-2"
            >
              Properties
            </a>
          </div>
        </li>
      </ol>
    </nav>
  );
};

export default Breadcrumb;
