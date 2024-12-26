"use client";

import { formatCurrency, shortenAddressSmall } from "@/app/utils";
import { transactions } from "@/data/symbiosis/transactions";
import { shortenAddress } from "@/lib/utils";
import { TransactionDetails } from "@/types/symbiosis";
import { useEffect, useState } from "react";

const TransactionTable = () => {
  const [filtereData, setFilteredData] =
    useState<Partial<TransactionDetails>[]>(transactions);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (searchTerm) {
      const filtered = transactions.filter((item) => {
        const fromRouteMatches = item.from_route?.some((itm) =>
          itm.token.address.includes(searchTerm)
        );
        const toRouteMatches = item.to_route?.some((itm) =>
          itm.token.address.includes(searchTerm)
        );
        const addresMatches = item.from_address.includes(searchTerm);

        return fromRouteMatches || toRouteMatches || addresMatches;
      });
      setFilteredData(filtered);
    } else {
      setFilteredData(transactions);
    }
  }, [searchTerm]);

  return (
    <div className="w-full shadow-md bg-[#F2F2F2] rounded-3xl p-4 md:p-5 mt-10 font-faGrotesk">
      <input
        type="search"
        placeholder="SEARCH BY TX OR ADDRESS"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full bg-white border border-transparent hover:border-black ease-in-out transition-all duration-200 h-11 sm:h-12 md:h-14 px-4 rounded-xl placeholder:text-gray-400 font-medium text-black text-base shadow-md outline-none"
      />

      <div className="mt-7 w-full overflow-x-auto font-faGrotesk">
        <table className="w-full">
          <thead className="border-b pb-1 border-gray-400 w-full">
            <tr className="w-full pb-1 border-b border-gray-400 font-medium">
              <th className="text-[#9a9a9a] text-left p-2">TX From</th>
              <th className="text-[#9a9a9a] text-left p-2">TX To</th>
              <th className="text-[#9a9a9a] text-left p-2">Address</th>
              <th className="text-[#9a9a9a] text-left p-2">Amount</th>
              <th className="text-[#9a9a9a] text-left p-2">State</th>
              <th className="text-[#9a9a9a] text-left p-2">Date</th>
              <th className="text-[#9a9a9a] text-left p-2"></th>
            </tr>
          </thead>

          <tbody>
            {filtereData.map((item, index) => (
              <tr
                key={index}
                className="w-full text-sm font-faGrotesk rounded-lg hover:bg-gray-200 p-2 whitespace-nowrap"
              >
                <td className="p-2">
                  {item.from_route ? (
                    <div className="space-y-1">
                      <p className="text-black underline">
                        {shortenAddress(
                          item.from_route[0]?.token?.name,
                          10,
                          20
                        )}
                      </p>
                      <p className="text-[#999]">
                        {shortenAddressSmall(
                          item.from_route[0]?.token?.address
                        )}
                      </p>
                    </div>
                  ) : (
                    "..."
                  )}
                </td>
                <td className="p-2">
                  {item?.to_route ? (
                    <div className="space-y-1">
                      <p className="text-black underline">
                        {item.to_route[0]?.token?.name}
                      </p>
                      <p className="text-[#999]">
                        {shortenAddressSmall(item.to_route[0]?.token?.address)}
                      </p>
                    </div>
                  ) : (
                    "..."
                  )}
                </td>
                <td className="p-2">
                  {shortenAddress(item?.from_address, 10, 20)}
                </td>
                <td className="text-black p-2">
                  {formatCurrency(item.from_amount_usd || "0")}
                </td>
                <td className="text-black p-2">
                  {item.state === 1 ? (
                    <p className="font-medium text-[#999]">Pending</p>
                  ) : item.state === 0 ? (
                    <p className="font-medium text-[#238d18]">Success</p>
                  ) : (
                    ""
                  )}
                </td>

                <td className="p-2">
                  <p className="text-[#999]">{item.created_at}</p>
                </td>
                <td className="text-black underline p-2">View</td>
              </tr>
            ))}

            {filtereData.length < 1 ? (
              <tr className="w-full p-2">
                <td colSpan={7} rowSpan={7} className="text-center">
                  No data found
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionTable;
