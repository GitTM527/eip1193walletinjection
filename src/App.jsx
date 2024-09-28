import  { useState } from "react";
import {ethers } from "ethers";
import useWallet  from "./hooks/usewallet";

const App = () => {
  const { 
    account, 
    network, 
    balance, 
    loading, 
    connectWallet, 
    getBalance, 
    error } = useWallet();
  
  const [address, setAddress] = useState("");
  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleGetBalance = () => {
    if (ethers.isAddress(address)) {
      getBalance(address);
    } else {
      alert("Please enter a valid Ethereum address.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10 font-sans">
      <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-8">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Wallet Connection Implementing EIP1193</h1>
  
        {!account ? (
          <button 
            onClick={connectWallet} 
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-md transition-all duration-300"
          >
            Connect Wallet
          </button>
        ) : (
          <div className="text-center">
            <p className="text-lg text-gray-600">
              Wallet Connected: <strong>{account}</strong>
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Network: <strong>{network?.name} (Chain ID: {network?.chainId})</strong>
            </p>
          </div>
        )}
  
        {error && (
          <p className="text-red-500 text-center mt-4">{error}</p>
        )}
  
        {account && (
          <div className="mt-8 flex flex-col space-y-4">
            <input
              type="text"
              value={address}
              onChange={handleAddressChange}
              placeholder="Enter wallet address"
              className="px-4 py-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleGetBalance}
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-md transition-all duration-300"
            >
              Get Balance
            </button>
          </div>
        )}
  
        {loading && (
          <p className="text-gray-500 text-center mt-4">Loading balance...</p>
        )}
  
        {balance && (
          <div className="mt-8 text-center">
            <p className="text-lg text-gray-700">
              Balance: <strong>{balance} ETH</strong>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;