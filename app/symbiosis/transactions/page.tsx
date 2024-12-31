"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { IoIosCash } from "react-icons/io";
import TransactionCard from "@/components/symbiosis/TransactionCard";
import { MdOutlinePublishedWithChanges } from "react-icons/md";
import { MdOutlinePermContactCalendar } from "react-icons/md";
import { formatCurrency2 } from "@/app/utils";
import { TStatisticsData } from "@/types/symbiosis";
import TransactionTable from "@/components/symbiosis/TransactionTable";
import TransactionNav from "@/components/symbiosis/TransactionNav";

import "/public/symbiosis/cygnito-font.css";

type TActive = "total" | "month" | "day";

const Page = () => {
  const [active, setActive] = useState<TActive>("total");
  const [statistics, setStatistics] = useState<TStatisticsData | null>(null);

  useEffect(() => {
    const fetchStatistics = async () => {
      await axios
        .get("https://api.symbiosis.finance/explorer/v1/statistics")
        .then((res) => {
          // console.log(res.data, "res.data");
          setStatistics(res.data);
        });
    };

    fetchStatistics();
  }, []);

  return (
    <div className="w-full bg-[#E9E9E9] min-h-screen p-5 sm:p-11 lg:p-12 md:py-12">
      <TransactionNav />
      <div className="w-full flex sm:flex-row flex-col justify-between sm:items-center gap-3 font-faGrotesk mt-6 md:mt-11">
        <h1 className="text-xl lg:text-2xl xl:text-[27px] text-black font-medium">
          Statistics overview
        </h1>

        <div className="flex justify-start items-center gap-2 md:gap-3">
          <button
            onClick={() => setActive("total")}
            className={`${
              active === "total"
                ? "bg-black text-white"
                : "bg-white hover:bg-gray-100"
            } rounded-full px-2 py-1 text-sm font-medium font-faGrotesk`}
          >
            Total
          </button>
          <button
            onClick={() => setActive("month")}
            className={`${
              active === "month"
                ? "bg-black text-white"
                : "bg-white hover:bg-gray-100"
            } rounded-full px-2 py-1 text-sm font-medium font-faGrotesk`}
          >
            Month
          </button>
          <button
            onClick={() => setActive("day")}
            className={`${
              active === "day"
                ? "bg-black text-white"
                : "bg-white hover:bg-gray-100"
            } rounded-full px-2 py-1 text-sm font-medium font-faGrotesk`}
          >
            Week
          </button>
        </div>
      </div>
      <div className="w-full mt-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 sm:shadow-none shadow-md sm:bg-transparent bg-[#F2F2F2] sm:rounded-none rounded-3xl p-4 sm:p-5 md:p-0">
        <TransactionCard
          figure={
            statistics
              ? "$" + formatCurrency2(statistics[active]?.amount_usd)
              : ""
          }
          Icon={IoIosCash}
          label="AMOUNT"
        />
        <TransactionCard
          figure={
            statistics ? formatCurrency2(statistics[active]?.transactions) : ""
          }
          Icon={MdOutlinePublishedWithChanges}
          label="TRANSACTIONS"
        />
        <TransactionCard
          Icon={MdOutlinePermContactCalendar}
          figure={
            statistics ? formatCurrency2(statistics[active]?.addresses) : ""
          }
          label="ADDRESSES"
        />
      </div>

      <TransactionTable />
    </div>
  );
};

export default Page;
