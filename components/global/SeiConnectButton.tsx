import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ReactNode } from "react";

interface ConnectProps {
  component?: ReactNode;
  connect?: ReactNode;
  isWithAccount?: boolean;
}

const SeiConnectButton = ({
  component,
  connect,
  isWithAccount,
}: ConnectProps): ReactNode => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");

        return (
          <div
            role="button"
            onClick={connected ? null : openConnectModal}
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <div
                    role="button"
                    className="w-full"
                    onClick={isWithAccount ? openConnectModal : null}
                  >
                    {connect}
                  </div>
                );
              }
              if (connected) {
                return (
                  <div role="button" onClick={openAccountModal}>
                    {component}
                  </div>
                );
              }
              if (chain.unsupported) {
                return (
                  <button onClick={openChainModal} type="button">
                    Wrong network
                  </button>
                );
              }
              return null;
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};

export default SeiConnectButton;
