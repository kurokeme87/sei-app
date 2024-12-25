"use client";

import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { GoArrowRight } from "react-icons/go";
import Link from "next/link";

const TransactionNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full">
      <div className="flex justify-start items-start gap-2 sm:gap-4 flex-nowrap z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`${
            isOpen
              ? "z-[999] text-white fixed right-2 sm:left-2"
              : "text-black z-0"
          } `}
        >
          {isOpen ? (
            <IoClose color="white" size={23} />
          ) : (
            <svg
              fill="none"
              height="28"
              viewBox="0 0 28 28"
              width="28"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-rule="evenodd" fill="currentColor" fill-rule="evenodd">
                <path d="m1.59502 19.5-.59502-.625v-1.25l.59502-.625h6.84276l.59793.625h.30122l.5595-.625h6.59837l.5766.625v1.25l-.5766.625h-6.59837l-.5595-.625h-.30122l-.59793.625zm15.47638-1.875v1.25h.3347l.6217.625h7.3316l.6406-.625v-1.25l-.6406-.625h-7.3316l-.6217.625z"></path>
                <path d="m25.405 12.5.595-.625v-1.25l-.595-.625h-6.8428l-.5979.625h-.3012l-.5595-.625h-6.5984l-.57661.625v1.25l.57661.625h6.5984l.5595-.625h.3012l.5979.625zm-15.47644-1.875v1.25h-.33469l-.62167.625h-7.33156l-.640644-.625v-1.25l.640644-.625h7.33156l.62167.625z"></path>
              </g>
            </svg>
          )}
        </button>

        <div
          className={`${
            isOpen ? "z-[999] text-white fixed" : "text-black z-0"
          } font-faGrotesk font-medium text-sm sm:text-base md:text-xl flex justify-start items-start gap-1`}
        >
          <span>Symbiosis</span>{" "}
          <div
            className={`${
              isOpen ? "flex" : "hidden"
            } flex-col justify-start items-start text-sm sm:text-base`}
          >
            <span className="text-white px-2">/ Explorer</span>
            <button className="text-white p-2 hover:bg-[#121212] rounded-lg">
              / App
            </button>
            <button className="text-white p-2 hover:bg-[#121212] rounded-lg">
              / Rewards
            </button>
            <button className="text-[#0f0] p-2 hover:bg-[#121212] rounded-lg flex justify-start items-center gap-2 flex-nowrap">
              <GoArrowRight /> Get SIS & LP Tokens
            </button>
            <button className="text-white p-2 hover:bg-[#121212] rounded-lg">
              / veSIS
            </button>
            <Link
              href="/symbiosis"
              className="text-white p-2 hover:bg-[#121212] rounded-lg"
            >
              / Bridge
            </Link>
            <button className="text-white p-2 hover:bg-[#121212] rounded-lg">
              / Developers
            </button>
            <button className="text-white p-2 hover:bg-[#121212] rounded-lg">
              / Audits
            </button>
            <button className="text-white p-2 hover:bg-[#121212] rounded-lg">
              / Index
            </button>
            <button className="text-white p-2 hover:bg-[#121212] rounded-lg">
              / Bridge V1
            </button>
            <button className="text-white p-2 hover:bg-[#121212] rounded-lg">
              / Explorer V1
            </button>
          </div>
        </div>
      </div>

      <div
        className={`${
          isOpen
            ? "fixed top-0 left-0 right-0 bg-black bottom-0 sm:bottom-[21%] visible"
            : "-z-[110] invisible"
        } ease transition-all duration-150 p-4`}
      >
        <div className="w-full h- relative ">
          <div className="w-full flex justify-start items-center gap-4 font-faGrotesk font-medium self-end absolute bottom-4 right-1">
            <button className="text-white">Docs</button>
            <button className="text-white">Privacy Poilcy</button>
            <button className="text-white">Terms of Use</button>
            <button className="text-white">Support</button>
            <button className="text-white">Help</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TransactionNav;
