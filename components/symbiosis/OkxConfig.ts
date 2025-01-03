import { OKXUniversalConnectUI } from "@okxconnect/ui";

let okxUniversalConnectUI: any = null;

export const getOkxUniversalConnectUI = async () => {
  if (!okxUniversalConnectUI) {
    await OKXUniversalConnectUI.init({
      dappMetaData: {
        icon: "/stargate/symbiosis-icon.png",
        name: "OKX Connect Symbiosis",
      },
      actionsConfiguration: {
        returnStrategy: "tg://resolve",
        modals: "all",
      },
      language: "en_US",
      uiPreferences: {
        theme: "SYSTEM",
      },
    }).then((res) => {
      okxUniversalConnectUI = res;
    });
  }
  return okxUniversalConnectUI;
};
