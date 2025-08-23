import React from "react";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout from "./Layout";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />

          {/* Login page in case you want a separate route */}
          <Route path="login" element={<LoginPage />} />

          {/* Protected routes */}
          <Route
            path="dashboard"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />
        </Route>

        {/* Fallback for unmatched routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

// A wrapper component to protect routes
const RequireAuth = ({ children }) => {
  const [authClient, setAuthClient] = React.useState(null);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  React.useEffect(() => {
    const checkAuth = async () => {
      const client = await import("@dfinity/auth-client").then((mod) =>
        mod.AuthClient.create()
      );
      setAuthClient(client);
      const loggedIn = await client.isAuthenticated();
      setIsAuthenticated(loggedIn);
    };
    checkAuth();
  }, []);

  if (!isAuthenticated) {
    // Redirect to home or login if not authenticated
    return <Navigate to="/" replace />;
  }

  return children;
};

export default App;
