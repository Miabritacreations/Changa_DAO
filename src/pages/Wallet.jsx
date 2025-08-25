import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Container,
  Chip,
  Button,
  IconButton,
  Tooltip,
  Avatar,
  LinearProgress,
  useTheme,
  Paper,
  Divider,
  Snackbar,
  Alert
} from "@mui/material";
import {
  ContentCopy as CopyIcon,
  AccountBalanceWallet as WalletIcon,
  AccountBalance as BalanceIcon,
  Language as NetworkIcon,
  Link as ConnectedIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  TrendingUp as TrendingUpIcon,
  Send as SendIcon,
  Receipt as ReceiveIcon,
  SwapHoriz as SwapIcon,
  History as HistoryIcon,
  Security as SecurityIcon
} from "@mui/icons-material";
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
        setInfo(null);
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
      trendUp: true
    },
    {
      title: 'Available',
      value: info?.balance ? `${(parseFloat(info.balance) * 0.95).toFixed(4)} ICP` : '—',
      icon: <WalletIcon />,
      color: 'success',
      trend: '+1.8%',
      trendUp: true
    },
    {
      title: 'Staked',
      value: info?.balance ? `${(parseFloat(info.balance) * 0.05).toFixed(4)} ICP` : '—',
      icon: <SecurityIcon />,
      color: 'warning',
      trend: '+0.6%',
      trendUp: true
    },
    {
      title: 'Network',
      value: info?.network || 'Internet Computer',
      icon: <NetworkIcon />,
      color: 'info',
      trend: 'Mainnet',
      trendUp: true
    }
  ];

  const recentTransactions = [
    { type: 'Received', amount: '+0.5 ICP', from: '0x1234...5678', time: '2 hours ago', status: 'completed' },
    { type: 'Sent', amount: '-0.2 ICP', to: '0x8765...4321', time: '1 day ago', status: 'completed' },
    { type: 'Staked', amount: '-0.1 ICP', to: 'Neuron #123', time: '3 days ago', status: 'completed' },
  ];

  if (loading) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <Typography>Loading wallet information...</Typography>
        </Box>
      </Container>
    );
  }

  if (!info) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <ErrorIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
            Wallet information unavailable
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Please check your connection and try again
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
          Wallet
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Manage your ICP balance and transactions
        </Typography>
      </Box>

      {/* Wallet Address Card */}
      <Card sx={{ mb: 4 }}>
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Avatar
              sx={{
                backgroundColor: 'primary.main',
                color: 'white',
                width: 48,
                height: 48,
                mr: 2,
              }}
            >
              <WalletIcon />
            </Avatar>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Wallet Address
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Your unique identifier on the Internet Computer
              </Typography>
            </Box>
          </Box>

          <Paper
            sx={{
              p: 3,
              backgroundColor: 'grey.50',
              border: '1px solid',
              borderColor: 'grey.200',
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
                  color: 'text.secondary',
                }}
              >
                {info.address}
              </Typography>
              <Tooltip title="Copy address">
                <IconButton
                  onClick={() => handleCopy(info.address)}
                  size="small"
                  sx={{ ml: 2 }}
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
            />
            <Chip
              icon={<NetworkIcon />}
              label={info.network || 'Internet Computer'}
              color="primary"
              variant="outlined"
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
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: theme.shadows[8],
                },
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                  <Avatar
                    sx={{
                      backgroundColor: `${stat.color}.main`,
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
                  />
                </Box>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                  {stat.value}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {stat.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Quick Actions */}
      <Card sx={{ mb: 4 }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
            Quick Actions
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <Button
                variant="outlined"
                startIcon={<SendIcon />}
                fullWidth
                sx={{ py: 2 }}
              >
                Send ICP
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Button
                variant="outlined"
                startIcon={<ReceiveIcon />}
                fullWidth
                sx={{ py: 2 }}
              >
                Receive ICP
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Button
                variant="outlined"
                startIcon={<SwapIcon />}
                fullWidth
                sx={{ py: 2 }}
              >
                Swap Tokens
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Button
                variant="outlined"
                startIcon={<HistoryIcon />}
                fullWidth
                sx={{ py: 2 }}
              >
                View History
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <Card>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
            Recent Transactions
          </Typography>
          
          {recentTransactions.length > 0 ? (
            <Box>
              {recentTransactions.map((tx, index) => (
                <React.Fragment key={index}>
                  <Box sx={{ display: 'flex', alignItems: 'center', py: 2 }}>
                    <Avatar
                      sx={{
                        backgroundColor: tx.type === 'Received' ? 'success.light' : 'primary.light',
                        color: 'white',
                        width: 40,
                        height: 40,
                        mr: 2,
                      }}
                    >
                      {tx.type === 'Received' ? <ReceiveIcon /> : <SendIcon />}
                    </Avatar>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        {tx.type}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {tx.type === 'Received' ? `From: ${tx.from}` : `To: ${tx.to}`}
                      </Typography>
                    </Box>
                    <Box sx={{ textAlign: 'right' }}>
                      <Typography variant="body1" sx={{ fontWeight: 600, color: tx.type === 'Received' ? 'success.main' : 'text.primary' }}>
                        {tx.amount}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {tx.time}
                      </Typography>
                    </Box>
                    <Chip
                      label={tx.status}
                      size="small"
                      color="success"
                      variant="outlined"
                      sx={{ ml: 2 }}
                    />
                  </Box>
                  {index < recentTransactions.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </Box>
          ) : (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <HistoryIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
              <Typography color="text.secondary">
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