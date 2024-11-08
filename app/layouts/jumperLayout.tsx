// layouts/SiteOneLayout.js

"use client";

import SeiConnectButton from "@/components/global/SeiConnectButton";
import {
  AccountButton,
  BalanceButton,
} from "@/components/jumper/AccountButton";
// import { DiscordLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons";
import {
  ArrowLeft,
  Bell,
  ChevronRight,
  CircleUser,
  FileCode,
  Globe,
  // GraduationCap,
  GraduationCapIcon,
  Menu,
  Moon,
  Search,
  Sun,
} from "lucide-react";
import localFont from "next/font/local";
import Link from "next/link";
// import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { FaDiscord, FaFolder, FaGithub, FaXTwitter } from "react-icons/fa6";
import { useAccount } from "wagmi";

const languages = [
  { name: "English", symbol: "EN" },
  { name: "Spanish", symbol: "ES" },
  { name: "French", symbol: "FR" },
  { name: "German", symbol: "DE" },
  { name: "Chinese (Simplified)", symbol: "ZH-CN" },
  { name: "Japanese", symbol: "JA" },
  { name: "Korean", symbol: "KO" },
  { name: "Italian", symbol: "IT" },
  { name: "Portuguese", symbol: "PT" },
  { name: "Russian", symbol: "RU" },
  { name: "Arabic", symbol: "AR" },
  { name: "Dutch", symbol: "NL" },
  { name: "Swedish", symbol: "SV" },
  { name: "Norwegian", symbol: "NO" },
  { name: "Danish", symbol: "DA" },
  { name: "Finnish", symbol: "FI" },
  { name: "Polish", symbol: "PL" },
  { name: "Turkish", symbol: "TR" },
  { name: "Greek", symbol: "EL" },
  { name: "Czech", symbol: "CS" },
  { name: "Hungarian", symbol: "HU" },
  { name: "Romanian", symbol: "RO" },
  { name: "Hindi", symbol: "HI" },
  { name: "Thai", symbol: "TH" },
  { name: "Vietnamese", symbol: "VI" },
];

