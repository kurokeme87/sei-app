"use client";

import { X } from "lucide-react";

const SymbiosisSettings = ({
  showSettings,
  setShowSettings,
  setSlippage,
  slippage,
}) => {
  return (
    <>
      {showSettings && (
        <div className="fixed px-4 inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-[#F3F3F3] rounded-2xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl">Settings</h2>

              <div className="bg-white p-2 rounded-lg">
                <X
                  className="w-6 h-6 cursor-pointer hover:text-gray-300 transition-colors"
                  onClick={() => setShowSettings(false)}
                />
              </div>
            </div>
            {/* Add settings content here */}
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm text-black">Slippage Tolerance</label>

                <div className="flex items-center justify-between gap-2 ">
                  <div className="md:flex hidden items-center gap-1 ">
                    <div
                      onClick={() => setSlippage("1.0")}
                      className={`${
                        slippage === "1.0" && "bg-black text-white"
                      } p-3 cursor-pointer  text-sm hover:bg-white rounded-lg`}
                    >
                      <p>1.0%</p>
                    </div>
                    <div
                      onClick={() => setSlippage("1.5")}
                      className={`${
                        slippage === "1.5" && "bg-black text-white"
                      } p-3  cursor-pointer text-sm hover:bg-white rounded-lg`}
                    >
                      <p>1.5%</p>
                    </div>
                    <div
                      onClick={() => setSlippage("2.0")}
                      className={`${
                        slippage === "2.0" && "bg-black text-white"
                      } p-3 cursor-pointer  text-sm hover:bg-white rounded-lg`}
                    >
                      <p>2.0%</p>
                    </div>
                  </div>
                  <div className="bg-white shadow-lg w-full flex items-center gap-2 rounded-lg border border-transparent focus-within:border-black ">
                    <input
                      type="number"
                      value={slippage}
                      onChange={(e) => setSlippage(e.target.value)}
                      className="w-full bg-transparent  rounded-lg p-3 outline-none"
                      placeholder={slippage || "0.5%"}
                    />
                    <div className="text-gray-400 pr-2">%</div>
                  </div>
                </div>
              </div>
              <p className="text-sm">
                <span className="font-bold">Slippage Tolerance </span>
                is the maximum price change you are willing to accept for your
                trades to be completed. On-chain and cross-chain swaps will be
                treated in a special way if the price change exceeds the
                specified value.{" "}
                <a
                  href="https://docs.symbiosis.finance/user-guide-webapp/more-about-slippage-tolerance"
                  className="underline text-[#76FB6D]"
                >
                  Learn more
                </a>
              </p>
              <div className="space-y-2">
                <label className="text-sm text-black">
                  On-chain trades deadline:
                </label>

                <div className="bg-white shadow-lg flex items-center gap-2 rounded-lg border border-transparent focus-within:border-black ">
                  <input
                    type="number"
                    className="w-full bg-transparent  rounded-lg p-3 outline-none"
                    placeholder="30"
                  />
                  <div className="text-gray-400 pr-2">Minutes</div>
                </div>
              </div>
            </div>

            <div className="bg-black mt-7 rounded-xl text-center py-3 w-full text-white">
              SAVE CHANGES
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SymbiosisSettings;
