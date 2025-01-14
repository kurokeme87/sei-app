"use client";

import { isMobile, openLink } from "@/lib/utils";
import { TonConnect, UserRejectsError, WalletInfo } from "@tonconnect/sdk";

const dappMetadata = {
  manifestUrl: "https://symbiosisfinances.com/tonconnect-manifest.json",
};

export const tonConnector = new TonConnect(dappMetadata);

export function addReturnStrategy(
  url: string,
  returnStrategy: "back" | "none"
): string {
  const link = new URL(url);
  link.searchParams.append("ret", returnStrategy);
  return link.toString();
}
