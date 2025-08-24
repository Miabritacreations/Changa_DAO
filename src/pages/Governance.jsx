import {
  Forum as ForumIcon,
  Send as SendIcon,
  HowToVote as VoteIcon
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card, CardContent,
  Chip,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl, FormControlLabel,
  Grid,
  LinearProgress,
  Radio, RadioGroup,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography
} from "@mui/material";
import { useEffect, useState } from "react";
import { Changa_DAO_backend } from "../../../declarations/Changa_DAO_backend";

// TabPanel helper
const TabPanel = ({ children, value, index }) => (
  <div hidden={value !== index}>{value === index && <Box sx={{ py: 3 }}>{children}</Box>}</div>
);

const Governance = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [proposals, setProposals] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedProposal, setSelectedProposal] = useState(null);
  const [showVoteDialog, setShowVoteDialog] = useState(false);
  const [voteChoice, setVoteChoice] = useState("");
  const [chatMessage, setChatMessage] = useState("");
  const [newProposal, setNewProposal] = useState({ title: "", description: "", category: "" });

  const userVotingPower = 1250; // later fetch from backend
  const totalVotingPower = 50000;

  // Fetch proposals from canister
  async function fetchProposals() {
    try {
      const res = await Changa_DAO_backend.getProposals();
      setProposals(res);
    } catch (e) {
      console.error("Failed to fetch proposals", e);
    }
  }

  // Fetch forum messages
  async function fetchMessages() {
    try {
      const res = await Changa_DAO_backend.getMessages();
      setMessages(res);
    } catch (e) {
      console.error("Failed to fetch messages", e);
    }
  }

  useEffect(() => {
    fetchProposals();
    fetchMessages();
  }, []);

  const getVotePercentage = (votes, total) => (total > 0 ? Math.round((votes / total) * 100) : 0);

  const getProposalStatusColor = (status) => {
    switch (status) {
      case "active": return "warning";
      case "passed": return "success";
      case "failed": return "error";
      default: return "default";
    }
  };

  const handleVote = (proposal) => {
    setSelectedProposal(proposal);
    setShowVoteDialog(true);
  };

  const handleConfirmVote = async () => {
    try {
      await Changa_DAO_backend.voteOnProposal(selectedProposal.id, voteChoice);
      setShowVoteDialog(false);
      setVoteChoice("");
      fetchProposals(); // refresh proposals after voting
    } catch (e) {
      console.error("Vote failed", e);
    }
  };

  const handleSendMessage = async () => {
    if (chatMessage.trim()) {
      try {
        await Changa_DAO_backend.addMessage(chatMessage);
        setChatMessage("");
        fetchMessages();
      } catch (e) {
        console.error("Failed to send message", e);
      }
    }
  };

  const handleCreateProposal = async () => {
    if (newProposal.title && newProposal.description) {
      try {
        await Changa_DAO_backend.addProposal(
          newProposal.title,
          newProposal.description,
          newProposal.category || "General"
        );
        setNewProposal({ title: "", description: "", category: "" });
        fetchProposals();
      } catch (e) {
        console.error("Failed to create proposal", e);
      }
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

      {/* Create Proposal */}
      <Card sx={{ mb: 4, p: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Create New Proposal</Typography>
        <Stack spacing={2}>
          <TextField
            label="Proposal Title"
            fullWidth
            value={newProposal.title}
            onChange={(e) => setNewProposal({ ...newProposal, title: e.target.value })}
          />
          <TextField
            label="Description"
            multiline
            rows={3}
            fullWidth
            value={newProposal.description}
            onChange={(e) => setNewProposal({ ...newProposal, description: e.target.value })}
          />
          <TextField
            label="Category"
            fullWidth
            value={newProposal.category}
            onChange={(e) => setNewProposal({ ...newProposal, category: e.target.value })}
          />
          <Button variant="contained" onClick={handleCreateProposal}>Submit Proposal</Button>
        </Stack>
      </Card>

      {/* Voting Power */}
      <Card sx={{ mb: 4 }}>
        <CardContent sx={{ p: 4 }}>
          <Box display="flex" alignItems="center" gap={2} mb={3}>
            <Avatar sx={{ bgcolor: "primary.main", width: 56, height: 56 }}>
              <VoteIcon />
            </Avatar>
            <Box flex={1}>
              <Typography variant="h5" sx={{ fontWeight: 600 }}>Your Voting Power</Typography>
              <Typography variant="body1" color="text.secondary">Based on your token holdings</Typography>
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
            sx={{ height: 8, borderRadius: 4 }}
          />
        </CardContent>
      </Card>

      {/* Proposals */}
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Card>
            <Tabs
              value={activeTab}
              onChange={(e, newValue) => setActiveTab(newValue)}
              sx={{ borderBottom: 1, borderColor: "divider" }}
            >
              <Tab label="Active Proposals" />
              <Tab label="Past Votes" />
            </Tabs>

            <TabPanel value={activeTab} index={0}>
              <Stack spacing={3}>
                {proposals.filter(p => p.status === "active").map((proposal) => (
                  <Card key={proposal.id} sx={{ p: 3 }}>
                    <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                      <Box flex={1}>
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                          {proposal.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                          {proposal.description}
                        </Typography>
                        <Chip label={proposal.category} size="small" variant="outlined" />
                      </Box>
                      <Chip label={proposal.status} color={getProposalStatusColor(proposal.status)} size="small" />
                    </Box>

                    {/* Vote Progress */}
                    <Box mb={2}>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>Voting Progress</Typography>
                      <LinearProgress
                        variant="determinate"
                        value={(proposal.totalVotes / proposal.requiredQuorum) * 100}
                        sx={{ height: 6, borderRadius: 3, mb: 1 }}
                      />
                      <Typography variant="caption" color="text.secondary">
                        {proposal.requiredQuorum - proposal.totalVotes} more votes needed for quorum
                      </Typography>
                    </Box>

                    {/* Results */}
                    <Box display="flex" gap={2}>
                      <Button variant="contained" onClick={() => handleVote(proposal)} startIcon={<VoteIcon />}>
                        Vote Now
                      </Button>
                    </Box>
                  </Card>
                ))}
              </Stack>
            </TabPanel>

            <TabPanel value={activeTab} index={1}>
              <Stack spacing={3}>
                {proposals.filter(p => p.status !== "active").map((proposal) => (
                  <Card key={proposal.id} sx={{ p: 3 }}>
                    <Typography variant="h6">{proposal.title}</Typography>
                    <Typography variant="body2">{proposal.description}</Typography>
                  </Card>
                ))}
              </Stack>
            </TabPanel>
          </Card>
        </Grid>

        {/* Forum */}
        <Grid item xs={12} md={4}>
          <Card sx={{ height: "fit-content" }}>
            <CardContent sx={{ p: 3 }}>
              <Box display="flex" alignItems="center" gap={2} mb={3}>
                <ForumIcon sx={{ color: "primary.main" }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>Community Forum</Typography>
              </Box>

              <Box sx={{ maxHeight: 400, overflowY: "auto", mb: 3 }}>
                <Stack spacing={2}>
                  {messages.map((m, idx) => (
                    <Box key={idx} display="flex" gap={2}>
                      <Avatar>{m.user?.[0] || "U"}</Avatar>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>{m.user}</Typography>
                        <Typography variant="body2">{m.text}</Typography>
                      </Box>
                    </Box>
                  ))}
                </Stack>
              </Box>

              <Box display="flex" gap={1}>
                <TextField
                  fullWidth
                  placeholder="Type your message..."
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  size="small"
                />
                <Button variant="contained" onClick={handleSendMessage} disabled={!chatMessage.trim()}>
                  <SendIcon />
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Vote Dialog */}
      <Dialog open={showVoteDialog} onClose={() => setShowVoteDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Vote on Proposal</DialogTitle>
        <DialogContent>
          {selectedProposal && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6">{selectedProposal.title}</Typography>
              <Typography variant="body2" sx={{ mb: 3 }}>{selectedProposal.description}</Typography>
              <FormControl>
                <RadioGroup value={voteChoice} onChange={(e) => setVoteChoice(e.target.value)}>
                  <FormControlLabel value="yes" control={<Radio />} label="Yes - I support" />
                  <FormControlLabel value="no" control={<Radio />} label="No - I oppose" />
                  <FormControlLabel value="abstain" control={<Radio />} label="Abstain" />
                </RadioGroup>
              </FormControl>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowVoteDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleConfirmVote} disabled={!voteChoice}>Submit Vote</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Governance;
