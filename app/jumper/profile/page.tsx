"use client";

import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Copy,
  Info,
} from "lucide-react";
import Image from "next/image";
import JumperLayout from "@/app/layouts/jumperLayout";

// Generate dummy ranking data
const generateRankings = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    rank: i + 1,
    address: `0x${Math.random().toString(16).slice(2, 6)}...${Math.random()
      .toString(16)
      .slice(2, 6)}`,
    xp: Math.floor(Math.random() * 2000) + 3000,
  }));
};

const rankings = generateRankings(100);

const availableMissions = [
  {
    id: 1,
    name: "Pear Protocol",
    description: "Explore Pear and get rewards",
    image: "/jumper/banner_1024x1024_003_0268335953.png",
    tag: "perp_oors",
    icons: [
      "/jumper/arbitrum_arb_logo_1_AA_8787597_seeklogo_com_e700a98b55.png",
    ],
  },
  {
    id: 2,
    name: "Anzen",
    description: "Earn Anzen points boost",
    image: "/jumper/Anzen_Jumper_136e3324ad.svg",
    icons: [
      "/jumper/base_a292cf730d.png",
      "/jumper/ethereum_eth_ccb9829095.svg",
      "/jumper/Blast_fd049ee2a0.jpeg",
      "/jumper/arbitrum_arb_logo_1_AA_8787597_seeklogo_com_e700a98b55.png",
    ],
  },
];

