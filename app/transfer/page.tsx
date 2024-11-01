"use client";

import SeiLayout from "@/app/layouts/seiLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AlertTriangle } from "lucide-react";
import { useState } from "react";

export default function Transfer() {
  const [selectedChain, setSelectedChain] = useState("sei");

  const chains = [
    { value: "sei", label: "Sei", imageUrl: "/sei-images/sei-icon.png" },
  ];

  const handleChainChange = (value) => {
    setSelectedChain(value);
  };

  return (
    <SeiLayout>
      <div>
        <div className=" border-b pb-4 border-gray-200">
          <div className="flex px-8 items-center gap-1">
            <img
              src="/sei-images/download (4).svg"
              alt="Sei Logo"
              className="w-6 h-6 lg:block hidden "
            />
            <h1 className="text-2xl font-semibold lg:pl-0 pl-4  ">Transfer</h1>
          </div>
        </div>
        <Card className="md:max-w-xl max-w-sm mt-10 mx-auto">
          <CardHeader>
            <h2 className="font-bold text-xl">Transfer</h2>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="bg-destructive/15 text-destructive p-4 rounded-lg flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 mt-0.5" />
                <p className="text-sm">
                  Do not use this to send tokens to a CEX deposit wallet. Your
                  tokens may become stuck and irrecoverable.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-gray-100">
                <div>
                  <label className="text-md font-semibold mb-1 block">
                    Source address
                  </label>
                  <Button variant="destructive">Connect Wallet</Button>
                </div>
                <div>
                  <label className="text-md font-semibold mb-1 mt-4 block">
                    Destination address
                  </label>
                  <div className="bg-white border mt-3 border-gray-400 rounded-lg">
                    <input
                      type="text"
                      className="bg-transparent  focus:outline-[#8B1E17] w-full p-2"
                      placeholder="Sei or 0x address"
                    />
                  </div>
                </div>
              </div>
              <div className="p-4 rounded-lg mt-3 bg-gray-100">
                <label className="text-md font-semibold mb-1 block">
                  Amount
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    className="w-1/2 bg-white focus:outline  focus:outline-[#8B1E17] px-4 rounded-md border border-gray-400"
                    placeholder="0"
                  />
                  <Select defaultValue="sei" onValueChange={handleChainChange}>
                    <SelectTrigger className="flex w-1/2 focus:outline border-gray-400  focus:outline-[#8B1E17] bg-white items-center">
                      <SelectValue>
                        {selectedChain ? (
                          <div className="flex items-center gap-1">
                            <img
                              src={
                                chains.find(
                                  (chain) => chain.value === selectedChain
                                ).imageUrl
                              }
                              alt=""
                              className="w-[20px] h-[20px]"
                            />
                            {
                              chains.find(
                                (chain) => chain.value === selectedChain
                              ).label
                            }
                          </div>
                        ) : (
                          "Select chain"
                        )}
                      </SelectValue>
                    </SelectTrigger>

                    <SelectContent>
                      {chains.map((chain) => (
                        <SelectItem key={chain.value} value={chain.value}>
                          <div className="flex active:bg-blue-200 focus:bg-blue-200 items-center gap-1">
                            <img
                              src={chain.imageUrl}
                              alt=""
                              className="w-[20px] h-[20px]"
                            />
                            {chain.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <button className="w-full mt-6 text-white rounded-lg py-2 bg-[#0DA678]">
                  Transfer
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </SeiLayout>
  );
}
