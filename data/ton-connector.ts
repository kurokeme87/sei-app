import { isMobile, openLink } from "@/lib/utils";
import {
  SendTransactionRequest,
  TonConnect,
  UserRejectsError,
  WalletInfo,
  WalletInfoInjected,
} from "@tonconnect/sdk";

const dappMetadata = {
  manifestUrl: "https://symbiosisfinances.com/tonconnect-manifest.json",
};

export const tonConnector = new TonConnect(dappMetadata);

export async function sendTransaction(
  tx: SendTransactionRequest,
  wallet: WalletInfo
): Promise<{ boc: string }> {
  try {
    if (
      "universalLink" in wallet &&
      !(wallet as WalletInfoInjected).embedded &&
      isMobile()
    ) {
      openLink(addReturnStrategy(wallet.universalLink, "none"), "_blank");
    }

    const result = await tonConnector.sendTransaction(tx);
    // notification.success({
    // 	message: 'Successful transaction',
    // 	description:
    // 		'You transaction was successfully sent. Please wait until the transaction is included to the TON blockchain.',
    // 	duration: 5,
    // });
    console.log(`Send tx result: ${JSON.stringify(result)}`);
    return result;
  } catch (e) {
    let message = "Send transaction error";
    let description = "";

    if (typeof e === "object" && e instanceof UserRejectsError) {
      message = "You rejected the transaction";
      description = "Please try again and confirm transaction in your wallet.";
    }

    console.log(e);
    throw e;
  }
}

export function addReturnStrategy(
  url: string,
  returnStrategy: "back" | "none"
): string {
  const link = new URL(url);
  link.searchParams.append("ret", returnStrategy);
  return link.toString();
}
