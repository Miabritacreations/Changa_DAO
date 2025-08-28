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
        
        // Set comprehensive dummy data when backend fails
        const dummyProjects = [
          {
            id: 1,
            title: "Solar Power for Rural Clinics",
            description: "Install solar panels to power medical equipment in 3 clinics serving 10,000 people. This project will provide reliable electricity for life-saving medical procedures.",
            category: "Healthcare",
            status: "Active",
            fundingGoal: 35000,
            currentFunding: 28000,
            endDate: "2024-06-30",
            image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop&crop=center"
          },
          {
            id: 2,
            title: "Digital Learning Center",
            description: "Modern computer lab and digital literacy program for underserved students. Includes 50 computers, internet connectivity, and certified instructors.",
            category: "Education",
            status: "Active",
            fundingGoal: 15000,
            currentFunding: 12000,
            endDate: "2024-08-15",
            image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&h=250&fit=crop&crop=center"
          },
          {
            id: 3,
            title: "Clean Water for Village",
            description: "Build a sustainable water system with purification for 500 families. This project will provide clean drinking water and reduce waterborne diseases.",
            category: "Water",
            status: "Active",
            fundingGoal: 25000,
            currentFunding: 18750,
            endDate: "2024-07-31",
            image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=250&fit=crop&crop=center"
          },
          {
            id: 4,
            title: "Community Health Outreach",
            description: "Mobile health screenings and vaccinations across rural wards. This initiative will reach 5,000 people in remote areas.",
            category: "Health",
            status: "PendingReview",
            fundingGoal: 6000,
            currentFunding: 6000,
            endDate: "2024-05-20",
            image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=250&fit=crop&crop=center"
          },
          {
            id: 5,
            title: "Irrigation for Smallholders",
            description: "Low-cost drip irrigation to increase farm yields by 40%. This project will help 100 small-scale farmers improve their productivity.",
            category: "Agriculture",
            status: "Active",
            fundingGoal: 20000,
            currentFunding: 9000,
            endDate: "2024-09-15",
            image: "https://images.unsplash.com/photo-1574943320219-553eb213f72f?w=400&h=250&fit=crop&crop=center"
          },
          {
            id: 6,
            title: "Renewable Energy Training",
            description: "Skills development program for solar panel installation and maintenance. Training 50 local technicians for sustainable employment.",
            category: "Education",
            status: "Draft",
            fundingGoal: 15000,
            currentFunding: 0,
            endDate: "2024-10-31",
            image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&h=250&fit=crop&crop=center"
          }
        ];

        const dummyProposals = [
          {
            id: 1,
            title: "Increase Community Fund Allocation",
            description: "Proposal to increase the community development fund from 10% to 15% of total treasury. This will allow for more impactful projects and better community support across all regions.",
            type: "GovernanceChange",
            status: "Active",
            votesFor: 45,
            votesAgainst: 12,
            endDate: "2024-03-10",
            quorum: 50,
            totalVotes: 57,
            documents: [
              { name: "Financial Analysis.pdf", hash: "ipfs://QmHash1" },
              { name: "Community Impact Report.docx", hash: "ipfs://QmHash2" }
            ]
          },
          {
            id: 2,
            title: "New Project Approval: Solar Energy Initiative",
            description: "Approval for a new solar energy project to provide renewable power to 3 communities. Estimated cost: $80,000 with expected ROI of 25% over 5 years.",
            type: "ProjectApproval",
            status: "Active",
            votesFor: 38,
            votesAgainst: 8,
            endDate: "2024-03-12",
            quorum: 40,
            totalVotes: 46,
            documents: [
              { name: "Project Proposal.pdf", hash: "ipfs://QmHash3" },
              { name: "Technical Specifications.pdf", hash: "ipfs://QmHash4" },
              { name: "Cost Analysis.xlsx", hash: "ipfs://QmHash5" }
            ]
          },
          {
            id: 3,
            title: "Emergency Response Fund",
            description: "Creation of a $25,000 emergency fund for rapid response to natural disasters and urgent community needs. This will provide immediate assistance during crises.",
            type: "TreasuryAllocation",
            status: "Active",
            votesFor: 52,
            votesAgainst: 5,
            endDate: "2024-03-08",
            quorum: 45,
            totalVotes: 57,
            documents: [
              { name: "Emergency Fund Proposal.pdf", hash: "ipfs://QmHash6" },
              { name: "Risk Assessment.pdf", hash: "ipfs://QmHash7" }
            ]
          },
          {
            id: 4,
            title: "Milestone Approval: Water Project Phase 1",
            description: "Approval for the completion of Phase 1 of the Clean Water Project. All milestones have been met and verified through geo-tagged proof.",
            type: "MilestoneApproval",
            status: "Active",
            votesFor: 28,
            votesAgainst: 3,
            endDate: "2024-03-15",
            quorum: 25,
            totalVotes: 31,
            documents: [
              { name: "Phase 1 Completion Report.pdf", hash: "ipfs://QmHash8" },
              { name: "Verification Photos.zip", hash: "ipfs://QmHash9" }
            ]
          },
          {
            id: 5,
            title: "Community Governance Restructure",
            description: "Restructure the DAO governance to include more community representatives and improve decision-making processes for better inclusivity.",
            type: "GovernanceChange",
            status: "Passed",
            votesFor: 65,
            votesAgainst: 18,
            endDate: "2024-02-28",
            quorum: 60,
            totalVotes: 83,
            documents: [
              { name: "Governance Restructure Plan.pdf", hash: "ipfs://QmHash10" },
              { name: "Community Feedback Summary.pdf", hash: "ipfs://QmHash11" }
            ]
          },
          {
            id: 6,
            title: "Treasury Investment Strategy",
            description: "Proposal to diversify treasury investments into DeFi protocols to generate additional income for community projects.",
            type: "TreasuryAllocation",
            status: "Failed",
            votesFor: 22,
            votesAgainst: 35,
            endDate: "2024-02-25",
            quorum: 50,
            totalVotes: 57,
            documents: [
              { name: "Investment Strategy.pdf", hash: "ipfs://QmHash12" },
              { name: "Risk Analysis.pdf", hash: "ipfs://QmHash13" }
            ]
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
        // Vote success handled silently
        // Refresh data
        window.location.reload();
      } else {
        console.error('Failed to submit vote:', result.err);
      }
    } catch (error) {
      console.error('Error voting:', error);
              console.error('Error submitting vote:', error);
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
                                            console.log(`Opening document: ${doc.name}\nHash: ${doc.hash}`);
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