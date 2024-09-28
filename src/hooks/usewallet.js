import { useState, useEffect } from "react";
import { ethers } from "ethers";

const useWallet = () => {
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState("");
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    if (window.ethereum) {
      setProvider(window.ethereum);
      window.ethereum.on("accountsChanged", handleAccountsChanged);
      window.ethereum.on("chainChanged", handleChainChanged);

      // Cleanup event listeners on unmount
      return () => {
        window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
        window.ethereum.removeListener("chainChanged", handleChainChanged);
      };
    }
  }, []);

  const handleAccountsChanged = (accounts) => {
    if (accounts.length > 0) {
      setAddress(accounts[0]);
      fetchBalance(accounts[0]);
    } else {
      setAddress("");
      setBalance("");
    }
  };

  const handleChainChanged = () => {
    if (address) fetchBalance(address);
  };

  const connectWallet = async () => {
    if (provider) {
      try {
        const accounts = await provider.request({ method: "eth_requestAccounts" });
        handleAccountsChanged(accounts);
      } catch (error) {
        console.error("Failed to connect wallet", error);
      }
    }
  };

  const fetchBalance = async (addr) => {
    if (provider) {
      const balance = await provider.request({
        method: "eth_getBalance",
        params: [addr, "latest"],
      });
      setBalance(ethers.formatEther(balance));
    }
  };

  return {
    address,
    balance,
    connectWallet,
    setAddress,
    fetchBalance,
  };
};

export default useWallet;
