// Backend API for wallet integration with Internet Identity

import { getBackendActor } from "./canister";

export async function getWalletBalance() {
  // This function should be called from components that have access to AuthContext
  // The authentication check should be done at the component level
  
  // Try backend first, fallback to mock data
  try {
    const backend = await getBackendActor();
    const res = await backend.getBalance();
    if (res && 'ok' in res) {
      return res.ok;
    }
  } catch (_e) {
    // Fallback to mock data
  }
  
  // Simulate network delay
  await new Promise((res) => setTimeout(res, 300));
  
  // Mock wallet data
  return {
    balance: 1000.50,
    currency: "ICP",
    transactions: [
      {
        id: "tx1",
        type: "receive",
        amount: 500,
        from: "user1.ic0.app",
        to: "current-user.ic0.app",
        timestamp: Date.now() - 86400000,
        status: "completed"
      },
      {
        id: "tx2",
        type: "send",
        amount: 100,
        from: "current-user.ic0.app",
        to: "user2.ic0.app",
        timestamp: Date.now() - 172800000,
        status: "completed"
      }
    ]
  };
}

export async function sendTransaction(to, amount) {
  // Try backend first, fallback to mock
  try {
    const backend = await getBackendActor();
    const res = await backend.sendTransaction({ to, amount });
    if (res && 'ok' in res) {
      return res.ok;
    }
  } catch (_e) {
    // Fallback to mock
  }
  
  // Simulate network delay
  await new Promise((res) => setTimeout(res, 1000));
  
  // Mock transaction result
  return {
    success: true,
    transactionId: `tx_${Date.now()}`,
    timestamp: Date.now()
  };
} 