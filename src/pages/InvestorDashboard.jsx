import {
    CheckCircle as CheckIcon,
    AccountBalanceWallet as ConnectWalletIcon,
    Download as DownloadIcon,
    Notifications as NotificationsIcon,
    TrendingUp as TrendingUpIcon,
    Visibility as ViewIcon,
    AccountBalance as WalletIcon
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
    Grid,
    Stack,
    Tab,
    Tabs,
    Typography
} from "@mui/material";
import React, { useState } from "react";

const TabPanel = ({ children, value, index }) => (
  <div hidden={value !== index}>
    {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
  </div>
);

const InvestorDashboard = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [showConnectWallet, setShowConnectWallet] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState("");

  const portfolioStats = {
    totalInvested: 15000,
    currentValue: 18250,
    totalReturn: 21.67,
    socialReturn: 89,
    projectsFunded: 8,
    nftsOwned: 12,
  };

  const fundedProjects = [
    {
      id: 1,
      name: "Kisumu Water Project",
      amount: 5000,
      date: "2024-01-15",
      status: "completed",
      roi: 15,
      socialImpact: 2500,
      category: "Water",
    },
    {
      id: 2,
      name: "Solar Power Initiative",
      amount: 3000,
      date: "2024-02-01",
      status: "active",
      roi: 8,
      socialImpact: 800,
      category: "Energy",
    },
    {
      id: 3,
      name: "Mobile Health Clinic",
      amount: 7000,
      date: "2024-02-15",
      status: "active",
      roi: 12,
      socialImpact: 15000,
      category: "Health",
    },
  ];

  const nftsOwned = [
    {
      id: 1,
      name: "Water Guardian NFT",
      project: "Kisumu Water Project",
      rarity: "rare",
      value: 500,
      image: "https://via.placeholder.com/100x100/2196f3/ffffff?text=WG",
    },
    {
      id: 2,
      name: "Energy Pioneer NFT",
      project: "Solar Power Initiative",
      rarity: "epic",
      value: 800,
      image: "https://via.placeholder.com/100x100/ff9800/ffffff?text=EP",
    },
    {
      id: 3,
      name: "Health Hero NFT",
      project: "Mobile Health Clinic",
      rarity: "legendary",
      value: 1200,
      image: "https://via.placeholder.com/100x100/f44336/ffffff?text=HH",
    },
  ];

  const notifications = [
    {
      id: 1,
      type: "milestone",
      title: "New milestone reached",
      message: "Kisumu Water Project has completed construction phase",
      timestamp: "2 hours ago",
      read: false,
    },
    {
      id: 2,
      type: "payout",
      title: "Payout released",
      message: "You received $150 from Solar Power Initiative",
      timestamp: "1 day ago",
      read: false,
    },
    {
      id: 3,
      type: "vote",
      title: "New DAO vote",
      message: "Community Garden Initiative proposal is now live",
      timestamp: "2 days ago",
      read: true,
    },
  ];

  const walletOptions = [
    { value: "metamask", label: "MetaMask", description: "Browser extension wallet" },
    { value: "mobile", label: "Mobile Wallet", description: "Connect via mobile app" },
    { value: "fiat", label: "Fiat Account", description: "Traditional bank account" },
  ];

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case "common":
        return "#9e9e9e";
      case "rare":
        return "#2196f3";
      case "epic":
        return "#9c27b0";
      case "legendary":
        return "#ff9800";
      default:
        return "#9e9e9e";
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case "milestone":
        return <CheckIcon sx={{ color: "#4caf50" }} />;
      case "payout":
        return <TrendingUpIcon sx={{ color: "#2196f3" }} />;
      case "vote":
        return <NotificationsIcon sx={{ color: "#ff9800" }} />;
      default:
        return <NotificationsIcon />;
    }
  };

  const handleConnectWallet = () => {
    setShowConnectWallet(true);
  };

  const handleConfirmWallet = () => {
    setIsWalletConnected(true);
    setShowConnectWallet(false);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box textAlign="center" mb={6}>
        <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
          Investor Dashboard
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: "auto" }}>
          Track your investments, returns, and impact across all funded projects
        </Typography>
      </Box>

      {/* Wallet Connection */}
      {!isWalletConnected && (
        <Card sx={{ mb: 4 }}>
          <CardContent sx={{ p: 4, textAlign: "center" }}>
            <ConnectWalletIcon sx={{ fontSize: 64, color: "primary.main", mb: 2 }} />
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
              Connect Your Wallet
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Connect your wallet to view your portfolio and manage your investments
            </Typography>
            <Button
              variant="contained"
              size="large"
              startIcon={<ConnectWalletIcon />}
              onClick={handleConnectWallet}
              sx={{ borderRadius: 2, px: 4 }}
            >
              Connect Wallet
            </Button>
          </CardContent>
        </Card>
      )}

      {isWalletConnected && (
        <>
          {/* Portfolio Overview */}
          <Grid container spacing={3} mb={4}>
            <Grid item xs={12} sm={6} md={3}>
              <Card
                sx={{
                  background: "linear-gradient(135deg, #4caf5015 0%, #4caf5005 100%)",
                  border: "1px solid #4caf5030",
                }}
              >
                <CardContent sx={{ textAlign: "center", p: 3 }}>
                  <Typography variant="h4" sx={{ fontWeight: "bold", color: "#4caf50", mb: 1 }}>
                    ${portfolioStats.currentValue.toLocaleString()}
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    Portfolio Value
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    +{portfolioStats.totalReturn}% total return
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card
                sx={{
                  background: "linear-gradient(135deg, #2196f315 0%, #2196f305 100%)",
                  border: "1px solid #2196f330",
                }}
              >
                <CardContent sx={{ textAlign: "center", p: 3 }}>
                  <Typography variant="h4" sx={{ fontWeight: "bold", color: "#2196f3", mb: 1 }}>
                    {portfolioStats.socialReturn}K
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    People Impacted
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Social return on investment
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card
                sx={{
                  background: "linear-gradient(135deg, #ff980015 0%, #ff980005 100%)",
                  border: "1px solid #ff980030",
                }}
              >
                <CardContent sx={{ textAlign: "center", p: 3 }}>
                  <Typography variant="h4" sx={{ fontWeight: "bold", color: "#ff9800", mb: 1 }}>
                    {portfolioStats.projectsFunded}
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    Projects Funded
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Active investments
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card
                sx={{
                  background: "linear-gradient(135deg, #9c27b015 0%, #9c27b005 100%)",
                  border: "1px solid #9c27b030",
                }}
              >
                <CardContent sx={{ textAlign: "center", p: 3 }}>
                  <Typography variant="h4" sx={{ fontWeight: "bold", color: "#9c27b0", mb: 1 }}>
                    {portfolioStats.nftsOwned}
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    NFTs Owned
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Impact badges collected
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Main Content */}
          <Grid container spacing={4}>
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
                  <Tab label="Funded Projects" />
                  <Tab label="NFT Collection" />
                </Tabs>

                <TabPanel value={activeTab} index={0}>
                  <Stack spacing={3}>
                    {fundedProjects.map((project) => (
                      <Card key={project.id} sx={{ p: 3 }}>
                        <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                          <Box flex={1}>
                            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                              {project.name}
                            </Typography>
                            <Box display="flex" alignItems="center" gap={2} mb={2}>
                              <Chip
                                label={project.category}
                                size="small"
                                variant="outlined"
                              />
                              <Chip
                                label={project.status}
                                size="small"
                                color={project.status === "completed" ? "success" : "warning"}
                              />
                            </Box>
                          </Box>
                          <Typography variant="h6" sx={{ fontWeight: 600, color: "primary.main" }}>
                            ${project.amount.toLocaleString()}
                          </Typography>
                        </Box>

                        <Grid container spacing={3} mb={3}>
                          <Grid item xs={6}>
                            <Box textAlign="center">
                              <Typography variant="h5" sx={{ color: "#4caf50", fontWeight: 600 }}>
                                +{project.roi}%
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                Financial ROI
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid item xs={6}>
                            <Box textAlign="center">
                              <Typography variant="h5" sx={{ color: "#2196f3", fontWeight: 600 }}>
                                {project.socialImpact.toLocaleString()}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                People Impacted
                              </Typography>
                            </Box>
                          </Grid>
                        </Grid>

                        <Box display="flex" gap={2}>
                          <Button
                            variant="outlined"
                            startIcon={<ViewIcon />}
                            size="small"
                            sx={{ borderRadius: 2 }}
                          >
                            View Project
                          </Button>
                          <Button
                            variant="outlined"
                            startIcon={<DownloadIcon />}
                            size="small"
                            sx={{ borderRadius: 2 }}
                          >
                            Download Report
                          </Button>
                        </Box>
                      </Card>
                    ))}
                  </Stack>
                </TabPanel>

                <TabPanel value={activeTab} index={1}>
                  <Grid container spacing={3}>
                    {nftsOwned.map((nft) => (
                      <Grid item xs={12} sm={6} md={4} key={nft.id}>
                        <Card
                          sx={{
                            p: 3,
                            textAlign: "center",
                            background: `linear-gradient(135deg, ${getRarityColor(nft.rarity)}15 0%, ${getRarityColor(nft.rarity)}05 100%)`,
                            border: `2px solid ${getRarityColor(nft.rarity)}30`,
                            transition: "all 0.3s ease",
                            "&:hover": {
                              transform: "translateY(-8px)",
                              boxShadow: `0 20px 40px ${getRarityColor(nft.rarity)}20`,
                            },
                          }}
                        >
                          <Avatar
                            sx={{
                              width: 80,
                              height: 80,
                              mx: "auto",
                              mb: 2,
                              background: `linear-gradient(135deg, ${getRarityColor(nft.rarity)} 0%, ${getRarityColor(nft.rarity)}80 100%)`,
                              fontSize: "1.5rem",
                            }}
                          >
                            {nft.name.split(" ").map(word => word[0]).join("")}
                          </Avatar>
                          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                            {nft.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            {nft.project}
                          </Typography>
                          <Chip
                            label={nft.rarity}
                            size="small"
                            sx={{
                              background: `linear-gradient(135deg, ${getRarityColor(nft.rarity)} 0%, ${getRarityColor(nft.rarity)}80 100%)`,
                              color: "white",
                              fontWeight: 600,
                              mb: 1,
                            }}
                          />
                          <Typography variant="body2" sx={{ fontWeight: 600, color: "primary.main" }}>
                            ${nft.value}
                          </Typography>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </TabPanel>
              </Card>
            </Grid>

            {/* Notifications Sidebar */}
            <Grid item xs={12} md={4}>
              <Card sx={{ height: "fit-content" }}>
                <CardContent sx={{ p: 3 }}>
                  <Box display="flex" alignItems="center" gap={2} mb={3}>
                    <NotificationsIcon sx={{ color: "primary.main" }} />
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Notifications
                    </Typography>
                  </Box>

                  <Stack spacing={2}>
                    {notifications.map((notification) => (
                      <Box
                        key={notification.id}
                        sx={{
                          p: 2,
                          borderRadius: 2,
                          background: notification.read ? "transparent" : "rgba(25, 118, 210, 0.08)",
                          border: notification.read ? "1px solid rgba(0,0,0,0.08)" : "1px solid rgba(25, 118, 210, 0.2)",
                        }}
                      >
                        <Box display="flex" alignItems="flex-start" gap={2}>
                          <Avatar sx={{ width: 32, height: 32, bgcolor: "primary.main" }}>
                            {getNotificationIcon(notification.type)}
                          </Avatar>
                          <Box flex={1}>
                            <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                              {notification.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                              {notification.message}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {notification.timestamp}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    ))}
                  </Stack>

                  <Button
                    variant="outlined"
                    fullWidth
                    sx={{ mt: 3, borderRadius: 2 }}
                  >
                    View All Notifications
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </>
      )}

      {/* Connect Wallet Dialog */}
      <Dialog
        open={showConnectWallet}
        onClose={() => setShowConnectWallet(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Connect Your Wallet</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 2 }}>
            {walletOptions.map((option) => (
              <Card
                key={option.value}
                sx={{
                  p: 2,
                  cursor: "pointer",
                  border: selectedWallet === option.value ? "2px solid primary.main" : "1px solid rgba(0,0,0,0.08)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    borderColor: "primary.main",
                    background: "rgba(25, 118, 210, 0.04)",
                  },
                }}
                onClick={() => setSelectedWallet(option.value)}
              >
                <Box display="flex" alignItems="center" gap={2}>
                  <Avatar sx={{ bgcolor: "primary.main" }}>
                    <WalletIcon />
                  </Avatar>
                  <Box flex={1}>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      {option.label}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {option.description}
                    </Typography>
                  </Box>
                </Box>
              </Card>
            ))}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowConnectWallet(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleConfirmWallet}
            disabled={!selectedWallet}
          >
            Connect
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default InvestorDashboard;
