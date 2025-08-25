import { Actor, HttpAgent } from '@dfinity/agent';
import { AuthClient } from '@dfinity/auth-client';

// Minimal candid for used methods
const idlFactory = ({ IDL }) => {
  const KYCStatus = IDL.Variant({
    Pending: IDL.Null,
    Verified: IDL.Null,
    Rejected: IDL.Null,
    NotSubmitted: IDL.Null,
  });

  const UserProfile = IDL.Record({
    id: IDL.Principal,
    username: IDL.Text,
    email: IDL.Text,
    fullName: IDL.Text,
    bio: IDL.Text,
    location: IDL.Text,
    avatar: IDL.Opt(IDL.Text),
    reputation: IDL.Nat,
    governanceTokens: IDL.Nat,
    dateJoined: IDL.Int,
    isVerified: IDL.Bool,
    kycStatus: KYCStatus,
  });

  const ProjectStatus = IDL.Variant({
    Draft: IDL.Null,
    PendingReview: IDL.Null,
    Active: IDL.Null,
    MilestoneInProgress: IDL.Null,
    Completed: IDL.Null,
    Cancelled: IDL.Null,
    Disputed: IDL.Null,
  });

  const Project = IDL.Record({
    id: IDL.Nat,
    title: IDL.Text,
    description: IDL.Text,
    category: IDL.Text,
    location: IDL.Text,
    latitude: IDL.Float64,
    longitude: IDL.Float64,
    goalAmount: IDL.Nat,
    raisedAmount: IDL.Nat,
    creator: IDL.Principal,
    status: ProjectStatus,
    nftSupply: IDL.Nat,
    nftPrice: IDL.Nat,
    dateCreated: IDL.Int,
    dateUpdated: IDL.Int,
    tags: IDL.Vec(IDL.Text),
  });

  const ProposalType = IDL.Variant({
    ProjectApproval: IDL.Null,
    MilestoneApproval: IDL.Null,
    GovernanceChange: IDL.Null,
    TreasuryAllocation: IDL.Null,
    EmergencyAction: IDL.Null,
  });

  const ProposalStatus = IDL.Variant({
    Active: IDL.Null,
    Passed: IDL.Null,
    Failed: IDL.Null,
    Executed: IDL.Null,
    Cancelled: IDL.Null,
  });

  const Document = IDL.Record({
    id: IDL.Text,
    name: IDL.Text,
    contentType: IDL.Text,
    size: IDL.Nat,
    uploadDate: IDL.Int,
    hash: IDL.Text,
  });

  const Proposal = IDL.Record({
    id: IDL.Nat,
    title: IDL.Text,
    description: IDL.Text,
    proposer: IDL.Principal,
    proposalType: IDL.Variant({
      ProjectApproval: IDL.Null,
      MilestoneApproval: IDL.Null,
      GovernanceChange: IDL.Null,
      TreasuryAllocation: IDL.Null,
      EmergencyAction: IDL.Null,
    }),
    status: IDL.Variant({
      Active: IDL.Null,
      Passed: IDL.Null,
      Failed: IDL.Null,
      Executed: IDL.Null,
      Cancelled: IDL.Null,
    }),
    votesFor: IDL.Nat,
    votesAgainst: IDL.Nat,
    totalVotes: IDL.Nat,
    quorum: IDL.Nat,
    startDate: IDL.Int,
    endDate: IDL.Int,
    executed: IDL.Bool,
    executionDate: IDL.Opt(IDL.Int),
    documents: IDL.Vec(Document), // Added documents field
  });

  const DashboardData = IDL.Record({
    totalMembers: IDL.Nat,
    totalProjects: IDL.Nat,
    totalProposals: IDL.Nat,
    treasury: IDL.Nat,
    recentActivity: IDL.Vec(IDL.Text),
    activeProjects: IDL.Vec(Project),
  });

  const WalletInfo = IDL.Record({
    balance: IDL.Nat,
    governanceTokens: IDL.Nat,
    totalDonated: IDL.Nat,
    totalImpact: IDL.Nat,
  });

  // Now define Result types after the main types are defined
  const Result_UserProfile = IDL.Variant({ ok: UserProfile, err: IDL.Text });
  const Result_Project = IDL.Variant({ ok: Project, err: IDL.Text });
  const Result_Proposal = IDL.Variant({ ok: Proposal, err: IDL.Text });
  const Result_Nat = IDL.Variant({ ok: IDL.Nat, err: IDL.Text });

  return IDL.Service({
    getProposals: IDL.Func([], [IDL.Vec(Proposal)], ['query']),
    getProjects: IDL.Func([], [IDL.Vec(Project)], ['query']),
    getDashboardData: IDL.Func([], [DashboardData], ['query']),
    getWalletInfo: IDL.Func([IDL.Principal], [IDL.Opt(WalletInfo)], ['query']),
    getCurrentUserProfile: IDL.Func([], [IDL.Opt(UserProfile)], ['query']),
    getUserProfile: IDL.Func([IDL.Principal], [IDL.Opt(UserProfile)], ['query']),
    createUserProfile: IDL.Func([IDL.Record({
      username: IDL.Text,
      email: IDL.Text,
      fullName: IDL.Text,
      bio: IDL.Text,
      location: IDL.Text,
      avatar: IDL.Opt(IDL.Text),
    })], [Result_UserProfile], []),
    createProject: IDL.Func([IDL.Record({
      title: IDL.Text,
      description: IDL.Text,
      category: IDL.Text,
      location: IDL.Text,
      latitude: IDL.Float64,
      longitude: IDL.Float64,
      goalAmount: IDL.Nat,
      nftSupply: IDL.Nat,
      nftPrice: IDL.Nat,
      tags: IDL.Vec(IDL.Text),
    })], [Result_Project], []),
    createProposal: IDL.Func([IDL.Record({
      title: IDL.Text,
      description: IDL.Text,
      proposalType: IDL.Variant({
        ProjectApproval: IDL.Null,
        MilestoneApproval: IDL.Null,
        GovernanceChange: IDL.Null,
        TreasuryAllocation: IDL.Null,
        EmergencyAction: IDL.Null,
      }),
      quorum: IDL.Nat,
      endDate: IDL.Int,
      documents: IDL.Vec(Document), // Added documents parameter
    })], [Result_Proposal], []),
    vote: IDL.Func([IDL.Nat, IDL.Bool], [Result_Proposal], []),
  });
};

