"use client";
import SeiLayout from "@/app/layouts/seiLayout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
// import { AlertCircle } from "lucide-react";

export default function Bridge() {
  const [selectedValue, setSelectedValue] = useState(null);
  const [selectedChain, setSelectedChain] = useState("sei");
  const [selectedChain2, setSelectedChain2] = useState(null);
  const [showOtherSites, setShowOtherSites] = useState(false);

  const handleSelectChange = (value) => {
    setSelectedValue(value);
  };

  const handleChainChange = (value) => {
    setSelectedChain(value);
  };

  const handleChainChange2 = (value) => {
    setSelectedChain2(value);
  };

  const chains = [
    { value: "sei", label: "Sei", imageUrl: "/sei-images/sei-icon.png" },
  ];

  const chains2 = [
    {
      value: "ethereum",
      label: "Ethereum",
      imageUrl: "/sei-images/ethereum-icon.png",
    },
    {
      value: "polygon",
      label: "Polygon",
      imageUrl: "/sei-images/polygon-icon.png",
    },
    { value: "bsc", label: "BSC", imageUrl: "/sei-images/bsc-icon.png" },
  ];

  const otherSites = [
    {
      url: "https://stargate.finance/transfer",
      link: "/stargate/",
      name: "Stargate",
      imageUrl: "/sei-images/stargate-icon.png",
    },
    {
      url: "https://app.symbiosis.finance/swap",
      link: "/symbiosis/",
      name: "Symbiosis",
      imageUrl: "/sei-images/symbiosis-icon.png",
    },
    // {
    //   url: "https://www.gas.zip/",
    //   link: "/",
    //   name: "Gas.zip",
    //   imageUrl: "/sei-images/gasdotzip-icon.png",
    // },
    {
      url: "https://www.en-squidrouter.com/swap",
      link: "https://www.en-squidrouter.com/swap",
      name: "Squid",
      imageUrl: "/sei-images/squid-icon.png",
    },
    {
      url: "https://jumper.exchange/",
      link: "/jumper/",
      name: "Jumper",
      imageUrl: "/sei-images/jumper-icon.png",
    },
  ];

  const tokens = [
    { value: "eth", label: "ETH", imageUrl: "/sei-images/ethereum-icon.png" },
    { value: "wbtc", label: "WBTC", imageUrl: "/sei-images/btc-icon.png" },
    { value: "usdt", label: "USDT", imageUrl: "/sei-images/usdt-icon.png" },
    { value: "usdc", label: "USDC", imageUrl: "/sei-images/usdc-icon.png" },
    {
      value: "sseth",
      label: "ssETH",
      imageUrl: "/sei-images/sseth-icon.png",
    },
    {
      value: "seth",
      label: "sETH",
      imageUrl: "/sei-images/seiyaneth-icon.png",
    },
    {
      value: "fastUSD",
      label: "fastUSD",
      imageUrl: "/sei-images/fastUSD-icon.png",
    },
    {
      value: "deUSD",
      label: "deUSD",
      imageUrl: "/sei-images/deUSD-icon.png",
    },
  ];
  return (
    <SeiLayout>
      <div>
        <div className=" border-b pb-4 border-gray-200">
          <div className="flex px-8 items-center gap-1">
            <img
              src="/sei-images/download (5).svg"
              alt="Sei Logo"
              className="w-6 h-6 lg:block hidden "
            />
            <h1 className="text-2xl font-semibold lg:pl-0 pl-4  ">Bridge</h1>
          </div>
        </div>
        <Card className="md:max-w-xl max-w-sm mt-10 mx-auto  ">
          <CardHeader>
            <h2 className="font-bold text-xl">Find a Bridge</h2>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-md font-medium mb-1 block">
                    Source chain
                  </label>
                  <Select
                    defaultValue="ethereum"
                    onValueChange={handleChainChange2}
                  >
                    <SelectTrigger className="flex  focus:outline  focus:outline-[#8B1E17] items-center">
                      <SelectValue>
                        {selectedChain2 ? (
                          <div className="flex items-center gap-1">
                            <img
                              src={
                                chains2.find(
                                  (chain) => chain.value === selectedChain2
                                ).imageUrl
                              }
                              alt=""
                              className="w-[20px] h-[20px]"
                            />
                            {
                              chains2.find(
                                (chain) => chain.value === selectedChain2
                              ).label
                            }
                          </div>
                        ) : (
                          "Select chain"
                        )}
                      </SelectValue>
                    </SelectTrigger>

                    <SelectContent>
                      {chains2.map((chain) => (
                        <SelectItem key={chain.value} value={chain.value}>
                          <div className="flex items-center gap-1">
                            <img
                              src={chain.imageUrl}
                              alt={chain.label}
                              className="w-[20px] h-[20px]"
                            />
                            {chain.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-md font-medium mb-1 block">
                    Destination chain
                  </label>
                  <Select defaultValue="sei" onValueChange={handleChainChange}>
                    <SelectTrigger className="flex focus:outline  focus:outline-[#8B1E17] items-center">
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
                          <div className="flex items-center gap-1">
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
              </div>
              <div>
                <label className="text-md font-medium mb-1 block">Token</label>
                <Select defaultValue="eth" onValueChange={handleSelectChange}>
                  <SelectTrigger className="flex focus:outline  focus:outline-[#8B1E17] items-center">
                    <SelectValue>
                      {selectedValue !== null ? (
                        <div className="flex items-center text-black gap-1">
                          <img
                            src={
                              tokens.find(
                                (item) => item.value === selectedValue
                              ).imageUrl
                            }
                            alt=""
                            className="w-[20px] h-[20px]"
                          />
                          {
                            tokens.find((item) => item.value === selectedValue)
                              .label
                          }
                        </div>
                      ) : (
                        <div className="flex items-center text-black gap-1">
                          <img
                            src="/sei-images/ethereum-icon.png"
                            alt=""
                            className="w-[20px] h-[20px]"
                          />
                          ETH
                        </div>
                      )}
                    </SelectValue>
                  </SelectTrigger>

                  <SelectContent>
                    {tokens.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        <div className="flex items-center gap-1">
                          <img
                            src={item.imageUrl}
                            alt=""
                            className="w-[20px] h-[20px]"
                          />
                          {item.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <button
                onClick={() => setShowOtherSites(true)}
                disabled={
                  selectedValue !== null &&
                  selectedChain !== null &&
                  selectedChain2 !== null
                    ? false
                    : true
                }
                className={`w-full cursor-pointer ${
                  selectedValue !== null &&
                  selectedChain !== null &&
                  selectedChain2 !== null
                    ? "bg-[#0DA678]"
                    : "bg-gray-200"
                } text-white rounded-md p-2 mb-4`}
              >
                Find Bridge Providers
              </button>
              {showOtherSites &&
                otherSites.map((item) => (
                  <Link href={item.link} target="_blank" key={item.name}>
                    <div className="p-4 flex items-center border border-gray-300 justify-between mb-1 rounded-lg ">
                      <div className="flex items-center gap-6">
                        <img
                          src={item.imageUrl}
                          alt=""
                          className="w-[40px] h-[40px] rounded-full"
                        />
                        <div>
                          <p>{item.name}</p>
                          <p className="text-gray-400">{item.url}</p>
                        </div>
                      </div>
                      <ExternalLink className="w-[20px] h-[20px] text-blue-400" />
                    </div>
                  </Link>
                ))}
              <div className="border-t border-gray-300  p-4 pt-7  text-sm">
                <p className="font-semibold mb-2">
                  Disclaimer: Third-Party Bridge Services
                </p>
                <p className="text-gray-400">
                  The Sei Foundation is not responsible for the operation or
                  security of third-party bridge services. Use at your own risk.
                  By using this link you expressly indemnify and hold Sei and
                  its Affiliates harmless for any loss or damage incurred.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </SeiLayout>
  );
}
