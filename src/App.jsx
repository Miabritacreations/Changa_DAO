import React from "react";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import Layout from "./layout/Layout";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Proposals from "./pages/Proposals";
import UserProfile from "./pages/UserProfile";
import Voting from "./pages/Voting";
import Wallet from "./pages/Wallet";

const RequireAuth = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const checkAuth = async () => {
      try {
        // Add timeout to prevent hanging
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Auth timeout')), 3000)
        );
        
        const authPromise = import("@dfinity/auth-client").then((mod) =>
          mod.AuthClient.create()
        ).then(client => client.isAuthenticated());
        
        const loggedIn = await Promise.race([authPromise, timeoutPromise]);
        setIsAuthenticated(loggedIn);
      } catch (error) {
        console.error("Auth check failed:", error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        backgroundColor: '#0F172A',
        color: 'white',
        fontSize: '18px'
      }}>
        <div>
          <div>Checking authentication...</div>
          <div style={{ fontSize: '14px', marginTop: '10px', opacity: 0.7 }}>
            This may take a few seconds
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

// Determine basename based on environment
const getBasename = () => {
  // For GitHub Pages deployment
  if (import.meta.env.PROD && window.location.hostname.includes('github.io')) {
    return '/Changa_DAO/';
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
          element: (
            <RequireAuth>
              <Proposals />
            </RequireAuth>
          ),
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
          element: (
            <RequireAuth>
              <Projects />
            </RequireAuth>
          ),
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
  }
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
