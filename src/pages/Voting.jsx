import {
  Agriculture as AgricultureIcon,
  AttachFile as AttachFileIcon,
  Cancel as CancelIcon,
  CheckCircle as CheckCircleIcon,
  Group as GroupIcon,
  LocalHospital as HealthIcon,
  Person as PersonIcon,
  Business as ProjectsIcon,
  School as SchoolIcon,
  Star as StarIcon,
  ThumbDown as ThumbDownIcon,
  ThumbUp as ThumbUpIcon,
  AccountBalanceWallet as TreasuryIcon,
  HowToVote as VoteIcon,
  WaterDrop as WaterIcon
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
  useTheme
} from "@mui/material";
import React from "react";
import { getBackendActor } from "../api/canister";

const Voting = () => {
  const [projects, setProjects] = React.useState([]);
  const [proposals, setProposals] = React.useState([]);
  const [userProfile, setUserProfile] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [filter, setFilter] = React.useState('all');
  const [voteDialog, setVoteDialog] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState(null);
  const [voteChoice, setVoteChoice] = React.useState(true);
  const [voteReason, setVoteReason] = React.useState('');
  const theme = useTheme();

  React.useEffect(() => {
    (async () => {
      try {
        const backend = await getBackendActor();
        
        // Get projects and proposals
        const [projectsData, proposalsData] = await Promise.all([
          backend.getProjects(),
          backend.getProposals()
        ]);
        
        setProjects(projectsData);
        setProposals(proposalsData);
        
        // Get user profile for voting power
        try {
          const profile = await backend.getCurrentUserProfile();
          setUserProfile(profile);
        } catch (error) {
          console.log('User not authenticated:', error);
        }
      } catch (error) {
        console.error('Error loading voting data:', error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleVote = async () => {
    if (!selectedItem) return;
    
    try {
      const backend = await getBackendActor();
      const result = await backend.vote(BigInt(selectedItem.id), voteChoice);
      
      if ('ok' in result) {
        setVoteDialog(false);
        setSelectedItem(null);
        setVoteChoice(true);
        setVoteReason('');
        alert(`Vote submitted successfully!`);
        // Refresh data
        window.location.reload();
      } else {
        alert('Failed to submit vote: ' + result.err);
      }
    } catch (error) {
      console.error('Error voting:', error);
      alert('Error submitting vote. Please try again.');
    }
  };

  const getCategoryIcon = (category) => {
    switch (category?.toLowerCase()) {
      case 'education':
        return <SchoolIcon />;
      case 'health':
        return <HealthIcon />;
      case 'water':
        return <WaterIcon />;
      case 'agriculture':
        return <AgricultureIcon />;
      default:
        return <ProjectsIcon />;
    }
  };

  const getStatusColor = (status) => {
    // Handle Motoko variant objects
    const statusStr = typeof status === 'object' ? Object.keys(status)[0] : status;
    switch (statusStr) {
      case 'Active':
        return 'success';
      case 'PendingReview':
        return 'warning';
      case 'Completed':
        return 'info';
      case 'Draft':
        return 'default';
      default:
        return 'default';
    }
  };

  const getProposalTypeIcon = (type) => {
    // Handle Motoko variant objects
    const typeStr = typeof type === 'object' ? Object.keys(type)[0] : type;
    switch (typeStr) {
      case 'ProjectApproval':
        return <ProjectsIcon />;
      case 'MilestoneApproval':
        return <CheckCircleIcon />;
      case 'GovernanceChange':
        return <GroupIcon />;
      case 'TreasuryAllocation':
        return <TreasuryIcon />;
      case 'EmergencyAction':
        return <CancelIcon />;
      default:
        return <VoteIcon />;
    }
  };

  const getProposalStatusColor = (status) => {
    // Handle Motoko variant objects
    const statusStr = typeof status === 'object' ? Object.keys(status)[0] : status;
    switch (statusStr) {
      case 'Active':
        return 'success';
      case 'Passed':
        return 'info';
      case 'Failed':
        return 'error';
      case 'Executed':
        return 'success';
      default:
        return 'default';
    }
  };

  // Helper function to convert variant objects to strings
  const variantToString = (variant) => {
    if (typeof variant === 'object' && variant !== null) {
      return Object.keys(variant)[0];
    }
    return variant;
  };

  const filteredProjects = projects.filter(project => {
    if (filter === 'all') return true;
    const status = variantToString(project.status);
    if (filter === 'active') return status === 'Active';
    if (filter === 'pending') return status === 'PendingReview';
    if (filter === 'completed') return status === 'Completed';
    return true;
  });

  const filteredProposals = proposals.filter(proposal => {
    if (filter === 'all') return true;
    const status = variantToString(proposal.status);
    if (filter === 'active') return status === 'Active';
    if (filter === 'passed') return status === 'Passed';
    if (filter === 'failed') return status === 'Failed';
    return true;
  });

  const votingPower = userProfile?.governanceTokens || 0;
  const reputation = userProfile?.reputation || 0;

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      backgroundColor: '#1a1a1a',
      color: 'white',
      p: 3
    }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" sx={{ fontWeight: 700, mb: 1, color: 'white' }}>
          Voting Dashboard
        </Typography>
        <Typography variant="h6" sx={{ color: '#b0b0b0' }}>
          Participate in governance and vote on projects and proposals
        </Typography>
      </Box>

      {/* User Voting Power */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Card sx={{ 
            backgroundColor: '#2a2a2a',
            border: '1px solid #3a3a3a',
            borderRadius: 3,
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: '0 8px 25px rgba(0,0,0,0.3)',
            },
          }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar
                  sx={{
                    backgroundColor: 'primary.main',
                    color: 'white',
                    width: 48,
                    height: 48,
                    mr: 2,
                  }}
                >
                  <VoteIcon />
                </Avatar>
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, color: 'white' }}>
                {userProfile?.governanceTokens || 0}
              </Typography>
              <Typography variant="body2" sx={{ color: '#b0b0b0' }}>
                Voting Power
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card sx={{ 
            backgroundColor: '#2a2a2a',
            border: '1px solid #3a3a3a',
            borderRadius: 3,
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: '0 8px 25px rgba(0,0,0,0.3)',
            },
          }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar
                  sx={{
                    backgroundColor: 'warning.main',
                    color: 'white',
                    width: 48,
                    height: 48,
                    mr: 2,
                  }}
                >
                  <StarIcon />
                </Avatar>
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, color: 'white' }}>
                {userProfile?.reputationScore || 0}
              </Typography>
              <Typography variant="body2" sx={{ color: '#b0b0b0' }}>
                Reputation Score
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card sx={{ 
            backgroundColor: '#2a2a2a',
            border: '1px solid #3a3a3a',
            borderRadius: 3,
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: '0 8px 25px rgba(0,0,0,0.3)',
            },
          }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar
                  sx={{
                    backgroundColor: 'success.main',
                    color: 'white',
                    width: 48,
                    height: 48,
                    mr: 2,
                  }}
                >
                  <PersonIcon />
                </Avatar>
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, color: 'white' }}>
                {userProfile?.kycStatus ? 'Verified' : 'Unverified'}
              </Typography>
              <Typography variant="body2" sx={{ color: '#b0b0b0' }}>
                KYC Status
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <Typography sx={{ color: 'white' }}>Loading voting data...</Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {/* Projects Available for Voting */}
          <Grid item xs={12} lg={6}>
            <Card sx={{ 
              backgroundColor: '#2a2a2a',
              border: '1px solid #3a3a3a',
              borderRadius: 3
            }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 3, color: 'white' }}>
                  Projects Available for Voting
                </Typography>
                
                {filteredProjects.length > 0 ? (
                  <List sx={{ p: 0 }}>
                    {filteredProjects.map((project, index) => (
                      <React.Fragment key={project.id}>
                        <ListItem sx={{ px: 0, py: 2 }}>
                          <ListItemIcon sx={{ minWidth: 40 }}>
                            <Avatar
                              sx={{
                                backgroundColor: 'primary.light',
                                color: 'white',
                                width: 40,
                                height: 40,
                              }}
                            >
                              {getCategoryIcon(project.category)}
                            </Avatar>
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Typography variant="h6" sx={{ fontWeight: 600, color: 'white', mb: 1 }}>
                                {project.title}
                              </Typography>
                            }
                            secondary={
                              <Box>
                                <Typography variant="body2" sx={{ color: '#b0b0b0', mb: 1 }}>
                                  {project.description}
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                                  <Chip
                                    label={project.category}
                                    size="small"
                                    color="primary"
                                    variant="outlined"
                                    sx={{ 
                                      backgroundColor: 'rgba(33, 150, 243, 0.1)',
                                      borderColor: '#2196f3',
                                      color: '#2196f3'
                                    }}
                                  />
                                  <Chip
                                    label={variantToString(project.status)}
                                    color={getStatusColor(project.status)}
                                    size="small"
                                    sx={{
                                      backgroundColor: variantToString(project.status) === 'Active' ? 'rgba(76, 175, 80, 0.1)' : 'rgba(255, 152, 0, 0.1)',
                                      color: variantToString(project.status) === 'Active' ? '#4caf50' : '#ff9800'
                                    }}
                                  />
                                </Box>
                                <Typography variant="caption" sx={{ color: '#b0b0b0' }}>
                                  Goal: ${project.goalAmount?.toLocaleString() || '0'} | Raised: ${project.raisedAmount?.toLocaleString() || '0'}
                                </Typography>
                              </Box>
                            }
                          />
                          <Button
                            variant="contained"
                            size="small"
                            disabled={variantToString(project.status) !== 'Active'}
                            onClick={() => {
                              setSelectedItem(project);
                              setVoteDialog(true);
                            }}
                            sx={{
                              background: 'linear-gradient(135deg, #42A5F5, #1E88E5)',
                              '&:hover': {
                                background: 'linear-gradient(135deg, #1E88E5, #1565C0)',
                              },
                              '&.Mui-disabled': {
                                background: '#2a2a2a',
                                color: '#666666',
                              },
                            }}
                          >
                            Vote
                          </Button>
                        </ListItem>
                        {index < filteredProjects.length - 1 && (
                          <Divider sx={{ borderColor: '#3a3a3a' }} />
                        )}
                      </React.Fragment>
                    ))}
                  </List>
                ) : (
                  <Box sx={{ textAlign: 'center', py: 4 }}>
                    <ProjectsIcon sx={{ fontSize: 48, color: '#b0b0b0', mb: 2 }} />
                    <Typography variant="h6" sx={{ color: '#b0b0b0', mb: 1 }}>
                      No projects available for voting
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#b0b0b0' }}>
                      Check back later for new projects to vote on
                    </Typography>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* Active Proposals */}
          <Grid item xs={12} lg={6}>
            <Card sx={{ 
              backgroundColor: '#2a2a2a',
              border: '1px solid #3a3a3a',
              borderRadius: 3
            }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 3, color: 'white' }}>
                  Active Proposals
                </Typography>
                
                {filteredProposals.length > 0 ? (
                  <List sx={{ p: 0 }}>
                    {filteredProposals.map((proposal, index) => (
                      <React.Fragment key={proposal.id}>
                        <ListItem sx={{ px: 0, py: 2 }}>
                          <ListItemIcon sx={{ minWidth: 40 }}>
                            <Avatar
                              sx={{
                                backgroundColor: 'secondary.light',
                                color: 'white',
                                width: 40,
                                height: 40,
                              }}
                            >
                              {getProposalTypeIcon(proposal.proposalType)}
                            </Avatar>
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Typography variant="h6" sx={{ fontWeight: 600, color: 'white', mb: 1 }}>
                                {proposal.title}
                              </Typography>
                            }
                            secondary={
                              <Box>
                                <Typography variant="body2" sx={{ color: '#b0b0b0', mb: 1 }}>
                                  {proposal.description}
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                                  <Chip
                                    label={variantToString(proposal.proposalType)}
                                    size="small"
                                    color="secondary"
                                    variant="outlined"
                                    sx={{ 
                                      backgroundColor: 'rgba(156, 39, 176, 0.1)',
                                      borderColor: '#9c27b0',
                                      color: '#9c27b0'
                                    }}
                                  />
                                  <Chip
                                    label={variantToString(proposal.status)}
                                    color={getProposalStatusColor(proposal.status)}
                                    size="small"
                                    sx={{
                                      backgroundColor: variantToString(proposal.status) === 'Active' ? 'rgba(76, 175, 80, 0.1)' : 'rgba(33, 150, 243, 0.1)',
                                      color: variantToString(proposal.status) === 'Active' ? '#4caf50' : '#2196f3'
                                    }}
                                  />
                                </Box>
                                <Typography variant="caption" sx={{ color: '#b0b0b0' }}>
                                  Votes: {proposal.votesFor || 0} For / {proposal.votesAgainst || 0} Against | Quorum: {proposal.quorum || 0}
                                </Typography>
                                
                                {/* Documents Section */}
                                {proposal.documents && proposal.documents.length > 0 && (
                                  <Box sx={{ mt: 1 }}>
                                    <Typography variant="caption" sx={{ color: '#b0b0b0', display: 'block', mb: 0.5 }}>
                                      📎 Documents: {proposal.documents.length} attached
                                    </Typography>
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                      {proposal.documents.slice(0, 3).map((doc, index) => (
                                        <Chip
                                          key={index}
                                          icon={<AttachFileIcon />}
                                          label={doc.name.length > 15 ? doc.name.substring(0, 15) + '...' : doc.name}
                                          size="small"
                                          variant="outlined"
                                          sx={{
                                            backgroundColor: 'rgba(66, 165, 245, 0.1)',
                                            borderColor: '#42A5F5',
                                            color: '#42A5F5',
                                            fontSize: '0.7rem',
                                            height: '20px',
                                            '&:hover': {
                                              backgroundColor: 'rgba(66, 165, 245, 0.2)',
                                            },
                                          }}
                                          onClick={() => {
                                            alert(`Opening document: ${doc.name}\nHash: ${doc.hash}`);
                                          }}
                                        />
                                      ))}
                                      {proposal.documents.length > 3 && (
                                        <Chip
                                          label={`+${proposal.documents.length - 3} more`}
                                          size="small"
                                          variant="outlined"
                                          sx={{
                                            backgroundColor: 'rgba(156, 39, 176, 0.1)',
                                            borderColor: '#9c27b0',
                                            color: '#9c27b0',
                                            fontSize: '0.7rem',
                                            height: '20px',
                                          }}
                                        />
                                      )}
                                    </Box>
                                  </Box>
                                )}
                              </Box>
                            }
                          />
                          <Button
                            variant="contained"
                            size="small"
                            disabled={variantToString(proposal.status) !== 'Active'}
                            onClick={() => {
                              setSelectedItem(proposal);
                              setVoteDialog(true);
                            }}
                            sx={{
                              background: 'linear-gradient(135deg, #42A5F5, #1E88E5)',
                              '&:hover': {
                                background: 'linear-gradient(135deg, #1E88E5, #1565C0)',
                              },
                              '&.Mui-disabled': {
                                background: '#2a2a2a',
                                color: '#666666',
                              },
                            }}
                          >
                            Vote
                          </Button>
                        </ListItem>
                        {index < filteredProposals.length - 1 && (
                          <Divider sx={{ borderColor: '#3a3a3a' }} />
                        )}
                      </React.Fragment>
                    ))}
                  </List>
                ) : (
                  <Box sx={{ textAlign: 'center', py: 4 }}>
                    <VoteIcon sx={{ fontSize: 48, color: '#b0b0b0', mb: 2 }} />
                    <Typography variant="h6" sx={{ color: '#b0b0b0', mb: 1 }}>
                      No active proposals
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#b0b0b0' }}>
                      Check back later for new proposals to vote on
                    </Typography>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* Voting Dialog */}
      <Dialog 
        open={voteDialog} 
        onClose={() => setVoteDialog(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: '#2a2a2a',
            border: '1px solid #3a3a3a',
            borderRadius: 3,
          }
        }}
      >
        <DialogTitle sx={{ color: 'white', borderBottom: '1px solid #3a3a3a' }}>
          Cast Your Vote
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          {selectedItem && (
            <Box>
              <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>
                {selectedItem.title}
              </Typography>
              <Typography variant="body2" sx={{ color: '#b0b0b0', mb: 3 }}>
                {selectedItem.description}
              </Typography>
              
              <Box sx={{ mb: 3, p: 2, backgroundColor: '#1a1a1a', borderRadius: 2, border: '1px solid #3a3a3a' }}>
                <Typography variant="body2" sx={{ color: '#b0b0b0', mb: 1 }}>
                  Your Voting Power: {userProfile?.governanceTokens || 0} tokens
                </Typography>
                <Typography variant="body2" sx={{ color: '#b0b0b0', mb: 1 }}>
                  Reputation Score: {userProfile?.reputationScore || 0}
                </Typography>
                {selectedItem.votesFor !== undefined && (
                  <Typography variant="body2" sx={{ color: '#b0b0b0' }}>
                    Current Votes: {selectedItem.votesFor || 0} For / {selectedItem.votesAgainst || 0} Against
                  </Typography>
                )}
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" sx={{ color: '#b0b0b0', mb: 2 }}>
                  How do you want to vote?
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button
                    variant={voteChoice ? "contained" : "outlined"}
                    fullWidth
                    onClick={() => setVoteChoice(true)}
                    startIcon={<ThumbUpIcon />}
                    sx={{
                      background: voteChoice ? 'linear-gradient(135deg, #4caf50, #45a049)' : 'transparent',
                      borderColor: voteChoice ? 'transparent' : '#4caf50',
                      color: voteChoice ? 'white' : '#4caf50',
                      '&:hover': {
                        background: voteChoice ? 'linear-gradient(135deg, #45a049, #388e3c)' : 'rgba(76, 175, 80, 0.1)',
                      },
                    }}
                  >
                    Vote For
                  </Button>
                  <Button
                    variant={!voteChoice ? "contained" : "outlined"}
                    fullWidth
                    onClick={() => setVoteChoice(false)}
                    startIcon={<ThumbDownIcon />}
                    sx={{
                      background: !voteChoice ? 'linear-gradient(135deg, #f44336, #d32f2f)' : 'transparent',
                      borderColor: !voteChoice ? 'transparent' : '#f44336',
                      color: !voteChoice ? 'white' : '#f44336',
                      '&:hover': {
                        background: !voteChoice ? 'linear-gradient(135deg, #d32f2f, #c62828)' : 'rgba(244, 67, 54, 0.1)',
                      },
                    }}
                  >
                    Vote Against
                  </Button>
                </Box>
              </Box>

              <TextField
                fullWidth
                multiline
                rows={3}
                label="Reason for your vote (optional)"
                value={voteReason}
                onChange={(e) => setVoteReason(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#1a1a1a',
                    borderColor: '#3a3a3a',
                    color: 'white',
                    '& fieldset': {
                      borderColor: '#3a3a3a',
                    },
                    '&:hover fieldset': {
                      borderColor: '#4a4a4a',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#42A5F5',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: '#b0b0b0',
                  },
                  '& .MuiInputBase-input': {
                    color: 'white',
                  },
                }}
              />

              <Box sx={{ mt: 2, p: 2, backgroundColor: '#1a1a1a', borderRadius: 2, border: '1px solid #3a3a3a' }}>
                <Typography variant="body2" sx={{ color: '#b0b0b0', mb: 1 }}>
                  Your Vote: {voteChoice ? '👍 FOR' : '👎 AGAINST'}
                </Typography>
                <Typography variant="caption" sx={{ color: '#666666' }}>
                  This vote will be recorded on-chain and cannot be changed. Your voting power and reputation will be considered.
                </Typography>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 3, borderTop: '1px solid #3a3a3a' }}>
          <Button
            onClick={() => setVoteDialog(false)}
            sx={{
              color: '#b0b0b0',
              borderColor: '#3a3a3a',
              '&:hover': {
                borderColor: '#4a4a4a',
                backgroundColor: 'rgba(255,255,255,0.05)',
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleVote}
            variant="contained"
            disabled={!selectedItem || (userProfile?.governanceTokens || 0) <= 0}
            sx={{
              background: 'linear-gradient(135deg, #42A5F5, #1E88E5)',
              '&:hover': {
                background: 'linear-gradient(135deg, #1E88E5, #1565C0)',
              },
              '&.Mui-disabled': {
                background: '#2a2a2a',
                color: '#666666',
              },
            }}
          >
            Submit Vote
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Voting; 