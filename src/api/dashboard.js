// Backend API for dashboard data with Internet Identity integration

import { getBackendActor } from "./canister";

export async function getDashboardData() {
  // This function should be called from components that have access to AuthContext
  // The authentication check should be done at the component level
  
  // Try backend first, fallback to mock data
  try {
    const backend = await getBackendActor();
    const res = await backend.getDashboardData();
    if (res && 'ok' in res) {
      return res.ok;
    }
  } catch (_e) {
    // Fallback to mock data
  }
  
  // Simulate network delay
  await new Promise((res) => setTimeout(res, 300));
  
  // Mock dashboard data
  return {
    totalProjects: 15,
    activeProposals: 8,
    totalMembers: 1250,
    totalFunds: 50000,
    recentActivity: [
      {
        id: "act1",
        type: "proposal_created",
        title: "New Community Center Proposal",
        user: "Alice",
        timestamp: Date.now() - 3600000,
        status: "active"
      },
      {
        id: "act2",
        type: "vote_cast",
        title: "Education Fund Allocation",
        user: "Bob",
        timestamp: Date.now() - 7200000,
        status: "completed"
      },
      {
        id: "act3",
        type: "project_funded",
        title: "Clean Water Initiative",
        user: "Charlie",
        timestamp: Date.now() - 10800000,
        status: "funded"
      }
    ],
    stats: {
      proposalsThisMonth: 12,
      votesThisMonth: 89,
      fundsDistributed: 15000,
      newMembers: 45
    }
  };
}

export async function getRecentTransactions() {
  // Try backend first, fallback to mock data
  try {
    const backend = await getBackendActor();
    const res = await backend.getRecentTransactions();
    if (res && 'ok' in res) {
      return res.ok;
    }
  } catch (_e) {
    // Fallback to mock data
  }
  
  // Simulate network delay
  await new Promise((res) => setTimeout(res, 200));
  
  // Mock transaction data
  return [
    {
      id: "tx1",
      type: "fund_transfer",
      amount: 5000,
      from: "DAO Treasury",
      to: "Project A",
      timestamp: Date.now() - 86400000,
      status: "completed"
    },
    {
      id: "tx2",
      type: "member_contribution",
      amount: 100,
      from: "Member123",
      to: "DAO Treasury",
      timestamp: Date.now() - 172800000,
      status: "completed"
    }
  ];
} 