import React from "react";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Layout from "./layout/Layout";
import Dashboard from "./pages/Dashboard";
import Fund from "./pages/Fund";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Proposals from "./pages/Proposals";
import Propose from "./pages/Propose";
import Track from "./pages/Track";
import UserProfile from "./pages/UserProfile";
import Verify from "./pages/Verify";
import Voting from "./pages/Voting";
import Wallet from "./pages/Wallet";

const RequireAuth = ({ children }) => {
  const { isAuthenticated, setShowLoginModal } = useAuth();
  const [hasShownModal, setHasShownModal] = React.useState(false);

  React.useEffect(() => {
    if (!isAuthenticated && !hasShownModal) {
      setShowLoginModal(true);
      setHasShownModal(true);
    }
  }, [isAuthenticated, hasShownModal, setShowLoginModal]);

  // Reset the flag when user becomes authenticated
  React.useEffect(() => {
    if (isAuthenticated) {
      setHasShownModal(false);
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return null; // Don't render the protected content
  }
  
  return children;
};

// Determine basename based on environment
const getBasename = () => {
  // For GitHub Pages deployment
  if (import.meta.env.PROD && window.location.hostname.includes('github.io')) {
    return '/Changa_DAO';
  }
  // For local development
  return '/';
};

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        {
          path: "dashboard",
          element: <Dashboard />,
        },
        {
          path: "proposals",
          element: <Proposals />,
        },
        {
          path: "voting",
          element: (
            <RequireAuth>
              <Voting />
            </RequireAuth>
          ),
        },
        {
          path: "wallet",
          element: (
            <RequireAuth>
              <Wallet />
            </RequireAuth>
          ),
        },
        {
          path: "profile",
          element: (
            <RequireAuth>
              <UserProfile />
            </RequireAuth>
          ),
        },
        {
          path: "projects",
          element: <Projects />,
        },
        {
          path: "propose",
          element: <Propose />,
        },
        {
          path: "fund",
          element: <Fund />,
        },
        {
          path: "verify",
          element: <Verify />,
        },
        {
          path: "track",
          element: <Track />,
        },
        // Catch-all route for any unmatched paths
        {
          path: "*",
          element: <Navigate to="/" replace />,
        },
      ],
    },
  ],
  {
    basename: getBasename(),
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    },
    // Add error handling to prevent error displays
    errorElement: (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#0F172A',
        color: 'white',
        fontFamily: 'Arial, sans-serif'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ marginBottom: '16px' }}>Loading...</div>
          <div style={{ fontSize: '14px', opacity: 0.7 }}>Please wait while the page loads</div>
        </div>
      </div>
    )
  }
);

const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App;
