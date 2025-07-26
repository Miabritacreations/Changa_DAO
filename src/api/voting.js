// Backend API for voting with Internet Identity integration

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

export async function getVotes() {
  try {
    const backendInstance = await getBackend();
    const proposals = await backendInstance.getProposals();
    
    return proposals.map(proposal => ({
      id: Number(proposal.id),
      proposal: proposal.title,
      votesFor: Number(proposal.votesFor),
      votesAgainst: Number(proposal.votesAgainst),
      status: proposal.status
    }));
  } catch (error) {
    console.error('Failed to get votes:', error);
    // Return mock data as fallback
    return [
      { id: 1, proposal: "Increase treasury cap", votesFor: 30, votesAgainst: 12 },
      { id: 2, proposal: "Add new member", votesFor: 25, votesAgainst: 17 }
    ];
  }
}

export async function submitVote(voteId, support) {
  try {
    const backendInstance = await getBackend();
    const result = await backendInstance.submitVote(voteId, support);
    
    if ('ok' in result) {
      return { success: true, voteId, support };
    } else {
      throw new Error(result.err);
    }
  } catch (error) {
    console.error('Failed to submit vote:', error);
    throw error;
  }
} 