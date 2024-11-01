"use client";

import StargateLayout from "@/app/layouts/stargateLayout";
import { ChevronDown, ChevronUp, Lock } from "lucide-react";
import React, { useState } from "react";

export default function Stake() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <StargateLayout>
      <div className="max-w-6xl px-4  mt-12 mx-auto">
        <h1 className="text-4xl font-bold mb-4">
          {" "}
          <span className="text-[#999999]">Stargate</span> Stake
        </h1>
        <p className="text-gray-400 mb-8">
          Lock your STG tokens to receive veSTG, the unit of Stargate governance
          voting power.
          <br /> Stargate is governed entirely by Stargate token holders via
          voting escrow.
        </p>

        <div className="bg-[#232323] rounded-lg p-4 flex justify-between items-center mb-3">
          <div className="flex gap-4 items-center z-20">
            <div className="px-3 opacity-30 py-1 bg-[#1A1A1A] rounded-lg border border-[#eaeaea]/20">
              My Stakes • 0
            </div>
            <div className="px-3 py-1 md:block hidden opacity-30 bg-[#1A1A1A] rounded-lg border border-[#eaeaea]/20">
              Available • 0
            </div>
            <div className="px-3 py-1 md:block hidden opacity-30 rounded-lg bg-[#1A1A1A] border border-[#eaeaea]/20">
              ✨ Claim Staking Fees • 0
            </div>
          </div>

          <div className="relative">
            <button
              className="py-2 px-4 bg-[#1a1a1a] opacity-50 text-white rounded-lg flex items-center justify-between w-full"
              //   onClick={() => setIsOpen(!isOpen)}
            >
              <span>Network: All</span>
              {isOpen ? (
                <ChevronUp className="w-4 h-4 ml-2" />
              ) : (
                <ChevronDown className="w-4 h-4 ml-2" />
              )}
            </button>
          </div>
        </div>

        <div className=" border-[#eaeaea]/20 bg-[#0A0A0A] border-2 border-dotted text-[14px] rounded-lg py-[65px] text-center mb-8">
          No stakes available yet
        </div>

        <h2 className="text-lg font-normal mb-4">Staking Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="flex gap-3">
            <div className="w-[65%]">
              <div className="bg-[#232323] rounded-lg mb-2 p-4">
                <h3 className=" text-gray-400 flex text-[11px] items-center justify-between mb-2">
                  Total STG Locked <Lock size={13} className="text-[11px]" />
                </h3>
                <p className="text-2xl text-right font-bold">41,248,656.83</p>
              </div>
              <div className="bg-[#232323] rounded-lg p-4">
                <h3 className=" text-gray-400 flex text-[11px] items-center justify-between mb-2">
                  Total veSTG
                </h3>
                <p className="text-2xl text-right font-bold">12,507,411.91</p>
              </div>
            </div>
            <div>
              <div className="bg-[#232323] rounded-lg mb-2 p-4">
                <h3 className=" text-gray-400 flex text-[11px] items-center justify-between mb-2">
                  Percent STG Locked
                </h3>
                <p className="text-2xl text-right font-bold">24.21%</p>
              </div>
              <div className="bg-[#232323] rounded-lg p-4">
                <h3 className="text-sm text-gray-400 mb-2">
                  Global Average lock time
                </h3>
                <p className="text-2xl text-right font-bold">332 days</p>
              </div>
            </div>
          </div>
          <div className="bg-[#232323] rounded-lg p-4">
            <h3 className="text-2xl  font-bold ">
              My Voting power <span className="text-[#50BEAF]">0.0000%</span>
            </h3>
            <p className="text-sm text-gray-400 mb-4">
              Learn more on Stargate Dao governance &gt;
            </p>
            <div className="grid pt-12 grid-cols-3 gap-4">
              <div>
                <span className="text-sm text-gray-400 block">
                  My STG Locked
                </span>
                <span className="font-bold">-</span>
              </div>
              <div>
                <span className="text-sm text-gray-400 block">
                  My veSTG Balance
                </span>
                <span className="font-bold">-</span>
              </div>
              <div>
                <span className="text-sm text-gray-400 block">
                  Average Lock
                </span>
                <span className="font-bold">-</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4 mb-4">
          <button className="bg-transparent border border-white text-white px-10 py-3 rounded-lg">
            Governance Forum
          </button>
          <button className="bg-white text-black px-10 py-3 rounded-lg">
            Vote on Snapshot
          </button>
        </div>
        <p className="text-center text-gray-400">
          Learn more about proposal and vote &gt;
        </p>
      </div>
    </StargateLayout>
  );
}