export default function JumperLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const pathname = usePathname();
  // const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [mode, setMode] = useState("moon");
  const [view, setView] = useState("main");
  const [language, setLanguage] = useState("EN");
  const { isConnected } = useAccount();

  //   console.log(pathname);

  return (
    <html lang="en">
      <body
        className={`font-inter`}
        style={{
          background: "linear-gradient(135deg, #1A0F38 0%, #2C0F4A 100%)",
        }}
      >
        <nav className="flex justify-between items-center px-6 py-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="jumper-logo"
            width="100%"
            height="20%"
            fill="#BEA0EB"
          >
            <path
              className="main-color"
              d="M17.145 16 5.83 27.314l2.828 2.828c1.414 1.414 4.243 1.414 5.657 0L25.63 18.828c1.414-1.414 1.414-4.242 0-5.656l-5.657-5.657-5.657 5.657L17.145 16Z"
            ></path>
            <path
              fill="#D35CFF"
              className="sub-color"
              d="M5.831 4.686 8.66 1.858c1.415-1.414 4.243-1.414 5.657 0l2.829 2.828-5.657 5.657L5.83 4.686Z"
            ></path>
            <path
              className="main-color jumper-logo-desktop"
              d="M132.002 18h4v-6h12v-2c0-1-1-2-2-2h-12c-1 0-2 1-2 2v8Z"
            ></path>
            <path
              fill="#D35CFF"
              className="sub-color jumper-logo-desktop"
              d="M136.002 24h-2c-1 0-2-1-2-2v-2h4v4Z"
            ></path>
            <path
              className="main-color jumper-logo-desktop"
              d="M117.002 20v-2.667h10v-2.666h-10V12h12v-2c0-1-1-2-2-2h-12c-1 0-2 1-2 2v12c0 1 1 2 2 2h12c1 0 2-1 2-2v-2h-12Zm-22 0h4v4h-2c-1 0-2-1-2-2v-2Z"
            ></path>
            <path
              className="main-color jumper-logo-desktop"
              fill-rule="evenodd"
              d="M97.002 8c-1 0-2 1-2 2v10h10c4 0 6-3 6-6s-2-6-6-6h-8Zm8 4h-6v4h6c1.5 0 2-1.264 2-2s-.5-2-2-2Z"
              clip-rule="evenodd"
            ></path>
            <path
              className="main-color jumper-logo-desktop"
              d="M92.002 10c0-1-1-2-2-2h-12c-1 0-2 1-2 2v12c0 1 1 2 2 2h2V12h2.5v12h3V12h2.5v12h2c1 0 2-1 2-2V10Zm-34.999 0c0-1 1-2 2-2h2v12h8V8h2c1 0 2 1 2 2v12c0 1-1 2-2 2h-12c-1 0-2-1-2-2V10Z"
            ></path>
            <path
              fill="#D35CFF"
              className="sub-color jumper-logo-desktop"
              d="M50.007 8h1.996c1 0 2 1 2 2l.004 2h-4V8Z"
            ></path>
            <path
              className="main-color jumper-logo-desktop"
              d="M54.007 14h-4v6h-12l-.005 2c0 1 1 2 2 2h12c1 0 2.005-1 2-2l.005-8Z"
            ></path>
            <style type="text/css"></style>
          </svg>

          <div className="flex items-center gap-4">
            <SeiConnectButton
              connect={
                <button className="px-6 py-3 font-semibold rounded-full bg-[#543188] text-white">
                  Connect
                </button>
              }
            />
            {isConnected ? <BalanceButton /> : null}
            {isConnected ? <AccountButton /> : null}
            <button id="menu-button" onClick={() => setShowMenu(!showMenu)}>
              <Menu className="text-[#BEA0EB] w-8 h-8" />
            </button>
          </div>
        </nav>
        {showMenu && (
          <div
            onClick={() => setShowMenu(false)}
            className="bg-transparent z-10 w-full absolute h-full"
          ></div>
        )}
        {showMenu && (
          <div
            id="menu"
            className="absolute z-20 right-4 h-[490px] overflow-auto top-18 bg-[#120F29] rounded-lg p-4 w-[300px] text-white shadow-lg"
          >
            <div className="relative">
              {view === "main" ? (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex w-full  justify-between gap-2 p-1 bg-[#3F2D60] rounded-3xl">
                      <div
                        onClick={() => {
                          setMode("sun");
                        }}
                        className={`${
                          mode === "sun" && "bg-[#675A81]"
                        } px-6 py-2 rounded-3xl cursor-pointer hover:bg-[#413472]`}
                      >
                        <Sun className="w-5 h-5" />
                      </div>
                      <div
                        onClick={() => {
                          setMode("moon");
                        }}
                        className={`${
                          mode === "moon" && "bg-[#675A81]"
                        } px-6 py-2 rounded-3xl cursor-pointer hover:bg-[#413472]`}
                      >
                        <Moon className="w-5 h-5 " />
                      </div>
                      <div
                        onClick={() => {
                          setMode("bell");
                        }}
                        className={`${
                          mode === "bell" && "bg-[#675A81]"
                        } px-6 py-2 rounded-3xl cursor-pointer hover:bg-[#413472]`}
                      >
                        <Bell className="w-5 h-5 " />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div
                      onClick={() => setView("language")}
                      className="flex cursor-pointer hover:bg-[#413472]  rounded-lg p-1 justify-between items-center"
                    >
                      <div className="flex gap-4">
                        <Globe className="text-white" />
                        <span>Language</span>
                      </div>
                      <div className="flex gap-3 items-center">
                        <span>{language}</span>
                        <ChevronRight />
                      </div>
                    </div>
                    <div
                      onClick={() => setView("developer")}
                      className="flex cursor-pointer hover:bg-[#413472]  rounded-lg p-1 justify-between items-center"
                    >
                      <div className="flex gap-4">
                        <FileCode className="text-white" />
                        <span>Developer</span>
                      </div>

                      <ChevronRight />
                    </div>
                    <div className="flex cursor-pointer hover:bg-[#413472]  rounded-lg p-1 justify-between items-center">
                      <Link href="/jumper/profile">
                        <div className="flex gap-4">
                          <CircleUser className="text-white" />
                          <span>Jumper Profile</span>
                        </div>
                      </Link>
                    </div>
                    <div className="flex cursor-pointer hover:bg-[#413472]  rounded-lg p-1 justify-between items-center">
                      <Link
                        target="_blank"
                        href="https://jumper.exchange/learn"
                      >
                        <div className="flex gap-4">
                          <GraduationCapIcon className="text-white" />
                          <span>Jumper Learn</span>
                        </div>
                      </Link>
                    </div>
                    <div className="flex cursor-pointer hover:bg-[#413472]  rounded-lg p-1 justify-between items-center">
                      <Link target="_blank" href="https://jumper.exchange/swap">
                        <div className="flex gap-4">
                          <Search className="text-white" />
                          <span>Jumper Scan</span>
                        </div>
                      </Link>
                    </div>
                    <div className="flex cursor-pointer hover:bg-[#413472]  rounded-lg p-1 justify-between items-center">
                      <Link target="_blank" href="https://x.com/JumperExchange">
                        <div className="flex items-center gap-4">
                          <FaXTwitter className="text-white text-[25px]" />
                          <span>X</span>
                        </div>
                      </Link>
                    </div>
                    <div className="flex cursor-pointer hover:bg-[#413472]  rounded-lg p-1 justify-between items-center">
                      <Link
                        target="_blank"
                        href="https://discord.gg/jumperexchange"
                      >
                        <div className="flex items-center gap-4">
                          <FaDiscord className="text-white text-[25px]" />
                          <span>Discord</span>
                        </div>
                      </Link>
                    </div>
                    <button className="w-full flex items-center justify-center gap-2 py-2 rounded-full bg-[#41276D] mt-4">
                      <FaDiscord className="text-white text-[25px]" />
                      Support
                    </button>
                  </div>
                </div>
              ) : view === "language" ? (
                <div className="overflow-auto">
                  <div className="absolute left-4 top-2 gap-4 mb-6">
                    <ArrowLeft
                      className="text-white cursor-pointer"
                      onClick={() => setView("main")}
                    />
                  </div>
                  <h2 className="text-white font-bold text-center text-xl">
                    Language
                  </h2>
                  <div className="mt-2">
                    {languages.map((lang) => (
                      <div
                        key={lang.name}
                        onClick={() => {
                          setLanguage(lang.symbol);
                          setView("main");
                        }}
                        className="text-white hover:bg-[#413472]  rounded-lg px-1 py-3"
                      >
                        {lang.name}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="overflow-auto">
                  <div className="absolute left-4 top-2 gap-4 mb-6">
                    <ArrowLeft
                      className="text-white cursor-pointer"
                      onClick={() => setView("main")}
                    />
                  </div>
                  <h2 className="text-white font-bold text-center text-xl">
                    Developers
                  </h2>
                  <div className="mt-2">
                    <div
                      onClick={() => {
                        setView("main");
                      }}
                      className="text-white hover:bg-[#413472] flex items-center gap-3  rounded-lg px-1 py-3"
                    >
                      <FaGithub className="text-white text-[25px]" />
                      Discord
                    </div>
                    <div
                      onClick={() => {
                        setView("main");
                      }}
                      className="text-white hover:bg-[#413472] flex items-center gap-3   rounded-lg px-1 py-3"
                    >
                      <FaFolder className="text-white text-[25px]" /> Brand
                      Assets
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        <div className=" flex flex-col  text-white">
          <main className="flex-grow overflow-auto container mx-auto pt-[35px] pb-[100px] ">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
