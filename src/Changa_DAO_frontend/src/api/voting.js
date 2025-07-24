// Mock backend API for voting

export async function getVotes() {
  await new Promise((res) => setTimeout(res, 500));
  return [
    { id: 1, proposal: "Increase treasury cap", votesFor: 30, votesAgainst: 12 },
    { id: 2, proposal: "Add new member", votesFor: 25, votesAgainst: 17 },
  ];
}

export async function submitVote(voteId, support) {
  await new Promise((res) => setTimeout(res, 500));
  // In a real backend, you'd update the vote tally
  return { success: true, voteId, support };
} 