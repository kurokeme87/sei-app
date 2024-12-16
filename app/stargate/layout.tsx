import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Transfer | Stargate",
  description: "Stargate finance",
  icons: "../icon.ico",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <section>{children}</section>;
}
