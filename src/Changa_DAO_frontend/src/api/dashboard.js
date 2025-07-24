// Mock backend API for dashboard

export async function getDashboardData() {
  await new Promise((res) => setTimeout(res, 500));
  return {
    totalMembers: 42,
    totalProposals: 17,
    treasury: 12345.67,
    recentActivity: [
      { type: "proposal", text: "Proposal #17 created" },
      { type: "vote", text: "You voted on Proposal #16" },
    ],
  };
} 