"use client";

const useGetTronBalance = async () => {
  if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
    try {
      const walletAddress = window.tronWeb.defaultAddress.base58;

      // Get the balance in Sun (1 TRX = 1,000,000 Sun)
      const balanceInSun = await window.tronWeb.trx.getBalance(walletAddress);

      // Convert Sun to TRX
      const balanceInTRX = window.tronWeb.fromSun(balanceInSun);

      console.log(`Wallet Address: ${walletAddress}`);
      console.log(`Balance: ${balanceInTRX} TRX`);
      return balanceInTRX;
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  } else {
    console.error("TronLink wallet is not installed or connected.");
  }
};

export default useGetTronBalance;
