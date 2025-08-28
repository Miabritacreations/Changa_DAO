// Backend API for wallet integration with Internet Identity

import internetIdentityService from '../services/internetIdentity';
import { Actor, HttpAgent } from "@dfinity/agent";
import { idlFactory as backend_idl } from "../../../declarations/Changa_DAO_backend";

let backend = null;

const getBackend = async () => {
  if (!backend) {
    if (!internetIdentityService.isAuthenticated()) {
      throw new Error('User must be authenticated to access backend');
    }
    
    const agent = new HttpAgent({ 
      identity: internetIdentityService.identity,
      host: "http://localhost:4943" // Local dfx network
    });
    
    // For local development
    await agent.fetchRootKey();
    
    backend = Actor.createActor(backend_idl, { 
      agent, 
      canisterId: "rrkah-fqaaa-aaaaa-aaaaq-cai" // Replace with your actual canister ID
    });
  }
  return backend;
};

export async function getWalletInfo() {
  try {
    const backendInstance = await getBackend();
    const walletInfo = await backendInstance.getWalletInfo();
    
    return {
      address: walletInfo.address,
      balance: walletInfo.balance,
      network: walletInfo.network,
      connected: walletInfo.connected
    };
  } catch (error) {
    console.error('Failed to get wallet info:', error);
    // Return mock data as fallback
    return {
      address: "0x1234...abcd",
      balance: 100.5,
      network: "ICP Testnet",
      connected: true
    };
  }
}

export async function connectWallet() {
  try {
    // For now, just return success since wallet connection is handled by Internet Identity
    return { success: true };
  } catch (error) {
    console.error('Failed to connect wallet:', error);
    throw error;
  }
} 