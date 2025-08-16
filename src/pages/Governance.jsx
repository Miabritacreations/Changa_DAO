import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  Stack,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Tabs,
  Tab,
  TextField,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import {
  HowToVote as VoteIcon,
  Assignment as ProposalIcon,
  People as PeopleIcon,
  TrendingUp as TrendingUpIcon,
  CheckCircle as CheckIcon,
  Cancel as CancelIcon,
  Schedule as ScheduleIcon,
  Chat as ChatIcon,
  Send as SendIcon,
  AccountBalance as TreasuryIcon,
  Forum as ForumIcon,
} from "@mui/icons-material";

const TabPanel = ({ children, value, index }) => (
  <div hidden={value !== index}>
    {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
  </div>
);

const Governance = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedProposal, setSelectedProposal] = useState(null);
  const [showVoteDialog, setShowVoteDialog] = useState(false);
  const [voteChoice, setVoteChoice] = useState("");
  const [chatMessage, setChatMessage] = useState("");

  const mockProposals = [
    {
      id: 1,
      title: "Community Garden Initiative",
      description: "Proposal to fund a community garden project in Nairobi slums to provide fresh vegetables and income generation for local families.",
      author: "Sarah Mwangi",
      category: "Agriculture",
      status: "active",
      startDate: "2024-03-01",
      endDate: "2024-03-15",
      totalVotes: 156,
      yesVotes: 89,
      noVotes: 45,
      abstainVotes: 22,
      requiredQuorum: 100,
      yourVote: null,
    },
    {
      id: 2,
      title: "Website Redesign",
      description: "Proposal to redesign the Changa DAO website with improved UX and mobile responsiveness.",
      author: "John Ochieng",
      category: "Infrastructure",
      status: "passed",
      startDate: "2024-02-15",
      endDate: "2024-02-28",
      totalVotes: 203,
      yesVotes: 178,
      noVotes: 15,
      abstainVotes: 10,
      requiredQuorum: 100,
      yourVote: "yes",
    },
    {
      id: 3,
      title: "Mobile App Development",
      description: "Proposal to develop a mobile app for easier project funding and governance participation.",
      author: "Mary Akinyi",
      category: "Technology",
      status: "active",
      startDate: "2024-03-10",
      endDate: "2024-03-25",
      totalVotes: 78,
      yesVotes: 45,
      noVotes: 20,
      abstainVotes: 13,
      requiredQuorum: 100,
      yourVote: null,
    },
  ];

  const mockChatMessages = [
    {
      id: 1,
      user: "Alice.ic0",
      message: "I think the community garden initiative is a great idea! It will provide sustainable food sources.",
      timestamp: "2 hours ago",
      avatar: "A",
    },
    {
      id: 2,
      user: "Bob.ic0",
      message: "The budget seems reasonable for the impact it will create. I'm voting yes.",
      timestamp: "1 hour ago",
      avatar: "B",
    },
    {
      id: 3,
      user: "Carol.ic0",
      message: "Has anyone considered the maintenance costs after the initial setup?",
      timestamp: "30 minutes ago",
      avatar: "C",
    },
  ];

  const userVotingPower = 1250;
  const totalVotingPower = 50000;

  const getVotePercentage = (votes, total) => {
    return total > 0 ? Math.round((votes / total) * 100) : 0;
  };

  const getProposalStatusColor = (status) => {
    switch (status) {
      case "active":
        return "warning";
      case "passed":
        return "success";
      case "failed":
        return "error";
      default:
        return "default";
    }
  };

  const handleVote = (proposal) => {
    setSelectedProposal(proposal);
    setShowVoteDialog(true);
  };

  const handleConfirmVote = () => {
    // Handle vote submission logic here
    setShowVoteDialog(false);
    setVoteChoice("");
  };

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      // Handle sending message logic here
      setChatMessage("");
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box textAlign="center" mb={6}>
        <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
          DAO Governance
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: "auto" }}>
          Participate in community decisions and shape the future of Changa DAO
        </Typography>
      </Box>

      {/* Voting Power Card */}
      <Card sx={{ mb: 4 }}>
        <CardContent sx={{ p: 4 }}>
          <Box display="flex" alignItems="center" gap={2} mb={3}>
            <Avatar sx={{ bgcolor: "primary.main", width: 56, height: 56 }}>
              <VoteIcon />
            </Avatar>
            <Box flex={1}>
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                Your Voting Power
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Based on your token holdings
              </Typography>
            </Box>
            <Box textAlign="right">
              <Typography variant="h4" sx={{ fontWeight: 700, color: "primary.main" }}>
                {userVotingPower.toLocaleString()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                of {totalVotingPower.toLocaleString()} total
              </Typography>
            </Box>
          </Box>
          <LinearProgress
            variant="determinate"
            value={(userVotingPower / totalVotingPower) * 100}
            sx={{
              height: 8,
              borderRadius: 4,
              "& .MuiLinearProgress-bar": {
                borderRadius: 4,
              },
            }}
          />
        </CardContent>
      </Card>

      {/* Main Content */}
      <Grid container spacing={4}>
        {/* Proposals Section */}
        <Grid item xs={12} md={8}>
          <Card>
            <Tabs
              value={activeTab}
              onChange={(e, newValue) => setActiveTab(newValue)}
              sx={{
                borderBottom: 1,
                borderColor: "divider",
                "& .MuiTab-root": {
                  textTransform: "none",
                  fontWeight: 600,
                },
              }}
            >
              <Tab label="Active Proposals" />
              <Tab label="Past Votes" />
            </Tabs>

            <TabPanel value={activeTab} index={0}>
              <Stack spacing={3}>
                {mockProposals.filter(p => p.status === "active").map((proposal) => (
                  <Card key={proposal.id} sx={{ p: 3 }}>
                    <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                      <Box flex={1}>
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                          {proposal.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                          {proposal.description}
                        </Typography>
                        <Box display="flex" alignItems="center" gap={2}>
                          <Chip
                            label={proposal.category}
                            size="small"
                            variant="outlined"
                          />
                          <Typography variant="caption" color="text.secondary">
                            By {proposal.author}
                          </Typography>
                        </Box>
                      </Box>
                      <Chip
                        label={proposal.status}
                        color={getProposalStatusColor(proposal.status)}
                        size="small"
                      />
                    </Box>

                    {/* Vote Progress */}
                    <Box mb={3}>
                      <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          Voting Progress
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {proposal.totalVotes} votes cast
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={(proposal.totalVotes / proposal.requiredQuorum) * 100}
                        sx={{ height: 6, borderRadius: 3, mb: 1 }}
                      />
                      <Typography variant="caption" color="text.secondary">
                        {proposal.requiredQuorum - proposal.totalVotes} more votes needed for quorum
                      </Typography>
                    </Box>

                    {/* Vote Results */}
                    <Grid container spacing={2} mb={3}>
                      <Grid item xs={4}>
                        <Box textAlign="center">
                          <Typography variant="h6" sx={{ color: "#4caf50", fontWeight: 600 }}>
                            {getVotePercentage(proposal.yesVotes, proposal.totalVotes)}%
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Yes ({proposal.yesVotes})
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={4}>
                        <Box textAlign="center">
                          <Typography variant="h6" sx={{ color: "#f44336", fontWeight: 600 }}>
                            {getVotePercentage(proposal.noVotes, proposal.totalVotes)}%
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            No ({proposal.noVotes})
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={4}>
                        <Box textAlign="center">
                          <Typography variant="h6" sx={{ color: "#9e9e9e", fontWeight: 600 }}>
                            {getVotePercentage(proposal.abstainVotes, proposal.totalVotes)}%
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Abstain ({proposal.abstainVotes})
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>

                    {/* Action Buttons */}
                    <Box display="flex" gap={2}>
                      {proposal.yourVote ? (
                        <Chip
                          label={`You voted ${proposal.yourVote.toUpperCase()}`}
                          color="primary"
                          variant="outlined"
                        />
                      ) : (
                        <Button
                          variant="contained"
                          startIcon={<VoteIcon />}
                          onClick={() => handleVote(proposal)}
                          sx={{ borderRadius: 2 }}
                        >
                          Vote Now
                        </Button>
                      )}
                      <Button
                        variant="outlined"
                        startIcon={<ScheduleIcon />}
                        sx={{ borderRadius: 2 }}
                      >
                        Ends {proposal.endDate}
                      </Button>
                    </Box>
                  </Card>
                ))}
              </Stack>
            </TabPanel>

            <TabPanel value={activeTab} index={1}>
              <Stack spacing={3}>
                {mockProposals.filter(p => p.status !== "active").map((proposal) => (
                  <Card key={proposal.id} sx={{ p: 3 }}>
                    <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                      <Box flex={1}>
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                          {proposal.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                          {proposal.description}
                        </Typography>
                        <Box display="flex" alignItems="center" gap={2}>
                          <Chip
                            label={proposal.category}
                            size="small"
                            variant="outlined"
                          />
                          <Typography variant="caption" color="text.secondary">
                            By {proposal.author}
                          </Typography>
                        </Box>
                      </Box>
                      <Chip
                        label={proposal.status}
                        color={getProposalStatusColor(proposal.status)}
                        size="small"
                      />
                    </Box>

                    {/* Final Results */}
                    <Box mb={2}>
                      <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                        Final Results
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={4}>
                          <Box textAlign="center">
                            <Typography variant="h6" sx={{ color: "#4caf50", fontWeight: 600 }}>
                              {getVotePercentage(proposal.yesVotes, proposal.totalVotes)}%
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Yes ({proposal.yesVotes})
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={4}>
                          <Box textAlign="center">
                            <Typography variant="h6" sx={{ color: "#f44336", fontWeight: 600 }}>
                              {getVotePercentage(proposal.noVotes, proposal.totalVotes)}%
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              No ({proposal.noVotes})
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={4}>
                          <Box textAlign="center">
                            <Typography variant="h6" sx={{ color: "#9e9e9e", fontWeight: 600 }}>
                              {getVotePercentage(proposal.abstainVotes, proposal.totalVotes)}%
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Abstain ({proposal.abstainVotes})
                            </Typography>
                          </Box>
                        </Grid>
                      </Grid>
                    </Box>

                    {proposal.yourVote && (
                      <Chip
                        label={`You voted ${proposal.yourVote.toUpperCase()}`}
                        color="primary"
                        variant="outlined"
                      />
                    )}
                  </Card>
                ))}
              </Stack>
            </TabPanel>
          </Card>
        </Grid>

        {/* Community Forum */}
        <Grid item xs={12} md={4}>
          <Card sx={{ height: "fit-content" }}>
            <CardContent sx={{ p: 3 }}>
              <Box display="flex" alignItems="center" gap={2} mb={3}>
                <ForumIcon sx={{ color: "primary.main" }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Community Forum
                </Typography>
              </Box>

              {/* Chat Messages */}
              <Box sx={{ maxHeight: 400, overflowY: "auto", mb: 3 }}>
                <Stack spacing={2}>
                  {mockChatMessages.map((message) => (
                    <Box key={message.id}>
                      <Box display="flex" alignItems="flex-start" gap={2}>
                        <Avatar sx={{ width: 32, height: 32, fontSize: "0.875rem" }}>
                          {message.avatar}
                        </Avatar>
                        <Box flex={1}>
                          <Box display="flex" alignItems="center" gap={1} mb={0.5}>
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                              {message.user}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {message.timestamp}
                            </Typography>
                          </Box>
                          <Typography variant="body2" sx={{ lineHeight: 1.4 }}>
                            {message.message}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  ))}
                </Stack>
              </Box>

              {/* Message Input */}
              <Box display="flex" gap={1}>
                <TextField
                  fullWidth
                  placeholder="Type your message..."
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  size="small"
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                />
                <Button
                  variant="contained"
                  onClick={handleSendMessage}
                  disabled={!chatMessage.trim()}
                  sx={{ borderRadius: 2, minWidth: 40 }}
                >
                  <SendIcon />
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Vote Dialog */}
      <Dialog
        open={showVoteDialog}
        onClose={() => setShowVoteDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Vote on Proposal</DialogTitle>
        <DialogContent>
          {selectedProposal && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                {selectedProposal.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                {selectedProposal.description}
              </Typography>

              <FormControl component="fieldset">
                <Typography variant="body1" sx={{ fontWeight: 600, mb: 2 }}>
                  Your Vote
                </Typography>
                <RadioGroup
                  value={voteChoice}
                  onChange={(e) => setVoteChoice(e.target.value)}
                >
                  <FormControlLabel
                    value="yes"
                    control={<Radio />}
                    label={
                      <Box display="flex" alignItems="center" gap={1}>
                        <CheckIcon sx={{ color: "#4caf50" }} />
                        <Typography>Yes - I support this proposal</Typography>
                      </Box>
                    }
                  />
                  <FormControlLabel
                    value="no"
                    control={<Radio />}
                    label={
                      <Box display="flex" alignItems="center" gap={1}>
                        <CancelIcon sx={{ color: "#f44336" }} />
                        <Typography>No - I oppose this proposal</Typography>
                      </Box>
                    }
                  />
                  <FormControlLabel
                    value="abstain"
                    control={<Radio />}
                    label={
                      <Box display="flex" alignItems="center" gap={1}>
                        <ScheduleIcon sx={{ color: "#9e9e9e" }} />
                        <Typography>Abstain - I choose not to vote</Typography>
                      </Box>
                    }
                  />
                </RadioGroup>
              </FormControl>

              <Box sx={{ mt: 3, p: 2, bgcolor: "background.paper", borderRadius: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Your voting power: {userVotingPower.toLocaleString()} tokens
                </Typography>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowVoteDialog(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleConfirmVote}
            disabled={!voteChoice}
          >
            Submit Vote
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Governance;
