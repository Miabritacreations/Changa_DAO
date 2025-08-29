// Backend API for proposals with Internet Identity integration

import { getBackendActor } from "./canister";

export async function getProposals() {
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
  
  // Mock proposals data
  return [
    {
      id: "prop1",
      title: "Community Center Construction",
      description: "Build a new community center in the local area to serve as a hub for community activities, education, and social gatherings.",
      creator: "Alice",
      created: Date.now() - 86400000,
      endDate: Date.now() + 604800000,
      status: "active",
      category: "infrastructure",
      funding: 50000,
      votes: {
        yes: 45,
        no: 12,
        abstain: 3
      },
      totalVotes: 60,
      quorum: 50,
      attachments: ["blueprint.pdf", "budget.xlsx"]
    },
    {
      id: "prop2",
      title: "Education Fund Allocation",
      description: "Allocate funds for local school improvements including new computers, library books, and after-school programs.",
      creator: "Bob",
      created: Date.now() - 172800000,
      endDate: Date.now() + 259200000,
      status: "active",
      category: "education",
      funding: 25000,
      votes: {
        yes: 78,
        no: 15,
        abstain: 7
      },
      totalVotes: 100,
      quorum: 50,
      attachments: ["education_plan.pdf"]
    },
    {
      id: "prop3",
      title: "Environmental Cleanup Initiative",
      description: "Fund local environmental cleanup projects including river restoration, tree planting, and waste management improvements.",
      creator: "Charlie",
      created: Date.now() - 259200000,
      endDate: Date.now() - 86400000,
      status: "completed",
      category: "environment",
      funding: 35000,
      votes: {
        yes: 120,
        no: 30,
        abstain: 10
      },
      totalVotes: 160,
      quorum: 50,
      result: "passed",
      attachments: ["environmental_assessment.pdf", "timeline.pdf"]
    },
    {
      id: "prop4",
      title: "Healthcare Access Program",
      description: "Establish a mobile healthcare unit to provide basic medical services to underserved areas in the community.",
      creator: "Diana",
      created: Date.now() - 345600000,
      endDate: Date.now() - 172800000,
      status: "completed",
      category: "healthcare",
      funding: 40000,
      votes: {
        yes: 95,
        no: 25,
        abstain: 10
      },
      totalVotes: 130,
      quorum: 50,
      result: "passed",
      attachments: ["healthcare_proposal.pdf", "cost_analysis.xlsx"]
    }
  ];
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

export async function updateProposal(proposalId, updates) {
  // Try backend first, fallback to mock
  try {
    const backend = await getBackendActor();
    const res = await backend.updateProposal({ proposalId, updates });
    if (res && 'ok' in res) {
      return res.ok;
    }
  } catch (_e) {
    // Fallback to mock
  }
  
  // Simulate network delay
  await new Promise((res) => setTimeout(res, 1000));
  
  // Mock update result
  return {
    success: true,
    proposalId,
    timestamp: Date.now()
  };
}

export async function deleteProposal(proposalId) {
  // Try backend first, fallback to mock
  try {
    const backend = await getBackendActor();
    const res = await backend.deleteProposal(proposalId);
    if (res && 'ok' in res) {
      return res.ok;
    }
  } catch (_e) {
    // Fallback to mock
  }
  
  // Simulate network delay
  await new Promise((res) => setTimeout(res, 800));
  
  // Mock delete result
  return {
    success: true,
    proposalId,
    timestamp: Date.now()
  };
} 