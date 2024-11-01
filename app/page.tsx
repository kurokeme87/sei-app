"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Clipboard, TriangleAlert } from "lucide-react";
import SeiLayout from "./layouts/seiLayout";

export default function Home() {
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  return (
    <SeiLayout>
      <div>
        <div className=" border-b pb-4 border-gray-200">
          <div className="flex px-8 items-center gap-1">
            <img
              src="/sei-images/download (7).svg"
              alt="Sei Logo"
              className="w-6 h-6 lg:block hidden "
            />
            <h1 className="text-2xl font-semibold lg:pl-0 pl-4  ">Dashboard</h1>
          </div>
        </div>
        <div className="px-8">
          <div className="grid gap-6 mb-6 pt-8">
            <h2 className="text-4xl font-semibold">Stats</h2>
            <div>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="flex border rounded-lg p-4 border-gray-200 items-center gap-2">
                  <img
                    src="/sei-images/download (3).svg"
                    alt="Sei Logo"
                    className="w-12 h-12 "
                  />
                  <div>
                    <div className="text-md text-black font-semibold ">
                      Block Height
                    </div>
                    <div className="font-light text-lg">110,633,026</div>
                  </div>
                </div>
                <div className="flex border rounded-lg p-4 border-gray-200 items-center gap-2">
                  <img
                    src="/sei-images/download (2).svg"
                    alt="Sei Logo"
                    className="w-12 h-12 "
                  />
                  <div>
                    <div className="text-md text-black font-semibold ">
                      Avg Block Time
                    </div>
                    <div className="font-light text-lg">0.410s</div>
                  </div>
                </div>
                <div className="flex border rounded-lg p-4 border-gray-200 items-center gap-2">
                  <img
                    src="/sei-images/download (1).svg"
                    alt="Sei Logo"
                    className="w-12 h-12 "
                  />
                  <div>
                    <div className="text-md text-black font-semibold ">
                      Total Supply (Sei)
                    </div>
                    <div className="font-light text-lg">8.844504 B</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-4xl py-4 font-semibold">Overview</h2>

            {!isWalletConnected ? (
              <div className="flex flex-col w-full p-2 border border-lg rounded-lg items-center justify-center h-32">
                <p className="mb-4 text-muted-foreground">
                  Connect wallet to view overview
                </p>
                <Button
                  variant="destructive"
                  size="lg"
                  onClick={() => setIsWalletConnected(true)}
                >
                  Connect Wallet
                </Button>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <div className="border border-gray-200 rounded-lg">
                  <div>
                    <div className="bg-[#ededed] py-4">
                      <div className="px-4">Addresses</div>
                    </div>
                    <div className="px-4 py-3">
                      <div className="flex items-center justify-between mb-4">
                        <div className="">
                          <div className="text-md font-semibold mb-1">
                            EVM Address
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-lg">0xd138a...F9F9718</span>
                          </div>
                        </div>
                        <div className="p-2 border cursor-pointer border-gray-200 rounded-sm">
                          <Clipboard size={10} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#FFF2E8] p-4 rounded-bl-lg rounded-br-lg">
                    <p className="text-sm text-[#FD7E13] mb-2">
                      Link your EVM address (0x)
                    </p>
                    <p className="text-sm text-black mb-4">
                      Your Sei address has not been associated on chain yet.
                      Sign a message to link your addresses.
                    </p>
                    <div className="flex items-center bg-[#fafafa] gap-2 px-4 py-6  mb-2">
                      <Checkbox
                        id="terms"
                        className="p-3 border border-gray-200"
                      />
                      <label htmlFor="terms" className="text-sm">
                        I am human
                      </label>
                    </div>
                    <Button variant="secondary" size="sm">
                      Link Addresses
                    </Button>
                  </div>
                </div>
                <div className="border relative border-gray-200 rounded-lg">
                  <div>
                    <div className="bg-[#ededed] py-4">
                      <div className="px-4">Balances</div>
                    </div>
                  </div>
                  <div className="">
                    <div className="flex px-4 py-6 items-center gap-2 mb-4">
                      <img
                        src="/sei-images/sei-icon.png"
                        alt="SEI Token"
                        className="w-10 h-10"
                      />
                      <div>
                        <div className="font-semibold">SEI</div>
                        <div className="text-sm text-muted-foreground">
                          Sei Token
                        </div>
                      </div>
                      <div className="ml-auto font-semibold">0</div>
                    </div>
                    <div className="bg-[#FFF2E8] absolute bottom-0 p-4 rounded-bl-lg rounded-br-lg">
                      <div className="flex items-start gap-2">
                        <div>
                          <TriangleAlert
                            className="text-[#FD7E13] mt-1"
                            size={15}
                          />
                        </div>
                        <p className="text-sm text-black">
                          Some balances may not be visible as your EVM address
                          has not been linked to your Sei address.
                          <br /> <br /> Use the Link Addresses button on the
                          Addresses card to associate your addresses on-chain.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg">
                  <div className="bg-[#ededed] py-2">
                    <div className="px-4 flex items-center justify-between">
                      <p>Staking</p>
                      <div className=" px-5 py-2 bg-black text-white rounded-lg">
                        Stake
                      </div>
                    </div>
                  </div>
                  <div className="">
                    <div className="mb-4 pt-6 pb-12 border-b border-gray-200">
                      <div className="text-lg font-semibold px-4 text-black mb-1">
                        Total Staked
                      </div>
                      <div className="text-4xl flex items-center justify-between px-4 pt-4 font-light">
                        0.00
                        <span className="text-gray-400 text-[16px]">
                          SEI
                        </span>{" "}
                      </div>
                    </div>
                    <div className="mb-4  pt-4 ">
                      <div className="text-lg font-semibold px-4 text-black mb-1">
                        Claimable Rewards
                      </div>
                      <div className="text-4xl flex items-center justify-between px-4 pt-4 font-light">
                        0.00
                        <span className="text-gray-400 text-[16px]">
                          uSEI
                        </span>{" "}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </SeiLayout>
  );
}
