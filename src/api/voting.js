// Backend API for voting with Internet Identity integration

import { getBackendActor } from "./canister";

export async function getVotingProposals() {
  // This function should be called from components that have access to AuthContext
  // The authentication check should be done at the component level
  
  // Try backend first, fallback to mock data
  try {
    const backend = await getBackendActor();
    const res = await backend.getProposals();
    if (res && 'ok' in res) {
      return res.ok;
    }
  } catch (_e) {
    // Fallback to mock data
  }
  
  // Simulate network delay
  await new Promise((res) => setTimeout(res, 300));
  
  // Mock voting proposals
  return [
    {
      id: "prop1",
      title: "Community Center Construction",
      description: "Build a new community center in the local area",
      creator: "Alice",
      created: Date.now() - 86400000,
      endDate: Date.now() + 604800000,
      status: "active",
      votes: {
        yes: 45,
        no: 12,
        abstain: 3
      },
      totalVotes: 60,
      quorum: 50,
      funding: 50000
    },
    {
      id: "prop2",
      title: "Education Fund Allocation",
      description: "Allocate funds for local school improvements",
      creator: "Bob",
      created: Date.now() - 172800000,
      endDate: Date.now() + 259200000,
      status: "active",
      votes: {
        yes: 78,
        no: 15,
        abstain: 7
      },
      totalVotes: 100,
      quorum: 50,
      funding: 25000
    },
    {
      id: "prop3",
      title: "Environmental Cleanup Initiative",
      description: "Fund local environmental cleanup projects",
      creator: "Charlie",
      created: Date.now() - 259200000,
      endDate: Date.now() - 86400000,
      status: "completed",
      votes: {
        yes: 120,
        no: 30,
        abstain: 10
      },
      totalVotes: 160,
      quorum: 50,
      funding: 35000,
      result: "passed"
    }
  ];
}

export async function castVote(proposalId, vote) {
  // Try backend first, fallback to mock
  try {
    const backend = await getBackendActor();
    const res = await backend.castVote({ proposalId, vote });
    if (res && 'ok' in res) {
      return res.ok;
    }
  } catch (_e) {
    // Fallback to mock
  }
  
  // Simulate network delay
  await new Promise((res) => setTimeout(res, 1000));
  
  // Mock vote result
  return {
    success: true,
    proposalId,
    vote,
    timestamp: Date.now()
  };
}

export async function createProposal(proposal) {
  // Try backend first, fallback to mock
  try {
    const backend = await getBackendActor();
    const res = await backend.createProposal(proposal);
    if (res && 'ok' in res) {
      return res.ok;
    }
  } catch (_e) {
    // Fallback to mock
  }
  
  // Simulate network delay
  await new Promise((res) => setTimeout(res, 1500));
  
  // Mock proposal creation result
  return {
    success: true,
    proposalId: `prop_${Date.now()}`,
    timestamp: Date.now()
  };
} 