import { pools } from "@/data/pools";
import { Info } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const SymbiosisPools = () => {
  const [showDeprecated, setShowDeprecated] = useState(false);
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h2 className="text-xl">All pools</h2>
          <Info className="w-4 h-4 text-gray-400" />
        </div>
        <button className="bg-[#fff] shadow-md px-4 py-4 rounded-lg hover:bg-gray-800 transition-colors">
          My liquidity
        </button>
      </div>

      <div className="space-y-4">
        <input
          type="text"
          placeholder="Search by Name/Chain/Token"
          className="w-full bg-[#fff] shadow-md rounded-lg p-4 outline-none"
          //   value={searchTerm}
          //   onChange={(e) => setSearchTerm(e.target.value)}
        />

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={showDeprecated}
            onChange={(e) => setShowDeprecated(e.target.checked)}
          />
          <span className="text-sm text-gray-400">Show deprecated pools</span>
        </label>

        <div className="space-y-4">
          {pools.map((pool, index) => (
            <div key={index} className="bg-[#f3f3f3] rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Image
                      src={pool.icon}
                      alt={pool.name}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                    <div className="border-2 p-[1px] absolute -top-0 -right-1 bg-white  border-white rounded-full">
                      <Image
                        src={pool.chainIcon}
                        alt={pool.name}
                        width={12}
                        height={12}
                        className=" rounded-full"
                      />
                    </div>
                  </div>
                  <span className="font-mono">{pool.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Image
                    src={pool.chainIcon}
                    alt={pool.chain}
                    width={16}
                    height={16}
                  />
                  <span className="text-sm">{pool.chain}</span>
                </div>
              </div>
              <div className="flex items-center justify-between gap-4 text-xs">
                <div>
                  <div className="text-gray-400">Total Locked</div>
                  <div className="font-mono">{pool.totalLocked}</div>
                </div>
                <div>
                  <div className="text-gray-400">Pool balance {" {?}"}</div>
                  <div className="font-mono">{pool.poolBalance}</div>
                </div>
                <div>
                  <div className="text-gray-400">APR {" {?}"}</div>
                  <div className="font-mono">{pool.apr}</div>
                </div>
                <div>
                  <div className="text-gray-400">Boosted APR {" {?}"}</div>
                  <div className="font-mono">{pool.boostedApr}</div>
                </div>
              </div>
              <button className="w-full mt-4 text-md bg-[#fff] text-center py-2 rounded-lg hover:bg-gray-800 transition-colors">
                Manage
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SymbiosisPools;
