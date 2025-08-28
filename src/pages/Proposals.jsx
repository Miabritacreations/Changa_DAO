import {
  Add as AddIcon,
  Agriculture as AgricultureIcon,
  AttachFile as AttachFileIcon,
  Cancel as CancelIcon,
  CheckCircle as CheckCircleIcon,
  CloudUpload as CloudUploadIcon,
  Delete as DeleteIcon,
  FilterList as FilterIcon,
  LocalHospital as HealthIcon,
  Business as ProjectsIcon,
  Schedule as ScheduleIcon,
  School as SchoolIcon,
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
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  MenuItem,
  Paper,
  Tab,
  Tabs,
  TextField,
  Typography,
  useTheme
} from "@mui/material";
import React from "react";
import { getBackendActor } from "../api/canister";

const Proposals = () => {
  const [proposals, setProposals] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [filter, setFilter] = React.useState('all');
  const [createProposalDialog, setCreateProposalDialog] = React.useState(false);
  const [newProposal, setNewProposal] = React.useState({
    title: '',
    description: '',
    projectId: null,
    proposalType: 'ProjectApproval',
    quorum: 10,
    endDate: Date.now() + (7 * 24 * 60 * 60 * 1000) // 7 days from now
  });
  const [attachedDocuments, setAttachedDocuments] = React.useState([]);
  const [dragOver, setDragOver] = React.useState(false);
  const [votingDialog, setVotingDialog] = React.useState(false);
  const [selectedProposal, setSelectedProposal] = React.useState(null);
  const [voteChoice, setVoteChoice] = React.useState(true); // true = for, false = against
  const theme = useTheme();

  console.log('Proposals component loaded');

  React.useEffect(() => {
    (async () => {
      try {
        const backend = await getBackendActor();
        const list = await backend.getProposals();
        setProposals(list);
      } catch (error) {
        console.error('Error loading proposals:', error);
        
        // Set comprehensive dummy data when backend fails
        const dummyProposals = [
          {
            id: 1,
            title: "Increase Community Fund Allocation",
            description: "Proposal to increase the community development fund from 10% to 15% of total treasury. This will allow for more impactful projects and better community support across all regions. The additional funding will enable faster project completion and support more communities in need.",
            proposalType: "GovernanceChange",
            status: "Active",
            votesFor: 45,
            votesAgainst: 12,
            quorum: 50,
            endDate: Date.now() + (3 * 24 * 60 * 60 * 1000), // 3 days from now
            totalVotes: 57,
            documents: [
              { name: "Financial Analysis.pdf", hash: "ipfs://QmHash1" },
              { name: "Community Impact Report.docx", hash: "ipfs://QmHash2" },
              { name: "Budget Allocation Plan.xlsx", hash: "ipfs://QmHash3" }
            ]
          },
          {
            id: 2,
            title: "New Project Approval: Solar Energy Initiative",
            description: "Approval for a new solar energy project to provide renewable power to 3 communities. Estimated cost: $80,000 with expected ROI of 25% over 5 years. This project will create 15 local jobs and provide sustainable energy for 1,200 households.",
            proposalType: "ProjectApproval",
            status: "Active",
            votesFor: 38,
            votesAgainst: 8,
            quorum: 40,
            endDate: Date.now() + (5 * 24 * 60 * 60 * 1000), // 5 days from now
            totalVotes: 46,
            documents: [
              { name: "Project Proposal.pdf", hash: "ipfs://QmHash4" },
              { name: "Technical Specifications.pdf", hash: "ipfs://QmHash5" },
              { name: "Cost Analysis.xlsx", hash: "ipfs://QmHash6" },
              { name: "Environmental Impact Assessment.pdf", hash: "ipfs://QmHash7" }
            ]
          },
          {
            id: 3,
            title: "Emergency Response Fund Creation",
            description: "Creation of a $25,000 emergency fund for rapid response to natural disasters and urgent community needs. This fund will be managed by elected community representatives.",
            proposalType: "TreasuryAllocation",
            status: "Active",
            votesFor: 52,
            votesAgainst: 5,
            quorum: 45,
            endDate: Date.now() + (2 * 24 * 60 * 60 * 1000), // 2 days from now
            documents: [
              { name: "Emergency Fund Guidelines.pdf", hash: "ipfs://QmHash6" }
            ]
          },
          {
            id: 4,
            title: "Update DAO Governance Rules",
            description: "Proposal to update the DAO governance rules to include quadratic voting and improve transparency in decision-making processes.",
            proposalType: "GovernanceChange",
            status: "Passed",
            votesFor: 67,
            votesAgainst: 15,
            quorum: 60,
            endDate: Date.now() - (2 * 24 * 60 * 60 * 1000), // 2 days ago
            documents: [
              { name: "Governance Rules Update.pdf", hash: "ipfs://QmHash7" },
              { name: "Quadratic Voting Guide.pdf", hash: "ipfs://QmHash8" }
            ]
          },
          {
            id: 5,
            title: "Milestone Approval: Water Project Phase 1",
            description: "Approval for the completion of Phase 1 of the Clean Water Initiative. All objectives have been met and the project is ready for Phase 2 funding.",
            proposalType: "MilestoneApproval",
            status: "Executed",
            votesFor: 89,
            votesAgainst: 3,
            quorum: 70,
            endDate: Date.now() - (5 * 24 * 60 * 60 * 1000), // 5 days ago
            documents: [
              { name: "Phase 1 Report.pdf", hash: "ipfs://QmHash9" },
              { name: "Audit Results.pdf", hash: "ipfs://QmHash10" },
              { name: "Phase 2 Proposal.pdf", hash: "ipfs://QmHash11" }
            ]
          }
        ];
        
        setProposals(dummyProposals);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleCreateProposal = async () => {
    try {
      const backend = await getBackendActor();
      
      // Convert attached documents to the format expected by the backend
      const documents = attachedDocuments.map(doc => ({
        id: doc.id.toString(),
        name: doc.name,
        contentType: doc.type,
        size: BigInt(doc.size),
        uploadDate: BigInt(doc.uploadDate.getTime()),
        hash: `ipfs://${doc.id}`, // Placeholder hash - in a real implementation, you'd upload to IPFS
      }));

      const result = await backend.createProposal({
        title: newProposal.title,
        description: newProposal.description,
        proposalType: newProposal.proposalType,
        quorum: BigInt(newProposal.quorum),
        endDate: BigInt(newProposal.endDate),
        documents: documents // Include the documents
      });

      if ('ok' in result) {
        setCreateProposalDialog(false);
        setNewProposal({
          title: '',
          description: '',
          projectId: null,
          proposalType: 'ProjectApproval',
          quorum: 10,
          endDate: Date.now() + (7 * 24 * 60 * 60 * 1000)
        });
        setAttachedDocuments([]);
        // Success handled silently
        // Refresh proposals
        window.location.reload();
      } else {
        console.error('Failed to create proposal:', result.err);
      }
    } catch (error) {
      console.error('Error creating proposal:', error);
              console.error('Error creating proposal:', error);
    }
  };

  // File handling functions
  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    const validFiles = files.filter(file => {
      const maxSize = 10 * 1024 * 1024; // 10MB limit
      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'image/jpeg',
        'image/png',
        'image/gif',
        'text/plain'
      ];
      
      if (file.size > maxSize) {
        console.warn(`File ${file.name} is too large. Maximum size is 10MB.`);
        return false;
      }
      
      if (!allowedTypes.includes(file.type)) {
        console.warn(`File type ${file.type} is not supported.`);
        return false;
      }
      
      return true;
    });

    const newDocuments = validFiles.map(file => ({
      id: Date.now() + Math.random(),
      file,
      name: file.name,
      size: file.size,
      type: file.type,
      uploadDate: new Date()
    }));

    setAttachedDocuments(prev => [...prev, ...newDocuments]);
  };

  const handleFileDrop = (event) => {
    event.preventDefault();
    setDragOver(false);
    
    const files = Array.from(event.dataTransfer.files);
    const validFiles = files.filter(file => {
      const maxSize = 10 * 1024 * 1024; // 10MB limit
      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'image/jpeg',
        'image/png',
        'image/gif',
        'text/plain'
      ];
      
      if (file.size > maxSize) {
        console.warn(`File ${file.name} is too large. Maximum size is 10MB.`);
        return false;
      }
      
      if (!allowedTypes.includes(file.type)) {
        console.warn(`File type ${file.type} is not supported.`);
        return false;
      }
      
      return true;
    });

    const newDocuments = validFiles.map(file => ({
      id: Date.now() + Math.random(),
      file,
      name: file.name,
      size: file.size,
      type: file.type,
      uploadDate: new Date()
    }));

    setAttachedDocuments(prev => [...prev, ...newDocuments]);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setDragOver(false);
  };

  const removeDocument = (documentId) => {
    setAttachedDocuments(prev => prev.filter(doc => doc.id !== documentId));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (fileType) => {
    if (fileType.includes('pdf')) return '';
    if (fileType.includes('word') || fileType.includes('document')) return '📝';
    if (fileType.includes('image')) return '🖼️';
    if (fileType.includes('text')) return '📄';
    return '📎';
  };

  const handleVote = async () => {
    if (!selectedProposal) return;
    
    try {
      const backend = await getBackendActor();
      const result = await backend.vote(BigInt(selectedProposal.id), voteChoice);
      
      if ('ok' in result) {
        setVotingDialog(false);
        setSelectedProposal(null);
        setVoteChoice(true);
        // Vote success handled silently
        // Refresh proposals
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
      case 'healthcare':
      case 'health':
        return <HealthIcon />;
      case 'education':
        return <SchoolIcon />;
      case 'water':
        return <WaterIcon />;
      case 'agriculture':
        return <AgricultureIcon />;
      default:
        return <TreasuryIcon />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'warning';
      case 'Passed':
        return 'success';
      case 'Failed':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Active':
        return <ScheduleIcon />;
      case 'Passed':
        return <CheckCircleIcon />;
      case 'Failed':
        return <CancelIcon />;
      default:
        return <ScheduleIcon />;
    }
  };

  const getProposalTypeIcon = (type) => {
    switch (type) {
      case 'ProjectApproval':
        return <ProjectsIcon />;
      case 'MilestoneApproval':
        return <CheckCircleIcon />;
      case 'GovernanceChange':
        return <VoteIcon />;
      case 'TreasuryAllocation':
        return <TreasuryIcon />;
      case 'EmergencyAction':
        return <CancelIcon />;
      default:
        return <VoteIcon />;
    }
  };

  const filteredProposals = proposals.filter(proposal => {
    if (filter === 'all') return true;
    return proposal.status?.toLowerCase() === filter.toLowerCase();
  });

  const handleFilterChange = (event, newValue) => {
    setFilter(newValue);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4, backgroundColor: '#0F172A', minHeight: '100vh', color: 'white' }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 4, flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 1, color: 'white' }}>
            DAO Proposals
          </Typography>
          <Typography variant="h6" sx={{ color: '#94A3B8' }}>
            Review active and historical governance proposals
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setCreateProposalDialog(true)}
          sx={{
            background: 'linear-gradient(135deg, #1E40AF, #3B82F6)',
            '&:hover': {
              background: 'linear-gradient(135deg, #1E3A8A, #1E40AF)',
            },
          }}
        >
          Create Proposal
        </Button>
      </Box>

      {/* Filter Tabs */}
      <Paper sx={{ mb: 4, backgroundColor: '#1E293B', border: '1px solid #334155' }}>
        <Tabs
          value={filter}
          onChange={handleFilterChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            backgroundColor: '#1E293B',
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 600,
              color: '#94A3B8',
              '&.Mui-selected': {
                color: '#3B82F6',
              },
            },
            '& .MuiTabs-indicator': {
              backgroundColor: '#3B82F6',
            },
          }}
        >
          <Tab
            label={`All (${proposals.length})`}
            value="all"
            icon={<FilterIcon />}
            iconPosition="start"
          />
          <Tab
            label={`Active (${proposals.filter(p => p.status === 'Active').length})`}
            value="active"
            icon={<ScheduleIcon />}
            iconPosition="start"
          />
          <Tab
            label={`Passed (${proposals.filter(p => p.status === 'Passed').length})`}
            value="passed"
            icon={<CheckCircleIcon />}
            iconPosition="start"
          />
          <Tab
            label={`Failed (${proposals.filter(p => p.status === 'Failed').length})`}
            value="failed"
            icon={<CancelIcon />}
            iconPosition="start"
          />
        </Tabs>
      </Paper>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <Typography sx={{ color: '#94A3B8' }}>Loading proposals...</Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {filteredProposals.map((proposal) => (
            <Grid item xs={12} md={6} key={Number(proposal.id)}>
              <Card
                sx={{
                  height: '100%',
                  backgroundColor: '#1E293B',
                  border: '1px solid #334155',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 25px rgba(59, 130, 246, 0.15)',
                    borderColor: '#3B82F6',
                  },
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  {/* Header */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar
                        sx={{
                          backgroundColor: '#3B82F6',
                          color: 'white',
                          width: 40,
                          height: 40,
                        }}
                      >
                        {getProposalTypeIcon(proposal.proposalType)}
                      </Avatar>
                      <Box>
                        <Chip
                          label={proposal.category || 'General'}
                          size="small"
                          color="primary"
                          variant="outlined"
                        />
                      </Box>
                    </Box>
                    <Chip
                      icon={getStatusIcon(proposal.status)}
                      label={proposal.status}
                      color={getStatusColor(proposal.status)}
                      variant="filled"
                    />
                  </Box>

                  {/* Title and Description */}
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: 'white' }}>
                    {proposal.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#94A3B8', mb: 3, lineHeight: 1.6 }}>
                    {proposal.description}
                  </Typography>

                  {/* Documents Section */}
                  {proposal.documents && proposal.documents.length > 0 && (
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="subtitle2" sx={{ color: 'white', mb: 1, fontWeight: 600 }}>
                        📎 Attached Documents ({proposal.documents.length})
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {proposal.documents.map((doc, index) => (
                          <Chip
                            key={index}
                            icon={<AttachFileIcon />}
                            label={doc.name}
                            size="small"
                            variant="outlined"
                            sx={{
                              backgroundColor: 'rgba(66, 165, 245, 0.1)',
                              borderColor: '#42A5F5',
                              color: '#42A5F5',
                              '&:hover': {
                                backgroundColor: 'rgba(66, 165, 245, 0.2)',
                              },
                            }}
                            onClick={() => {
                              // In a real implementation, you'd open the document
                              console.log(`Opening document: ${doc.name}\nHash: ${doc.hash}`);
                            }}
                          />
                        ))}
                      </Box>
                    </Box>
                  )}

                  {/* Progress Bar */}
                  {proposal.percent && (
                    <Box sx={{ mb: 3 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                          Progress
                        </Typography>
                        <Typography variant="body2" fontWeight={600}>
                          {proposal.percent}%
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={proposal.percent}
                        sx={{ height: 8, borderRadius: 4 }}
                      />
                    </Box>
                  )}

                  {/* Stats */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h6" sx={{ fontWeight: 700, color: '#3B82F6' }}>
                        {proposal.votesFor || 0}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#94A3B8' }}>
                        Votes For
                      </Typography>
                    </Box>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h6" sx={{ fontWeight: 700, color: 'white' }}>
                        {proposal.votesAgainst || 0}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#94A3B8' }}>
                                                Votes Against
                      </Typography>
                    </Box>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h6" sx={{ fontWeight: 700, color: '#10B981' }}>
                        {proposal.quorum || 0}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#94A3B8' }}>
                        Quorum
                      </Typography>
                    </Box>
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  {/* Actions */}
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button
                      variant="outlined"
                      fullWidth
                      disabled={proposal.status !== 'Active'}
                      onClick={() => {
                        if (proposal.status === 'Active') {
                          setSelectedProposal(proposal);
                          setVotingDialog(true);
                        }
                      }}
                      sx={{
                        borderColor: '#475569',
                        color: '#94A3B8',
                        '&:hover': {
                          borderColor: '#3B82F6',
                          backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        },
                        '&.Mui-disabled': {
                          borderColor: '#334155',
                          color: '#64748B',
                        },
                      }}
                    >
                      {proposal.status === 'Active' ? 'Vote' : 'View Details'}
                    </Button>
                    <Button
                      variant="contained"
                      fullWidth
                      sx={{
                        background: 'linear-gradient(135deg, #1E40AF, #3B82F6)',
                        '&:hover': {
                          background: 'linear-gradient(135deg, #1E3A8A, #1E40AF)',
                        },
                      }}
                    >
                      View Details
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {!loading && filteredProposals.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <VoteIcon sx={{ fontSize: 64, color: '#64748B', mb: 2 }} />
          <Typography variant="h6" sx={{ color: '#64748B', mb: 1 }}>
            No proposals found
          </Typography>
          <Typography variant="body2" sx={{ color: '#64748B' }}>
            {filter === 'all' 
              ? 'No proposals have been created yet.' 
              : `No ${filter} proposals found.`
            }
          </Typography>
        </Box>
      )}

      {/* Create Proposal Dialog */}
      <Dialog 
        open={createProposalDialog} 
        onClose={() => setCreateProposalDialog(false)}
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
          Create New Proposal
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Proposal Title"
                value={newProposal.title}
                onChange={(e) => setNewProposal({...newProposal, title: e.target.value})}
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
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Description"
                value={newProposal.description}
                onChange={(e) => setNewProposal({...newProposal, description: e.target.value})}
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
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                select
                label="Proposal Type"
                value={newProposal.proposalType}
                onChange={(e) => setNewProposal({...newProposal, proposalType: e.target.value})}
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
              >
                <MenuItem value="ProjectApproval">Project Approval</MenuItem>
                <MenuItem value="MilestoneApproval">Milestone Approval</MenuItem>
                <MenuItem value="GovernanceChange">Governance Change</MenuItem>
                <MenuItem value="TreasuryAllocation">Treasury Allocation</MenuItem>
                <MenuItem value="EmergencyAction">Emergency Action</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="number"
                label="Quorum Required"
                value={newProposal.quorum}
                onChange={(e) => setNewProposal({...newProposal, quorum: parseInt(e.target.value) || 0})}
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
            </Grid>
            
            {/* Document Upload Section */}
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>
                Attach Documents
              </Typography>
              
              {/* Drag & Drop Area */}
              <Box
                onDrop={handleFileDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                sx={{
                  border: dragOver ? '2px dashed #42A5F5' : '2px dashed #3a3a3a',
                  borderRadius: 2,
                  p: 3,
                  textAlign: 'center',
                  backgroundColor: dragOver ? 'rgba(66, 165, 245, 0.1)' : '#1a1a1a',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  '&:hover': {
                    borderColor: '#42A5F5',
                    backgroundColor: 'rgba(66, 165, 245, 0.05)',
                  },
                }}
                onClick={() => document.getElementById('file-input').click()}
              >
                <CloudUploadIcon sx={{ fontSize: 48, color: '#b0b0b0', mb: 2 }} />
                <Typography variant="h6" sx={{ color: 'white', mb: 1 }}>
                  {dragOver ? 'Drop files here' : 'Drag & drop files here'}
                </Typography>
                <Typography variant="body2" sx={{ color: '#b0b0b0', mb: 2 }}>
                  or click to browse files
                </Typography>
                <Typography variant="caption" sx={{ color: '#666666' }}>
                  Supported formats: PDF, Word, Images, Text files (Max 10MB each)
                </Typography>
                
                <input
                  id="file-input"
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif,.txt"
                  onChange={handleFileSelect}
                  style={{ display: 'none' }}
                />
              </Box>
              
              {/* Attached Documents List */}
              {attachedDocuments.length > 0 && (
                <Box sx={{ mt: 3 }}>
                  <Typography variant="subtitle1" sx={{ color: 'white', mb: 2 }}>
                    Attached Documents ({attachedDocuments.length})
                  </Typography>
                  <Paper sx={{ backgroundColor: '#1a1a1a', border: '1px solid #3a3a3a' }}>
                    <List sx={{ p: 0 }}>
                      {attachedDocuments.map((doc, index) => (
                        <React.Fragment key={doc.id}>
                          <ListItem sx={{ px: 3, py: 2 }}>
                            <ListItemIcon sx={{ minWidth: 40 }}>
                              <Avatar sx={{ backgroundColor: 'primary.main', width: 32, height: 32 }}>
                                <Typography variant="caption" sx={{ fontSize: '12px' }}>
                                  {getFileIcon(doc.type)}
                                </Typography>
                              </Avatar>
                            </ListItemIcon>
                            <ListItemText
                              primary={
                                <Typography variant="body2" sx={{ color: 'white', fontWeight: 500 }}>
                                  {doc.name}
                                </Typography>
                              }
                              secondary={
                                <Typography variant="caption" sx={{ color: '#b0b0b0' }}>
                                  {formatFileSize(doc.size)} • {doc.type} • {doc.uploadDate.toLocaleDateString()}
                                </Typography>
                              }
                            />
                            <ListItemSecondaryAction>
                              <IconButton
                                edge="end"
                                onClick={() => removeDocument(doc.id)}
                                sx={{
                                  color: '#f44336',
                                  '&:hover': {
                                    backgroundColor: 'rgba(244, 67, 54, 0.1)',
                                  },
                                }}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </ListItemSecondaryAction>
                          </ListItem>
                          {index < attachedDocuments.length - 1 && (
                            <Divider sx={{ borderColor: '#3a3a3a' }} />
                          )}
                        </React.Fragment>
                      ))}
                    </List>
                  </Paper>
                </Box>
              )}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3, borderTop: '1px solid #3a3a3a' }}>
          <Button
            onClick={() => setCreateProposalDialog(false)}
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
            onClick={handleCreateProposal}
            variant="contained"
            disabled={!newProposal.title || !newProposal.description || newProposal.quorum <= 0}
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
            Create Proposal
          </Button>
        </DialogActions>
      </Dialog>

      {/* Voting Dialog */}
      <Dialog 
        open={votingDialog} 
        onClose={() => setVotingDialog(false)}
        maxWidth="sm"
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
          {selectedProposal && (
            <Box>
              <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>
                {selectedProposal.title}
              </Typography>
              <Typography variant="body2" sx={{ color: '#b0b0b0', mb: 3 }}>
                {selectedProposal.description}
              </Typography>
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" sx={{ color: '#b0b0b0', mb: 1 }}>
                  Current Votes: {selectedProposal.votesFor || 0} For / {selectedProposal.votesAgainst || 0} Against
                </Typography>
                <Typography variant="body2" sx={{ color: '#b0b0b0', mb: 2 }}>
                  Quorum Required: {selectedProposal.quorum || 0} votes
                </Typography>
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
                    sx={{
                      background: voteChoice ? 'linear-gradient(135deg, #4caf50, #45a049)' : 'transparent',
                      borderColor: voteChoice ? 'transparent' : '#4caf50',
                      color: voteChoice ? 'white' : '#4caf50',
                      '&:hover': {
                        background: voteChoice ? 'linear-gradient(135deg, #45a049, #388e3c)' : 'rgba(76, 175, 80, 0.1)',
                      },
                    }}
                  >
                    👍 Vote For
                  </Button>
                  <Button
                    variant={!voteChoice ? "contained" : "outlined"}
                    fullWidth
                    onClick={() => setVoteChoice(false)}
                    sx={{
                      background: !voteChoice ? 'linear-gradient(135deg, #f44336, #d32f2f)' : 'transparent',
                      borderColor: !voteChoice ? 'transparent' : '#f44336',
                      color: !voteChoice ? 'white' : '#f44336',
                      '&:hover': {
                        background: !voteChoice ? 'linear-gradient(135deg, #d32f2f, #c62828)' : 'rgba(244, 67, 54, 0.1)',
                      },
                    }}
                  >
                    👎 Vote Against
                  </Button>
                </Box>
              </Box>

              <Box sx={{ p: 2, backgroundColor: '#1a1a1a', borderRadius: 2, border: '1px solid #3a3a3a' }}>
                <Typography variant="body2" sx={{ color: '#b0b0b0', mb: 1 }}>
                  Your Vote: {voteChoice ? '👍 FOR' : '👎 AGAINST'}
                </Typography>
                <Typography variant="caption" sx={{ color: '#666666' }}>
                  This vote will be recorded on-chain and cannot be changed
                </Typography>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 3, borderTop: '1px solid #3a3a3a' }}>
          <Button
            onClick={() => setVotingDialog(false)}
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
            disabled={!selectedProposal}
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
    </Container>
  );
};

export default Proposals;
