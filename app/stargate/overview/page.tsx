"use client";

import StargateLayout from "@/app/layouts/stargateLayout";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
} from "lucide-react";
import { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const data = [
  {
    name: "Dec",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Jan",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Feb",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Mar",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Apr",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "May",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Jun",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: "Jul",
    uv: 2490,
    pv: 8300,
    amt: 3100,
  },
  {
    name: "Aug",
    uv: 4590,
    pv: 2300,
    amt: 7100,
  },
  {
    name: "Sep",
    uv: 3990,
    pv: 1300,
    amt: 3800,
  },
  {
    name: "Oct",
    uv: 3190,
    pv: 4900,
    amt: 4100,
  },
  {
    name: "Nov",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const tvlData = Array.from({ length: 365 }, (_, i) => ({
  date: new Date(2023, 0, i + 1).toISOString().split("T")[0],
  value: 400000000 + Math.random() * 50000000,
}));

const transactionData = Array.from({ length: 365 }, (_, i) => ({
  date: new Date(2023, 0, i + 1).toISOString().split("T")[0],
  value: 30000 + Math.random() * 10000,
}));

const volumeData = Array.from({ length: 365 }, (_, i) => ({
  date: new Date(2023, 0, i + 1).toISOString().split("T")[0],
  value: 30000000 + Math.random() * 10000000,
}));
// Dummy data for transfers
const transfers = [
  {
    action: "Economy",
    token: "ETH",
    from: "Arbitrum",
    to: "Optimism",
    amount: 0.099295,
    logo: "/stargate/eth.svg",
    logo2: "/stargate/ethereum (1).svg",
    value: 249.89,
    account: "0xe37...b88b5",
    time: "52 seconds ago",
  },
  {
    action: "Fast",
    token: "USDC",
    from: "Ethereum",
    to: "Base",
    amount: 83.585231,
    logo: "/stargate/eth.svg",
    logo2: "/stargate/arbitrum-icon.png",
    value: 83.61,
    account: "0x59f...5b01e",
    time: "37 seconds ago",
  },
  {
    action: "Economy",
    token: "ETH",
    from: "Arbitrum",
    to: "Base",
    amount: 0.004199,
    logo: "/stargate/eth.svg",
    logo2: "/stargate/arbitrum-icon.png",
    value: 10.57,
    account: "0xe37...b88b5",
    time: "52 seconds ago",
  },
  {
    action: "Fast",
    token: "USDT",
    from: "Avalanche",
    to: "BNB",
    amount: 64.333847,
    logo: "/stargate/usdc.svg",
    logo2: "/stargate/ethereum (1).svg",
    value: 64.33,
    account: "0x06f...53dec",
    time: "59 seconds ago",
  },
  {
    action: "Economy",
    token: "USDT",
    from: "Optimism",
    to: "Mantle",
    amount: 104.299682,
    logo: "/stargate/ssETH-icon.png",
    logo2: "/stargate/ethereum (1).svg",
    value: 104.29,
    account: "0xe37...b88b5",
    time: "1 minute ago",
  },
];

const poolData = [
  {
    token: "ETH",
    liquidity: 3857332.74,
    network: "Arbitrum",
    volume24h: 97953.09,
    volume7d: 1049692.32,
    logo: "/stargate/eth.svg",
    logo2: "/stargate/arbitrum-icon.png",
    apy: "14.70%",
    version: "V1",
  },
  {
    token: "ETH",
    liquidity: 3857332.74,
    network: "Ethereum",
    volume24h: 97953.09,
    volume7d: 1049692.32,
    logo: "/stargate/eth.svg",
    logo2: "/stargate/ethereum (1).svg",
    apy: "14.70%",
    version: "V1",
  },
  {
    token: "ETH",
    liquidity: 3857332.74,
    network: "Optimism",
    volume24h: 97953.09,
    volume7d: 1049692.32,
    logo: "/stargate/eth.svg",
    logo2: "/stargate/arbitrum-icon.png",
    apy: "14.70%",
    version: "V1",
  },
  {
    token: "ETH",
    liquidity: 3857332.74,
    network: "Linea",
    volume24h: 97953.09,
    volume7d: 1049692.32,
    logo: "/stargate/eth.svg",
    logo2: "/stargate/arbitrum-icon.png",
    apy: "14.70%",
    version: "V1",
  },
  {
    token: "USDC",
    liquidity: 3857332.74,
    network: "Ethereum",
    volume24h: 97953.09,
    volume7d: 1049692.32,
    logo: "/stargate/usdc.svg",
    logo2: "/stargate/ethereum (1).svg",
    apy: "14.70%",
    version: "V1",
  },
  {
    token: "ETH",
    liquidity: 3857332.74,
    network: "Base",
    volume24h: 97953.09,
    volume7d: 1049692.32,
    logo: "/stargate/eth.svg",
    logo2: "/stargate/arbitrum-icon.png",
    apy: "14.70%",
    version: "V1",
  },
  {
    token: "mETH",
    liquidity: 3857332.74,
    network: "Ethereum",
    volume24h: 97953.09,
    volume7d: 1049692.32,
    logo: "/stargate/ssETH-icon.png",
    logo2: "/stargate/ethereum (1).svg",
    apy: "14.70%",
    version: "V1",
  },
  {
    token: "USDT",
    liquidity: 3857332.74,
    network: "Ethereum",
    volume24h: 97953.09,
    volume7d: 1049692.32,
    logo: "/stargate/usdt.svg",
    logo2: "/stargate/ethereum (1).svg",
    apy: "14.70%",
    version: "V1",
  },
];

// Dummy data for pools
const pools = [
  {
    name: "USDC",
    network: "Arbitrum",
    version: "V1",
    liquidity: 3857332.74,
    volume24h: 97953.09,
    volume7d: 1049692.32,
  },
  {
    name: "USDC",
    network: "Avalanche",
    version: "V1",
    liquidity: 7585557.91,
    volume24h: 132845.94,
    volume7d: 524150.4,
  },
  {
    name: "USDbC",
    network: "Base",
    version: "V1",
    liquidity: 2419386.02,
    volume24h: 83305.37,
    volume7d: 1129378.58,
  },
  {
    name: "USDC",
    network: "Ethereum",
    version: "V1",
    liquidity: 7256766.28,
    volume24h: 22451.07,
    volume7d: 323329.49,
  },
  {
    name: "USDC",
    network: "Mantle",
    version: "V1",
    liquidity: 551644.38,
    volume24h: 30625.46,
    volume7d: 325752.89,
  },
  {
    name: "USDC",
    network: "Optimism",
    version: "V1",
    liquidity: 3920507.11,
    volume24h: 30434.78,
    volume7d: 383487.34,
  },
  {
    name: "USDC",
    network: "Polygon",
    version: "V1",
    liquidity: 6988345.72,
    volume24h: 50947.31,
    volume7d: 395197.15,
  },
  {
    name: "USDT",
    network: "Arbitrum",
    version: "V1",
    liquidity: 3352195.32,
    volume24h: 14243.5,
    volume7d: 2415341.66,
  },
  {
    name: "USDt",
    network: "Avalanche",
    version: "V1",
    liquidity: 2367469.38,
    volume24h: 4450.03,
    volume7d: 526536.36,
  },
  {
    name: "USDT",
    network: "BNB",
    version: "V1",
    liquidity: 7979263.11,
    volume24h: 87805.6,
    volume7d: 2135476.92,
  },
];

const Card = ({ children, className = "" }) => (
  <div className={`bg-[#1a1a1a] rounded-lg p-6 ${className}`}>{children}</div>
);

type DropdownProps = {
  label: string;
  options: { name: string; icon: string | null }[];
  selectedOption: string;
  onSelect: (option: string) => void;
};

const Dropdown: React.FC<DropdownProps> = ({
  label,
  options,
  selectedOption,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        className="py-2 px-4 bg-[#1a1a1a] text-white rounded-lg flex items-center justify-between w-full"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>
          {label}: {selectedOption}
        </span>
        {isOpen ? (
          <ChevronUp className="w-4 h-4 ml-2" />
        ) : (
          <ChevronDown className="w-4 h-4 ml-2" />
        )}
      </button>
      {isOpen && (
        <div className="absolute z-10 w-[200px] mt-1 bg-[#1a1a1a] border border-[#323232] rounded-lg shadow-lg max-h-48 overflow-y-auto">
          {options.map((option) => (
            <button
              key={option.name}
              className="w-full px-4 py-2 text-left hover:bg-[#323232] flex items-center"
              onClick={() => {
                onSelect(option.name);
                setIsOpen(false);
              }}
            >
              {option.icon && (
                <img
                  src={option.icon}
                  alt={option.name}
                  className="w-6 h-6 mr-2 rounded-full"
                />
              )}
              {option.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const Table = ({ headers, data, renderRow }) => (
  <div className="overflow-x-auto bg-[#232323] p-4 mb-10 rounded-lg">
    <table className="w-full bg-[#232323]   text-left">
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th
              key={index}
              className="p-2 border-b text-[11px] text-[#8f8f8f] border-black "
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{data.map((item, index) => renderRow(item, index))}</tbody>
    </table>
  </div>
);

export default function ProtocolOverview() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [sourceToken, setSourceToken] = useState("all");
  const [sourceNetwork, setSourceNetwork] = useState("all");
  const [destinationToken, setDestinationToken] = useState("all");
  const [destinationNetwork, setDestinationNetwork] = useState("all");
  const [selectedToken, setSelectedToken] = useState("All");
  const [selectedNetwork, setSelectedNetwork] = useState("All");

  const totalPages = Math.ceil(poolData.length / itemsPerPage);

  const tokens = [
    { name: "All", icon: null },
    { name: "ETH", icon: "/stargate/eth.svg" },
    { name: "USDC", icon: "/stargate/usdc-icon.png" },
    { name: "mETH", icon: "/stargate/metis.svg" },
    { name: "USDT", icon: "/stargate/usdt.svg" },
    { name: "USDt", icon: "/stargate/usdt.svg" },
    { name: "USDbC", icon: "/stargate/usdbc.svg" },
    { name: "WETH", icon: "/stargate/weth.svg" },
  ];

  const networks = [
    { name: "All", icon: null },
    { name: "Arbitrum", icon: "/stargate/arbitrum (1).svg" },
    { name: "Ethereum", icon: "/stargate/eth.svg" },
    { name: "Linea", icon: "/stargate/linea.svg" },
    { name: "Optimism", icon: "/stargate/optimism (1).svg" },
    { name: "Base", icon: "/stargate/base.svg" },
    { name: "BNB Chain", icon: "/stargate/bnb.svg" },
    { name: "Scroll", icon: "/stargate/scroll.svg" },
  ];

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };

  return (
    <StargateLayout>
      <div className="max-w-6xl mt-12 px-4 bg-black  mx-auto text-white ">
        <h1 className="text-4xl font-bold mb-2">Protocol Overview</h1>
        <p className="text-gray-400 mb-8">
          Explore Stargate and gain insight to all of the liquidity transport
          protocol&apos;s activity across 9 chains
        </p>

        <div className="mb-8 p-4 rounded-lg bg-[#232323]">
          <h2 className="text-sm font-normal text-gray-400 mb-2">TVL</h2>
          <div className="text-2xl font-normal mb-2">
            {formatCurrency(419450776.65)}
          </div>
          <div className="text-sm text-gray-400 mb-4">Oct 27, 2024</div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                width={500}
                height={400}
                data={data}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#50BEAF" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#232323" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" />
                {/* <YAxis /> */}
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="uv"
                  stroke="#50BEAF"
                  fill="url(#colorUv)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="mb-8 p-4 rounded-lg bg-[#232323]">
            <h2 className="text-xl font-bold mb-2">Transactions 24H</h2>
            <div className="text-2xl font-bold">33,571</div>
            <div className="text-sm text-gray-400 mb-4">Oct 27, 2024</div>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={transactionData}>
                  {/* <CartesianGrid strokeDasharray="3 3" stroke="#333" /> */}
                  <XAxis dataKey="date" stroke="#666" />
                  {/* <YAxis stroke="#666" /> */}
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1a1a1a",
                      border: "none",
                    }}
                    labelStyle={{ color: "#fff" }}
                  />
                  <Bar dataKey="value" fill="#57D1C0" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mb-8 p-4 rounded-lg bg-[#232323]">
            <h2 className="text-xl font-bold mb-2">Volume 24H</h2>
            <div className="text-2xl font-bold">
              {formatCurrency(34888225.03)}
            </div>
            <div className="text-sm text-gray-400 mb-4">Oct 27, 2024</div>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={volumeData}>
                  {/* <CartesianGrid strokeDasharray="3 3" stroke="#333" /> */}
                  <XAxis dataKey="date" stroke="#666" />
                  {/* <YAxis stroke="#666" /> */}
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1a1a1a",
                      border: "none",
                    }}
                    labelStyle={{ color: "#fff" }}
                  />
                  <Bar dataKey="value" fill="#57D1C0" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="flex p-4 bg-[#232323] rounded-lg mb-2 justify-between items-center">
          <h2 className="text-sm font-bold ">Transfers</h2>
          <div className="md:grid hidden grid-cols-1 text-sm md:grid-cols-2 lg:grid-cols-4 gap-4 ">
            <Dropdown
              label="Source Token"
              options={tokens}
              selectedOption={selectedToken}
              onSelect={setSelectedToken}
            />
            <Dropdown
              label="Source Network"
              options={networks}
              selectedOption={selectedNetwork}
              onSelect={setSelectedNetwork}
            />
            <Dropdown
              label="Destination Token"
              options={tokens}
              selectedOption={selectedToken}
              onSelect={setSelectedToken}
            />
            <Dropdown
              label="Destination Token"
              options={networks}
              selectedOption={selectedNetwork}
              onSelect={setSelectedNetwork}
            />
          </div>
        </div>

        <div>
          <Table
            headers={[
              "Action",
              "Token(s)",
              "From/To",
              "Amount",
              "Account",
              "Time",
            ]}
            data={transfers}
            renderRow={(transfer, index) => (
              <tr key={index} className="border-b gap-4 border-black py-2">
                <td className="">
                  <div className="flex">
                    <div className="bg-[#1A1A1A] flex items-center gap-1 rounded-3xl p-2">
                      <img
                        src={
                          transfer.action === "Economy"
                            ? "/stargate/download (46).svg"
                            : "/stargate/download (48).svg"
                        }
                        alt="Economy"
                        className="w-4 h-4"
                      />
                      {transfer.action}
                    </div>
                  </div>
                </td>
                <td className="p-2 ">
                  {" "}
                  <div className="flex w-full items-center gap-2">
                    <img
                      src={transfer.logo}
                      alt="Economy"
                      className="w-4 h-4"
                    />{" "}
                    →
                    <img
                      src={transfer.logo2}
                      alt="Economy"
                      className="w-4 h-4"
                    />{" "}
                  </div>{" "}
                </td>
                <td className="p-2 ">
                  <div className="flex w-full items-center gap-2">
                    <img
                      src={transfer.logo2}
                      alt="Economy"
                      className="w-4 h-4"
                    />{" "}
                    →
                    <img
                      src={transfer.logo}
                      alt="Economy"
                      className="w-4 h-4"
                    />{" "}
                  </div>{" "}
                </td>
                <td className="p-2">
                  <div>{transfer.amount}</div>
                  <div className="text-sm text-gray-400">
                    {formatCurrency(transfer.value)}
                  </div>
                </td>
                <td className="p-2">{transfer.account}</td>
                <td className="p-2">{transfer.time}</td>
              </tr>
            )}
          />
          <div className="flex space-x-2 justify-center mb-8 ">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-1 bg-[#1a1a1a] z-20 cursor-pointer rounded-lg disabled:opacity-50"
            >
              <ChevronLeft className="text-[11px]" />
            </button>
            <div className="px-3 py-1 bg-[#1a1a1a] rounded-lg">
              <span className="text-[#50BEAF]">{currentPage}</span>/{totalPages}
            </div>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="p-1 bg-[#1a1a1a] cursor-pointer z-20 rounded-lg disabled:opacity-50"
            >
              <ChevronRight className="text-[11px]" />
            </button>
          </div>
        </div>

        <div>
          <div className="mb-2 p-4 rounded-lg bg-[#232323]">
            <h2 className="text-sm font-bold ">
              All Pools • <span className="text-[#50BEAF]">93</span>{" "}
            </h2>
          </div>

          <div className="mb-8  rounded-lg ">
            <Table
              headers={[
                "Name",
                "Network",
                "Version",
                "Supported",
                "Liquidity",
                "Volume (24h)",
                "Volume (7d)",
              ]}
              data={poolData.slice(
                (currentPage - 1) * itemsPerPage,
                currentPage * itemsPerPage
              )}
              renderRow={(pool, index) => (
                <tr key={index} className="border-b border-black ">
                  <td className="px-2 py-4 bg-[#232323] rounded-3xl">
                    <div className="flex items-center gap-1">
                      <img src={pool.logo} alt="Economy" className="w-4 h-4" />{" "}
                      {pool.token}
                    </div>
                  </td>
                  <td className="px-2 py-4">
                    <div className="flex items-center gap-1">
                      <img src={pool.logo2} alt="Economy" className="w-4 h-4" />{" "}
                      {pool.network}
                    </div>
                  </td>
                  <td className="px-2 py-4">
                    <div className="flex">
                      <div className="py-1 px-2 text-[11px] rounded-lg bg-[#323232] ">
                        {" "}
                        {pool.version}
                      </div>
                    </div>
                  </td>
                  <td className="px-2 py-4"></td>
                  <td className="px-2 py-4">
                    {formatCurrency(pool.liquidity)}
                  </td>
                  <td className="px-2 py-4">
                    {formatCurrency(pool.volume24h)}
                  </td>
                  <td className="px-2 py-4">{formatCurrency(pool.volume7d)}</td>
                </tr>
              )}
            />
            <div className="flex space-x-2 justify-center">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-1 bg-[#1a1a1a] z-20 cursor-pointer rounded-lg disabled:opacity-50"
              >
                <ChevronLeft className="text-[11px]" />
              </button>
              <div className="px-3 py-1 bg-[#1a1a1a] rounded-lg">
                <span className="text-[#50BEAF]">{currentPage}</span>/
                {totalPages}
              </div>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="p-1 bg-[#1a1a1a] cursor-pointer z-20 rounded-lg disabled:opacity-50"
              >
                <ChevronRight className="text-[11px]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </StargateLayout>
  );
}