const canisterId =
  import.meta.env.CANISTER_ID_CHANGA_DAO_BACKEND ||
  window?.CANISTER_ID_CHANGA_DAO_BACKEND ||
  process.env.CANISTER_ID_CHANGA_DAO_BACKEND;

const isLocal =
  import.meta.env.DFX_NETWORK === 'local' ||
  process.env.DFX_NETWORK === 'local' ||
  location.hostname === 'localhost' ||
  location.hostname === '127.0.0.1';

const host = isLocal ? 'http://127.0.0.1:4943' : 'https://ic0.app';

let cachedActor = null;

export async function getBackendActor() {
  if (cachedActor) return cachedActor;

  const authClient = await AuthClient.create();
  const identity = (await authClient.isAuthenticated()) ? authClient.getIdentity() : undefined;

  const agent = new HttpAgent({ host, identity });
  if (isLocal) {
    try { await agent.fetchRootKey(); } catch (_e) {}
  }

  // Retry createActor if transient transport errors occur
  let lastError = null;
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      cachedActor = Actor.createActor(idlFactory, { agent, canisterId });
      // Probe a lightweight query to confirm connectivity
      if (cachedActor.getDashboardData) {
        await cachedActor.getDashboardData().catch(() => {});
      }
      break;
    } catch (e) {
      lastError = e;
      await new Promise(r => setTimeout(r, 300 * (attempt + 1)));
    }
  }
  if (!cachedActor && lastError) throw lastError;
  return cachedActor;
}
