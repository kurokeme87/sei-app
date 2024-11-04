// layouts/SiteOneLayout.js
import { Button } from "@/components/ui/button";
import Sidebar from "../../components/global/Sidebar";
import localFont from "next/font/local";
import SeiConnectButton from "@/components/global/SeiConnectButton";
import { useAccount } from "wagmi";
import { shortenAddressSmall } from "../utils";
import { Wallet2Icon } from "lucide-react";
import { DotsVerticalIcon } from "@radix-ui/react-icons";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900 200 300 500",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function SeiLayout({ children }: { children: React.ReactNode }) {
  const { address } = useAccount();
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-sathoshi`}
      >
        <div className="flex h-screen bg-background">
          <Sidebar />
          <main className="flex-1 pb-8 relative  pt-4 overflow-auto">
            <div className="mx-auto">
              <div className="absolute z-10 top-0 right-5 mt-4 mb-4">
                <SeiConnectButton
                  isWithAccount={true}
                  connect={
                    <Button variant="destructive">Connect Wallet</Button>
                  }
                  component={
                    <button className="py-2 px-4 rounded-md bg-[#242424] font-medium text-white flex justify-between items-center gap-2 text-sm">
                      <Wallet2Icon size={18} />
                      <p>{shortenAddressSmall(address)}</p>
                      <DotsVerticalIcon />
                    </button>
                  }
                />
              </div>
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
