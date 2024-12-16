import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Symbiosis",
  description: "Symbiosis",
  icons: "./icon.ico",
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
      <body>{children}</body>
    </html>
  );
}
