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
        const client = await import("@dfinity/auth-client").then((mod) =>
          mod.AuthClient.create()
        );
        const loggedIn = await client.isAuthenticated();
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
    return <div>Checking authentication...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  return children;
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
    basename: "/Changa_DAO",
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
