import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Nat "mo:base/Nat";
import Int "mo:base/Int";
import Bool "mo:base/Bool";
import Array "mo:base/Array";
import HashMap "mo:base/HashMap";
import Time "mo:base/Time";
import Error "mo:base/Error";
import Result "mo:base/Result";
import Trie "mo:base/Trie";
import Iter "mo:base/Iter";

actor class Changa_DAO_backend() = this {
  // ===== TYPES =====
  type UserProfile = {
    name : Text;
    email : Text;
    avatar : Text;
    principal : Text;
    createdAt : Int;
    updatedAt : Int;
  };

  type Proposal = {
    id : Nat;
    title : Text;
    description : Text;
    creator : Principal;
    status : Text; // "Active", "Passed", "Rejected"
    votesFor : Nat;
    votesAgainst : Nat;
    createdAt : Int;
    expiresAt : Int;
  };

  type Vote = {
    proposalId : Nat;
    voter : Principal;
    support : Bool; // true = for, false = against
    timestamp : Int;
  };

  type DashboardData = {
    totalMembers : Nat;
    totalProposals : Nat;
    treasury : Float;
    recentActivity : [Text];
  };

  type WalletInfo = {
    address : Text;
    balance : Float;
    network : Text;
    connected : Bool;
  };

  // ===== STABLE STORAGE =====
  stable var profiles : Trie.Trie<Principal, UserProfile> = Trie.empty();
  stable var proposals : [Proposal] = [];
  stable var votes : Trie.Trie<Principal, [Vote]> = Trie.empty();
  stable var treasury : Float = 12345.67;
  stable var totalMembers : Nat = 0;

  // ===== USER PROFILES =====
  public shared({caller}) func setProfile(profile : UserProfile) : async Result.Result<UserProfile, Text> {
    if (Principal.isAnonymous(caller)) {
      return #err("Anonymous users cannot set profiles");
    };
    let updatedProfile = {
      name = profile.name;
      email = profile.email;
      avatar = profile.avatar;
      principal = Principal.toText(caller);
      createdAt = profile.createdAt;
      updatedAt = Time.now();
    };
    let key = { key = caller; hash = Principal.hash(caller) };
    profiles := Trie.put<Principal, UserProfile>(profiles, key, Principal.equal, updatedProfile).0;
    #ok(updatedProfile)
  };

  public shared query({caller}) func getProfile() : async Result.Result<UserProfile, Text> {
    if (Principal.isAnonymous(caller)) {
      return #err("Anonymous users cannot access profiles");
    };
    let key = { key = caller; hash = Principal.hash(caller) };
    switch (Trie.get<Principal, UserProfile>(profiles, key, Principal.equal)) {
      case (?profile) { #ok(profile) };
      case null { #err("Profile not found") };
    };
  };

  // ===== PROPOSALS =====
  public shared({caller}) func createProposal(title : Text, description : Text) : async Result.Result<Nat, Text> {
    if (Principal.isAnonymous(caller)) {
      return #err("Anonymous users cannot create proposals");
    };
    let id = proposals.size();
    let now = Time.now();
    let expiresAt = now + (7 * 24 * 60 * 60 * 1_000_000_000); // 7 days
    let proposal : Proposal = {
      id = id;
      title = title;
      description = description;
      creator = caller;
      status = "Active";
      votesFor = 0;
      votesAgainst = 0;
      createdAt = now;
      expiresAt = expiresAt;
    };
    proposals := Array.append(proposals, [proposal]);
    #ok(id)
  };

  public shared query func getProposals() : async [Proposal] {
    proposals
  };

  public shared query func getProposal(id : Nat) : async Result.Result<Proposal, Text> {
    if (id >= proposals.size()) {
      return #err("Proposal not found");
    };
    #ok(proposals[Int.abs(id)])
  };

  // ===== VOTING =====
  public shared({caller}) func submitVote(proposalId : Nat, support : Bool) : async Result.Result<Bool, Text> {
    if (Principal.isAnonymous(caller)) {
      return #err("Anonymous users cannot vote");
    };
    if (proposalId >= proposals.size()) {
      return #err("Proposal not found");
    };
    let proposal = proposals[Int.abs(proposalId)];
    if (proposal.status != "Active") {
      return #err("Proposal is not active");
    };
    let key = { key = caller; hash = Principal.hash(caller) };
    // Check if user already voted
    let userVotes = switch (Trie.get<Principal, [Vote]>(votes, key, Principal.equal)) {
      case (?votes) { votes };
      case null { [] };
    };
    for (vote in userVotes.vals()) {
      if (vote.proposalId == proposalId) {
        return #err("User already voted on this proposal");
      };
    };
    // Add vote
    let newVote : Vote = {
      proposalId = proposalId;
      voter = caller;
      support = support;
      timestamp = Time.now();
    };
    let updatedVotes = Array.append(userVotes, [newVote]);
    votes := Trie.put<Principal, [Vote]>(votes, key, Principal.equal, updatedVotes).0;
    // Update proposal vote count
    let updatedProposal = {
      id = proposal.id;
      title = proposal.title;
      description = proposal.description;
      creator = proposal.creator;
      status = proposal.status;
      votesFor = if (support) { proposal.votesFor + 1 } else { proposal.votesFor };
      votesAgainst = if (support) { proposal.votesAgainst } else { proposal.votesAgainst + 1 };
      createdAt = proposal.createdAt;
      expiresAt = proposal.expiresAt;
    };
    proposals := Array.map<Proposal, Proposal>(proposals, func(p) {
      if (p.id == proposalId) { updatedProposal } else { p }
    });
    #ok(true)
  };

  public shared query({caller}) func getUserVotes() : async [Vote] {
    let key = { key = caller; hash = Principal.hash(caller) };
    switch (Trie.get<Principal, [Vote]>(votes, key, Principal.equal)) {
      case (?votes) { votes };
      case null { [] };
    };
  };

  // ===== DASHBOARD =====
  public shared query func getDashboardData() : async DashboardData {
    let recentActivity = Array.map<Proposal, Text>(proposals, func(p) {
      "Proposal #" # Nat.toText(p.id) # " created by " # Principal.toText(p.creator)
    });
    {
      totalMembers = totalMembers;
      totalProposals = proposals.size();
      treasury = treasury;
      recentActivity = recentActivity;
    }
  };

  // ===== WALLET =====
  public shared query({caller}) func getWalletInfo() : async WalletInfo {
    {
      address = Principal.toText(caller);
      balance = 100.5; // Mock balance
      network = "ICP Mainnet";
      connected = true;
    }
  };

  // ===== UTILITY FUNCTIONS =====
  public shared query({caller}) func getCaller() : async Text {
    Principal.toText(caller)
  };

  public shared query({caller}) func isAuthenticated() : async Bool {
    not Principal.isAnonymous(caller)
  };

  // ===== SYSTEM FUNCTIONS =====
  system func preupgrade() {
    // Handle any pre-upgrade logic if needed
  };

  system func postupgrade() {
    // Handle any post-upgrade logic if needed
  };
}
