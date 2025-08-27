# Development Setup Guide

## Current Configuration

Your frontend is now configured to connect to the **mainnet backend canister** by default:
- Backend Canister ID: `mgln7-qyaaa-aaaaj-qnspa-cai`
- Host: `https://ic0.app` (mainnet)
- **Status**: ✅ Ready to use

## Development Options

### Option 1: Use Mainnet (Current Setup)
Your app will work immediately with the deployed backend on mainnet. No additional setup required.

**To switch to mainnet mode:**
```javascript
// In src/api/canister.js
const isLocal = false; // This is the current setting
```

### Option 2: Use Local Replica (For backend development)
If you want to develop the backend locally:

1. **Start the local replica:**
   ```bash
   cd ../..  # Go to project root
   dfx start --clean
   ```

2. **Deploy the backend locally:**
   ```bash
   dfx deploy Changa_DAO_backend
   ```

3. **Switch to local mode:**
   ```javascript
   // In src/api/canister.js
   const isLocal = true; // Change this to true
   ```

4. **Restart your frontend development server:**
   ```bash
   npm run dev
   ```

## Environment Variables

- `CANISTER_ID_CHANGA_DAO_BACKEND` - Override backend canister ID
- `GITHUB_PAGES=true` - Build for GitHub Pages deployment

## Troubleshooting

If you see connection errors:
1. **Check the console logs** - Look for the 🔗 connection message
2. **Verify Internet Identity authentication** - You may need to authenticate
3. **Check if the backend canister is accessible** - Try visiting the canister directly
4. **Clear browser cache** - Hard refresh (Ctrl+F5)

## Current Status

- ✅ Routing issues fixed
- ✅ Backend connection configured for mainnet
- ✅ Fallback canister ID set
- 🔄 Ready for testing with mainnet backend