export default function Profile() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 25;
  const totalPages = Math.ceil(rankings.length / itemsPerPage);

  return (
    <JumperLayout>
      <div
        className="min-h-screen p-4 md:p-8"
        style={{
          background: "linear-gradient(135deg, #1A0F38 0%, #2C0F4A 100%)",
        }}
      >
        <div className="max-w-7xl mx-auto">
          {/* Profile and XP Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {/* Profile Card */}
            <div className="bg-[#412E65]/90 overflow-hidden relative rounded-[34px] p-6 flex flex-col items-center">
              <img
                src="/jumper/default_effigy.svg"
                alt="Profile"
                className=" absolute w-[400px] blur-[5px]  -top-[280px]"
              />
              <div className="relative  w-24 border-[6px] rounded-full border-white h-24 mb-4">
                <Image
                  src="/jumper/default_effigy.svg"
                  alt="Profile"
                  width={126}
                  height={126}
                  className="rounded-full"
                />
              </div>
              <div className="flex items-center gap-2 text-white">
                <span className="text-xl font-bold">0x00000...00000</span>

                <div className="p-2 rounded-full bg-[#2E204F]">
                  <Copy className="w-4 h-4 cursor-pointer" />
                </div>
              </div>
            </div>

            {/* XP Progress Card */}
            <div className="md:col-span-2 bg-[#412E65]/90 rounded-[34px] p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-white text-lg">XP</span>
                    <Info className="w-4 h-4 text-gray-400" />
                  </div>
                  <div className="text-white text-5xl font-bold">0</div>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-white text-lg">LEVEL</span>
                    <Info className="w-4 h-4 text-gray-400" />
                  </div>
                  <div className="text-white text-5xl font-bold">1</div>
                </div>
              </div>
              <div className="relative h-2 bg-[#4C3E6A] py-2 rounded-full mb-4">
                <div className="absolute left-0 top-0 h-full w-0 bg-[#8A2BE2] rounded-full"></div>
              </div>
              <div className="flex justify-between text-sm">
                <div className="flex bg-[#4F337E] rounded-full p-1 px-2 items-center gap-2">
                  <span className="text-white">LEVEL 0 • 0</span>
                  <span className="bg-[#BEA0EB] text-white text-xs p-1 rounded-full">
                    XP
                  </span>
                </div>
                <div className="flex bg-[#4F337E] rounded-full p-1 px-2 items-center gap-2">
                  <span className="text-white">LEVEL 0 • 0</span>
                  <span className="bg-[#BEA0EB] text-white text-xs p-1 rounded-full">
                    XP
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex md:flex-row flex-col  gap-6">
            {/* Rankings Table */}
            <div className="md:w-[48%] w-full">
              <div className="bg-[#412E65]/90 rounded-[34px] p-6">
                <div className="flex items-center gap-2 mb-4">
                  <h2 className="text-white text-lg">RANK</h2>
                  <Info className="w-4 h-4 text-gray-400" />
                </div>
                <div className="space-y-4">
                  {rankings
                    .slice(
                      (currentPage - 1) * itemsPerPage,
                      currentPage * itemsPerPage
                    )
                    .map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between text-white"
                      >
                        <div className="flex items-center gap-4">
                          <span className="text-gray-400 w-8">
                            {item.rank}.
                          </span>
                          <span className="font-mono">{item.address}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span>{item.xp}</span>
                          <span className="bg-[#BEA0EB] font-bold text-black text-sm p-1 rounded-full">
                            XP
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
                <div className="flex items-center justify-between mt-6 text-white">
                  <div className="flex gap-1">
                    <button
                      onClick={() => setCurrentPage(1)}
                      disabled={currentPage === 1}
                      className="p-2 disabled:opacity-50"
                    >
                      <ChevronsLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                      }
                      disabled={currentPage === 1}
                      className="p-2 disabled:opacity-50"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                  </div>
                  <span className="text-sm">
                    {currentPage}/{totalPages}
                  </span>
                  <div className="flex gap-1">
                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                      }
                      disabled={currentPage === totalPages}
                      className="p-2 disabled:opacity-50"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setCurrentPage(totalPages)}
                      disabled={currentPage === totalPages}
                      className="p-2 disabled:opacity-50"
                    >
                      <ChevronsRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Missions Section */}
            <div className="w-full  space-y-6">
              {/* Available Missions */}
              <div className="bg-[#412E65]/90 rounded-[34px] p-6">
                <h2 className="text-white text-xl font-bold mb-6">
                  Available Missions
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {availableMissions.map((mission) => (
                    <div
                      key={mission.id}
                      className="bg-[#433C5A] rounded-xl overflow-hidden"
                    >
                      <Image
                        src={mission.image}
                        alt={mission.name}
                        width={400}
                        height={600}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        {mission.tag && (
                          <span className="inline-block bg-[#8A2BE2]/20 text-[#8A2BE2] text-xs px-2 py-1 rounded-full mb-2">
                            {mission.tag}
                          </span>
                        )}
                        <h3 className="text-white text-lg mb-2">
                          {mission.name}
                        </h3>
                        <p className="text-gray-400 text-sm mb-4">
                          {mission.description}
                        </p>
                        <div className="flex justify-between items-center">
                          <div className="flex -space-x-2">
                            {mission.icons.map((icon, i) => (
                              <Image
                                key={i}
                                src={icon}
                                alt="Protocol"
                                width={34}
                                height={34}
                                className="rounded-full border-2 border-[#1A0F38]"
                              />
                            ))}
                          </div>
                        </div>
                        <button
                          className={`${
                            mission.name === "Anzen"
                              ? "bg-[#8A2BE2] text-white"
                              : "bg-[#50436C] text-black"
                          } w-full mt-2  px-6 py-2 rounded-full text-sm`}
                        >
                          {mission.name === "Anzen"
                            ? "Join"
                            : "Unlocked for perp_oors"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Completed Missions */}
              <div className="bg-[#412E65]/90 rounded-[34px] p-6">
                <h2 className="text-white font-bold text-xl mb-6">
                  Completed Missions
                </h2>
                <div className="flex md:flex-row flex-col  justify-evenly gap-6">
                  {[1, 2].map((i) => (
                    <div
                      key={i}
                      className="bg-[#433C5A] rounded-xl md:w-[40%] w-full flex items-center justify-center h-[400px]"
                    >
                      <span className="text-[80px] text-gray-600">?</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </JumperLayout>
  );
}
