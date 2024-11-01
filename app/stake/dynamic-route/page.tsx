import React from "react";
import { ArrowLeft, Copy, ExternalLink } from "lucide-react";
import Link from "next/link";
import SeiLayout from "@/app/layouts/seiLayout";

const DynamicItem = () => {
  return (
    <SeiLayout>
      <div className="  font-sans">
        <div className=" border-b pb-4 border-gray-200">
          <div className="flex px-8 items-center gap-1">
            <img
              src="/sei-images/download (6).svg"
              alt="Sei Logo"
              className="w-6 h-6 lg:block hidden "
            />
            <h1 className="text-2xl font-semibold lg:pl-0 pl-4  ">Stake</h1>
          </div>
        </div>
        <div className="flex items-center px-8">
          <Link href="/stake">
            <button className="flex border border-gray-200 rounded-md items-center  text-gray-600 py-1 px-3 my-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </button>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 justify-end items-center mb-6 px-8">
          <div>
            <h1 className="text-4xl font-bold mb-4">Flipside</h1>
            <p className="text-gray-600 mb-4">
              Explore the best data and insights in Web3.
            </p>
            <div className="flex items-center text-gray-500 text-sm mb-4">
              <span className="mr-2">seivaloper...z4t10s6vxh</span>
              <button className="text-gray-400 hover:text-gray-600">
                <Copy className="w-4 h-4" />
              </button>
            </div>
            <button className="border border-gray-300 rounded px-4 py-2 flex items-center text-sm hover:bg-gray-50">
              Website
              <ExternalLink className="w-4 h-4 ml-2" />
            </button>
          </div>
          <div className="text-left">
            <p className="text-sm text-gray-600 mb-2">
              Connect wallet to Stake
            </p>
            <button className="bg-[#8D1C17] text-white px-4 py-2 rounded hover:bg-red-800">
              Connect Wallet
            </button>
          </div>
        </div>

        <div className=" px-8">
          <div className="border border-gray-200 rounded-tl-lg rounded-tr-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Commission</h2>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Commission</p>
                <p className="text-2xl font-normal">5.00%</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Max Rate</p>
                <p className="text-2xl font-normal">20.00%</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Max Change Rate</p>
                <p className="text-2xl font-normal">5.00%</p>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-4">Last Updated</p>
            <p className="text-xl mt-4 font-medium">
              Mon, 01 Jul 2024 21:34:25 GMT
            </p>
          </div>

          <div className="border border-gray-200 rounded-bl-lg rounded-br-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Status</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Delegator Shares</p>
                <p className="text-2xl font-normal">288,577,455,078,181</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Status</p>
                <p className="text-2xl font-normal">Bonded</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SeiLayout>
  );
};

export default DynamicItem;
