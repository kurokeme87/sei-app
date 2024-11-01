// layouts/SiteOneLayout.js
import { Button } from "@/components/ui/button";
import Sidebar from "../components/Sidebar";
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

export default function SeiLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex h-screen bg-background">
          <Sidebar />
          <main className="flex-1 pb-8 relative  pt-4 overflow-auto">
            <div className=" mx-auto">
              <div className="absolute z-10 top-0 right-5 mt-4 mb-4">
                <Button variant="destructive">Connect Wallet</Button>
              </div>
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
