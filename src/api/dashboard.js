// Backend API for dashboard data with Internet Identity integration

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

export async function getDashboardData() {
  try {
    const backendInstance = await getBackend();
    const data = await backendInstance.getDashboardData();
    
    return {
      totalMembers: Number(data.totalMembers),
      totalProposals: Number(data.totalProposals),
      treasury: data.treasury,
      recentActivity: data.recentActivity
    };
  } catch (error) {
    console.error('Failed to get dashboard data:', error);
    // Return mock data as fallback
    return {
      totalMembers: 42,
      totalProposals: 17,
      treasury: 12345.67,
      recentActivity: [
        "Proposal #17 created",
        "You voted on Proposal #16"
      ]
    };
  }
} 