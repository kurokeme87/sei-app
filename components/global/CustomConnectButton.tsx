import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ReactNode } from "react";

interface ConnectProps {
  connect?: ReactNode;
}

const CustomConnectButton = ({ connect }: ConnectProps): ReactNode => {
  return (
    <ConnectButton.Custom>
      {({ openConnectModal, authenticationStatus, mounted }) => {
        const ready = mounted && authenticationStatus !== "loading";

        return (
          <div
            onClick={openConnectModal}
            // {...(!ready && {
            //   "aria-hidden": true,
            //   style: {
            //     opacity: 0,
            //     pointerEvents: "none",
            //     userSelect: "none",
            //   },
            // })}
          >
            <button onClick={openConnectModal}>{connect}</button>
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};

export default CustomConnectButton;
