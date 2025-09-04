"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="flex justify-between items-center lg:py-[30px] py-5 lg:px-10 px-5">
      <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
        <span className="self-center text-3xl font-bold whitespace-nowrap ">
          REP
        </span>
      </a>
      <div className="block lg:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center px-3 py-2 rounded text-black-500 hover:text-black-400"
        >
          <svg
            className={`fill-current h-3 w-3 ${isOpen ? "hidden" : "block"}`}
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
          <svg
            className={`fill-current h-3 w-3 ${isOpen ? "block" : "hidden"}`}
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
          </svg>
        </button>
      </div>
      <div
        className={`w-full block  lg:flex lg:items-center lg:w-auto ${isOpen ? "block mobHeader" : "hidden"
          }`}
      >
        <div className="flex gap-7 lg:flex-row flex-col">
          <Link href="/">
            <span className="text-md  font-bold font-nokara hover:text-lightPeach">
              Home
            </span>
          </Link>
          <Link href="/properties">
            <span className="text-md  font-bold font-nokara hover:text-lightPeach">
              Properties
            </span>
          </Link>
          <Link href="/about">
            <span className="text-md  font-bold font-nokara hover:text-lightPeach">
              About
            </span>
          </Link>
          <Link href="/contact">
            <span className="text-md  font-bold font-nokara hover:text-lightPeach">
              Contact
            </span>
          </Link>
        </div>

      </div>
    </nav>
  );
}
export default App;
