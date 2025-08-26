import {
  Agriculture as AgricultureIcon,
  AttachFile as AttachFileIcon,
  Cancel as CancelIcon,
  CheckCircle as CheckCircleIcon,
  Group as GroupIcon,
  LocalHospital as HealthIcon,
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
        
        // Set dummy data when backend fails
        const dummyProjects = [
          {
            id: 1,
            title: "Clean Water Initiative",
            description: "Providing clean drinking water to rural communities in Kenya. This project aims to install 50 water purification systems across 10 villages.",
            category: "Water",
            status: "Active",
            fundingGoal: 50000,
            currentFunding: 35000,
            endDate: "2024-03-15"
          },
          {
            id: 2,
            title: "Digital Literacy Program",
            description: "Teaching computer skills to 500 students in underserved schools. Includes laptops, internet access, and certified instructors.",
            category: "Education",
            status: "Active",
            fundingGoal: 75000,
            currentFunding: 28000,
            endDate: "2024-04-20"
          },
          {
            id: 3,
            title: "Healthcare Mobile Clinic",
            description: "Mobile medical clinic to serve remote communities. Provides basic healthcare, vaccinations, and health education.",
            category: "Health",
            status: "PendingReview",
            fundingGoal: 120000,
            currentFunding: 0,
            endDate: "2024-05-10"
          },
          {
            id: 4,
            title: "Sustainable Farming Training",
            description: "Training 200 farmers in modern, sustainable agricultural techniques. Includes seeds, tools, and ongoing support.",
            category: "Agriculture",
            status: "Active",
            fundingGoal: 45000,
            currentFunding: 42000,
            endDate: "2024-03-30"
          }
        ];

        const dummyProposals = [
          {
            id: 1,
            title: "Increase Community Fund Allocation",
            description: "Proposal to increase the community development fund from 10% to 15% of total treasury. This will allow for more impactful projects.",
            type: "GovernanceChange",
            status: "Active",
            votesFor: 45,
            votesAgainst: 12,
            endDate: "2024-03-10"
          },
          {
            id: 2,
            title: "New Project Approval: Solar Energy Initiative",
            description: "Approval for a new solar energy project to provide renewable power to 3 communities. Estimated cost: $80,000.",
            type: "ProjectApproval",
            status: "Active",
            votesFor: 38,
            votesAgainst: 8,
            endDate: "2024-03-12"
          },
          {
            id: 3,
            title: "Emergency Response Fund",
            description: "Creation of a $25,000 emergency fund for rapid response to natural disasters and urgent community needs.",
            type: "TreasuryAllocation",
            status: "Active",
            votesFor: 52,
            votesAgainst: 5,
            endDate: "2024-03-08"
          }
        ];

        const dummyUserProfile = {
          governanceTokens: 1250,
          reputationScore: 85,
          kycStatus: true,
          totalVotes: 23,
          successfulVotes: 20
        };

        setProjects(dummyProjects);
        setProposals(dummyProposals);
        setUserProfile(dummyUserProfile);
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
      backgroundColor: '#0F172A',
      color: 'white',
      p: 3
    }}>
      {/* Header */}
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h3" sx={{ 
          fontWeight: 700, 
          mb: 2,
          background: 'linear-gradient(135deg, #1E40AF, #3B82F6)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          Active Voting Dashboard
        </Typography>
        <Typography variant="h6" sx={{ color: '#475569', maxWidth: 800, mx: 'auto' }}>
          Participate in governance and vote on projects and proposals. Your voice matters in shaping the future of our community.
        </Typography>
      </Box>

      {/* User Voting Power */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
                     <Card sx={{ 
             backgroundColor: '#1E293B',
             border: '2px solid #334155',
             borderRadius: 3,
             transition: 'all 0.3s ease',
             '&:hover': {
               transform: 'translateY(-4px)',
               boxShadow: '0 8px 25px rgba(59, 130, 246, 0.15)',
               borderColor: '#3B82F6',
             },
           }}>
            <CardContent sx={{ p: 3, textAlign: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                <Avatar
                  sx={{
                    backgroundColor: '#1E40AF',
                    color: 'white',
                    width: 48,
                    height: 48,
                    mr: 2,
                  }}
                >
                  <VoteIcon />
                </Avatar>
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, color: '#1E40AF' }}>
                {userProfile?.governanceTokens || 0}
              </Typography>
                             <Typography variant="body2" sx={{ color: '#94A3B8' }}>
                 Voting Power
               </Typography>
            </CardContent>
          </Card>
        </Grid>
        
                 <Grid item xs={12} md={4}>
           <Card sx={{ 
             backgroundColor: '#1E293B',
             border: '2px solid #334155',
             borderRadius: 3,
             transition: 'all 0.3s ease',
             '&:hover': {
               transform: 'translateY(-4px)',
               boxShadow: '0 8px 25px rgba(16, 185, 129, 0.15)',
               borderColor: '#10B981',
             },
           }}>
             <CardContent sx={{ p: 3, textAlign: 'center' }}>
               <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                 <Avatar
                   sx={{
                     backgroundColor: '#10B981',
                     color: 'white',
                     width: 48,
                     height: 48,
                     mr: 2,
                   }}
                 >
                   <StarIcon />
                 </Avatar>
               </Box>
               <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, color: '#10B981' }}>
                 {userProfile?.reputationScore || 0}
               </Typography>
               <Typography variant="body2" sx={{ color: '#94A3B8' }}>
                 Reputation Score
               </Typography>
             </CardContent>
           </Card>
         </Grid>
         
         <Grid item xs={12} md={4}>
           <Card sx={{ 
             backgroundColor: '#1E293B',
             border: '2px solid #334155',
             borderRadius: 3,
             transition: 'all 0.3s ease',
             '&:hover': {
               transform: 'translateY(-4px)',
               boxShadow: '0 8px 25px rgba(249, 115, 22, 0.15)',
               borderColor: '#F97316',
             },
           }}>
            <CardContent sx={{ p: 3, textAlign: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                <Avatar
                  sx={{
                    backgroundColor: '#F97316',
                    color: 'white',
                    width: 48,
                    height: 48,
                    mr: 2,
                  }}
                >
                  <ThumbUpIcon />
                </Avatar>
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, color: '#F97316' }}>
                {filteredProjects.filter(p => variantToString(p.status) === 'Active').length + 
                 filteredProposals.filter(p => variantToString(p.status) === 'Active').length}
              </Typography>
              <Typography variant="body2" sx={{ color: '#64748B' }}>
                Active Votes
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <Typography sx={{ color: '#94A3B8' }}>Loading voting data...</Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {/* Projects Available for Voting */}
          <Grid item xs={12} lg={6}>
                         <Card sx={{ 
               backgroundColor: '#1E293B',
               border: '2px solid #334155',
               borderRadius: 3,
               transition: 'all 0.3s ease',
               '&:hover': {
                 boxShadow: '0 4px 20px rgba(59, 130, 246, 0.1)',
               },
             }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 3, color: '#1E40AF' }}>
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
                                backgroundColor: '#1E40AF',
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
                                 <Typography variant="body2" sx={{ color: '#94A3B8', mb: 1 }}>
                                   {project.description}
                                 </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                                  <Chip
                                    label={project.category}
                                    size="small"
                                    variant="outlined"
                                    sx={{ 
                                      backgroundColor: 'rgba(30, 64, 175, 0.1)',
                                      borderColor: '#1E40AF',
                                      color: '#1E40AF'
                                    }}
                                  />
                                  <Chip
                                    label={variantToString(project.status)}
                                    size="small"
                                    sx={{
                                      backgroundColor: variantToString(project.status) === 'Active' 
                                        ? 'rgba(16, 185, 129, 0.1)' 
                                        : 'rgba(249, 115, 22, 0.1)',
                                      borderColor: variantToString(project.status) === 'Active' 
                                        ? '#10B981' 
                                        : '#F97316',
                                      color: variantToString(project.status) === 'Active' 
                                        ? '#10B981' 
                                        : '#F97316'
                                    }}
                                  />
                                                                     <Button
                                     variant="contained"
                                     size="small"
                                     onClick={() => {
                                       setSelectedItem(project);
                                       setVoteDialog(true);
                                     }}
                                     sx={{
                                       backgroundColor: '#F97316',
                                       '&:hover': {
                                         backgroundColor: '#EA580C',
                                       },
                                     }}
                                   >
                                     Vote Now
                                   </Button>
                                 </Box>
                                 <Typography variant="caption" sx={{ color: '#64748B' }}>
                                   Goal: ${project.fundingGoal?.toLocaleString() || '0'} | Raised: ${project.currentFunding?.toLocaleString() || '0'}
                                 </Typography>
                               </Box>
                             }
                           />
                        </ListItem>
                        {index < filteredProjects.length - 1 && (
                          <Divider sx={{ borderColor: '#3a3a3a' }} />
                        )}
                      </React.Fragment>
                    ))}
                  </List>
                                 ) : (
                   <Box sx={{ textAlign: 'center', py: 4 }}>
                     <ProjectsIcon sx={{ fontSize: 48, color: '#94A3B8', mb: 2 }} />
                     <Typography variant="h6" sx={{ color: '#94A3B8', mb: 1 }}>
                       No projects available for voting
                     </Typography>
                     <Typography variant="body2" sx={{ color: '#94A3B8' }}>
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
               backgroundColor: '#1E293B',
               border: '2px solid #334155',
               borderRadius: 3,
               transition: 'all 0.3s ease',
               '&:hover': {
                 boxShadow: '0 4px 20px rgba(16, 185, 129, 0.1)',
               },
             }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 3, color: '#10B981' }}>
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
                                backgroundColor: '#10B981',
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
                                 <Typography variant="body2" sx={{ color: '#94A3B8', mb: 1 }}>
                                   {proposal.description}
                                 </Typography>
                                 <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                                   <Chip
                                     label={variantToString(proposal.type)}
                                     size="small"
                                     variant="outlined"
                                     sx={{ 
                                       backgroundColor: 'rgba(16, 185, 129, 0.1)',
                                       borderColor: '#10B981',
                                       color: '#10B981'
                                     }}
                                   />
                                   <Chip
                                     label={variantToString(proposal.status)}
                                     size="small"
                                     sx={{
                                       backgroundColor: variantToString(proposal.status) === 'Active' 
                                         ? 'rgba(16, 185, 129, 0.1)' 
                                         : 'rgba(249, 115, 22, 0.1)',
                                       borderColor: variantToString(proposal.status) === 'Active' 
                                         ? '#10B981' 
                                         : '#F97316',
                                       color: variantToString(proposal.status) === 'Active' 
                                         ? '#10B981' 
                                         : '#F97316'
                                     }}
                                   />
                                   <Button
                                     variant="contained"
                                     size="small"
                                     onClick={() => {
                                       setSelectedItem(proposal);
                                       setVoteDialog(true);
                                     }}
                                     sx={{
                                       backgroundColor: '#10B981',
                                       '&:hover': {
                                         backgroundColor: '#059669',
                                       },
                                     }}
                                   >
                                     Vote Now
                                   </Button>
                                 </Box>
                                 <Typography variant="caption" sx={{ color: '#64748B' }}>
                                   Votes: {proposal.votesFor || 0} For / {proposal.votesAgainst || 0} Against
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
                          
                        </ListItem>
                        {index < filteredProposals.length - 1 && (
                          <Divider sx={{ borderColor: '#3a3a3a' }} />
                        )}
                      </React.Fragment>
                    ))}
                  </List>
                                 ) : (
                   <Box sx={{ textAlign: 'center', py: 4 }}>
                     <VoteIcon sx={{ fontSize: 48, color: '#94A3B8', mb: 2 }} />
                     <Typography variant="h6" sx={{ color: '#94A3B8', mb: 1 }}>
                       No active proposals
                     </Typography>
                     <Typography variant="body2" sx={{ color: '#94A3B8' }}>
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
             backgroundColor: '#FFFFFF',
             border: '2px solid #E2E8F0',
             borderRadius: 3,
           }
         }}
       >
         <DialogTitle sx={{ color: '#1E40AF', borderBottom: '1px solid #E2E8F0', fontWeight: 600 }}>
           Cast Your Vote
         </DialogTitle>
                 <DialogContent sx={{ pt: 3 }}>
           {selectedItem && (
             <Box>
               <Typography variant="h6" sx={{ color: '#0F172A', mb: 2, fontWeight: 600 }}>
                 {selectedItem.title}
               </Typography>
               <Typography variant="body2" sx={{ color: '#64748B', mb: 3 }}>
                 {selectedItem.description}
               </Typography>
               
               <Box sx={{ mb: 3, p: 2, backgroundColor: '#F8FAFC', borderRadius: 2, border: '1px solid #E2E8F0' }}>
                 <Typography variant="body2" sx={{ color: '#64748B', mb: 1 }}>
                   Your Voting Power: {userProfile?.governanceTokens || 0} tokens
                 </Typography>
                 <Typography variant="body2" sx={{ color: '#64748B', mb: 1 }}>
                   Reputation Score: {userProfile?.reputationScore || 0}
                 </Typography>
                 {selectedItem.votesFor !== undefined && (
                   <Typography variant="body2" sx={{ color: '#64748B' }}>
                     Current Votes: {selectedItem.votesFor || 0} For / {selectedItem.votesAgainst || 0} Against
                   </Typography>
                 )}
               </Box>

                             <Box sx={{ mb: 3 }}>
                 <Typography variant="body2" sx={{ color: '#64748B', mb: 2, fontWeight: 500 }}>
                   How do you want to vote?
                 </Typography>
                 <Box sx={{ display: 'flex', gap: 2 }}>
                   <Button
                     variant={voteChoice ? "contained" : "outlined"}
                     fullWidth
                     onClick={() => setVoteChoice(true)}
                     startIcon={<ThumbUpIcon />}
                     sx={{
                       background: voteChoice ? '#10B981' : 'transparent',
                       borderColor: voteChoice ? 'transparent' : '#10B981',
                       color: voteChoice ? 'white' : '#10B981',
                       '&:hover': {
                         background: voteChoice ? '#059669' : 'rgba(16, 185, 129, 0.1)',
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
                       background: !voteChoice ? '#EF4444' : 'transparent',
                       borderColor: !voteChoice ? 'transparent' : '#EF4444',
                       color: !voteChoice ? 'white' : '#EF4444',
                       '&:hover': {
                         background: !voteChoice ? '#DC2626' : 'rgba(239, 68, 68, 0.1)',
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
                     backgroundColor: '#FFFFFF',
                     borderColor: '#E2E8F0',
                     color: '#0F172A',
                     '& fieldset': {
                       borderColor: '#E2E8F0',
                     },
                     '&:hover fieldset': {
                       borderColor: '#1E40AF',
                     },
                     '&.Mui-focused fieldset': {
                       borderColor: '#1E40AF',
                     },
                   },
                   '& .MuiInputLabel-root': {
                     color: '#64748B',
                   },
                   '& .MuiInputBase-input': {
                     color: '#0F172A',
                   },
                 }}
               />

               <Box sx={{ mt: 2, p: 2, backgroundColor: '#F8FAFC', borderRadius: 2, border: '1px solid #E2E8F0' }}>
                 <Typography variant="body2" sx={{ color: '#64748B', mb: 1 }}>
                   Your Vote: {voteChoice ? '👍 FOR' : '👎 AGAINST'}
                 </Typography>
                 <Typography variant="caption" sx={{ color: '#94A3B8' }}>
                   This vote will be recorded on-chain and cannot be changed. Your voting power and reputation will be considered.
                 </Typography>
               </Box>
            </Box>
          )}
        </DialogContent>
                 <DialogActions sx={{ p: 3, borderTop: '1px solid #E2E8F0' }}>
           <Button
             onClick={() => setVoteDialog(false)}
             sx={{
               color: '#64748B',
               borderColor: '#E2E8F0',
               '&:hover': {
                 borderColor: '#1E40AF',
                 backgroundColor: 'rgba(30, 64, 175, 0.05)',
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
               backgroundColor: '#1E40AF',
               '&:hover': {
                 backgroundColor: '#1E3A8A',
               },
               '&.Mui-disabled': {
                 backgroundColor: '#E2E8F0',
                 color: '#94A3B8',
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