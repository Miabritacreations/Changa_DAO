// Mock backend API for proposals

export async function getProposals() {
  await new Promise((res) => setTimeout(res, 500));
  return [
    { id: 1, title: "Increase treasury cap", description: "Proposal to increase the DAO treasury cap to 20,000 ICP.", status: "Active" },
    { id: 2, title: "Add new member", description: "Proposal to add Alice as a new DAO member.", status: "Passed" },
  ];
}

export async function createProposal(proposal) {
  await new Promise((res) => setTimeout(res, 500));
  // In a real backend, you'd save the proposal
  return { success: true, proposal };
} 