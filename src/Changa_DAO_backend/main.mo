import Array "mo:base/Array";
import Blob "mo:base/Blob";
import Bool "mo:base/Bool";
import Buffer "mo:base/Buffer";
import Debug "mo:base/Debug";
import Error "mo:base/Error";
import Float "mo:base/Float";
import Int "mo:base/Int";
import Int64 "mo:base/Int64";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";
import Nat64 "mo:base/Nat64";
import Option "mo:base/Option";
import Order "mo:base/Order";
import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Text "mo:base/Text";
import Time "mo:base/Time";

shared({ caller = initializer }) actor class Changa_DAO_backend() = this {
  
  // ===== TYPES =====
  
  public type UserProfile = {
    id: Principal;
    username: Text;
    email: Text;
    fullName: Text;
    bio: Text;
    location: Text;
    avatar: ?Text;
    reputation: Nat;
    governanceTokens: Nat;
    dateJoined: Int;
    isVerified: Bool;
    kycStatus: KYCStatus;
  };

  public type KYCStatus = {
    #Pending;
    #Verified;
    #Rejected;
    #NotSubmitted;
  };

  public type ProjectStatus = {
    #Draft;
    #PendingReview;
    #Active;
    #MilestoneInProgress;
    #Completed;
    #Cancelled;
    #Disputed;
  };

  public type Project = {
    id: Nat;
    title: Text;
    description: Text;
    category: Text;
    location: Text;
    latitude: Float;
    longitude: Float;
    goalAmount: Nat;
    raisedAmount: Nat;
    creator: Principal;
    status: ProjectStatus;
    nftSupply: Nat;
    nftPrice: Nat;
    dateCreated: Int;
    dateUpdated: Int;
    tags: [Text];
  };

  public type Document = {
    id: Text;
    name: Text;
    contentType: Text;
    size: Nat;
    uploadDate: Int;
    hash: Text; // IPFS hash or similar identifier
  };

  public type Proposal = {
    id: Nat;
    title: Text;
    description: Text;
    proposer: Principal;
    proposalType: ProposalType;
    status: ProposalStatus;
    votesFor: Nat;
    votesAgainst: Nat;
    totalVotes: Nat;
    quorum: Nat;
    startDate: Int;
    endDate: Int;
    executed: Bool;
    executionDate: ?Int;
    documents: [Document]; // Added documents field
  };

  public type ProposalType = {
    #ProjectApproval;
    #MilestoneApproval;
    #GovernanceChange;
    #TreasuryAllocation;
    #EmergencyAction;
  };

  public type ProposalStatus = {
    #Active;
    #Passed;
    #Failed;
    #Executed;
    #Cancelled;
  };

  public type Vote = {
    voter: Principal;
    proposalId: Nat;
    vote: Bool; // true = for, false = against
    votingPower: Nat;
    timestamp: Int;
  };

  public type DashboardData = {
    totalMembers: Nat;
    totalProjects: Nat;
    totalProposals: Nat;
    treasury: Nat;
    recentActivity: [Text];
    activeProjects: [Project];
  };

  public type WalletInfo = {
    balance: Nat;
    governanceTokens: Nat;
    totalDonated: Nat;
    totalImpact: Nat;
  };

  // ===== STORAGE =====
  
  private stable var userProfiles: [UserProfile] = [];
  private stable var projects: [Project] = [];
  private stable var proposals: [Proposal] = [];
  private stable var votes: [Vote] = [];
  private stable var nextProjectId: Nat = 1;
  private stable var nextProposalId: Nat = 1;
  private stable var treasury: Nat = 0;

  // ===== USER PROFILE FUNCTIONS =====

  public shared({ caller }) func createUserProfile(profile: {
    username: Text;
    email: Text;
    fullName: Text;
    bio: Text;
    location: Text;
    avatar: ?Text;
  }) : async Result.Result<UserProfile, Text> {
    if (Principal.isAnonymous(caller)) {
      return #err("Anonymous users cannot create profiles");
    };

    // Check if profile already exists
    for (existingProfile in userProfiles.vals()) {
      if (existingProfile.id == caller) {
        return #err("Profile already exists");
      };
    };

    let newProfile: UserProfile = {
      id = caller;
      username = profile.username;
      email = profile.email;
      fullName = profile.fullName;
      bio = profile.bio;
      location = profile.location;
      avatar = profile.avatar;
      reputation = 0;
      governanceTokens = 100; // Give some initial tokens
      dateJoined = Time.now();
      isVerified = false;
      kycStatus = #NotSubmitted;
    };

    userProfiles := Array.append(userProfiles, [newProfile]);
    #ok(newProfile)
  };

  public shared({ caller }) func updateUserProfile(updates: {
    username: ?Text;
    email: ?Text;
    fullName: ?Text;
    bio: ?Text;
    location: ?Text;
    avatar: ?Text;
  }) : async Result.Result<UserProfile, Text> {
    var found = false;
    var updatedProfiles: [UserProfile] = [];
    
    for (profile in userProfiles.vals()) {
      if (profile.id == caller) {
        found := true;
        let updatedProfile: UserProfile = {
          id = profile.id;
          username = Option.get(updates.username, profile.username);
          email = Option.get(updates.email, profile.email);
          fullName = Option.get(updates.fullName, profile.fullName);
          bio = Option.get(updates.bio, profile.bio);
          location = Option.get(updates.location, profile.location);
          avatar = updates.avatar;
          reputation = profile.reputation;
          governanceTokens = profile.governanceTokens;
          dateJoined = profile.dateJoined;
          isVerified = profile.isVerified;
          kycStatus = profile.kycStatus;
        };
        updatedProfiles := Array.append(updatedProfiles, [updatedProfile]);
      } else {
        updatedProfiles := Array.append(updatedProfiles, [profile]);
      };
    };

    if (not found) {
      return #err("Profile not found");
    };

    userProfiles := updatedProfiles;
    let foundProfile = Array.find<UserProfile>(userProfiles, func(p) = p.id == caller);
    switch (foundProfile) {
      case null { #err("Profile not found") };
      case (?profile) { #ok(profile) };
    };
  };

  public query func getUserProfile(userId: Principal) : async ?UserProfile {
    Array.find<UserProfile>(userProfiles, func(p) = p.id == userId)
  };

  public query func getCurrentUserProfile() : async ?UserProfile {
    Array.find<UserProfile>(userProfiles, func(p) = p.id == initializer)
  };

  // ===== PROJECT FUNCTIONS =====

  public shared({ caller }) func createProject(projectData: {
    title: Text;
    description: Text;
    category: Text;
    location: Text;
    latitude: Float;
    longitude: Float;
    goalAmount: Nat;
    nftSupply: Nat;
    nftPrice: Nat;
    tags: [Text];
  }) : async Result.Result<Project, Text> {
    if (Principal.isAnonymous(caller)) {
      return #err("Anonymous users cannot create projects");
    };

    let projectId = nextProjectId;
    nextProjectId += 1;

    let newProject: Project = {
      id = projectId;
      title = projectData.title;
      description = projectData.description;
      category = projectData.category;
      location = projectData.location;
      latitude = projectData.latitude;
      longitude = projectData.longitude;
      goalAmount = projectData.goalAmount;
      raisedAmount = 0;
      creator = caller;
      status = #Active;
      nftSupply = projectData.nftSupply;
      nftPrice = projectData.nftPrice;
      dateCreated = Time.now();
      dateUpdated = Time.now();
      tags = projectData.tags;
    };

    projects := Array.append(projects, [newProject]);
    #ok(newProject)
  };

  public query func getProjects() : async [Project] {
    projects
  };

  public query func getProject(projectId: Nat) : async ?Project {
    Array.find<Project>(projects, func(p) = p.id == projectId)
  };

  // ===== PROPOSAL & GOVERNANCE FUNCTIONS =====

  public shared({ caller }) func createProposal(proposalData: {
    title: Text;
    description: Text;
    proposalType: ProposalType;
    quorum: Nat;
    endDate: Int;
    documents: [Document]; // Added documents parameter
  }) : async Result.Result<Proposal, Text> {
    if (Principal.isAnonymous(caller)) {
      return #err("Anonymous users cannot create proposals");
    };

    let proposalId = nextProposalId;
    nextProposalId += 1;

    let newProposal: Proposal = {
      id = proposalId;
      title = proposalData.title;
      description = proposalData.description;
      proposer = caller;
      proposalType = proposalData.proposalType;
      status = #Active;
      votesFor = 0;
      votesAgainst = 0;
      totalVotes = 0;
      quorum = proposalData.quorum;
      startDate = Time.now();
      endDate = proposalData.endDate;
      executed = false;
      executionDate = null;
      documents = proposalData.documents; // Use provided documents
    };

    proposals := Array.append(proposals, [newProposal]);
    #ok(newProposal)
  };

  public shared({ caller }) func vote(proposalId: Nat, voteFor: Bool) : async Result.Result<Proposal, Text> {
    // Find the proposal
    let proposalOpt = Array.find<Proposal>(proposals, func(p) = p.id == proposalId);
    switch (proposalOpt) {
      case null { #err("Proposal not found") };
      case (?proposal) {
        if (proposal.status != #Active) {
          return #err("Proposal is not active");
        };

        if (Time.now() > proposal.endDate) {
          return #err("Voting period has ended");
        };

        // Check if user already voted
        for (vote in votes.vals()) {
          if (vote.voter == caller and vote.proposalId == proposalId) {
            return #err("User has already voted on this proposal");
          };
        };

        // Add the vote
        let newVote: Vote = {
          voter = caller;
          proposalId = proposalId;
          vote = voteFor;
          votingPower = 1; // TODO: Calculate based on governance tokens
          timestamp = Time.now();
        };
        votes := Array.append(votes, [newVote]);

        // Update proposal vote counts
        let updatedVotesFor = if (voteFor) { proposal.votesFor + 1 } else { proposal.votesFor };
        let updatedVotesAgainst = if (voteFor) { proposal.votesAgainst } else { proposal.votesAgainst + 1 };
        let updatedTotalVotes = proposal.totalVotes + 1;

        let updatedProposal: Proposal = {
          id = proposal.id;
          title = proposal.title;
          description = proposal.description;
          proposer = proposal.proposer;
          proposalType = proposal.proposalType;
          status = proposal.status;
          votesFor = updatedVotesFor;
          votesAgainst = updatedVotesAgainst;
          totalVotes = updatedTotalVotes;
          quorum = proposal.quorum;
          startDate = proposal.startDate;
          endDate = proposal.endDate;
          executed = proposal.executed;
          executionDate = proposal.executionDate;
          documents = proposal.documents; // Keep documents
        };

        // Update the proposals array
        var updatedProposals: [Proposal] = [];
        for (p in proposals.vals()) {
          if (p.id == proposalId) {
            updatedProposals := Array.append(updatedProposals, [updatedProposal]);
          } else {
            updatedProposals := Array.append(updatedProposals, [p]);
          };
        };
        proposals := updatedProposals;

        #ok(updatedProposal)
      };
    };
  };

  public query func getProposals() : async [Proposal] {
    proposals
  };

  public query func getProposal(proposalId: Nat) : async ?Proposal {
    Array.find<Proposal>(proposals, func(p) = p.id == proposalId)
  };

  // ===== DASHBOARD & ANALYTICS =====

  public query func getDashboardData() : async DashboardData {
    let totalMembers = userProfiles.size();
    let totalProjects = projects.size();
    let totalProposals = proposals.size();

    let activeProjects = Buffer.Buffer<Project>(0);
    for (project in projects.vals()) {
      if (project.status == #Active) {
        activeProjects.add(project);
      };
    };

    {
      totalMembers = totalMembers;
      totalProjects = totalProjects;
      totalProposals = totalProposals;
      treasury = treasury;
      recentActivity = [
        "New project created: Rural School Construction",
        "Milestone completed: Foundation phase",
        "New proposal submitted for community voting",
        "Funds released to Clean Water project"
      ];
      activeProjects = Buffer.toArray(activeProjects);
    }
  };

  public query func getWalletInfo(userId: Principal) : async ?WalletInfo {
    let profileOpt = Array.find<UserProfile>(userProfiles, func(p) = p.id == userId);
    switch (profileOpt) {
      case null { null };
      case (?profile) {
        ?{
          balance = 0; // TODO: Implement actual balance tracking
          governanceTokens = profile.governanceTokens;
          totalDonated = 0; // TODO: Calculate from transactions
          totalImpact = 0; // TODO: Calculate from NFTs
        }
      };
    };
  };

  // ===== UTILITY FUNCTIONS =====

  public query func getTreasury() : async Nat {
    treasury
  };

  public shared({ caller }) func addToTreasury(amount: Nat) : async Result.Result<Nat, Text> {
    if (Principal.isAnonymous(caller)) {
      return #err("Anonymous users cannot add to treasury");
    };

    treasury += amount;
    #ok(treasury)
  };

  public query func getStats() : async {
    totalUsers: Nat;
    totalProjects: Nat;
    totalProposals: Nat;
    treasury: Nat;
  } {
    {
      totalUsers = userProfiles.size();
      totalProjects = projects.size();
      totalProposals = proposals.size();
      treasury = treasury;
    }
  };
};

