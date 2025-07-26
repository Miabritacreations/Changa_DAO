// Backend API for proposals with Internet Identity integration

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

export async function getProposals() {
  try {
    const backendInstance = await getBackend();
    const proposals = await backendInstance.getProposals();
    
    return proposals.map(proposal => ({
      id: Number(proposal.id),
      title: proposal.title,
      description: proposal.description,
      status: proposal.status,
      creator: proposal.creator.toString(),
      votesFor: Number(proposal.votesFor),
      votesAgainst: Number(proposal.votesAgainst),
      createdAt: Number(proposal.createdAt),
      expiresAt: Number(proposal.expiresAt)
    }));
  } catch (error) {
    console.error('Failed to get proposals:', error);
    // Return mock data as fallback
    return [
      { 
        id: 1, 
        title: "Increase treasury cap", 
        description: "Proposal to increase the DAO treasury cap to 20,000 ICP.", 
        status: "Active" 
      },
      { 
        id: 2, 
        title: "Add new member", 
        description: "Proposal to add Alice as a new DAO member.", 
        status: "Passed" 
      }
    ];
  }
}

export async function createProposal(proposal) {
  try {
    const backendInstance = await getBackend();
    const result = await backendInstance.createProposal(proposal.title, proposal.description);
    
    if ('ok' in result) {
      return { success: true, id: Number(result.ok) };
    } else {
      throw new Error(result.err);
    }
  } catch (error) {
    console.error('Failed to create proposal:', error);
    throw error;
  }
} 