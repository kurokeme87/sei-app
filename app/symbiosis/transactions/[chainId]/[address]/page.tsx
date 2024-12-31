"use client";

import { useEffect, useState } from "react";
import { ITransactionDetailsObject } from "@/types/symbiosis";
import TransactionNav from "@/components/symbiosis/TransactionNav";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { abbreviateAddress } from "@/lib/utils";
import { PiCopyFill } from "react-icons/pi";
import {
  formatCurrency,
  formattedDate,
  shortenAddressSmall,
} from "@/app/utils";
import { transactions } from "@/data/symbiosis/transactions";
import { useParams } from "next/navigation";

import "/public/symbiosis/cygnito-font.css";

const Page = () => {
  const [statistics, setStatistic] = useState<ITransactionDetailsObject | null>(
    null
  );
  const [isErr, setIsErr] = useState(false);
  const params = useParams();
  const { chainId, address } = params;
  const fromName = localStorage.getItem("fromName");
  const toName = localStorage.getItem("toName");

  useEffect(() => {
    const data = transactions.find(
      (item) =>
        item.from_chain_id === (chainId as unknown as number) ||
        item.from_address === address
    );
    if (data) {
      setStatistic(data as unknown as ITransactionDetailsObject);
    } else {
      setIsErr(true);
    }
  }, []);

  return (
    <div className="w-full bg-[#E9E9E9] min-h-screen p-5 sm:p-11 lg:p-12 md:py-12">
      <TransactionNav />

      <div className="w-full flex justify-center items-center">
        <section className="w-full max-w-[560px] flex justify-center items-start gap-2">
          <Link
            href="/symbiosis/transactions"
            className="p-2 rounded-lg bg-white mt-7 sm:block hidden"
          >
            <ArrowLeft />
          </Link>

          <div className="w-full rounded-3xl bg-white shadow-2xl px-7 pt-10 pb-4">
            {isErr ? (
              <h2 className="w-full text-center p-4">Error fetching data</h2>
            ) : (
              <>
                <div className="w-ful flex justify-between items-center">
                  <h1 className="text-xl lg:text-2xl text-black font-semibold">
                    Transaction
                  </h1>

                  <Link
                    href="/symbiosis/transactions"
                    className="p-2 rounded-2xl block sm:hidden bg-[#F3F3F3] hover:opacity-60"
                  >
                    <ArrowLeft />
                  </Link>
                </div>

                <div className="w-full mt-5">
                  <p className="">
                    TX from:{" "}
                    <Link
                      href={`https://bnb.bobascan.com/address/${statistics?.hash}/tokentxns`}
                      className="text-[#238d18] hover:underline"
                    >
                      {fromName || statistics?.tokens[0]?.symbol}
                    </Link>
                  </p>
                  <p className="text-[#999] text-sm">
                    {abbreviateAddress(statistics?.to_address)}
                  </p>
                  <p className="mt-4 w-full">
                    TX to:
                    <span>{toName}</span>
                  </p>
                </div>

                <div className="w-full mt-10 border-t border-2 border-gray-200 py-4 flex flex-col gap-4">
                  <div className="w-full flex justify-between items-center gap-3">
                    <p className="text-[#9c9c9c]">STATE:</p>
                    <p>{statistics?.state === 1 ? "PENDING" : "SUCCESS"}</p>
                  </div>
                  <div className="w-full flex justify-between items-center gap-3">
                    <p className="text-[#9c9c9c]">TRANSAFER FROM:</p>
                    <Link
                      href={`https://bnb.bobascan.com/address/${statistics?.from_address}/tokentxns`}
                      target="_blank"
                      className="underline"
                    >
                      {shortenAddressSmall(statistics?.from_address)}
                    </Link>
                  </div>
                  <div className="w-full flex justify-between items-center gap-3">
                    <p className="text-[#9c9c9c]">TRANSAFER TO:</p>
                    <Link
                      href={`https://bnb.bobascan.com/address/${statistics?.to_address}/tokentxns`}
                      target="_blank"
                      className="underline"
                    >
                      {shortenAddressSmall(statistics?.to_address)}
                    </Link>
                  </div>
                  <div className="w-full flex justify-between items-center gap-3">
                    <p className="text-[#9c9c9c]">AMOUNT:</p>
                    <p>${formatCurrency(statistics?.amounts[0])}</p>
                  </div>
                  <div className="w-full flex justify-between items-center gap-3">
                    <p className="text-[#9c9c9c]">DATE:</p>
                    <p>{formattedDate(statistics?.created_at)}</p>
                  </div>
                  <Link href="" className="mt-2">
                    <button className="w-full flex sm:flex-row flex-row-reverse sm:justify-start justify-center items-center gap-2 sm:gap-4 py-3 text-[#0f0] sm:text-black rounded-xl sm:bg-white bg-black sm:uppercase">
                      <p className="">Copy link to transaction</p>
                      <PiCopyFill size={13} />
                    </button>
                  </Link>
                </div>
              </>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Page;
