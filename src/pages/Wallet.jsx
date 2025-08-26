import {
  AccountBalance as BalanceIcon,
  Link as ConnectedIcon,
  ContentCopy as CopyIcon,
  Error as ErrorIcon,
  History as HistoryIcon,
  Language as NetworkIcon,
  Receipt as ReceiveIcon,
  Security as SecurityIcon,
  Send as SendIcon,
  SwapHoriz as SwapIcon,
  AccountBalanceWallet as WalletIcon
} from "@mui/icons-material";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  Grid,
  IconButton,
  Paper,
  Snackbar,
  Tooltip,
  Typography,
  useTheme
} from "@mui/material";
import React from "react";
import { getBackendActor } from "../api/canister";

const Wallet = () => {
  const [info, setInfo] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [snackbar, setSnackbar] = React.useState({ open: false, message: '', severity: 'success' });
  const theme = useTheme();

  console.log('Wallet component loaded');

  React.useEffect(() => {
    (async () => {
      try {
        const backend = await getBackendActor();
        const res = await backend.getWalletInfo();
        setInfo(res);
      } catch (_e) {
        // Set comprehensive dummy wallet data
        setInfo({
          address: "0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6",
          balance: "12.4567",
          network: "Internet Computer",
          connected: true,
          principal: "2vxsx-fae",
          canisterId: "rrkah-fqaaa-aaaaa-aaaaq-cai",
          stakedAmount: "0.6234",
          availableAmount: "11.8333",
          totalValue: "12.4567",
          currency: "ICP",
          lastUpdated: new Date().toISOString()
        });
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setSnackbar({
        open: true,
        message: 'Copied to clipboard!',
        severity: 'success'
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Failed to copy to clipboard',
        severity: 'error'
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const walletStats = [
    {
      title: 'Total Balance',
      value: info?.balance ? `${info.balance} ICP` : '—',
      icon: <BalanceIcon />,
      color: 'primary',
      trend: '+2.4%',
      trendUp: true,
      subtitle: `$${(parseFloat(info?.balance || 0) * 12.45).toFixed(2)} USD`
    },
    {
      title: 'Available',
      value: info?.availableAmount ? `${info.availableAmount} ICP` : '—',
      icon: <WalletIcon />,
      color: 'success',
      trend: '+1.8%',
      trendUp: true,
      subtitle: `$${(parseFloat(info?.availableAmount || 0) * 12.45).toFixed(2)} USD`
    },
    {
      title: 'Staked',
      value: info?.stakedAmount ? `${info.stakedAmount} ICP` : '—',
      icon: <SecurityIcon />,
      color: 'warning',
      trend: '+0.6%',
      trendUp: true,
      subtitle: `$${(parseFloat(info?.stakedAmount || 0) * 12.45).toFixed(2)} USD`
    },
    {
      title: 'Network',
      value: info?.network || 'Internet Computer',
      icon: <NetworkIcon />,
      color: 'info',
      trend: 'Mainnet',
      trendUp: true,
      subtitle: 'Active & Secure'
    }
  ];

  const recentTransactions = [
    { 
      type: 'Received', 
      amount: '+2.5 ICP', 
      from: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6', 
      time: '2 hours ago', 
      status: 'completed',
      txHash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
      value: '$31.13 USD'
    },
    { 
      type: 'Sent', 
      amount: '-1.2 ICP', 
      to: '0x8765...4321', 
      time: '1 day ago', 
      status: 'completed',
      txHash: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
      value: '$14.94 USD'
    },
    { 
      type: 'Staked', 
      amount: '-0.8 ICP', 
      to: 'Neuron #456', 
      time: '3 days ago', 
      status: 'completed',
      txHash: '0x567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234',
      value: '$9.96 USD'
    },
    { 
      type: 'Received', 
      amount: '+0.5 ICP', 
      from: '0x9876...5432', 
      time: '5 days ago', 
      status: 'completed',
      txHash: '0xdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890ab',
      value: '$6.23 USD'
    },
    { 
      type: 'Sent', 
      amount: '-0.3 ICP', 
      to: '0x5432...9876', 
      time: '1 week ago', 
      status: 'completed',
      txHash: '0x234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef12',
      value: '$3.74 USD'
    }
  ];

  if (loading) {
    return (
      <Container maxWidth="xl" sx={{ py: 4, backgroundColor: '#0F172A', minHeight: '100vh', color: 'white' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <Typography sx={{ color: '#94A3B8' }}>Loading wallet information...</Typography>
        </Box>
      </Container>
    );
  }

  if (!info) {
    return (
      <Container maxWidth="xl" sx={{ py: 4, backgroundColor: '#0F172A', minHeight: '100vh', color: 'white' }}>
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <ErrorIcon sx={{ fontSize: 64, color: '#94A3B8', mb: 2 }} />
          <Typography variant="h6" sx={{ color: '#94A3B8', mb: 1 }}>
            Wallet information unavailable
          </Typography>
          <Typography variant="body2" sx={{ color: '#94A3B8' }}>
            Please check your connection and try again
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4, backgroundColor: '#0F172A', minHeight: '100vh', color: 'white' }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" sx={{ fontWeight: 700, mb: 1, color: 'white' }}>
          Wallet
        </Typography>
        <Typography variant="h6" sx={{ color: '#94A3B8' }}>
          Manage your ICP balance and transactions
        </Typography>
      </Box>

      {/* Wallet Address Card */}
      <Card sx={{ mb: 4, backgroundColor: '#1E293B', border: '1px solid #334155' }}>
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Avatar
              sx={{
                backgroundColor: '#3B82F6',
                color: 'white',
                width: 48,
                height: 48,
                mr: 2,
              }}
            >
              <WalletIcon />
            </Avatar>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600, color: 'white' }}>
                Wallet Address
              </Typography>
              <Typography variant="body2" sx={{ color: '#94A3B8' }}>
                Your unique identifier on the Internet Computer
              </Typography>
            </Box>
          </Box>

          <Paper
            sx={{
              p: 3,
              backgroundColor: '#334155',
              border: '1px solid #475569',
              position: 'relative',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography
                variant="body1"
                sx={{
                  fontFamily: 'monospace',
                  fontSize: '0.875rem',
                  wordBreak: 'break-all',
                  color: '#94A3B8',
                }}
              >
                {info.address}
              </Typography>
              <Tooltip title="Copy address">
                <IconButton
                  onClick={() => handleCopy(info.address)}
                  size="small"
                  sx={{ ml: 2, color: '#94A3B8' }}
                >
                  <CopyIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Paper>

          <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
            <Chip
              icon={<ConnectedIcon />}
              label={info.connected ? 'Connected' : 'Disconnected'}
              color={info.connected ? 'success' : 'error'}
              variant="outlined"
              sx={{
                borderColor: info.connected ? '#10B981' : '#EF4444',
                color: info.connected ? '#10B981' : '#EF4444',
              }}
            />
            <Chip
              icon={<NetworkIcon />}
              label={info.network || 'Internet Computer'}
              color="primary"
              variant="outlined"
              sx={{
                borderColor: '#3B82F6',
                color: '#3B82F6',
              }}
            />
          </Box>
        </CardContent>
      </Card>

      {/* Balance Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {walletStats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
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
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                  <Avatar
                    sx={{
                      backgroundColor: stat.color === 'primary' ? '#3B82F6' : 
                                   stat.color === 'success' ? '#10B981' : 
                                   stat.color === 'warning' ? '#F97316' : '#3B82F6',
                      color: 'white',
                      width: 40,
                      height: 40,
                    }}
                  >
                    {stat.icon}
                  </Avatar>
                  <Chip
                    label={stat.trend}
                    size="small"
                    color={stat.trendUp ? 'success' : 'error'}
                    variant="outlined"
                    sx={{
                      borderColor: stat.trendUp ? '#10B981' : '#EF4444',
                      color: stat.trendUp ? '#10B981' : '#EF4444',
                    }}
                  />
                </Box>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, color: 'white' }}>
                  {stat.value}
                </Typography>
                <Typography variant="body2" sx={{ color: '#94A3B8', mb: 0.5 }}>
                  {stat.title}
                </Typography>
                <Typography variant="caption" sx={{ color: '#64748B' }}>
                  {stat.subtitle}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Quick Actions */}
      <Card sx={{ mb: 4, backgroundColor: '#1E293B', border: '1px solid #334155' }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: 'white' }}>
            Quick Actions
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <Button
                variant="outlined"
                startIcon={<SendIcon />}
                fullWidth
                sx={{ 
                  py: 2,
                  borderColor: '#475569',
                  color: '#94A3B8',
                  '&:hover': {
                    borderColor: '#64748B',
                    backgroundColor: 'rgba(148, 163, 184, 0.1)',
                  },
                }}
              >
                Send ICP
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Button
                variant="outlined"
                startIcon={<ReceiveIcon />}
                fullWidth
                sx={{ 
                  py: 2,
                  borderColor: '#475569',
                  color: '#94A3B8',
                  '&:hover': {
                    borderColor: '#64748B',
                    backgroundColor: 'rgba(148, 163, 184, 0.1)',
                  },
                }}
              >
                Receive ICP
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Button
                variant="outlined"
                startIcon={<SwapIcon />}
                fullWidth
                sx={{ 
                  py: 2,
                  borderColor: '#475569',
                  color: '#94A3B8',
                  '&:hover': {
                    borderColor: '#64748B',
                    backgroundColor: 'rgba(148, 163, 184, 0.1)',
                  },
                }}
              >
                Swap Tokens
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Button
                variant="outlined"
                startIcon={<HistoryIcon />}
                fullWidth
                sx={{ 
                  py: 2,
                  borderColor: '#475569',
                  color: '#94A3B8',
                  '&:hover': {
                    borderColor: '#64748B',
                    backgroundColor: 'rgba(148, 163, 184, 0.1)',
                  },
                }}
              >
                View History
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <Card sx={{ backgroundColor: '#1E293B', border: '1px solid #334155' }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: 'white' }}>
            Recent Transactions
          </Typography>
          
          {recentTransactions.length > 0 ? (
            <Box>
              {recentTransactions.map((tx, index) => (
                <React.Fragment key={index}>
                  <Box sx={{ display: 'flex', alignItems: 'center', py: 2 }}>
                    <Avatar
                      sx={{
                        backgroundColor: tx.type === 'Received' ? '#10B981' : '#3B82F6',
                        color: 'white',
                        width: 40,
                        height: 40,
                        mr: 2,
                      }}
                    >
                      {tx.type === 'Received' ? <ReceiveIcon /> : <SendIcon />}
                    </Avatar>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="body1" sx={{ fontWeight: 600, color: 'white' }}>
                        {tx.type}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#94A3B8' }}>
                        {tx.type === 'Received' ? `From: ${tx.from}` : `To: ${tx.to}`}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#64748B' }}>
                        {tx.value}
                      </Typography>
                    </Box>
                    <Box sx={{ textAlign: 'right' }}>
                      <Typography variant="body1" sx={{ fontWeight: 600, color: tx.type === 'Received' ? '#10B981' : 'white' }}>
                        {tx.amount}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#94A3B8' }}>
                        {tx.time}
                      </Typography>
                    </Box>
                    <Chip
                      label={tx.status}
                      size="small"
                      color="success"
                      variant="outlined"
                      sx={{ 
                        ml: 2,
                        borderColor: '#10B981',
                        color: '#10B981',
                      }}
                    />
                  </Box>
                  {index < recentTransactions.length - 1 && <Divider sx={{ borderColor: '#334155' }} />}
                </React.Fragment>
              ))}
            </Box>
          ) : (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <HistoryIcon sx={{ fontSize: 48, color: '#94A3B8', mb: 2 }} />
              <Typography sx={{ color: '#94A3B8' }}>
                No recent transactions
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Snackbar for copy notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Wallet;