import BtcConnectProvider from "@/components/providers/BtcConnectProvider";
import SymbiosisProvider from "@/components/providers/SymbiosisProvier";
import TonProvider from "@/components/providers/TonProvider";
import TronWalletProvider from "@/components/providers/TronWalletProvider";
import SymbioWalletModal from "@/components/symbiosis/SymbioWalletModal";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Symbiosis | Swap",
  description: "Symbiosis swap",
  icons: "/symbiosis/download.svg",
  keywords: "Symbiosis swap, symbiosis app, sei symbiosis",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Symbiosis</title>
      </head>
      <body>
        <TonProvider>
          <BtcConnectProvider>
            <SymbiosisProvider>
              <TronWalletProvider>
                {children}
                <SymbioWalletModal />
              </TronWalletProvider>
            </SymbiosisProvider>
          </BtcConnectProvider>
        </TonProvider>
      </body>
    </html>
  );
}
