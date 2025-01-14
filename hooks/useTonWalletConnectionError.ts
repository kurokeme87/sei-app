import { UserRejectsError } from "@tonconnect/sdk";
import { useCallback, useEffect } from "react";
import { useTonConnect } from "./useTonConnect";

export function useTonWalletConnectionError(callback: () => void) {
  const tonConnect = useTonConnect();
  const errorsHandler = useCallback(
    (error: unknown) => {
      if (typeof error === "object" && error instanceof UserRejectsError) {
        callback();
      }
    },
    [callback]
  );

  const emptyCallback = useCallback(() => {}, []);

  useEffect(() => {
    if (tonConnect?.tonConnect) {
      tonConnect.tonConnect.onStatusChange(emptyCallback, errorsHandler);
    }
  }, [emptyCallback, errorsHandler]);
}
