// layouts/SiteOneLayout.js
// import { Button } from "@/components/ui/button";
// import Sidebar from "../components/Sidebar";
import localFont from "next/font/local";

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

export default function SymbiosisLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex h-screen bg-background">
          <main className="flex-1 pb-8 relative   overflow-auto">
            <img
              src="/symbiosis/7324371f5b8b734d87b9.svg"
              alt="Symbiosis"
              className="rounded-2xl h-[70%] z-0 left-0 bottom-0 md:fixed hidden"
            />
            <img
              src="/symbiosis/c442a1ebb2587de09ed1.svg"
              alt="Symbiosis"
              className="rounded-2xl h-[70%] z-0 right-0 bottom-0 md:fixed hidden"
            />
            <div className=" mx-auto">
              {/* <div className="absolute z-10 top-0 right-5 mt-4 mb-4">
                <Button variant="destructive">Connect Wallet</Button>
              </div> */}
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
