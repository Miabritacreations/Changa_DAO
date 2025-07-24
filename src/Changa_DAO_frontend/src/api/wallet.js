// Mock backend API for wallet integration

export async function getWalletInfo() {
  await new Promise((res) => setTimeout(res, 500));
  return {
    address: "0x1234...abcd",
    balance: 100.5,
    network: "ICP Testnet",
    connected: true,
  };
}

export async function connectWallet() {
  await new Promise((res) => setTimeout(res, 500));
  // In a real backend, you'd trigger wallet connection
  return { success: true };
} 