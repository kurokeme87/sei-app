// layouts/SiteOneLayout.js

"use client";

import SeiConnectButton from "@/components/global/SeiConnectButton";
import { Menu, Wallet } from "lucide-react";
import localFont from "next/font/local";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const navItems = [
  { name: "Transfer", path: "/stargate" },
  { name: "Pool", path: "/stargate/pool" },
  { name: "Farm", path: "/stargate/farm" },
  { name: "Stake", path: "/stargate/stake" },
  { name: "Overview", path: "/stargate/overview" },
];

export default function StargateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  console.log(pathname);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className=" flex flex-col bg-black text-white">
          <header className="bg-black z-[50] g-opacity-50 px-4 py-3 fixed w-full top-0">
            <div className="container mx-auto flex justify-between items-center">
              <Link href="/stargate/" className="flex items-center space-x-2">
                <img
                  src="/stargate/logo-mobile.svg"
                  alt="Stargate Logo"
                  className="w-[50px] h-[30px]"
                />
                <span className="text-xl md:block hidden font-bold">
                  stargate
                </span>
              </Link>
              <nav className="hidden md:flex space-x-8">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={`text-gray-400 ${
                      pathname === item.path ? "font-bold text-white" : ""
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
              <SeiConnectButton
                connect={
                  <button className="bg-white text-black px-4 py-2 rounded-full flex items-center space-x-2">
                    <span className="text-sm">Connect Wallet</span>
                    <Wallet className="w-5 h-5" />
                  </button>
                }
              />
              <button
                className="md:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <Menu />
              </button>
            </div>
          </header>
          {isMobileMenuOpen && (
            <div className="md:hidden pt-[54px] bg-black bg-opacity-95 p-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`block py-2 ${
                    pathname === item.path ? "font-bold" : ""
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          )}
          <main
            style={{
              backgroundImage: "url(/stargate/stars.svg)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundAttachment: "fixed",
              backgroundRepeat: "repeat",
              opacity: 1,
            }}
            className="flex-grow overflow-auto container mx-auto mt-[65px] mb-[100px] "
          >
            {children}
          </main>

          {pathname !== "/stargate" && (
            <footer className="bg-black bg-opacity-50 p-8">
              <div className="container mx-auto">
                <div className="flex flex-col md:flex-row justify-between mb-8">
                  <div className="flex items-center mb-4 md:mb-0">
                    <img
                      src="/stargate/logo-mobile.svg"
                      alt="Stargate Logo"
                      className="w-8 h-8 mr-2"
                    />
                    <span className="text-xl font-bold">Stargate</span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div>
                      <h4 className="font-bold mb-2">Integrations</h4>
                      <a href="#" className="block hover:text-gray-300">
                        Github
                      </a>
                      <a href="#" className="block hover:text-gray-300">
                        Gitbook
                      </a>
                      <a href="#" className="block hover:text-gray-300">
                        Media Kit
                      </a>
                    </div>
                    <div>
                      <h4 className="font-bold mb-2">Governance</h4>
                      <a href="#" className="block hover:text-gray-300">
                        Snapshot
                      </a>
                      <a href="#" className="block hover:text-gray-300">
                        Commonwealth
                      </a>
                    </div>
                    <div>
                      <h4 className="font-bold mb-2">Community</h4>
                      <a href="#" className="block hover:text-gray-300">
                        Discord
                      </a>
                      <a href="#" className="block hover:text-gray-300">
                        Telegram
                      </a>
                      <a href="#" className="block hover:text-gray-300">
                        Medium
                      </a>
                      <a href="#" className="block hover:text-gray-300">
                        Twitter
                      </a>
                    </div>
                    <div>
                      <h4 className="font-bold mb-2">Help</h4>
                      <a href="#" className="block hover:text-gray-300">
                        User Docs
                      </a>
                      <a href="#" className="block hover:text-gray-300">
                        FAQ
                      </a>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row justify-between items-center border-t border-gray-800 pt-4">
                  <span>Powered by Layer Zero.</span>
                  <div className="flex space-x-4 mt-4 md:mt-0">
                    <a href="#" className="hover:text-gray-300">
                      Terms of Use
                    </a>
                    <a href="#" className="hover:text-gray-300">
                      Privacy Policy
                    </a>
                    <a href="#" className="hover:text-gray-300">
                      Cookie Policy
                    </a>
                  </div>
                </div>
              </div>
            </footer>
          )}
        </div>
      </body>
    </html>
  );
}
