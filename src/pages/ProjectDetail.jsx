import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  LinearProgress,
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import {
  LocationOn as LocationIcon,
  People as PeopleIcon,
  CheckCircle as CheckIcon,
  Construction as ConstructionIcon,
  Schedule as ScheduleIcon,
  Fund as FundIcon,
  Share as ShareIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Token as TokenIcon,
  ArrowBack as ArrowBackIcon,
} from "@mui/icons-material";
import { useParams, useNavigate } from "react-router-dom";

const TabPanel = ({ children, value, index }) => (
  <div hidden={value !== index}>
    {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
  </div>
);

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [fundingAmount, setFundingAmount] = useState("");
  const [showFundingDialog, setShowFundingDialog] = useState(false);

  const mockProject = {
    id: 1,
    name: "Borehole for 500 families in Kisumu",
    location: "Kisumu, Kenya",
    description: "Providing clean water access to 500 families through a sustainable borehole system with solar-powered pumps.",
    category: "Water",
    categoryColor: "#2196f3",
    fundingProgress: 70,
    raised: 35000,
    goal: 50000,
    team: "Kisumu Water Initiative",
    teamSize: 8,
    image: "https://via.placeholder.com/800x400/2196f3/ffffff?text=Water+Project",
    milestones: [
      { name: "Land Acquisition", status: "completed", date: "2024-01-15" },
      { name: "Construction", status: "in-progress", date: "2024-03-01" },
      { name: "Completion", status: "pending", date: "2024-05-15" },
    ],
    teamMembers: [
      { name: "Sarah Mwangi", role: "Project Manager", avatar: "SM" },
      { name: "John Ochieng", role: "Water Engineer", avatar: "JO" },
    ],
    nftDetails: {
      name: "Kisumu Water Guardian NFT",
      price: 100,
      totalSupply: 500,
      minted: 350,
    },
  };

  const getMilestoneIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckIcon sx={{ color: "#4caf50" }} />;
      case "in-progress":
        return <ConstructionIcon sx={{ color: "#ff9800" }} />;
      case "pending":
        return <ScheduleIcon sx={{ color: "#9e9e9e" }} />;
      default:
        return <ScheduleIcon sx={{ color: "#9e9e9e" }} />;
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate("/projects")}
        sx={{ mb: 3 }}
      >
        Back to Projects
      </Button>

      <Grid container spacing={4} mb={4}>
        <Grid item xs={12} md={8}>
          <CardMedia
            component="img"
            height="400"
            image={mockProject.image}
            alt={mockProject.name}
            sx={{ borderRadius: 3, objectFit: "cover" }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: "100%", p: 3 }}>
            <Box display="flex" alignItems="center" gap={1} mb={2}>
              <LocationIcon sx={{ color: "text.secondary" }} />
              <Typography variant="body2" color="text.secondary">
                {mockProject.location}
              </Typography>
              <Chip
                label={mockProject.category}
                size="small"
                sx={{
                  ml: "auto",
                  background: `linear-gradient(135deg, ${mockProject.categoryColor} 0%, ${mockProject.categoryColor}80 100%)`,
                  color: "white",
                  fontWeight: 600,
                }}
              />
            </Box>

            <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
              {mockProject.name}
            </Typography>

            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              {mockProject.description}
            </Typography>

            <Box mb={3}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  ${mockProject.raised.toLocaleString()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  of ${mockProject.goal.toLocaleString()} goal
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={mockProject.fundingProgress}
                sx={{
                  height: 10,
                  borderRadius: 5,
                  "& .MuiLinearProgress-bar": {
                    background: `linear-gradient(90deg, ${mockProject.categoryColor} 0%, ${mockProject.categoryColor}80 100%)`,
                    borderRadius: 5,
                  },
                }}
              />
              <Typography variant="body2" color="text.secondary" mt={1}>
                {mockProject.fundingProgress}% funded
              </Typography>
            </Box>

            <Stack spacing={2}>
              <Button
                variant="contained"
                size="large"
                startIcon={<FundIcon />}
                onClick={() => setShowFundingDialog(true)}
                sx={{
                  borderRadius: 2,
                  py: 1.5,
                  fontWeight: 600,
                  textTransform: "none",
                  background: `linear-gradient(135deg, ${mockProject.categoryColor} 0%, ${mockProject.categoryColor}80 100%)`,
                }}
              >
                Fund This Project
              </Button>
              <Box display="flex" gap={1}>
                <Button
                  variant="outlined"
                  startIcon={isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                  onClick={() => setIsLiked(!isLiked)}
                  sx={{ flex: 1 }}
                >
                  {isLiked ? "Liked" : "Like"}
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<ShareIcon />}
                  sx={{ flex: 1 }}
                >
                  Share
                </Button>
              </Box>
            </Stack>
          </Card>
        </Grid>
      </Grid>

      <Card sx={{ mb: 4 }}>
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
          <Tab label="Overview" />
          <Tab label="Team" />
          <Tab label="NFT Details" />
        </Tabs>

        <TabPanel value={activeTab} index={0}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Project Milestones
              </Typography>
              <Stack spacing={2}>
                {mockProject.milestones.map((milestone, index) => (
                  <Box key={index} display="flex" alignItems="flex-start" gap={2}>
                    <Box
                      sx={{
                        mt: 0.5,
                        width: 24,
                        height: 24,
                        borderRadius: "50%",
                        background: milestone.status === "completed" ? "#4caf50" : 
                                   milestone.status === "in-progress" ? "#ff9800" : "#9e9e9e",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                      }}
                    >
                      {getMilestoneIcon(milestone.status)}
                    </Box>
                    <Box flex={1}>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        {milestone.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {milestone.date}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Stack>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={activeTab} index={1}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
            Project Team
          </Typography>
          <Grid container spacing={3}>
            {mockProject.teamMembers.map((member, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card sx={{ p: 3, textAlign: "center" }}>
                  <Avatar
                    sx={{
                      width: 80,
                      height: 80,
                      mx: "auto",
                      mb: 2,
                      bgcolor: mockProject.categoryColor,
                      fontSize: "1.5rem",
                    }}
                  >
                    {member.avatar}
                  </Avatar>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    {member.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {member.role}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </TabPanel>

        <TabPanel value={activeTab} index={2}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                {mockProject.nftDetails.name}
              </Typography>
              <Typography variant="body1" sx={{ mb: 3 }}>
                Exclusive NFT for project backers featuring unique artwork representing water sustainability.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                  NFT Details
                </Typography>
                <Stack spacing={2}>
                  <Box display="flex" justifyContent="space-between">
                    <Typography>Price:</Typography>
                    <Typography sx={{ fontWeight: 600 }}>
                      ${mockProject.nftDetails.price}
                    </Typography>
                  </Box>
                  <Box display="flex" justifyContent="space-between">
                    <Typography>Total Supply:</Typography>
                    <Typography sx={{ fontWeight: 600 }}>
                      {mockProject.nftDetails.totalSupply}
                    </Typography>
                  </Box>
                  <Box display="flex" justifyContent="space-between">
                    <Typography>Minted:</Typography>
                    <Typography sx={{ fontWeight: 600 }}>
                      {mockProject.nftDetails.minted}
                    </Typography>
                  </Box>
                </Stack>
                <Button
                  variant="contained"
                  fullWidth
                  startIcon={<TokenIcon />}
                  sx={{ mt: 3 }}
                >
                  Buy NFT
                </Button>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>
      </Card>

      <Dialog
        open={showFundingDialog}
        onClose={() => setShowFundingDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Fund This Project</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Amount (USD)"
              type="number"
              value={fundingAmount}
              onChange={(e) => setFundingAmount(e.target.value)}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowFundingDialog(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={() => setShowFundingDialog(false)}
            disabled={!fundingAmount || fundingAmount <= 0}
          >
            Confirm Funding
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ProjectDetail;
